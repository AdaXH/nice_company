const jwt = require('jsonwebtoken')

/* 通过token获取JWT的payload部分 */
const getJWTPayload = (token) => {
  // 验证并解析JWT
  if (!token) return
  return jwt.verify(token, 'secret')
}

module.exports = {
  getJWTPayload,
  parseToken: (authorization) => {
    try {
      const tokenParse = getJWTPayload(authorization)
      if (!tokenParse) throw 'token认证失败'
      return tokenParse
    } catch (error) {
      console.log('error', error)
      throw error
    }
  },
  reMapError,
}

function reMapError(error) {
  return error instanceof Object
    ? /JsonWebTokenError+|TokenExpiredError/.test(JSON.stringify(error))
      ? '会话已过期，请重新登录验证'
      : JSON.stringify(error)
    : error.toString()
}
