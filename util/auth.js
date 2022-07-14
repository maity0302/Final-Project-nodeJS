module.exports = {
  isLoggedIn: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash("error_msg", "Đăng nhập để có thể truy cập!");
    res.redirect("/user/login");
  },
  isLoggedOut: function (req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    }
    res.redirect("/");
  },
  checkAdmin: function (req, res, next) {
    if (req.isAuthenticated() && req.user.isAdmin === true) {
        return next();
    }
    req.flash("error_msg", "Đăng nhập để có thể truy cập!");
    res.redirect("/user/login");
  },
};
