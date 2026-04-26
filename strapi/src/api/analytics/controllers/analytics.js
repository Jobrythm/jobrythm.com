export default {
  async track(ctx) {
    const { sessionId, page, referrer } = ctx.request.body || {};
    if (!sessionId || !page) {
      return ctx.badRequest('sessionId and page are required');
    }
    const result = await strapi
      .service('api::analytics.analytics')
      .track({ sessionId, page, referrer });
    ctx.body = result;
  },

  async updateDuration(ctx) {
    const { id, durationMs } = ctx.request.body || {};
    if (!id || durationMs == null) {
      return ctx.badRequest('id and durationMs are required');
    }
    await strapi
      .service('api::analytics.analytics')
      .updateDuration(id, durationMs);
    ctx.body = { ok: true };
  },

  async stats(ctx) {
    const days = parseInt(ctx.query.days || '7', 10);
    ctx.body = await strapi
      .service('api::analytics.analytics')
      .getStats(days);
  },
};
