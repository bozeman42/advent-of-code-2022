const path = require('path')
const { readInput } = require('../util')

const inputString = readInput(path.resolve(__dirname, 'input.txt')).trim()

const terminalOutput = inputString.split('\n')

function parseTerminal(terminal) {
    const terminalArray = [...terminal].reverse()
    console.log(terminalArray)
    let fileSystem = {}
    let treePosition = []
    while (terminalArray.length) {
        let line = terminalArray.pop().split(' ')
        console.log(line)
        if (line[0] === '$') {
            if (line[1] === 'cd') {
                // console.log('cd', line[2])
                switch (line[2]) {
                    case '/':
                        treePosition = []
                        break
                    case '..':
                        treePosition.pop()
                        break
                    default:
                        // console.log('moving to directory', line[2])
                        treePosition.push(line[2])
                }
            }
            if (line[1] === 'ls') {
                while (terminalArray.length && terminalArray[terminalArray.length - 1][0] !== '$') {
                    line = terminalArray.pop().split(' ')
                    let cd = getCurrentDirectory(fileSystem, treePosition)
                    if (line[0] === 'dir') {
                        cd[line[1]] = cd[line[1]] || {}
                    } else {
                        cd[line[1]] = parseInt(line[0])
                    }
                    console.log(terminalArray[0])
                }
            }
        }
    }
    console.log(fileSystem)
}

function getCurrentDirectory(fileSystem, directoryPath) {
    return directoryPath.reduce((current, path) => {
        return current[path]
    }, fileSystem)
}

parseTerminal(terminalOutput)