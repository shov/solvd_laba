'use strict'

const net = require('net')

const server = net.createServer(socket => {
    console.log('incoming connection')
    socket.on('data', data => {
        if (/^GET \/\s/.test(data.toString().trim())) {
            socket.end("HTTP/1.0 200 OK\n\r" +
                "Date: Mon, 05 Jul 2021 19:09:32 GMT\n\r" +
                "Expires: -1\n\r" +
                "Cache-Control: private, max-age=0\n\r" +
                "Content-Type: text/html; charset=utf-8\n\r"
                + "\n\r"
                + `<html>
<body>
<h1>HELLO! ✌️</h1>
</body>
</html>`)
        }


        if (/^GET \/-?\d+\/-?\d+/.test(data.toString().trim())) {
            const ab = data.toString().trim()
                .split('\n')[0]
                .trim()
                .replace(/^GET\s+\/(-?\d+)\/(-?\d+)(.*)$/, '$1Q$2')
                .split('Q')

            const result = {sum: Number(ab[0]) + Number(ab[1])}
            const jsonResult = JSON.stringify(result)

            socket.end("HTTP/1.0 200 OK\n\r" +
                "Content-Type: application/json\n\r" +
                `Content-Length: ${jsonResult.length+1}\n\r`
                + "\n\r"
                + `${jsonResult}`)
        }
    })

})

server.listen(8080, 'localhost', () => {
    console.log('Listening')
})

server.on('error', e => {
    console.error('Err', e)
})

server.on('close', () => {
    console.log('Server closed')
})