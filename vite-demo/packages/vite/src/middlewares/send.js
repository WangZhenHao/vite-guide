const alias = {
    js: 'text/javascript',
    css: 'text/css',
    html: 'text/html',
    json: 'application/json',
  }


function send(req, res, content, type) {
    res.setHeader('Content-Type', alias[type] || type)
    res.setHeader('Cache-Control', 'no-cache')

    res.statusCode = 200
    res.end(content)
  return
}


export default send