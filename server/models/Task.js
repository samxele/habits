const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    },
    name: {
        type: String, 
        required: true,
        trim: true
    },
    habit: {
        type: Boolean,
        default: false
    },
    completed: {
        type: Boolean, 
        default: false
    },
    date: {
        type: Date, 
        default: Date.now
    }
});

module.exports = mongoose.model('Task', TaskSchema);