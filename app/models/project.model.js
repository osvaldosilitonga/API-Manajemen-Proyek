const mongoose = require('mongoose')
const taskSchema = require('./task.model')

const ProjectSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter project name"]
    },
    description: {
        type: String,
        required: [true, "Please enter project description"],
    },
    tasks: [taskSchema],
}, { timestamps: true })

const Project = mongoose.model("Project", ProjectSchema)

module.exports = Project