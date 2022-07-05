const usersRouter = require('./users');
const siteRouter = require('./site');
const universityRouter = require('./university');

function route(app) {
  app.use('/university', universityRouter);
  app.use('/users', usersRouter);

  app.use('/', siteRouter);
}

module.exports = route;
