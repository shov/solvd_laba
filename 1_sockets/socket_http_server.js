'use strict'

const http = require('http')
const port = 8080

http.createServer(async (req, res) => {

    let data = '';
    await new Promise(r => {
        req.on('data', chunk => {
            data += chunk
        })
        req.on('end', () => {
            r()
        })
    })

    let body = '{}'

    if (data.length > 0) {
        body = JSON.stringify({receivedObject: JSON.parse(data)})
    }

    res.writeHead(200, {'Content-Type': 'application/json'})
    res.end(body)
}).listen(port, 'localhost', () => {
    console.log('Listening...')
})