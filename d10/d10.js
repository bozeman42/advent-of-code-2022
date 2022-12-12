const path = require('path')
const { readInput } = require('../util')

const inputString = readInput(path.resolve(__dirname, 'input.txt')).trim()

// const inputString = `noop
// addx 3
// addx -5`

const commands = inputString.split('\n').map(line => {
    const [command, valStr] = line.split(' ')
    let value = valStr ? parseInt(valStr) : 0
    return {
        command,
        processTime: command === 'noop' ? 1 : 2,
        value
    }
})

let cycle = 0
let register = 1
let currentCommand = null
const strengths = []
let screen = [[],[],[],[],[],[]]
commands.reverse()

while (commands.length || currentCommand) {
    cycle++
    if (!currentCommand) {
        currentCommand = commands.pop()
    }
    currentCommand.processTime--
    // if ((cycle - 20) % 40 === 0) {
    //     strengths.push(register * cycle)
    // }
    console.log(cycle, cycle / 40)
    let row = Math.floor((cycle - 1) / 40)

    let column = (cycle - 1) % 40
    let sprite = [register - 1, register, register + 1]
    screen[row][column] = sprite.includes(column) ? '#' : ' '

    if (currentCommand.processTime === 0) {
        register += currentCommand.value
        currentCommand = null
    }
    // console.table({ cycle, register, currentCommand })
}

const display = screen.map(line => line.join('')).join('\n')

console.log(display)
