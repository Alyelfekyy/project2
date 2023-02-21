import express, { Request, Response } from 'express'
import verifyauthToken from '../middleware/authorization'
import { Order, OrderStore } from '../models/order'

const store = new OrderStore()

const index = async (req: Request, res: Response) => {
    const orders: Order[] = await store.index()
    res.json(orders)
}

const show = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as unknown as number
        const order = await store.show(id)
        res.json(order)
    } catch (e) {
        res.status(400)
        res.json(e)
    }
}

const create = async (req: Request, res: Response) => {
    const order: Order = {
        user_id: req.body.user_id,
        status: req.body.status,
    }
    try {
        const newOrder = await store.create(order)
        res.json(newOrder)
    } catch (err) {
        res.status(400)
        res.json(err)
    }
}

const addProducts = async (req: Request, res: Response) => {
    const order_id: number = parseInt(req.params.id)
    const product_id: number = parseInt(req.body.product_id)
    const quantity: number = parseInt(req.body.quantity)

    try {
        const addedProduct = await store.addProductToOrder(
            quantity,
            order_id,
            product_id
        )
        res.json(addedProduct)
    } catch (err) {
        res.status(400)
        res.json(err)
    }
}
const deletez = async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id)
    if (!id) {
        return res.status(400).send('Missing required parameter :id.')
    }
    const deletedOrder = await store.deleteOrder(id)
    res.send(`Order with id ${id} successfully deleted.`)
    res.json(deletedOrder)
}

const ordersRoutes = (app: express.Application) => {
    app.get('/orders', verifyauthToken, index)
    app.get('/orders/:id', verifyauthToken, show)
    app.post('/orders', verifyauthToken, create)
    app.post('/orders/:id/products', verifyauthToken, addProducts)
    app.delete('orders/:id', verifyauthToken, deletez)
}

export default ordersRoutes
