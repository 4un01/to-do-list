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
        res.status(e.status || 500).json({message: e.message});
    }
};

const getFromDb = async (req, res) => {
    try{
        const userId = req.session.userId;
        if(userId){
            const user = await User.findById(userId);

            if(user === null){
                return res.status(401).json({message: 'user not logged in'})
            }

            const tasks = user.tasks.map(t => {
                let taskObj = {
                    task: t.task,
                    taskId: t._id,
                    isChecked: t.isChecked 
                };
                return taskObj
            });
            return res.status(200).json(tasks);
        }else{
            return res.status(401).json({message: 'user not logged in'})
        }
    }catch(e){
        console.log(e.message);
        return res.status(500).json({message: e.message})
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

const logout = async(req, res) => {
    req.session.destroy(err => {
        if(err) return res.status(500).send('Could not log out');
        res.clearCookie('connect.sid');
        res.send('Logged out');
    });
}

module.exports = {addToDb, getFromDb, isCompleted, deleteFromDb, logout};