const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const methodOverride = require("method-override");
const handlebars = require("express-handlebars");
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');

const route = require("./routes");
const db = require("./config/db");
const {mongooseToObject} = require('./util/mongoose');

// connect to database
db.connect();

var app = express();
// passport config
require('./config/passport')(passport);

// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// template engine
app.engine(
  "hbs",
  handlebars.engine({
    extname: ".hbs",
    helpers: {
      sum: (a, b) => a + b,
      capitalize: (str) => {
        const arr = str.split(" ");
        let result = "";
        for (let i = 0; i < arr.length; i++) {
          result +=
            arr[i].charAt(0).toUpperCase() +
            arr[i].slice(1).toLowerCase() +
            " ";
        }
        return result;
      },
      getFirstItem: (list) => list[0],
      select: function (value, options) {
        return options.fn(this)
          .split('\n')
          .map(function (v) {
            var t = 'value="' + value + '"'
            return !RegExp(t).test(v) ? v : v.replace(t, t + ' selected="selected"')
          })
          .join('\n')
      },
      isdefined: function(value) {
        return value !== false;
      }
    },
  })
);

// view engine setup
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

app.use(logger("dev"));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/images", express.static(path.join(__dirname, "/public/images")));

// routers init
route(app);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});
// Global variables
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error", {
    user : mongooseToObject(req.user),
  });
});

module.exports = app;
