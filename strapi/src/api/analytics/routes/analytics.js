export default {
  routes: [
    {
      method: 'POST',
      path: '/analytics/track',
      handler: 'analytics.track',
      config: { auth: false },
    },
    {
      method: 'POST',
      path: '/analytics/duration',
      handler: 'analytics.updateDuration',
      config: { auth: false },
    },
    {
      method: 'GET',
      path: '/analytics/stats',
      handler: 'analytics.stats',
      config: { auth: false },
    },
  ],
};
