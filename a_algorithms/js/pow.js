function assert(a) {
  if (a !== true) {
    throw new Error(`Assertation failed!`)
  }
}

const LOG = false
function log(...a) {
  !LOG || console.log(...a)
}

function powOn(x, n) {
	return n == 0 ? 1 : new Array(  Math.floor(n)  )
				.fill(x)
.reduce((acc, _) => acc * x)
}

assert(powOn(2, 0)  === Math.pow(2, 0))
assert(powOn(2, 1)  === Math.pow(2, 1))
assert(powOn(2, 4)  === Math.pow(2, 4))
assert(powOn(10, 2) === Math.pow(10, 2))
assert(powOn(3, 3)  === Math.pow(3, 3))

function powSq(x, n) {
  let result = 1
  let xInPowOf2 = x

  log(`init n=0b${n.toString(2)}`)
  log(`init r=${result}`)
  log(`init p2=${xInPowOf2}`)


  while (n > 0) {
    log('')

    if (n & 1) {
      result *= xInPowOf2
      log(`n & 1 r=${result}`)
    }

    xInPowOf2 *= xInPowOf2
    log(`p2=${xInPowOf2}`)
    n = n >> 1 //or n /= 2
    log(`n >> =0b${n.toString(2)}`)
  }

  log('')
  log(`Done, res = ${result}`)
  return result
}
//console.log(powSq(3, 13))
assert(powSq(2, 0)  === Math.pow(2, 0))
assert(powSq(2, 1)  === Math.pow(2, 1))
assert(powSq(2, 4)  === Math.pow(2, 4))
assert(powSq(10, 2) === Math.pow(10, 2))
assert(powSq(3, 3)  === Math.pow(3, 3))

console.log(`Done`)