const path = require('path')
const fs = require('fs')

const mimeTypes = {
  'css': {
   mime:'text/css;charset=utf-8',
   icon: 'css.png'
  },
  'gif': {
    mime:'image/gif',
    icon: 'image.png'
  },
  'html': {
    mime:'text/html',
    icon: 'html.png'
  },
  'ico': {
    mime:'image/x-icon',
    icon: 'image.png'
  },
  'jpeg': {
    mime:'image/jpeg',
    icon: 'image.png'
  },
  'jpg': {
    mime: 'image/jpg',
    icon: 'image.jpg'
  },
  'js': {
    mime: 'text/javascript;charset=utf-8',
    icon: 'text.png'
  },
  'json': {
    mime: 'application/json',
    icon: 'text.png'
  },
  'pdf': {
    mime: 'application/pdf',
    icon: 'pdf.png'
  },
  'png': {
    mime: 'image/png',
    icon: 'image.png'
  },
  'svg': {
    mime: 'image/svg+xml',
    icon: 'fileicon_bg.png'
  },
  'swf': {
    mime: 'application/x-shockwave-flash',
    icon: 'flash.png'
  },
  'tiff': {
    mime: 'image/tiff',
    icon: 'fileicon_bg.png'
  },
  'txt': {
    mime: 'text/plain;charset=utf-8',
    icon: 'text.png'
  },
  'wav': {
    mime: 'audio/x-wav',
    icon: 'fileicon_bg.png'
  },
  'wma': {
    mime: 'audio/xms-wma',
    icon: 'fileicon_bg.png'
  },
  'wmv': {
    mime: 'video/x-ms-wmv',
    icon: 'fileicon_bg.png'
  },
  'xml': {
    mime: 'text/xml',
    icon: 'fileicon_bg.png'
  },
  'dir': {
    mime: '',
    icon: 'folder.png'
  }
}


module.exports = (filePath, filename) => {
  let ext = path.extname(filePath)
    .split('.')
    .pop()
    .toLowerCase()
  
  if(filename) {
    const stats = fs.statSync(filename)
    ext = stats.isDirectory() ? 'dir' : (ext ? ext : filePath)
  }else {
    ext = ext ? ext : filePath
  }



  return mimeTypes[ext] || mimeTypes['txt']
}