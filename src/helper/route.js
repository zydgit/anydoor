const fs = require('fs')
const path = require('path')
const Handlebars = require('handlebars')
const promisify = require('util').promisify
const stat = promisify(fs.stat)
const readdir = promisify(fs.readdir)
const config = require('../config/defaultConfig')
const source = fs.readFileSync(path.join(__dirname,'../template/dir.tpl'))
const template = Handlebars.compile(source.toString())
const mime = require('./mime.js')
const compress = require('./compress')

module.exports = async function (req, res, filePath) {
  try {
    const stats = await stat(filePath)
    
    if (stats.isFile()) {
      // res.writeHead(200, { 'Content-Type': mime(filePath) })
      
      res.statusCode = 200
      res.setHeader('Content-Type', mime(filePath))
      let rs = fs.createReadStream(filePath)
      if(filePath.match(config.compress)) {
        rs = compress(rs, req, res)
      }
    
      rs.pipe(res)
    } else if (stats.isDirectory()) {
      const files = await readdir(filePath)
      const dir = path.relative(config.root, filePath)
      res.writeHead(200, { 'Content-Type': 'text/html' })
      const data = {
        files:files.map((file) => {
          return {
            file,
            icon: mime(file)
          }
        }),
        titile: path.basename(filePath),
        dir: dir ? `/${dir}` : ''
      }
      
      res.end(template(data))
    }

  } catch(ex) {
    console.error(ex) 
    res.writeHead(404, { 'Content-Type': 'text/plain' })
    res.end(`${filePath} is not a directory`)
  }
}