const koa = require('koa');
const bodyparser = require('koa-bodyparser');
const json = require('koa-json');
const views = require('koa-views');
const mongoose = require('mongoose');
const session = require('koa-session');
const router = require('koa-router')();
const registerRouter = require('./common/registerRoutet');
const useMiddleware = require('./common/useMiddleware');

let app = new koa();

// middlewar
app = useMiddleware(app);

const config = {
  ...require('./common/serverConfig'),
  undefined: {
    host: 'mongodb://localhost:27017/company',
  },
};

app.use(
  bodyparser({
    enableTypes: ['json', 'form', 'text'],
    jsonLimit: '50mb',
    formLimit: '50mb',
    textLimit: '50mb',
  })
);

app.keys = ['secret'];
const CONFIG = {
  key: 'SESSION_ID',
  maxAge: 172800000,
  autoCommit: true,
  overwrite: true,
  httpOnly: false,
  signed: true,
  rolling: false,
  renew: false,
};
app.use(session(CONFIG, app));

app.use(json());
app.use(require('koa-static')(__dirname + '/public'));

app.use(
  views(__dirname + '/views', {
    extension: 'ejs',
  })
);

//controllers
registerRouter(router);
//router
app.use(router.routes(), router.allowedMethods());

app.listen(config.port, (_) => console.log('server on ' + config.port));

//error
app.on('error', (err, ctx) => {
  console.log('server error', err, ctx);
});

//connect to mongo
// mongoose.connect(config[process.env.NODE_ENV].host).then((res) => {
//   res
//     ? console.log('connected to mongo')
//     : console.log('can not connect to mongo')
// })
