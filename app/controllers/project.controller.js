const ProjectsResponseDTO = require("../dto/project.dto")
const Project = require("../models/project.model")

const { validationResult } = require('express-validator')

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

module.exports = {
    createProject,
    getAllProject
}