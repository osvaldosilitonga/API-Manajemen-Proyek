const express = require('express')
const { updateTask } = require("../controllers/task.controller.js")

const router = express.Router()

const { check } = require('express-validator')

/** Update task with ID */
router.put("/:id", [
    check('title')
        .notEmpty().withMessage('title cannot be empty')
        .isLength({ min: 3 }).withMessage("title must be at least 3 characters"),
    check('description')
        .notEmpty().withMessage('description cannot be empty')
        .isLength({ min: 5 }).withMessage('description must be at least 5 characters'),
    check('start_time')
        .notEmpty().withMessage('start time cannot be empty')
        .isISO8601().withMessage('time must be using ISO8601 format'),
    check('end_time')
        .notEmpty().withMessage('end time cannot be empty')
        .isISO8601().withMessage('time must be using ISO8601 format'),
], updateTask)

module.exports = router