const fs = require('fs');
const path = require('path');
module.exports = (app) => {
  const files = fs.readdirSync(path.resolve('./middleware'));
  console.log('app', app.use);
  files.forEach((item) => {
    if (item.endsWith('.js')) {
      const middleware = require(path.resolve('./middleware', item));
      console.log('middleware', middleware);
      app.use(middleware);
    }
  });
  return app;
};
