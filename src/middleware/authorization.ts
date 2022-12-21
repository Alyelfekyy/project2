import jwt from 'jsonwebtoken'
import { NextFunction, Request, Response } from 'express'

const verifyauthToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authorizationHeader = req.headers.authorization
        if (authorizationHeader) {
            const token = authorizationHeader.split(' ')[1]
            jwt.verify(token, process.env.TOKEN_SECRET as string)
        }

        next()
    } catch (error) {
        res.status(401)
        next(error)
    }
}

export default verifyauthToken
