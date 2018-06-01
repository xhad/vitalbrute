require('dotenv').config()


const config = {
    host: process.env.HOST || '127.0.0.1',
    port: process.env.PORT || 8080
}

module.exports = config