exports.FILTER_URL = {
  FILTER_URL: ['Baiduspider', 'Googlebot', 'favicon.ico'],
};

// 基础中间件
exports.BASE_MIDDLEWARES = [
  () =>
    // bodyparser
    require('koa-bodyparser')({
      enableTypes: ['json', 'form', 'text'],
      jsonLimit: '5mb',
      formLimit: '5mb',
      textLimit: '5mb',
    }),
  (app) => {
    // session
    app.keys = ['secret'];
    const CONFIG = {
      key: 'SESSION_ID' /** (string) cookie key (default is koa:sess) */,
      maxAge: 172800000,
      autoCommit: true /** (boolean) automatically commit headers (default true) */,
      overwrite: true /** (boolean) can overwrite or not (default true) */,
      httpOnly: false /** (boolean) httpOnly or not (default true) */,
      signed: true /** (boolean) signed or not (default true) */,
      rolling: false /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */,
      renew: false /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/,
    };
    return require('koa-session')(CONFIG, app);
  },
  () => require('koa-json')(), // json
  (_, { baseUrl }) =>
    // static
    require('koa-static')(baseUrl + '/public'),
  (_, { baseUrl }) =>
    // koa-views
    require('koa-views')(baseUrl + '/views', {
      extension: 'ejs',
    }),
  () => {
    const registerRouter = require('./registerRouter');
    const router = require('koa-router')();
    registerRouter(router);
    return [router.routes(), router.allowedMethods()];
  },
];
