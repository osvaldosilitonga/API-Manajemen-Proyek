const mongoose = require('mongoose')

const TaskSchema = mongoose.Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    is_complete: {
        type: Boolean
    },
    start_time: {
        type: Date,
    },
    end_time: {
        type: Date,
    },
}, { timestamps: true })

module.exports = TaskSchema