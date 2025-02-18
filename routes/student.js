const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const auth = require('../middleware/auth');

router.post('/register-course', auth, studentController.registerCourse);
router.post('/submit-task', auth, studentController.submitTask);
router.get('/class-details/:classId', auth, studentController.viewClassDetails);

module.exports = router;