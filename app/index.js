const express = require('express')
const app = express()

app.get('/', (req, res) => {
    res.status(200).json({
        "code": 200,
        "msg": "ok",
    })
})

app.listen(3000, () => {
    console.log("server up and running on port 3000")
})