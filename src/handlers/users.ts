import express, { Request, Response } from 'express'
import { User, UserStore } from '../models/user'
import jwt from 'jsonwebtoken'
import verifyauthToken from '../middleware/authorization'

const store = new UserStore()

const index = async (_req: Request, res: Response) => {
    const users = await store.index()
    res.json(users)
}

const show = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as unknown as number
        const user = await store.show(id)
        res.json(user)
    } catch (e) {
        res.status(400)
        res.json(e)
    }
}

const create = async (req: Request, res: Response) => {
    const user: User = {
        username: req.body.username,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        password: req.body.password,
    }
    try {
        const newUser = await store.create(user)

        var token = jwt.sign(
            { user: newUser },
            process.env.TOKEN_SECRET as string
        )

        res.json({ token: token })
    } catch (err) {
        res.status(400)
        res.json(err)
    }
}

const authenticate = async (req: Request, res: Response) => {
    try {
        const user: User = {
            username: req.body.username,
            password: req.body.password,
        }

        const authUser = await store.authenticate(user.username, user.password)
        var token = jwt.sign({ user: authUser }, process.env.TOKEN_SECRET!)
        res.json({ token: token })
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
    const user = await store.delete(id)
    res.send(`User with id ${id} successfully deleted.`)
    res.json(user)
}

const usersRoutes = (app: express.Application) => {
    app.get('/users', verifyauthToken, index)
    app.get('/users/:id', verifyauthToken, show)
    app.post('/users', create)
    app.post('/authenticate', authenticate)
    app.delete('users/:id', verifyauthToken, deletez)
}

export default usersRoutes
