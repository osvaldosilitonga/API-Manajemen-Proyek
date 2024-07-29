const Project = require("../models/project.model")

const { check, validationResult } = require('express-validator')

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

        result = {
            "code": 200,
            "msg": "created",
            "data": {
                "id": project["_id"],
                "name": project["name"],
                "created_at": project["createdAt"],
                "updated_at": project["updatedAt"]
            }
        }

        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({
            code: 500, 
            msg: error.message,
            data: null
        })
    }
}

module.exports = {
    createProject
}