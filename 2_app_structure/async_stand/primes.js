const {
  Worker, isMainThread, parentPort, workerData
} = require('worker_threads')

function primes() {
  let resStr = ''
  let n = 3
  while (resStr.length < 100000) {
    let prime = true
    for (let i = 2; i < n; i++) {
      if (n % i === 0) {
        prime = false
        break
      }
    }
    if (prime) {
      resStr += `${n},`
    }
    n++
  }
  return resStr
}

if (!isMainThread) {
  const result = primes()
  parentPort.postMessage(result)
}

module.exports = primes
