import express, { Request, Response } from 'express'
import ordersRoutes from './handlers/orders'
import productsRoutes from './handlers/products'
import usersRoutes from './handlers/users'

const app: express.Application = express()
const address: string = '0.0.0.0:3000'

app.use(express.json())

app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!')
})

ordersRoutes(app)
productsRoutes(app)
usersRoutes(app)

app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})
export default app
