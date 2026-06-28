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

const getFromDb = async (req, res) => {
    try{
        const email = req.params.email;
        const user = await User.findOne({email:email});
        res.status(200).json(user.tasks);
    }catch(e){
        console.log(e.message);
    }
}

const isCompleted = async (req, res) => {
    try{
        const {email, taskCompleted} = req.body;
        if(completedTask){
            const user = await User.findOne({email:email});
            user.tasks.isChecked = true;
            await user.save();
            res.status(200);
        }else{
            const user = await User.findOne({email:email});
            user.tasks.isChecked = false;
            await user.save();
            res.status(200);
        }
    }catch(e){
        console.log(e.message);
    }
}

module.exports = {saveToDb, getFromDb, isCompleted};