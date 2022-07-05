const Users = require('../models/University');

class UserController {
    // [GET] \
    create (req, res, next) {
        res.json({ message: 'success' });
    }
}

module.exports = new UserController();