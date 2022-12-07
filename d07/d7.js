const path = require('path')
const { readInput } = require('../util')

const inputString = readInput(path.resolve(__dirname, 'input.txt')).trim()

console.time('day 7')

const terminalOutput = inputString.split('\n')

function buildFileSystem(terminal) {
    const terminalArray = [...terminal].reverse()
    console.log(terminalArray)
    let fileSystem = {}
    let treePosition = []
    while (terminalArray.length) {
        let line = terminalArray.pop().split(' ')
        if (line[0] === '$') {
            if (line[1] === 'cd') {
                switch (line[2]) {
                    case '/':
                        treePosition = []
                        break
                    case '..':
                        treePosition.pop()
                        break
                    default:
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
    return fileSystem
}

function getCurrentDirectory(fileSystem, directoryPath) {
    return directoryPath.reduce((current, path) => {
        return current[path]
    }, fileSystem)
}

const fileSystem = buildFileSystem(terminalOutput)

let directorySizes = {}

function getDirectorySize(directory, name) {
    const keys = Object.keys(directory)
    const size = keys.reduce((size, key) => {
        return (typeof directory[key] === 'number' ? directory[key] : getDirectorySize(directory[key], `${name}/${key}`)) + size
    }, 0)
    directorySizes[name] = size
    return size
}

const size = getDirectorySize(fileSystem, '/')

console.log(size)
console.log(directorySizes)
console.log(Object.values(directorySizes).filter(size => size <= 100000).reduce((a, b) => a + b))

const totalSpace = 70000000
const spaceNeeded = 30000000
const freeSpace = totalSpace - directorySizes['/']

const spaceToClear = spaceNeeded - freeSpace


const smallestSufficientDirectory = Math.min(...Object.values(directorySizes).filter(size => size >= spaceToClear))

console.log('Smallest sufficient directory size:', smallestSufficientDirectory)

console.timeEnd('day 7')