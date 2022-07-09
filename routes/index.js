const adminRouter = require('./admin');
const universityRouter = require('./university');
const userRouter = require('./user');
const siteRouter = require('./site');

function route(app) {
  app.use('/admin', adminRouter);
  app.use('/university', universityRouter);
  app.use('/user',userRouter);

  app.use('/', siteRouter);
}

module.exports = route;
