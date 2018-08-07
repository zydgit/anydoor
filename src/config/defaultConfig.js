module.exports = {
  root: process.cwd(),
  port: 8888,
  hostname: '127.0.0.1', 
  compress: /\.(html|js|css|md)/,

  cache: {
    expires: true, 
    maxAge: 600, // 单位秒，cache-control的时间
    cacheControl:true, 
    lastModified: true,
    etag: true
    
  }
}