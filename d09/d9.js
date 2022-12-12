const path = require('path')
const { readInput } = require('../util')

const inputString = readInput(path.resolve(__dirname, 'input.txt')).trim()

const directions = {
    up: [0, -1],
    down: [0, 1],
    right: [1, 0],
    left: [-1, 0]
}

class RopeSegment {
    constructor (x = 0, y = 0) {
        this.position = [x,y]
        this.tail = null
    }

    getFullRope() {
        const tailState = this.tail ? this.tail.getFullRope() : []

        return [
            this.position,
            ...tailState
        ]
    }

    addTail(n) {
        for (let i = 0; i < n; i++) {
            if (!this.tail) {
                this.tail = new RopeSegment()
            } else {
                this.tail.addTail(1)
            }
        }
    }

    getTail(n = 1) {
        if (n === 1) return this.tail
        return this.tail.getTail(n - 1)
    }

    up() {
        return this.move(directions.up)
    }

    down() {
        return this.move(directions.down)
    }

    left() {
        return this.move(directions.left)
    }

    right() {
        return this.move(directions.right)
    }

    move([x, y]) {
        const [x1, y1] = this.position
        this.position = [x + x1, y + y1]
        if (this.tail) {
            return this.tail.follow(this.position)
        }
        return this.position
    }

    follow([x1, y1]) {
        const [x, y] = this.position

        const deltaX = x1 - x
        const deltaY = y1 - y
        const xDirection = deltaX === 0 ? 0 : deltaX / Math.abs(deltaX)
        const yDirection = deltaY === 0 ? 0 : deltaY / Math.abs(deltaY)
        if (Math.abs(deltaX) == 2 || Math.abs(deltaY) == 2 ) {
            this.move([xDirection, yDirection])
        }
        return this.position
    }

    get x () {
        return this.position[0]
    }

    get y () {
        return this.position[1]
    }
}

const instructions = inputString.split('\n').map(line => {
    const [direction, number] = line.split(' ')
    return {
        direction,
        number
    }
})

const rope = new RopeSegment()
rope.addTail(9)


const positions = new Set()
const ropeStates = []
let maxX = 0
let minX = 0
let minY = 0
let maxY = 0

instructions.forEach(({direction, number}) => {
    for(let i = 0; i < number; i++) {
        switch (direction) {
            case 'U': {
                rope.up()
                break
            }
            case 'D': {
                rope.down()
                break
            }
            case 'L': {
                rope.left()
                break
            }
            case 'R': {
                rope.right()
                break
            }
        }
        const [x, y] = rope.getTail(9).position
        maxX = Math.max(x, maxX)
        minX = Math.min(x, minX)
        minY = Math.min(y, minY)
        maxY = Math.max(y, maxY)
        positions.add(`${x},${y}`)
        ropeStates.push(rope.getFullRope())
    }
})

console.table({
    minX,
    minY,
    maxX,
    maxY
})
console.log(positions.size)

module.exports = {
    ropeStates
}