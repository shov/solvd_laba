const http = require('http')


http
  .createServer(frontController)
  .listen(5000, () => {
  console.log('Start listening!')
})

const arr = []

async function frontController(req, res) {
  console.log(`receive a request! ${req.method} ${req.url}`)
  const id = arr.push(`${req.method} ${req.url}`)

  await printByLetter(id, `${req.url}`)
  res.statusCode = 200
  res.end()
  console.log(`response sent! ${req.method} ${req.url}`)
}

async function printByLetter(id, text) {
  for(let i = 0; i < text.length; i++) {
    console.log(`${id} [${text[i]}]`)
    await new Promise(r => setTimeout(r, 500))
  }
}
