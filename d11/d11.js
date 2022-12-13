const path = require('path')
const { inspect } = require('util')
const { readInput } = require('../util')

const inputString = readInput(path.resolve(__dirname, 'input.txt')).trim()

const operations = {
    '*': function (a, b) { return a * b},
    '+': function (a, b) { return a + b}
}


const monkeys = inputString.split('\n\n')
    .map(monkey => {
        return monkey
            .split('\n')
            .map(line => {
                return line.split(' ')
            })
    }).reduce((arr, monkey) => {
        const items = monkey[1].splice(4).map(x => parseInt(x))
        const equation = monkey[2].splice(5)
        const [operand1, operationKey, operand2] = equation
        const test = parseInt(monkey[3].splice(-1))
        const trueTarget = parseInt(monkey[4].splice(-1))
        const falseTarget = parseInt(monkey[5].splice(-1))

        return [
            ...arr,
            {
                items,
                operation: {
                    func: operations[operationKey],
                    operand: parseInt(operand2) ? parseInt(operand2) : operand2
                },
                test,
                trueTarget,
                falseTarget,
                inspections: 0
            }
        ]
    }, [])

const mod = monkeys.reduce((a, monkey) => {
    return a * monkey.test
},1)

function round() {
    monkeys.forEach(monkey => {
        while(monkey.items.length) {
            monkey.inspections++
            const item = monkey.items.shift()
            const newWorry = (monkey.operation.func(item, (monkey.operation.operand === 'old') ? item : monkey.operation.operand)) % mod
            monkeys[(newWorry % monkey.test === 0) ? monkey.trueTarget : monkey.falseTarget].items.push(newWorry)
        }
    })
}

function rounds(n) {
    for (let i = 0; i < n; i++) {
        round()
    }
}

rounds(10000)
console.log(monkeys)
const business = monkeys.map(monkey => monkey.inspections).sort((a, b) => a - b)
console.log(business.pop() * business.pop())