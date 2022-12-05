const path = require('path')
const { readInput } = require('../util')

const inputString = readInput(path.resolve(__dirname, 'input.txt')).trim()

const pairs = inputString
    .split('\n')
    .map(pair => {
        return pair
            .split(',')
            .map(range => {
                const [min, max] = range.split('-').map(section => parseInt(section))
                return {
                    min,
                    max
                }
            })
    })

let totalContained = pairs.reduce((total, pair) => {
    const [elf1, elf2] = pair
    if ((elf1.min >= elf2.min && elf1.max <= elf2.max) || (elf1.min <= elf2.min && elf1.max >= elf2.max)) {
        console.log(pair)
        return total + 1
    }
    return total
}, 0)

console.log(totalContained)

const totalOverlapping = pairs.reduce((total, pair) => {
    return doRangesOverlap(pair) ? total + 1 : total
}, 0)

console.log(totalOverlapping)

function doRangesOverlap(pair) {
    const [range1, range2] = pair
    const { min: min1, max: max1 } = range1
    const { min: min2, max: max2 } = range2
    return (
        isNumberInRange(min1, min2, max2)
            || isNumberInRange(max1, min2, max2)
            || isNumberInRange(min2, min1, max1)
            || isNumberInRange(max2, min1, max1)
    )
}

function isNumberInRange(number, min, max) {
    return number >= min && number <= max
}