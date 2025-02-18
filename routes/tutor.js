const express = require('express');
const router = express.Router();
const tutorController = require('../controllers/tutorController');
const auth = require('../middleware/auth');

router.post('/schedule-class', auth, tutorController.scheduleClass);
router.post('/create-task', auth, tutorController.createTask);
router.post('/grade-student', auth, tutorController.gradeStudent);

module.exports = router;