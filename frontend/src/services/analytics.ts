const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:1337';
const ANALYTICS_BASE = `${API_URL}/api/analytics`;
const SESSION_KEY = 'jobrythm_analytics_session';

function getOrCreateSessionId(): string {
  let id = localStorage.getItem(SESSION_KEY);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(SESSION_KEY, id);
  }
  return id;
}

export async function trackPageView(
  page: string,
  referrer?: string,
): Promise<{ id: number }> {
  try {
    const sessionId = getOrCreateSessionId();
    const res = await fetch(`${ANALYTICS_BASE}/track`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId, page, referrer }),
    });
    if (!res.ok) return { id: 0 };
    return res.json();
  } catch {
    return { id: 0 };
  }
}

export function sendDuration(id: number, durationMs: number): void {
  if (id <= 0) return;
  const url = `${ANALYTICS_BASE}/duration`;
  const payload = JSON.stringify({ id, durationMs });
  if (navigator.sendBeacon) {
    navigator.sendBeacon(url, new Blob([payload], { type: 'application/json' }));
  } else {
    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: payload,
      keepalive: true,
    }).catch(() => {});
  }
}

export interface PageStat {
  page: string;
  views: number;
  uniqueSessions: number;
  avgDurationMs: number | null;
}

export interface NavFlowEntry {
  from: string;
  to: string;
  count: number;
}

export interface DailyView {
  date: string;
  views: number;
  sessions: number;
}

export interface AnalyticsStats {
  totalViews: number;
  uniqueSessions: number;
  avgSessionMs: number;
  bounceRate: number;
  pages: PageStat[];
  navFlow: NavFlowEntry[];
  dailyViews: DailyView[];
}

export async function fetchAnalyticsStats(days: number): Promise<AnalyticsStats> {
  const res = await fetch(`${ANALYTICS_BASE}/stats?days=${days}`);
  if (!res.ok) throw new Error('Failed to fetch analytics stats');
  return res.json();
}
