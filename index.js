const cors = require('cors')
const express = require('express')

const app = express()
const serverPort = process.env.PORT || 8080

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => res.redirect('/api'))
app.get('/api', (req, res) => {
    res.status(200).json({
        msg: "Welcome to Node Backend Auth Service. Feel free to mess around."
    })
})

app.use('/api/auth', require('./routes/api/auth'))

app.use((req, res, next) => {
    let err = new Error('Not Found.')
    err.status = 404
    next(err)
})

app.listen(serverPort, () => console.log(`running on port ${serverPort}`))