const mongoose = require('mongoose');

const ClassSchema = new mongoose.Schema({
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
    date: { type: Date, required: true },
    duration: { type: Number, required: true },
    topic: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Class', ClassSchema);