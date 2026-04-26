export default {
  register() {},

  async bootstrap({ strapi }) {
    const knex = strapi.db.connection;
    const exists = await knex.schema.hasTable('analytics_page_views');
    if (!exists) {
      await knex.schema.createTable('analytics_page_views', (table) => {
        table.increments('id');
        table.string('session_id', 36).notNullable();
        table.string('page', 500).notNullable();
        table.string('referrer', 500).nullable();
        table.timestamp('entered_at').defaultTo(knex.fn.now());
        table.integer('duration_ms').nullable();
        table.index(['session_id']);
        table.index(['page']);
        table.index(['entered_at']);
      });
      strapi.log.info('[analytics] Created analytics_page_views table');
    }
  },
};
