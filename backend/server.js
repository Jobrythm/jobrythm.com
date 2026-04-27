'use strict';

const path = require('path');
const fs = require('fs');
const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const Database = require('better-sqlite3');

// ---------------------------------------------------------------------------
// Database setup
// ---------------------------------------------------------------------------

const DATA_DIR = process.env.DATA_DIR || path.join(__dirname, 'data');
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

const db = new Database(path.join(DATA_DIR, 'analytics.db'));
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

db.exec(`
  CREATE TABLE IF NOT EXISTS analytics_page_views (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    session_id  TEXT    NOT NULL,
    page        TEXT    NOT NULL,
    referrer    TEXT,
    entered_at  TEXT    NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
    duration_ms INTEGER
  );
  CREATE INDEX IF NOT EXISTS idx_apv_session ON analytics_page_views (session_id);
  CREATE INDEX IF NOT EXISTS idx_apv_page    ON analytics_page_views (page);
  CREATE INDEX IF NOT EXISTS idx_apv_entered ON analytics_page_views (entered_at);
`);

// ---------------------------------------------------------------------------
// Express setup
// ---------------------------------------------------------------------------

const app = express();
app.use(cors());
app.use(express.json());

// Rate limiting: track/duration are fire-and-forget per page view so a generous
// limit of 120 req/min per IP is enough to absorb normal browsing while blocking
// bulk abuse. The stats endpoint is admin-only so we restrict it more tightly.
const trackLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 120,
  standardHeaders: true,
  legacyHeaders: false,
});
const statsLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
});

// ---------------------------------------------------------------------------
// Health check
// ---------------------------------------------------------------------------

app.get('/_health', (_req, res) => res.json({ ok: true }));

// ---------------------------------------------------------------------------
// POST /api/analytics/track
// ---------------------------------------------------------------------------

app.post('/api/analytics/track', trackLimiter, (req, res) => {
  const { sessionId, page, referrer } = req.body || {};
  if (!sessionId || !page) {
    return res.status(400).json({ error: 'sessionId and page are required' });
  }

  const stmt = db.prepare(
    'INSERT INTO analytics_page_views (session_id, page, referrer) VALUES (?, ?, ?)'
  );
  const info = stmt.run(sessionId, page, referrer || null);
  res.json({ id: info.lastInsertRowid, ok: true });
});

// ---------------------------------------------------------------------------
// POST /api/analytics/duration
// ---------------------------------------------------------------------------

app.post('/api/analytics/duration', trackLimiter, (req, res) => {
  const { id, durationMs } = req.body || {};
  if (!id || durationMs == null) {
    return res.status(400).json({ error: 'id and durationMs are required' });
  }
  if (typeof durationMs !== 'number' || durationMs < 0 || durationMs > 86400000) {
    return res.status(400).json({ error: 'durationMs must be a number between 0 and 86400000' });
  }

  db.prepare('UPDATE analytics_page_views SET duration_ms = ? WHERE id = ?')
    .run(Math.round(durationMs), id);
  res.json({ ok: true });
});

// ---------------------------------------------------------------------------
// GET /api/analytics/stats?days=7
// ---------------------------------------------------------------------------

app.get('/api/analytics/stats', statsLimiter, (req, res) => {
  const days = parseInt(req.query.days || '7', 10);
  const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();

  // Total views + unique sessions
  const totals = db.prepare(`
    SELECT COUNT(*) AS views, COUNT(DISTINCT session_id) AS sessions
    FROM analytics_page_views
    WHERE entered_at >= ?
  `).get(since);

  // Per-page stats
  const pageStats = db.prepare(`
    SELECT
      page,
      COUNT(*)                   AS views,
      COUNT(DISTINCT session_id) AS unique_sessions,
      AVG(duration_ms)           AS avg_duration_ms
    FROM analytics_page_views
    WHERE entered_at >= ?
    GROUP BY page
    ORDER BY views DESC
  `).all(since);

  // Navigation flow
  const navFlow = db.prepare(`
    SELECT
      referrer AS from_page,
      page     AS to_page,
      COUNT(*) AS count
    FROM analytics_page_views
    WHERE entered_at >= ?
      AND referrer IS NOT NULL
      AND referrer != ''
    GROUP BY referrer, page
    ORDER BY count DESC
    LIMIT 100
  `).all(since);

  // Daily views
  const dailyViews = db.prepare(`
    SELECT
      DATE(entered_at)           AS date,
      COUNT(*)                   AS views,
      COUNT(DISTINCT session_id) AS sessions
    FROM analytics_page_views
    WHERE entered_at >= ?
    GROUP BY DATE(entered_at)
    ORDER BY date
  `).all(since);

  // Avg session duration (sum all page durations per session)
  const sessionDurations = db.prepare(`
    SELECT session_id, SUM(duration_ms) AS total_ms
    FROM analytics_page_views
    WHERE entered_at >= ?
      AND duration_ms IS NOT NULL
    GROUP BY session_id
  `).all(since);

  const avgSessionMs =
    sessionDurations.length > 0
      ? sessionDurations.reduce((s, r) => s + r.total_ms, 0) / sessionDurations.length
      : 0;

  // Bounce rate: sessions with only 1 page view
  const sessionPageCounts = db.prepare(`
    SELECT session_id, COUNT(*) AS page_count
    FROM analytics_page_views
    WHERE entered_at >= ?
    GROUP BY session_id
  `).all(since);

  const bouncedCount = sessionPageCounts.filter((s) => s.page_count === 1).length;
  const bounceRate =
    sessionPageCounts.length > 0
      ? Math.round((bouncedCount / sessionPageCounts.length) * 100)
      : 0;

  res.json({
    totalViews: totals.views,
    uniqueSessions: totals.sessions,
    avgSessionMs: Math.round(avgSessionMs),
    bounceRate,
    pages: pageStats.map((r) => ({
      page: r.page,
      views: r.views,
      uniqueSessions: r.unique_sessions,
      avgDurationMs: r.avg_duration_ms != null ? Math.round(r.avg_duration_ms) : null,
    })),
    navFlow: navFlow.map((r) => ({
      from: r.from_page,
      to: r.to_page,
      count: r.count,
    })),
    dailyViews: dailyViews.map((r) => ({
      date: r.date,
      views: r.views,
      sessions: r.sessions,
    })),
  });
});

// ---------------------------------------------------------------------------
// Start
// ---------------------------------------------------------------------------

const PORT = parseInt(process.env.PORT || '8082', 10);
app.listen(PORT, '0.0.0.0', () => {
  console.log(`[api] Jobrythm analytics API listening on port ${PORT}`);
});
