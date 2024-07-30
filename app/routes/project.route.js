const express = require('express')
const { createProject, getAllProject, findById, updateProject, deleteProject, createProjectTask } = require("../controllers/project.controller.js")

const { check } = require('express-validator')
const router = express.Router()

/** Create new project route */
router.post("/", [
    // request validation
    check('name')
        .notEmpty().withMessage('name cannot be empty')
        .isLength({ min: 3 }).withMessage("name must be at least 3 characters"),
    check('description')
        .notEmpty().withMessage('description cannot be empty')
        .isLength({ min: 5 }).withMessage('description must be at least 5 characters'),
], createProject)

/** Get all project route */
router.get("/", getAllProject)

/** Get project by ID route */
router.get("/:id", findById)

/** Update project by ID route */
router.put("/:id", [
    // request validation
    check('name')
        .optional()
        .isLength({ min: 3 }).withMessage("name must be at least 3 characters"),
    check('description')
        .optional()
        .isLength({ min: 5 }).withMessage('description must be at least 5 characters'),
], updateProject)

/** Delete project by ID route */
router.delete("/:id", deleteProject)

/** Create new project task */
router.post("/:id/tasks", [
    check('title')
        .notEmpty().withMessage('title cannot be empty')
        .isLength({ min: 3 }).withMessage("name must be at least 3 characters"),
    check('description')
        .notEmpty().withMessage('title cannot be empty')
        .isLength({ min: 5 }).withMessage('description must be at least 5 characters'),
    check('start_time')
        .notEmpty().withMessage('start time cannot be empty')
        .isISO8601().withMessage('time must be using ISO8601 format'),
    check('end_time')
        .notEmpty().withMessage('end time cannot be empty')
        .isISO8601().withMessage('time must be using ISO8601 format'),
], createProjectTask)

module.exports = router