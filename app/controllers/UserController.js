const User = require('../models/User');
class UserController {
    // [GET] /signup
    signup(req, res, next) {
        res.render('signup');
    }
    // [GET] /login
    login(req, res, next) {
        res.render('login');
    }
    store(req, res, next) {
        const user = new User(req.body);
        user
            .save()
            .then(() => res.redirect('/user/login'))
            .catch((error) => {console.log(error)});
    }
}

module.exports = new UserController();