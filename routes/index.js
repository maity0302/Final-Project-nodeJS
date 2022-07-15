const adminRouter = require('./admin');
const universityRouter = require('./university');
const userRouter = require('./user');
const siteRouter = require('./site');
const meRouter = require('./me');
const contactRouter = require('./contact');
const commentRouter = require('./comment');
const { isLoggedOut, isLoggedIn, checkAdmin } = require('../util/auth');

function route(app) {
  app.use('/admin',checkAdmin , adminRouter);
  app.use('/university', universityRouter);
  app.use('/user',userRouter);
  app.use('/comment', isLoggedIn,commentRouter);
  app.use('/me',isLoggedIn, meRouter);
  app.use('/contact',contactRouter);
  app.use('/', siteRouter);
}

module.exports = route;
