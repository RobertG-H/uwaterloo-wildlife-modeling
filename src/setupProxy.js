const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:5001/uwaterloo-wildlife-modeling/us-central1/server',
      changeOrigin: false,
    }),
  );
};
