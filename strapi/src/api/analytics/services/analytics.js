export default {
  async track({ sessionId, page, referrer }) {
    const knex = strapi.db.connection;
    const result = await knex('analytics_page_views')
      .insert({
        session_id: sessionId,
        page,
        referrer: referrer || null,
        entered_at: new Date(),
      })
      .returning('id');
    // knex + postgres returns [{id:N}], knex + sqlite returns [N]
    const raw = result[0];
    const id = typeof raw === 'object' && raw !== null ? raw.id : raw;
    return { id, ok: true };
  },

  async updateDuration(id, durationMs) {
    const knex = strapi.db.connection;
    await knex('analytics_page_views')
      .where({ id })
      .update({ duration_ms: Math.round(durationMs) });
  },

  async getStats(days) {
    const knex = strapi.db.connection;
    const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

    // Total views + unique sessions
    const totals = await knex('analytics_page_views')
      .where('entered_at', '>=', since)
      .count('* as views')
      .countDistinct('session_id as sessions')
      .first();

    // Per-page stats
    const pageStats = await knex('analytics_page_views')
      .where('entered_at', '>=', since)
      .groupBy('page')
      .select('page')
      .count('* as views')
      .countDistinct('session_id as unique_sessions')
      .avg('duration_ms as avg_duration_ms')
      .orderBy('views', 'desc');

    // Navigation flow: where users went from each page
    const navFlow = await knex('analytics_page_views')
      .where('entered_at', '>=', since)
      .whereNotNull('referrer')
      .where('referrer', '!=', '')
      .groupBy('referrer', 'page')
      .select('referrer as from_page', 'page as to_page')
      .count('* as count')
      .orderBy('count', 'desc')
      .limit(100);

    // Daily views
    const dailyViews = await knex('analytics_page_views')
      .where('entered_at', '>=', since)
      .select(knex.raw('DATE(entered_at) as date'))
      .count('* as views')
      .countDistinct('session_id as sessions')
      .groupBy(knex.raw('DATE(entered_at)'))
      .orderBy(knex.raw('DATE(entered_at)'));

    // Avg session duration (sum durations per session)
    const sessionDurations = await knex('analytics_page_views')
      .where('entered_at', '>=', since)
      .whereNotNull('duration_ms')
      .groupBy('session_id')
      .select('session_id')
      .sum('duration_ms as total_ms');

    const avgSessionMs =
      sessionDurations.length > 0
        ? sessionDurations.reduce((s, r) => s + Number(r.total_ms), 0) /
          sessionDurations.length
        : 0;

    // Bounce rate: sessions with only 1 page view
    const sessionPageCounts = await knex('analytics_page_views')
      .where('entered_at', '>=', since)
      .groupBy('session_id')
      .select('session_id')
      .count('* as page_count');

    const bouncedCount = sessionPageCounts.filter(
      (s) => Number(s.page_count) === 1,
    ).length;
    const bounceRate =
      sessionPageCounts.length > 0
        ? Math.round((bouncedCount / sessionPageCounts.length) * 100)
        : 0;

    return {
      totalViews: Number(totals.views),
      uniqueSessions: Number(totals.sessions),
      avgSessionMs: Math.round(avgSessionMs),
      bounceRate,
      pages: pageStats.map((r) => ({
        page: r.page,
        views: Number(r.views),
        uniqueSessions: Number(r.unique_sessions),
        avgDurationMs:
          r.avg_duration_ms != null ? Math.round(Number(r.avg_duration_ms)) : null,
      })),
      navFlow: navFlow.map((r) => ({
        from: r.from_page,
        to: r.to_page,
        count: Number(r.count),
      })),
      dailyViews: dailyViews.map((r) => ({
        date: String(r.date),
        views: Number(r.views),
        sessions: Number(r.sessions),
      })),
    };
  },
};
