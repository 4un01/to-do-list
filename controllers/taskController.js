const User = require('../models/users');

const saveToDb = async (req, res) => {
    try{
        const {email, task} = req.body;
        const user = await User.findOne({email: email});
        user.tasks.push(task);
        await user.save();
        res.status(202).send('task added');
    }catch(e){
        console.log(e.message);
        res.status(400).send('failed');
    }
};

module.exports = {saveToDb};