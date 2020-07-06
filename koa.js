const koa = require('koa')
const bodyparser = require('koa-bodyparser')
const json = require('koa-json')
const views = require('koa-views')
const mongoose = require('mongoose')
const session = require('koa-session')
const fs = require('fs')
const log = require('./middleware/log')
const router = require('koa-router')()

const app = new koa()

const config = {
  ...require('./common/serverConfig'),
  undefined: {
    host: 'mongodb://localhost:27017/company',
  },
}

app.use(
  bodyparser({
    enableTypes: ['json', 'form', 'text'],
    jsonLimit: '50mb',
    formLimit: '50mb',
    textLimit: '50mb',
  })
)

app.use(log)

app.keys = ['secret']
const CONFIG = {
  key: 'SESSION_ID',
  maxAge: 172800000,
  autoCommit: true,
  overwrite: true,
  httpOnly: false,
  signed: true,
  rolling: false,
  renew: false,
}
app.use(session(CONFIG, app))

app.use(json())
app.use(require('koa-static')(__dirname + '/public'))

app.use(
  views(__dirname + '/views', {
    extension: 'ejs',
  })
)

//controllers
try {
  const files = fs.readdirSync(__dirname + '/controllers')
  const controllers = files.filter((item) => item.endsWith('.js'))
  for (let controller of controllers) {
    const controllersExport =
      require(__dirname + '/controllers/' + controller) || undefined
    if (!controllersExport || !(controllersExport instanceof Object))
      throw controller + '没有提供正确的接口'
    else
      for (let key in controllersExport) {
        if (
          !controllersExport[key].method ||
          !controllersExport[key].url ||
          !controllersExport[key].route
        )
          throw controller + ' 的 "' + key + '" 配置不正确'
        else {
          const target = controllersExport[key]
          const { method, url, route: routeFn } = target
          router[method](url, routeFn)
          console.log(`注册接口：${method} - ${url}`)
        }
      }
  }
} catch (error) {
  console.log(error)
}

//router
app.use(router.routes(), router.allowedMethods())

app.listen(config.port, (_) => console.log('server on ' + config.port))

//error
app.on('error', (err, ctx) => {
  console.log('server error', err, ctx)
})

//connect to mongo
// mongoose.connect(config[process.env.NODE_ENV].host).then((res) => {
//   res
//     ? console.log('connected to mongo')
//     : console.log('can not connect to mongo')
// })
