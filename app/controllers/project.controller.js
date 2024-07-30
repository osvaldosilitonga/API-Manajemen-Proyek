const moment = require('moment')
const ProjectsResponseDTO = require("../dto/project.dto")
const Project = require("../models/project.model")

const { validationResult } = require('express-validator')
const TasksResponseDTO = require('../dto/task.dto')

/* Create new project */
const createProject = async (req, res) => {
    const err = validationResult(req)
    if (!err.isEmpty()) {
        return res.status(400).json({
            code: 400,
            msg: err.array(),
            data: null
        })
    }

    try {
        const { name, description } = req.body

        const project = new Project({name, description})
        await Project.create(project)

        // map to response dto
        projectResponse = new ProjectsResponseDTO(project)

        res.status(200).json({
            code: 200,
            msg: "created",
            data: projectResponse
        })
    } catch (error) {
        res.status(500).json({
            code: 500, 
            msg: error.message,
            data: null
        })
    }
}

/* Get all projects */
const getAllProject = async (req, res) => {
    try {
        const projects = await Project.find({})

        // check if data empty
        if (projects.length === 0) {
            return res.status(404).json({
                code: 404, 
                msg: "project not found",
                data: null
            })
        }

        // map to response dto
        const projectsResponse = projects.map(project => new ProjectsResponseDTO(project))

        return res.status(200).json({
            code: 200,
            msg: "ok",
            data: projectsResponse
        })

    } catch (error) {
        res.status(500).json({
            code: 500, 
            msg: error.message,
            data: null
        })
    }
}

/** Get project by ID */
const findById = async (req, res) => {
    try {
        const { id } = req.params

        const project = await Project.findById(id)
        if (!project) {
            return res.status(404).json({
                code: 404, 
                msg: "project not found",
                data: null
            })
        }

        // map to response dto
        const projectsResponse =new ProjectsResponseDTO(project)
        return res.status(200).json({
            code: 200,
            msg: "ok",
            data: projectsResponse
        })

    } catch (error) {
        res.status(500).json({
            code: 500, 
            msg: error.message,
            data: null
        })
    }
}

/** Update project by ID */
const updateProject = async (req, res) => {
    // Request validation
    const err = validationResult(req)
    if (!err.isEmpty()) {
        return res.status(400).json({
            code: 400,
            msg: err.array(),
            data: null
        })
    }

    try {
        const { id } = req.params
        const { name, description } = req.body

        const update = await Project.findByIdAndUpdate(id, { name, description })
        if (!update) {
            return res.status(404).json({
                code: 404, 
                msg: "project not found",
                data: null
            })
        }

        const project = await Project.findById(id)  // retrieve updated data
        projectResponse = new ProjectsResponseDTO(project)  // map to response DTO

        return res.status(200).json({
            code: 200,
            msg: "project updated successfully",
            data: projectResponse
        })
    } catch (error) {
        res.status(500).json({
            code: 500, 
            msg: error.message,
            data: null
        })
    }
}

/** Delete project by ID */
const deleteProject = async (req, res) => {
    try {
        const { id } = req.params

        const project = await Project.findByIdAndDelete(id)
        if (!project) {
            return res.status(404).json({
                code: 404, 
                msg: "project not found",
                data: null
            })
        }

        projectResponse = new ProjectsResponseDTO(project)  // map to response DTO
        return res.status(200).json({
            code: 200,
            msg: "project deleted successfully",
            data: projectResponse
        })

    } catch (error) {
        res.status(500).json({
            code: 500, 
            msg: error.message,
            data: null
        })
    }
}

/** Create new project task */
const createProjectTask = async (req, res) => {
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
        const project = await Project.findById(id)
        if (!project) {
            return res.status(404).json({
                code: 404,
                msg: 'Project not found',
                data: null
            })
        }

        // check schedule availability
        const hasConflict = project.tasks.some(task => {
            return (
                moment(start_time).isBetween(task.start_time, task.end_time, null, '[]') ||
                moment(end_time).isBetween(task.start_time, task.end_time, null, '[]') ||
                moment(task.start_time).isBetween(start_time, end_time, null, '[]') ||
                moment(task.end_time).isBetween(start_time, end_time, null, '[]')
            )
        })

        if (hasConflict) {
            return res.status(400).json({
                code: 400,
                msg: 'task schedule conflicts with existing tasks',
                data: null
            })
        }

        // add new task
        project.tasks.push({
            title,
            description,
            start_time,
            end_time,
            is_complete: false
        })
        await project.save()

        const savedTask = project.tasks[project.tasks.length - 1]  // retrieve the last added data
        const taskResponse = new TasksResponseDTO(savedTask)

        res.status(201).json({
            code: 201,
            msg: 'Task added successfully',
            data: taskResponse
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
    createProject,
    getAllProject,
    findById,
    updateProject,
    deleteProject,
    createProjectTask,
}