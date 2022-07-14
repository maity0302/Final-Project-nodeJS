const adminRouter = require('./admin');
const universityRouter = require('./university');
const userRouter = require('./user');
const siteRouter = require('./site');
const meRouter = require('./me');
const { isLoggedOut, isLoggedIn, checkAdmin } = require('../util/auth');

function route(app) {
  app.use('/admin',checkAdmin , adminRouter);
  app.use('/university', universityRouter);
  app.use('/user',userRouter);
  app.use('/me',isLoggedIn, meRouter);
  app.use('/', siteRouter);
}

module.exports = route;
