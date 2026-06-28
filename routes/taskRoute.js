const express = require('express');
const {saveToDb, getFromDb, isCompleted} = require('../controllers/taskController');

const router = express.Router();

router.get('/:email', getFromDb);
router.post('/save', saveToDb);
router.post('/checked', isCompleted);

module.exports = router;