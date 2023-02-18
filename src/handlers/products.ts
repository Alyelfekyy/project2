import express, { Request, Response } from 'express'
import verifyauthToken from '../middleware/authorization'
import { Product, ProductStore } from '../models/product'

const store = new ProductStore()

const index = async (_req: Request, res: Response) => {
    const products = await store.index()
    res.json(products)
}

const show = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as unknown as number
        if (!id) {
            return res.status(400).send('Missing required parameter :id.')
        }
        const product = await store.show(id)
        res.json(product)
    } catch (e) {
        res.status(400)
        res.json(e)
    }
}

const create = async (req: Request, res: Response) => {
    const product: Product = {
        product_id: req.body.product_id,
        name: req.body.name,
        price: req.body.price,
        category: req.body.category,
    }
    try {
        const newProduct = await store.create(product)
        res.send(`Product with id ${req.body.id} successfully created.`)
        res.json(newProduct)
    } catch (err) {
        res.status(400)
        res.json(err)
    }
}

const deletez = async (req: Request, res: Response) => {
    const deletedProduct = await store.delete(req.body.id)
    res.send(`Product with id ${req.body.id} successfully deleted.`)
    res.json(deletedProduct)
}

const productsRoutes = (app: express.Application) => {
    app.get('/articles', index)
    app.get('/articles/:id', show)
    app.post('/articles', verifyauthToken, create)
    app.delete('articles/:id', verifyauthToken, deletez)
}

export default productsRoutes
