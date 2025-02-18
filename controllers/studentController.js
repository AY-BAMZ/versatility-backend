const Course = require('../models/Course');
const User = require('../models/User');

// Register for Course
exports.registerCourse = async (req, res) => {
    const { courseId } = req.body;
    try {
        const course = await Course.findById(courseId);
        const student = await User.findById(req.user.id);
        if (!course || !student) return res.status(404).json({ msg: 'Course or Student not found' });

        course.students.push(student.id);
        student.courses.push(course.id);
        await course.save();
        await student.save();
        res.json(course);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Submit Task
exports.submitTask = async (req, res) => {
    const { taskId, submission } = req.body;
    try {
        const task = await Task.findById(taskId);
        if (!task) return res.status(404).json({ msg: 'Task not found' });

        task.submissions.push({ student: req.user.id, submission });
        await task.save();
        res.json(task);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// View Class Details
exports.viewClassDetails = async (req, res) => {
    const { classId } = req.params;
    try {
        const classDetails = await Class.findById(classId).populate('course');
        if (!classDetails) return res.status(404).json({ msg: 'Class not found' });
        res.json(classDetails);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};