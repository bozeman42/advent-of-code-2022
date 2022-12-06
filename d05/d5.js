const path = require('path')
const { readInput } = require('../util')

const inputString = readInput(path.resolve(__dirname, 'input.txt')).trim()

const startingCrates = [
    ['H', 'C', 'R'],
    ['B', 'J', 'H', 'L', 'S', 'F'],
    ['R', 'M', 'D', 'H', 'J', 'T', 'Q'],
    ['S', 'G', 'R', 'H', 'Z', 'B', 'J'],
    ['R', 'P', 'F', 'Z', 'T', 'D', 'C', 'B'],
    ['T','H','C','G'],
    ['S','N','V','Z','B','P','W','L'],
    ['R','J','Q','G','C'],
    ['L','D','T','R','H','P','F','S']
]

const instructions = inputString
    .split('\n')
    .map(line => line.split(' '))
    .filter(line => line[0] === 'move')
    .map(line => {
        return {
            number: parseInt(line[1]),
            from: parseInt(line[3]),
            to: parseInt(line[5])
        }
    })

const crates1 = startingCrates.map(stack => [...stack])
const crates2 = startingCrates.map(stack => [...stack])

function processInstruction(instruction) {
    const {
        number,
        from,
        to
    } = instruction
    const fromIndex = from - 1
    const toIndex = to - 1
    for (let x = 0; x < number; x++) {
        let movedCrate = crates1[fromIndex].pop()
        crates1[toIndex].push(movedCrate)
    }
}

instructions.forEach(instruction => processInstruction(instruction))

crates1.forEach(stack => console.log(stack[stack.length - 1]))

function processInstruction2(instruction) {
    const {
        number,
        from,
        to
    } = instruction
    const fromIndex = from - 1
    const toIndex = to - 1
    const movedCrates = crates2[fromIndex].splice(-number)
    crates2[toIndex] = [...crates2[toIndex], ...movedCrates]
}

instructions.forEach(instruction => processInstruction2(instruction))

console.log('Part 2', crates2)
crates2.forEach(stack => console.log(stack[stack.length - 1]))