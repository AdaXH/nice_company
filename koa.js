const koa = require('koa');
let app = new koa();
const { getEnv, registerBaseMiddleware } = require('./common/util');
const useMiddleware = require('./common/useMiddleware');
const config = require('./serverConfig');

app = useMiddleware(app);
app = registerBaseMiddleware(app, [{ baseUrl: __dirname }]);

app.on('error', (err, ctx) => {
  ctx.body = `error on server ${JSON.stringify(err)}`;
  // todo: should send a error - page
  console.log('server error', err, ctx);
});

app.listen(config.port, (_) => {
  console.log('server on %s', config.port);
  // const database = new Database(config[getEnv()]);
  // database.connect();
});
