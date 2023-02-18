import express, { Request, Response } from 'express'
import verifyauthToken from '../middleware/authorization'
import { Order, OrderStore } from '../models/order'

const store = new OrderStore()

const index = async (_req: Request, res: Response) => {
    const orders: Order[] = await store.index()
    res.json(orders)
}

const show = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as unknown as number
        if (!id) {
            return res.status(400).send('Missing required parameter :id.')
        }
        const order = await store.show(id)
        res.json(order)
    } catch (e) {
        res.status(400)
        res.json(e)
    }
}

const create = async (req: Request, res: Response) => {
    const order: Order = {
        products: req.body.products,
        user_id: req.body.user_id,
        status: req.body.status,
        order_id: req.body.order_id,
    }
    try {
        const newOrder = await store.create(order)
        res.send(`Order with id ${req.body.order_id} successfully created.`)
        res.json(newOrder)
    } catch (err) {
        res.status(400)
        res.json(err)
    }
}

const deletez = async (req: Request, res: Response) => {
    const deletedOrder = await store.deleteOrder(req.body.id)
    res.send(`Order with id ${req.body.id} successfully deleted.`)
    res.json(deletedOrder)
}

const ordersRoutes = (app: express.Application) => {
    app.get('/orders', verifyauthToken, index)
    app.get('/order/:id', verifyauthToken, show)
    app.post('/orders', verifyauthToken, create)
    app.delete('orders/:id', verifyauthToken, deletez)
}

export default ordersRoutes
