const User = require('../models/users');

const login = async (req, res) => {
    try{
        const {email, password} = req.body;
        const exists = await User.exists({email: email});

        if(exists){
            const user = await User.findOne({email: email, password: password})
            req.session.userId = user._id;
            res.status(200).send('true');
        }else{
            res.status(404).send('false');
        }
    }catch(e){
        console.log(e.message);
    }
};

const signup = async (req, res) => {
    try{
        const {email, password} = req.body;
        const newUser = {
            email: email,
            password: password,
            tasks: []
        };
        const user = new User(newUser)
        await user.save();
        req.session.userId = user._id;
        res.status(202).send('created');
    }catch(e){
        console.log(e.message);
        res.status(500);
    }
}

module.exports = {login, signup};