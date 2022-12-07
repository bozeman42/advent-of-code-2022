const path = require('path')
const { readInput } = require('../util')

const inputString = readInput(path.resolve(__dirname, 'input.txt')).trim()

function processString(string, packetSize) {
    let position = 0
    while(!testPosition(string, position, packetSize) && position < string.length) {
        position++
    }
    return testPosition(string, position, packetSize) ? position + packetSize : 'Failure'
}

function testPosition(string, position, packetSize) {
    const packet = string.substring(position, position + packetSize).split('')
    console.log(packet)
    const map = {}
    for (let x = 0; x < packetSize; x++) {
        if (map[packet[x]]) return false
        map[packet[x]] = true
    }
    return true
}
console.time('day 6')
const result = processString(inputString, 4)
console.timeEnd('day 6')
console.log(result)