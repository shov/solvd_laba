'use strict'

const http = require('http')
const {URL} = require('url')

const httpServer = http.createServer(async (req, res) => {
    //receive data
    let data = ''
    await new Promise(r => {
        req.on('data', chunk => {
            data += chunk
        })
        req.on('end', r)
    })

    const urlInfo = new URL(req.url, `http://${req.headers.host}`)
    let body = {}

    //Routing to sum
    const exp = /^\/sum\/-?\d+\/-?\d+$/
    if (exp.test(urlInfo.pathname)) {
        let [, , a, b] = urlInfo.pathname.split('/')
        body = {sum: (+a) + (+b)}
    }


    res.writeHead(200, {'Content-type': 'application/json'})
    res.end(JSON.stringify(body))
})

httpServer.listen(8080, 'localhost', () => {
    console.log('Listening HTTP')
})
