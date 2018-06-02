const { exec } = require('child_process')
const fileUpload = require('express-fileupload')

function scan(path, depth) {
	console.log('scanning ', path)
	return new Promise((resolve, reject) => {
		try {
			const cmd = `myth -x /mythril/api/${path} -o json --max-depth ${depth}`
			const child = exec(cmd) 
			child.on('error', console.log)
			child.stdout.on('data', data => {
				console.log(`scan results:\n${data}`)
				resolve(data)
			})
			child.on('message', console.log)
			child.on('exit', function (code, signal) {
				console.log('child process exited with ' +
										`code ${code} and signal ${signal}`)
			})
		} catch(err) {
			console.log(err)
		}
	})
}


module.exports = scan