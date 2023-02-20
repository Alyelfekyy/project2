// @ts-ignore
import Client from '../database'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'

export type User = {
    user_id?: number
    username: string
    firstname?: string
    lastname?: string
    password: string
    token?: string
}

dotenv.config()
const pepper = process.env.BCRYPT_PASSWORD
const saltRounds = process.env.SALT_ROUNDS as unknown as string

export class UserStore {
    async index(): Promise<User[]> {
        try {
            const sql = 'SELECT * FROM users'

            const conn = await Client.connect()

            const result = await conn.query(sql)

            conn.release()

            return result.rows
        } catch (err) {
            throw new Error(`Could not get users. Error: ${err}`)
        }
    }

    async show(id: number): Promise<{
        id: number
        username: string
        firstname: string
        lastname: string
    }> {
        try {
            const sql = 'SELECT * FROM users WHERE user_id=($1)'

            const conn = await Client.connect()

            const result = await conn.query(sql, [id])

            conn.release()

            return {
                id: result.rows[0].id,
                username: result.rows[0].username,
                firstname: result.rows[0].firstname,
                lastname: result.rows[0].lastname,
            }
        } catch (err) {
            throw new Error(`Could not get user ${id}. Error: ${err}`)
        }
    }

    async create(u: User): Promise<{
        id: number
        username: string
        firstname: string
        lastname: string
    }> {
        try {
            const sql =
                'INSERT INTO users (username, first_name, last_name, password) VALUES($1, $2, $3, $4) RETURNING *'
            // @ts-ignore
            const hash = bcrypt.hashSync(
                u.password + pepper,
                parseInt(saltRounds)
            )
            const conn = await Client.connect()

            const result = await conn.query(sql, [
                u.username,
                u.firstname,
                u.lastname,
                hash,
            ])

            const user = result.rows[0]

            conn.release()

            return {
                id: user.id,
                username: user.username,
                firstname: user.firstname,
                lastname: user.lastname,
            }
        } catch (err) {
            throw new Error(`Could not add user ${u.firstname}. Error: ${err}`)
        }
    }

    async delete(id: number): Promise<User> {
        try {
            const sql = 'DELETE FROM users WHERE user_id=($1)'
            // @ts-ignore
            const conn = await Client.connect()

            const result = await conn.query(sql, [id])

            const user = result.rows[0]

            conn.release()

            return user
        } catch (err) {
            throw new Error(`Could not delete user ${id}. Error: ${err}`)
        }
    }
    async authenticate(
        username: string,
        password: string
    ): Promise<User | null> {
        try {
            const sql = 'SELECT * FROM users WHERE username=($1)'

            const connection = await Client.connect()

            const rows = await connection.query(sql, [username])

            const user = rows.rows[0]

            if (bcrypt.compareSync(password + pepper, user.password)) {
                return user
            }

            connection.release()

            return null
        } catch (err) {
            throw new Error(`Could not find user ${username}. ${err}`)
        }
    }
}
