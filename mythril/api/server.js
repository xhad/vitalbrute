const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const config = require('./config')
const helmet = require('helmet')
const formidable = require('formidable')
const fs = require('fs')

const path  = require('path')
const util = require('util')
const app = new express()

const Scan = require('./controllers/Scan')
var host = "127.0.0.1";
var port = 8080;

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
    // parse a file upload
    var form = new formidable.IncomingForm();
    form.uploadDir = "./contracts";
    
    form.parse(req, function(err, fields, files) {
      res.writeHead(200, {'content-type': 'text/plain'});
      res.write(`received contract successfully`);
      res.end(() => {
          console.log(files)
          util.inspect({fields: fields, files: files})
      });
    });
 
    return;
  }
})

app.listen(config.port, config.host, () => {
    console.log('Server started on port', config.port)
});