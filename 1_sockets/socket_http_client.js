'use strict'

const net = require('net');
const client = new net.Socket();

const host = 'localhost'
const port = 8080
const body = `{"status":true}`
let message = `POST / HTTP/1.0
Host: ${host}
Content-Type: application/json
Content-Length: ${body.length}

${body}`

client.connect(
    port,
    host,
    () => {
        console.log(`Request:\n${message}`);
        client.write(message);
    }
);

client.on('data', data => {
    console.log(`\n\n${data}`);
});