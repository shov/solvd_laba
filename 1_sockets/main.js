'use strict'

const net = require("net");
const client = new net.Socket();

const host = 'www.example.com'
const port = 80
const body = `GET / HTTP/1.0
Host: ${host}

`

client.connect(
    port,
    host,
    () => {
        console.log(`Request:\n${body}`);
        client.write(body);
    }
);

client.on("data", function(data) {
    console.log("\n\n" + data);
});