const User = require('../models/users');

const addToDb = async (req, res) => {
    try{
        const taskObj = req.body;
        const userId = req.session.userId;

        const user = await User.findOne({_id: userId});
        user.tasks.push(taskObj);
        await user.save();
        const taskId = user.tasks[user.tasks.length - 1]._id;
        res.status(202).json({message: 'task added to db', taskId: taskId});
    }catch(e){
        console.log(e.message);
        res.status(e.status || 500).json(e.message);
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
        const {taskCompleted, taskId} = req.body;
        const user = await User.findById(req.session.userId);
        const task = user.tasks.id(taskId);

        if(taskCompleted){
            task.isChecked = true;
            await user.save();
            res.status(200).send();
        }else{
            task.isChecked = false;
            await user.save();
            res.status(200).send();
        }
    }catch(e){
        console.log(e.message);
        res.status(e.status || 500).json({ message: e.message });
    }
}

const deleteFromDb = async (req, res) => {
    try{
        const taskId = req.params.id;
        const user = await User.findById(req.session.userId);
        const task = user.tasks.id(taskId);
        await task.deleteOne();
        await user.save();
        res.status(200).send();
    }catch(e){
        console.log(e.message);
        res.status(e.status || 500).json({ message: e.message });
    }
}

module.exports = {addToDb, getFromDb, isCompleted, deleteFromDb};