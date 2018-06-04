require('dotenv').config()


const config = {
    host: process.env.HOST || '0.0.0.0',
    port: process.env.PORT || 4000
}

module.exports = config
