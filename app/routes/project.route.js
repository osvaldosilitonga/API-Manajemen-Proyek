const express = require('express')
const { createProject, getAllProject } = require("../controllers/project.controller.js")

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

module.exports = router