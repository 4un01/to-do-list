const isUserLoggedIn = async (req, res, next) => {
    if(!req.session.userId) return res.status(401).json({message: 'User isnt logged in'});
    next()
};

module.exports = {isUserLoggedIn};