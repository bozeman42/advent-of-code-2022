const path = require('path')
const { readInput } = require('../util')

const inputString = readInput(path.resolve(__dirname, 'input.txt')).trim()

console.log(inputString)

const grid = inputString.split('\n').map(line => line.split('').map(x => ({ visible: false, height: parseInt(x)})))

let currentHeights = [0,0,0,0]
// [ ltr, rtl, ttb, btt ]

for (let i = 0; i < grid.length; i++) {
    currentHeights = [0, 0, 0, 0]
    for (let j = 0; j < grid.length; j++) {
        if (j === 0 || j === grid.length - 1) {
            grid[i][j].visible = true
            grid[i][grid.length - 1 - j].visible = true
            grid[j][i].visible = true
            grid[grid.length - 1 - j][i].visible = true
            currentHeights = [
                grid[i][j].height,
                grid[i][grid.length - 1 - j].height,
                grid[j][i].height,
                grid[grid.length - 1 - j][i].height
            ]
        } else {
            if (grid[i][j].height > currentHeights[0]) {
                grid[i][j].visible = true
                currentHeights[0] = grid[i][j].height
            }
            if (grid[i][grid.length - 1 - j].height > currentHeights[1]) {
                grid[i][grid.length - 1 - j].visible = true
                currentHeights[1] = grid[i][grid.length - 1 - j].height
            }
            if (grid[j][i].height > currentHeights[2]) {
                grid[j][i].visible = true
                currentHeights[2] = grid[j][i].height
            }
            if (grid[grid.length - 1 - j][i].height > currentHeights[3]) {
                grid[grid.length - 1 - j][i].visible = true
                currentHeights[3] = grid[grid.length - 1 - j][i].height
            }
        }
    }
}

const totalVisible = grid.reduce((total, line) => {
    return total + line.reduce((lineTotal, tree) => {
        return lineTotal + (tree.visible ? 1 : 0)
    }, 0)
}, 0)

function getScenicScore(x, y) {
    const currentHeight = grid[y][x].height
    let directionDone = [false, false, false, false]
    let distances = [0,0,0,0]
    for (let distance = 1; directionDone.some(direction => direction === false); distance++) {
        if (!directionDone[0]) {
            if (grid[y][x + distance] == undefined)  {
                directionDone[0] = true
            } else if (grid[y][x + distance].height >= currentHeight) {
                distances[0] += 1
                directionDone[0] = true
            } else {
                distances[0] += 1
            }
        }
        if (!directionDone[1]) {
            if (grid[y][x - distance] == undefined)  {
                directionDone[1] = true
            } else if (grid[y][x - distance].height >= currentHeight) {
                distances[1] += 1
                directionDone[1] = true
            } else {
                distances[1] += 1
            }
        }
        if (!directionDone[2]) {
            if (y + distance >= grid.length || grid[y + distance][x] == undefined)  {
                directionDone[2] = true
            } else if (grid[y + distance][x].height >= currentHeight) {
                distances[2] += 1
                directionDone[2] = true
            } else {
                distances[2] += 1
            }
        }
        if (!directionDone[3]) {
            if (y - distance < 0 || grid[y - distance][x] == undefined)  {
                directionDone[3] = true
            } else if (grid[y - distance][x].height >= currentHeight) {
                distances[3] += 1
                directionDone[3] = true
            } else {
                distances[3] += 1
            }
        }
    }
    return distances
}

let maxScore = 0
for (let y = 1; y < grid.length - 1; y++) {
    for (let x = 1; x < grid.length - 1; x++) {
        let distances = getScenicScore(x, y)
        let score = distances.reduce((total, distance) => total * distance)
        if (score > maxScore) {
            console.log(distances, x, y, score)
            maxScore = score
        }
    }
}


console.log(totalVisible)

console.log(maxScore)
