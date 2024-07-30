const express = require('express')
const morgan = require('morgan')
const projectRoute = require("./routes/project.route.js")
const taskRoute = require("./routes/task.route.js")
const config = require('./configs/config.js')
const { default: mongoose } = require('mongoose')

const app = express()

// database connection
mongoose.connect(config.mongodb.db_uri)
.then(() => {
    console.log("MongoDB - Database connected successfully!")
})
.catch(() => {
    console.log("MongoDB - Connection failed!")
    process.exit(1)
})

// middleware
app.use(express.json())
app.use(morgan('common'))  // standard Apache common log output

// routes
app.use("/api/projects", projectRoute)
app.use("/api/tasks", taskRoute)

app.listen(3000, () => {
    console.log("server up and running on port 3000")
})