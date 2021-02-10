const http = require('http')
const primes = require('./primes')
const {
  Worker, isMainThread, parentPort, workerData
} = require('worker_threads')

http
  .createServer(frontController)
  .listen(5000, () => {
    console.log('Start listening!')
  })

const arr = []

async function frontController(req, res) {
  const uni = `${req.method} ${req.url}`
  console.log(`receive a request! ${uni}`)
  const id = arr.push(uni)

  if (uni === 'GET /prime') {
    console.log(primes())

  } else if (uni === 'GET /wprime') {
    console.log(await primesWorker())

  } else if (uni === 'GET /aprime') {
    console.log(await primesAsync())

  } else if (uni === 'GET /ps') {
    await promiseSeq()

  } else if (uni === 'GET /pa') {
    await promiseAll()

  } else if (uni === 'GET /imm') {
    setImmediate(() => {
      console.log('setImmediate')
    })
  } else if (uni === 'GET /tick') {
    process.nextTick(() => {
      console.log('next Tick')
    })
  } else {

    const printer = id % 2 === 0 ? printBy2Letters : printByLetter
    await printer(id, `${req.url}`)
  }

  res.statusCode = 200
  res.end()
  console.log(`response sent! ${req.method} ${req.url}`)
}

async function promiseSeq() {
  const start = +new Date()

  await new Promise(r => setTimeout(() => {
    console.log(1)
    r()
  }, 1000))
  await new Promise(r => setTimeout(() => {
    console.log(2)
    r()
  }, 1000))
  await new Promise(r => setTimeout(() => {
    console.log(3)
    r()
  }, 1000))

  const took = (+new Date() - start) / 1000
  console.log(`Took ${took} s`)
}

async function promiseAll() {
  const start = +new Date()
  await Promise.all([
    new Promise(r => setTimeout(() => {
      console.log(1)
      r()
    }, 1000)),
    new Promise(r => setTimeout(() => {
      console.log(2)
      r()
    }, 1000)),
    new Promise(r => setTimeout(() => {
      console.log(3)
      r()
    }, 1000)),
  ])

  const took = (+new Date() - start) / 1000
  console.log(`Took ${took} s`)
}

async function printByLetter(id, text) {
  for (let i = 0; i < text.length; i++) {
    console.log(`${id} [${text[i]}]`)
    await new Promise(r => setTimeout(r, 500))
  }
}

async function printBy2Letters(id, text) {
  for (let i = 0; i < text.length; i++) {
    console.log(`${id} [${text[i]}]`)
    if (i % 2 === 0)
      await new Promise(r => setTimeout(r, 500))
  }
}

async function primesAsync() {
  return await new Promise((resolve, reject) => {
    resolve(primes())
  })
}

async function primesWorker() {
  return await new Promise((resolve, reject) => {
    const worker = new Worker(require('path').resolve(__dirname, 'primes.js'))
    worker.on('error', (e) => {
      reject(e)
    })

    worker.on('message', message => {
      resolve(message)
    })
  })
}
