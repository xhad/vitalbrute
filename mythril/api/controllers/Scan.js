const { spawn } = require('child_process')
const fileUpload = require('express-fileupload')


class Scan {
  constructor(source) {
    this.source = source
  }

  file(source) {
    return new Promise((resolve, reject) => {
			const child = spawn('myth', ['-x', '-type', 'f'])
      process.stdin.pipe(child.stdin)

        child.stdout.on('data', data => {
					console.log(`scan results:\n${data}`)
					resolve(data)
        })
      })
    }
}

module.exports = Scan