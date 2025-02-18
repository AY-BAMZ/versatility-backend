const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const auth = require('../middleware/auth');

router.post('/add-course', auth, adminController.addCourse);
router.post('/assign-tutor', auth, adminController.assignTutor);
router.get('/manage-students', auth, adminController.manageStudents);
router.post('/add-announcement', auth, adminController.addAnnouncement);

module.exports = router;