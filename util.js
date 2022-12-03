const fs = require('fs')

function readInput(filePath) {
    return fs.readFileSync(filePath).toString()
}

module.exports = {
    readInput
}