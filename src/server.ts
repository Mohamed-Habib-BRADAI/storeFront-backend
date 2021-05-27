import express from 'express';
import bodyParser from 'body-parser';
import order_routes from './handlers/orders';
import user_routes from './handlers/users';
import product_routes from './handlers/products';

const app: express.Application = express()
const address: string = "0.0.0.0:3000"
const port: number = 3000;

app.use(bodyParser.json())

app.get('/', function (req, res) {
    res.send('Hello World!')
})

order_routes(app);
product_routes(app);
user_routes(app);


app.listen(port, function () {
    console.log(`starting app on: ${address}`)
})
