const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    tasks: [
        {
            task: String,
            isChecked: Boolean
        }
    ],
});

const User = mongoose.model('User', userSchema);
module.exports = User;