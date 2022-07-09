class UserController {
    // pass
    signup(req,res,next) {
        res.json({msg:'success'})
    }
}

module.exports = new UserController();