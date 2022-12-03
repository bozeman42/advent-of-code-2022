const path = require('path')
const { readInput } = require('../util')

const inputString = readInput(path.resolve(__dirname, 'input.txt')).trim()

const itemPrioritiesTotal = inputString
  .split('\n')
  .reduce((total, sack) => {
    const size = sack.length
    const compartmentA = sack.substring(0, sack.length / 2)
    const compartmentB = sack.substring(sack.length / 2)
    let map = compartmentA.split('').reduce((mapA, letter) => {
      return {
        ...mapA,
        [letter]: true
      }
    }, {})
    for(let x = 0; x < compartmentB.length; x++) {
      let letter = compartmentB[x]
      if (map[letter]) {

        return total + getPriority(letter)
      }
    }
  }, 0)

console.log(itemPrioritiesTotal)

const sacks = inputString.split('\n')

let groups = []

while(sacks.length) {
  groups.push(sacks.splice(0, 3))
}

const groupBadgeTotals = groups.reduce((total, group) => {
  const map0 = generateStringMap(group[0])
  const map1 = generateStringMap(group[1])
  for (let x = 0; x < group[2].length; x++) {
    let letter = group[2][x]
    if (map0[letter] && map1[letter]) {
      return total + getPriority(letter)
    }
  }
}, 0)

console.log(groupBadgeTotals)

function generateStringMap(string) {
  return string.split('').reduce((map, letter) => ({
    ...map,
    [letter]: true
  }), {})
}

function getPriority(letter) {
  let offset = /[a-z]/.test(letter) ? 96 : 38
  return letter.charCodeAt(0) - offset
}