const Course = require('../models/Course');
const User = require('../models/User');

// Add Course
exports.addCourse = async (req, res) => {
    const { title, description } = req.body;
    try {
        const course = new Course({ title, description });
        await course.save();
        res.json(course);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Assign Tutor to Course
exports.assignTutor = async (req, res) => {
    const { courseId, tutorId } = req.body;
    try {
        const course = await Course.findById(courseId);
        const tutor = await User.findById(tutorId);
        if (!course || !tutor) return res.status(404).json({ msg: 'Course or Tutor not found' });

        course.tutor = tutorId;
        await course.save();
        res.json(course);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Manage Students
exports.manageStudents = async (req, res) => {
    // Implement manage students logic here
    res.send('Manage Students Endpoint');
};

// Add Announcement
exports.addAnnouncement = async (req, res) => {
    const { courseId, message } = req.body;
    try {
        const course = await Course.findById(courseId);
        if (!course) return res.status(404).json({ msg: 'Course not found' });

        const announcement = new Announcement({ course: courseId, message });
        await announcement.save();
        course.announcements.push(announcement);
        await course.save();
        res.json(announcement);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};