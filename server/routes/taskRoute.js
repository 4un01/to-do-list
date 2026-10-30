const express = require('express');
const {saveToDb, getFromDb, isCompleted, deleteFromDb} = require('../controllers/taskController');

const router = express.Router();

router.get('/:email', getFromDb);
router.post('/save', saveToDb);
router.post('/checked', isCompleted);
router.delete('/:id', deleteFromDb);

module.exports = router;