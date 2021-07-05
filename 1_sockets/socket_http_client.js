'use strict'

const net = require('net')

const client = new net.Socket();

client.connect(80, 'www.google.com', () => {
    client.end("GET / HTTP/1.0\n\r"
        + "Host: www.google.com\n\r"
        + "\n\r")
});

client.on('error', e => {
    console.error(e.message);
})

client.on('data', data => {
    process.stdout.write(data);
})