const User = require('../models/users');
const bc = require('bcryptjs');

const login = async (req, res) => {
    try{
        const {email, password} = req.body;
        if(typeof email !== 'string' || typeof password !== 'string'){
            const err = new Error('invalid input');
            err.status = 400;
            throw err;
        }
        const user = await User.findOne({email: email});

        if(!user){
            const err = new Error('email does not exist');
            err.status = 401;
            throw err;
        };

        const isPasswordValid = await bc.compare(password, user.password);

        if(!isPasswordValid){
            const err = new Error('Password is not valid');
            err.status = 401;
            throw err;
        };

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
        if(typeof email !== 'string' || typeof password !== 'string'){
            const err = new Error('invalid input');
            err.status = 400;
            throw err;
        }
        const passwordHash = await bc.hash(password, 10);
        const newUser = {
            email: email,
            password: passwordHash,
            tasks: []
        };
        const user = new User(newUser)
        await user.save();
        req.session.userId = user._id;
        res.status(201).send('created');

    }catch(e){
        console.log(e.message);
        if(e.code === 11000){
            return res.status(409).json({message: 'Email already registered'});
        }if (e.name === 'ValidationError') {
            return res.status(400).json({ message: e.message });
        }
        res.status(e.status || 500).json({message: e.message});
    }
}

module.exports = {login, signup};