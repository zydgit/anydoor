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
const range = require('./range')
const isFresh = require('./cache')

module.exports = async function (req, res, filePath) {
  try {
    const stats = await stat(filePath)
    
    if (stats.isFile()) {
      // res.writeHead(200, { 'Content-Type': mime(filePath) })
      
      
      res.setHeader('Content-Type', mime(filePath).mime)

      if(isFresh(stats, req, res)){
        res.statusCode = 304
        res.end()
        return 
      }

      let rs
      const {code, start, end} = range(stats.size, req, res)

      if(code === 200){
        res.statusCode = 200
        // 这里不能给图片资源采用utf-8编码
        // rs = fs.createReadStream(filePath, {encoding: 'utf8'})
        rs = fs.createReadStream(filePath)
      } else {
        res.statusCode = 206
        rs = fs.createReadStream(filePath, {start, end})
      }
  

      if(filePath.match(config.compress)) {
        rs = compress(rs, req, res)
      }
    
      rs.pipe(res)
    } else if (stats.isDirectory()) {
      const files = await readdir(filePath)
      const dir = path.relative(config.root, filePath)

      let prevDir = dir.replace(/\\/g, '/').split('/')
      if(prevDir){
        prevDir.pop()
        prevDir = prevDir.join('/')
      } 

      res.writeHead(200, { 'Content-Type': 'text/html' })
      const data = {
        files:files.map((file) => {
          let filename = `${filePath}/${file}`
          return {
            file,
            icon:path.relative(filePath.replace('src', ''), path.resolve(__dirname,`../static/images/${mime(file, filename).icon}`))
          }
        }),
        titile: path.basename(filePath),
        dir: dir ? `/${dir}` : '',
        prevDir: `/${prevDir}`
      }
      res.end(template(data))
    }

  } catch(ex) {
    console.error(ex) 
    res.writeHead(404, { 'Content-Type': 'text/plain' })
    res.end(ex)
  }
}