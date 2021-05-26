import express from 'express'
import bodyParser from 'body-parser'

const app: express.Application = express()
const address: string = "0.0.0.0:3000"
const port: number = 3000;

app.use(bodyParser.json())

app.get('/', function (req, res) {
    res.send('Hello World!')
})

app.listen(port, function () {
    console.log(`starting app on: ${address}`)
})
