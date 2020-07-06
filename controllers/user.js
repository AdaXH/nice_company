const routerExports = {}
const User = require('./../dbmodel/User')
const { getJWTPayload, parseToken, reMapError } = require('../common/util')

const secret = 'secret'

function getToken(payload = {}) {
  return jwt.sign(payload, secret, { expiresIn: '1day' })
}

routerExports.testApi = {
  method: 'get',
  url: '/getUser',
  route: async (ctx) => {
    // const { fileName, dataUrl } = ctx.request.body
    try {
      // const {
      //   headers: { authorization },
      // } = ctx
      // const tokenParse = parseToken(authorization)
      // const { _id: userId } = tokenParse
      // const user = await User.findOne({ _id: userId })
      // if (!user.admin) throw '当前用户无权限'
      // await callSaveGalleryToBucket(fileName, dataUrl)
      // ctx.body = {
      //   success: true,
      // }
      ctx.body = {
        success: true,
        data: {
          name: 'xxx',
          email: '111@111.com',
        },
      }
    } catch (error) {
      console.log(error)
      ctx.body = {
        success: false,
        errorMsg: reMapError(error),
      }
    }
  },
}

module.exports = routerExports
