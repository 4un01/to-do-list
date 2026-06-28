const User = require('../models/users');

const saveToDb = async (req, res) => {
    try{
        const {email, task, isCompleted} = req.body;
        const taskData = {
            task: task,
            isChecked: isCompleted
        };
        const user = await User.findOne({email: email});
        user.tasks.push(taskData);
        await user.save();
        const taskId = user.tasks[user.tasks.length -1]._id;
        res.status(202).json(taskId);
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
        const {email, taskCompleted, taskId} = req.body;
        if(taskCompleted){
            const user = await User.findOne({email:email});
            const task = await user.tasks.id(taskId);
            task.isChecked = true;
            await user.save();
            res.status(200).send();
        }else{
            const user = await User.findOne({email:email});
            const task = await user.tasks.id(taskId);
            task.isChecked = false;
            await user.save();
            res.status(200).send();
        }
    }catch(e){
        console.log(e.message);
    }
}

module.exports = {saveToDb, getFromDb, isCompleted};