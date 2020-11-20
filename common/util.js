const jwt = require('jsonwebtoken');
const { BASE_MIDDLEWARES } = require('./constant');

/* 通过token获取JWT的payload部分 */
const getJWTPayload = (token) => {
  // 验证并解析JWT
  if (!token) return;
  return jwt.verify(token, 'secret');
};

exports.getJWTPayload = getJWTPayload;

// parse token body
exports.parseToken = (authorization) => {
  try {
    const tokenParse = getJWTPayload(authorization);
    if (!tokenParse) throw '会话过期，请重新登陆';
    return tokenParse;
  } catch (error) {
    console.log('error', error);
    throw error;
  }
};

// verify target
exports.isTarget = (param, target) => {
  return Object.prototype.toString.call(param).indexOf(target) !== -1;
};

// check json
exports.isJSON = (str) => {
  try {
    JSON.parse(str);
    return true;
  } catch (error) {
    return false;
  }
};

// validate url
exports.needFilter = (url) => {
  for (const item of FILTER_URL) {
    if (url.indexOf(item) !== -1) {
      return true;
    }
  }
  return false;
};

// reset error
exports.reMapError = (error) => {
  return error instanceof Object
    ? /JsonWebTokenError+|TokenExpiredError/.test(JSON.stringify(error))
      ? '会话已过期，请重新登录验证'
      : JSON.stringify(error)
    : error.toString();
};

exports.registerBaseMiddleware = (app, args) => {
  BASE_MIDDLEWARES.forEach((item) => {
    const temp = item(app, ...args);
    if (Array.isArray(temp)) {
      app.use(...temp);
    } else {
      app.use(temp);
    }
  });
  return app;
};
