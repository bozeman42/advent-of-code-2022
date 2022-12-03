const path = require('path')
const { readInput } = require('../util')

const inputString = readInput(path.resolve(__dirname, 'input.txt')).trim()
console.log(inputString)

// part 2 this is lose, draw, win
const movePoints = {
    x: 0,
    y: 3,
    z: 6
}

// part 2, this determines the points of the moves that lose, draw, and win vs the opponents' moves
const outcomes = {
    a: {
        x: 3,
        y: 1,
        z: 2
    },
    b: {
        x: 1,
        y: 2,
        z: 3
    },
    c: {
        x: 2,
        y: 3,
        z: 1
    }
}

const moveNames = {
    a: 'rock',
    x: 'rock',
    b: 'paper',
    y: 'paper',
    c: 'scissors',
    z: 'scissors'
}

const rounds = inputString
    .split('\n')
    .map(roundStr => roundStr.split(' ').map(letter => letter.toLowerCase()))

const totalScore = rounds
    .reduce((total, round) => {
        return total + scoreRound(round)
    }, 0)

console.log(totalScore)



function scoreRound([yourMove, theirMove]) {
    console.log(moveNames[yourMove], moveNames[theirMove], outcomes[yourMove][theirMove], movePoints[yourMove])

    return outcomes[yourMove][theirMove] + movePoints[theirMove]
}