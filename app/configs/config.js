require("dotenv").config();

const MONGODB_URI = process.env.MONGODB_URI;
console.log(MONGODB_URI)

const config = {
    mongodb: {
        db_uri: process.env.MONGODB_URI,
    }
}

module.exports = config