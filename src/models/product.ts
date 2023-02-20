// @ts-ignor
import Client from '../database'

export interface Product {
    product_id?: number
    name: string
    price: number
    category: string
}

export class ProductStore {
    async index(): Promise<Product[]> {
        try {
            const sql = 'SELECT * FROM products'

            const conn = await Client.connect()

            const result = await conn.query(sql)

            conn.release()

            return result.rows
        } catch (err) {
            throw new Error(`Could not get products. Error: ${err}`)
        }
    }

    async show(id: number): Promise<Product> {
        try {
            const sql = 'SELECT * FROM products WHERE product_id=($1)'

            const conn = await Client.connect()

            const result = await conn.query(sql, [id])

            conn.release()

            return result.rows[0]
        } catch (err) {
            throw new Error(`Could not get product ${id}. Error: ${err}`)
        }
    }

    async create(product: Product): Promise<Product> {
        try {
            const sql =
                'INSERT INTO products (name, price, category) VALUES($1, $2, $3) RETURNING *'

            const conn = await Client.connect()

            const result = await conn.query(sql, [
                product.name,
                product.price,
                product.category,
            ])

            const newProduct = result.rows[0]

            conn.release()

            return newProduct
        } catch (err) {
            throw new Error(
                `Could not add product ${product.name}. Error: ${err}`
            )
        }
    }

    async delete(id: number): Promise<Product> {
        try {
            const sql = 'DELETE FROM products WHERE product_id=($1)'

            const conn = await Client.connect()

            const result = await conn.query(sql, [id])

            const product = result.rows[0]

            conn.release()

            return product
        } catch (err) {
            throw new Error(`Could not delete article ${id}. Error: ${err}`)
        }
    }
}
