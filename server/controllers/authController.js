const User = require('../models/users');

const login = async (req, res) => {
    try{
        const {email, password} = req.body;
        const user = await User.findOne({email: email, password: password});

        if(!user){
            const err = new Error('Invalid email or password');
            err.status = 401;
            throw err;
        }

        req.session.userId = user._id;
        res.status(200).send('true');

    }catch(e){
        console.log(e.message);
        res.status(e.status || 500).json({message: e.message});
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
        res.status(201).send('created');

    }catch(e){
        console.log(e.message);
        if(e.code === 11000){
            res.status(409).json({messge: 'Email already registered'})
        }if (e.name === 'ValidationError') {
            return res.status(400).json({ message: e.message });
        }
        res.status(e.status || 500).json({message: e.message});
    }
}

module.exports = {login, signup};