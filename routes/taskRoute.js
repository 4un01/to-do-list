const express = require('express');
const {saveToDb, getFromDb} = require('../controllers/taskController');

const router = express.Router();

router.get('/:email', getFromDb);
router.post('/save', saveToDb);

module.exports = router;