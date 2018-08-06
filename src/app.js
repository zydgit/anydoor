const http = require('http')
const chalk = require('chalk')
const path = require('path')
const config = require('./config/defaultConfig')
const route = require('./helper/route')
async function onRequest(req, res) {
  const filePath = path.join(config.root, req.url)
  route(req, res, filePath)
}

http.createServer(onRequest).listen(config.port, config.hostname, () => {
  const address = `http://${config.hostname}:${config.port}`

  console.log(`Server running of the ${chalk.green(address)}`)
})