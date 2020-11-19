const { isTarget, isJSON } = require('../common/util');
module.exports = async (ctx, next) => {
  const {
    request: { body = {}, url, method },
  } = ctx;
  const start = Date.now();
  await next();
  const end = Date.now();
  try {
    const res = JSON.parse(isJSON(ctx.body, 'String') ? ctx.body : '{}');
    const log = `[${method} ${end - start}ms ${url}] 
request: ${JSON.stringify(isTarget(body, 'Object') ? body : {})} 
response: ${JSON.stringify(isTarget(res, 'Object') ? res : {})}
    `;
    console.log(log);
  } catch (error) {
    console.log('error', error);
  }

  // console.log(body)
};
