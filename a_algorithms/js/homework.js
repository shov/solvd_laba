const data = require('./MOCK_DATA').sort((a, b) => a - b)

function straightSearch(arr, needle) {
  for (let i = 0; i < arr.length; i++) {
    if (needle === arr[i]) {
      return i
    }
  }

  return -1
}

function binSearch(arr, needle) {
  let first = 0
  let last = arr.length

  let mid

  while (first < last) {
    mid = ~~((first + last) / 2)

    if (needle <= arr[mid]) {
      last = mid
      continue
    }

    first = mid + 1
  }

  return arr.length === 0 || arr[first] === needle ? first : -1
}

const needleList = [
  'd462bb76-81ee-46af-9fdb-ebfe53a93d3f',
  '6df55f86-e3f5-4d7b-9cd5-906d8d7e804a',
  '1e63459f-0b18-4acf-9afc-e7287347bbeb',
  'e04b6074-332f-4661-8f3a-4cdcb3adfb6a',
  'be77abf7-29b0-4ed1-9379-f5d7576cb5ce',
  '3c511860-d159-457d-8374-e8205904e6f5',
  '1e63459f-0b18-4acf-9afc-e7287347bbeb',
  'e04b6074-332f-4661-8f3a-4cdcb3adfb6a',
  '9c4a0320-1d82-4a46-83b3-511ddffb7ee6',
  '1e63459f-0b18-4acf-9afc-e7287347bbeb',
  'e04b6074-332f-4661-8f3a-4cdcb3adfb6a',
  'be77abf7-29b0-4ed1-9379-f5d7576cb5ce',
  '3c511860-d159-457d-8374-e8205904e6f5',
  '1e63459f-0b18-4acf-9afc-e7287347bbeb',
  'd462bb76-81ee-46af-9fdb-ebfe53a93d3f',
  '6df55f86-e3f5-4d7b-9cd5-906d8d7e804a',
  '1e63459f-0b18-4acf-9afc-e7287347bbeb',
]

const tookList = []

;[straightSearch, binSearch].forEach(searchEngine => {
  const start = process.hrtime()
  for (let needle of needleList) {
    searchEngine(data, needle)
  }

  const took = process.hrtime(start)
  tookList.push({searchEngine: searchEngine.name, took: ~~((took[0] * 10000 + took[1]) / needleList.length)})
})

console.table(tookList.sort((a, b) => a.took - b.took))

