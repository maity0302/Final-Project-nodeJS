const User = require("../models/User");
const bcrypt = require('bcryptjs');
const passport = require('passport');

class UserController {
  // [GET] /user/signup
  signup(req, res, next) {
    res.render("signup");
  }

  // [POST] /user/store
  store(req, res, next) {
    const { username, email, password, password2 } = req.body;
    let errors = [];
    if (!username || !email || !password || !password2) {
      errors.push({ msg: "Hãy nhập hết các trường!" });
    }

    if (password != password2) {
      errors.push({ msg: "Mật khẩu không giống nhau!" });
    }

    if (password.length < 6) {
      errors.push({ msg: "Mật khẩu phải nhiều hơn 6 kí tự!" });
    }
    if (errors.length > 0) {
      res.render("signup", {
        errors,
        username,
        email,
        password,
        password2,
      });
    } else {
      User.findOne({ email: email }).then((user) => {
        if (user) {
          errors.push({ msg: "Email đã tồn tại!" });
          res.render("signup", {
            errors,
            username,
            email,
            password,
            password2,
          });
        } else {
          const newUser = new User({
            username,
            email,
            password,
          });

          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              newUser.password = hash;
              newUser
                .save()
                .then((user) => {
                  req.flash(
                    "success_msg",
                    "Đăng ký tài khoản thành công! Hãy đăng nhập!"
                  );
                  res.redirect("/user/login");
                })
                .catch((err) => console.log(err));
            });
          });
        }
      });
    }
  }

  // [GET] /user/login
  login(req, res, next) {
    res.render("login", {
      success_msg: req.flash('success_msg'),
      error_msg: req.flash('error_msg'),
      error: req.flash('error'),
    });
  }
  
  // [POST] /user/toLogin
  toLogin(req, res, next) {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/user/login',
        failureFlash: true
      })(req, res, next);
  }
  // [GET] /user/logout
  logout(req, res, next) {
    req.logout(function(err) {
      if (err) { return next(err); }
      req.flash('success_msg', 'Bạn đã đăng xuất!');
      res.redirect('/user/login');
    });
  }
}

module.exports = new UserController();
