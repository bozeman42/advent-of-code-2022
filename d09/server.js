const express = require('express')
const { ropeStates } = require('./d9')

const app = express()

app.use(express.static('public'))

app.get('/ropedata', (req, res) => {
    res.send(ropeStates)
})

app.listen(5000, () => console.log('Listening on port 5000'))