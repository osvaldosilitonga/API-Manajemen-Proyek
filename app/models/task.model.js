const mongoose = require('mongoose')

const TaskSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please enter task title"]
    },
    description: {
        type: String,
        required: [true, "Please enter task description"],
    },
    is_complete: {
        type: Boolean
    },
    start_time: {
        type: Date,
        required: [true, "Please enter start time"],
    },
    end_time: {
        type: Date,
        required: [true, "Please enter end time"],
    },
}, { timestamps: true })

module.exports = TaskSchema