const routerExports = {}

const RENER_MAP = {
  pc: 'pc',
  mobile: 'mobile',
}

routerExports.routerIndex = {
  method: 'get',
  url: '/*',
  route: async (ctx, next) => {
    const userAgent = /Mobile+|iPhone+|Android/.test(
      ctx.request.header['user-agent']
    )
      ? 'mobile'
      : 'pc'
    await ctx.render(RENER_MAP[userAgent])
    await next()
  },
}

module.exports = routerExports
