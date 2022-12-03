const path = require('path')
const { readInput } = require('../util')

const inputString = readInput(path.resolve(__dirname, 'input.txt'))

const elves = inputString
    .trim()
    .split('\n\n')
    .map(elfString => {
        return elfString
            .split('\n')
            .map(foodItemString => {
                return parseInt(foodItemString)
            })
    })

const totals = elves.map(elf => elf.reduce((a, b) => a + b))

console.log('Part 1:', Math.max(...totals))

const result2 = totals.reduce((t3, elf) => {
        return testTopThree(elf, t3)
    }, [0,0,0])
    .reduce((total, item) => total + item)


function testTopThree(value, topThree) {
    const test = [...topThree, value].sort((a, b) => b - a)
    test.pop()
    return test
}

console.log('Part 2:',result2)