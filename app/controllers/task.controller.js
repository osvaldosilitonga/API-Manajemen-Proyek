const moment = require('moment')
const Project = require("../models/project.model")

const { validationResult } = require('express-validator')
const TasksResponseDTO = require('../dto/task.dto')

const updateTask = async (req, res) => {
    const err = validationResult(req)
    if (!err.isEmpty()) {
        return res.status(400).json({
            code: 400,
            msg: err.array(),
            data: null
        })
    }

    const { id } = req.params
    const { title, description, start_time, end_time } = req.body

    if (start_time >= end_time) {
        return res.status(400).json({
            code: 400,
            msg: "end date must be greater than start date",
            data: null
        })
    }

    try {
        const project = await Project.findOne({ "tasks._id": id });
        if (!project) {
            return res.status(404).json({
                code: 404, 
                msg: "task not found",
                data: null
            });
        }

        // retrieve task from project
        const task = project.tasks.id(id);
        if (!task) {
            return res.status(404).json({
                code: 404,
                msg: 'task not found',
                data: null
            });
        }

        // check schedule availability
        const hasConflict = project.tasks.some(t => {
            return t._id.toString() !== id && (
                moment(start_time).isBetween(t.start_time, t.end_time, null, '[]') ||
                moment(end_time).isBetween(t.start_time, t.end_time, null, '[]') ||
                moment(t.start_time).isBetween(start_time, end_time, null, '[]') ||
                moment(t.end_time).isBetween(start_time, end_time, null, '[]')
            );
        });

        if (hasConflict) {
            return res.status(400).json({
                code: 400,
                msg: 'Task schedule conflicts with existing tasks',
                data: null
            });
        }

        // update task and save
        Object.assign(task, { title, description, start_time, end_time });
        await project.save();

        const taskResponse = new TasksResponseDTO(task)
        return res.status(200).json({
            code: 200,
            msg: "Task updated successfully",
            data: taskResponse
        });

    } catch (error) {
        res.status(500).json({
            code: 500, 
            msg: error.message,
            data: null
        })
    }
}

const deleteTask = async (req, res) => {
    const { id } = req.params

    try {
        const task = await Project.updateOne(
            { 'tasks._id': id },
            { $pull: { "tasks": { "_id": id } } }
        )
        if (!task) {
            return res.status(404).json({
                code: 404,
                msg: 'Project not found',
                data: null
            })
        }

        res.status(200).json({
            code: 200,
            msg: 'Task deleted successfully',
            data: null
        })
    } catch (error) {
        res.status(500).json({
            code: 500, 
            msg: error.message,
            data: null
        })
    }
}

module.exports = {
    updateTask,
    deleteTask,
}