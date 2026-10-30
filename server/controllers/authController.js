const User = require('../models/users');

const login = async (req, res) => {
    try{
        const {email} = req.body;
        const exists = await User.exists({email: email});

        if(exists){
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
        const user = await User.create({email: email, password: password});

        res.status(202).send('created');
    }catch(e){
        console.log(e.message);
        res.status(500);
    }
}

module.exports = {login, signup};