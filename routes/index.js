const adminRouter = require('./admin');
const universityRouter = require('./university');
const siteRouter = require('./site');

function route(app) {
  app.use('/admin', adminRouter);
  app.use('/university', universityRouter);

  app.use('/', siteRouter);
}

module.exports = route;
