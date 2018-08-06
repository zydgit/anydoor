const path = require('path')

const mimeTypes = {
  'css': 'text/css',
  'gif': 'image/gif',
  'html': 'text/html',
  'ico': 'image/x-icon',
  'jpeg': 'image/jpeg',
  'jpg': 'image/jpg',
  'js': 'text/javascript',
  'json': 'application/json',
  'pdf': 'application/pdf',
  'png': 'image/png',
  'svg': 'image/svg+xml',
  'swf': 'application/x-shockwave-flash',
  'tiff': 'image/tiff',
  'txt': 'text/plain',
  'wav': 'audio/x-wav',
  'wma': 'audio/xms-wma',
  'wmv': 'video/x-ms-wmv',
  'xml': 'text/xml'
}


module.exports = (filePath) => {
  let ext = path.extname(filePath)
    .split('.')
    .pop()
    .toLowerCase()
  

  ext = ext ? ext : filePath

  return mimeTypes[ext] || mimeTypes['txt']
}