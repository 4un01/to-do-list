const express = require('express');
const {saveToDb} = require('../controllers/taskController');

const router = express.Router();

router.post('/save', saveToDb);

module.exports = router;