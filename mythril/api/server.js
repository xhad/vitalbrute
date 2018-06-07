const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const config = require('./config')
const helmet = require('helmet')
const formidable = require('formidable')
const fs = require('fs')

const path  = require('path')
const app = new express()

const scan = require('./controllers/Scan')

app.use(morgan('combined'))
app.use(helmet())
app.use(bodyParser.json())
app.get('/source', (req, res) => {
    const scan = new Scan(req.body.source)
    res.send('VITALBRUTE')
})

app.use('/', express.static(path.join(__dirname + '/app')))

app.post('/file', (req, res, next) => {
  if (req.url == '/file' && req.method.toLowerCase() == 'post') {

    var form = new formidable.IncomingForm();
    form.uploadDir = "./contracts"
    
    form.parse(req, function(err, fields, files) {
      let contract = files.text.path
      scan(contract, 10).then(results => res.json(results))
    })
 
    return
  }
})

app.listen(config.port, config.host, () => {
    console.log('Server started on port', config.port)
})