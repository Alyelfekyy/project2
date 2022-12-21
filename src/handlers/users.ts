import express, { Request, Response } from 'express'
import { User, UserStore } from '../models/user'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import verifyauthToken from '../middleware/authorization'

const store = new UserStore()
const pepper = process.env.BCRYPT_PASSWORD
const saltRounds = process.env.SALT_ROUNDS as unknown as string

const index = async (_req: Request, res: Response) => {
    const users = await store.index()
    res.json(users)
}

const show = async (req: Request, res: Response) => {
    const user = await store.show(req.body.id)
    res.json(user)
}

const create = async (req: Request, res: Response) => {
    const hash = bcrypt.hashSync(
        req.body.password + pepper,
        parseInt(saltRounds)
    )
    const user: User = {
        user_id: req.body.user_id,
        username: req.body.username,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        password: hash,
    }
    try {
        const newUser = await store.create(user)
        user.token = jwt.sign(
            { id: user.user_id, username: user.username },
            process.env.TOKEN_SECRET as string
        )
        res.json(newUser)
    } catch (err) {
        res.status(400)
        res.json(err)
    }
}

const deletez = async (req: Request, res: Response) => {
    if (req.body.id === undefined) {
        res.status(400)
        res.send('Missing parameter :id')
    }
    const user = await store.delete(req.body.id)
    res.json(user)
}

const usersRoutes = (app: express.Application) => {
    app.get('/users', index)
    app.get('/users/:id', show)
    app.post('/users', create)
    app.delete('users/:id', verifyauthToken, deletez)
}

export default usersRoutes
