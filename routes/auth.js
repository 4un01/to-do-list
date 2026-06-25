const express = require('express');
const mongoose = require('mongoose');
const connectionStr = process.env.MONGO_CONNECTION;

const router = express.Router();
mongoose.connect(connectionStr)
    .then(() => {console.log('Connected to MongoDB')})
    .catch((e) => {console.log(e.message)});

router.post('/login', (req, res) => {});
router.post('/signup', (req, res) => {});

module.exports = router;