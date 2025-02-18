const Class = require('../models/Class');
const Task = require('../models/Task');

// Schedule Class
exports.scheduleClass = async (req, res) => {
    const { courseId, date, duration, topic } = req.body;
    try {
        const newClass = new Class({ course: courseId, date, duration, topic });
        await newClass.save();
        res.json(newClass);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Create Task
exports.createTask = async (req, res) => {
    const { courseId, title, description, dueDate } = req.body;
    try {
        const task = new Task({ course: courseId, title, description, dueDate });
        await task.save();
        res.json(task);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Grade Student
exports.gradeStudent = async (req, res) => {
    const { taskId, studentId, grade } = req.body;
    try {
        const task = await Task.findById(taskId);
        if (!task) return res.status(404).json({ msg: 'Task not found' });

        const submission = task.submissions.find(sub => sub.student.toString() === studentId);
        if (!submission) return res.status(404).json({ msg: 'Submission not found' });

        submission.grade = grade;
        await task.save();
        res.json(task);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};