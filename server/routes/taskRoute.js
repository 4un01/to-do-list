const express = require('express');
const {addToDb, getFromDb, isCompleted, deleteFromDb, logout} = require('../controllers/taskController');

const router = express.Router();

router.get('/getTasks', getFromDb);
router.post('/add', addToDb);
router.post('/checked', isCompleted);
router.post('/logout', logout);
router.delete('/:id', deleteFromDb);

module.exports = router;