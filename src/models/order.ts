import Client from '../database'

interface ProductofOrder {
    id?: number
    order_id: number
    product_id: number
    quantity: number
}

export interface Order {
    order_id?: number
    user_id: number
    status: string
}

export class OrderStore {
    async index(): Promise<Order[]> {
        try {
            // @ts-ignore
            const conn = await Client.connect()
            const sql = 'SELECT * FROM orders'

            const result = await conn.query(sql)

            conn.release()

            return result.rows
        } catch (err) {
            throw new Error(`Could not get orders. Error: ${err}`)
        }
    }

    async show(id: number): Promise<Order> {
        try {
            const orderSql = 'SELECT * FROM orders WHERE order_id=($1)'
            const connection = await Client.connect()
            const rows = await connection.query(orderSql, [id])
            const order = rows.rows[0]

            return order
        } catch (err) {
            throw new Error(`Could not find order ${id}. ${err}`)
        }
    }

    async create(order: Order): Promise<Order> {
        try {
            const sql =
                'INSERT INTO orders ( user_id, status) VALUES($1, $2) RETURNING *'
            const connection = await Client.connect()
            const rows = await connection.query(sql, [
                order.user_id,
                order.status,
            ])
            const createdOrder: Order = rows.rows[0]

            connection.release()

            return {
                ...createdOrder,
            }
        } catch (err) {
            throw new Error(
                `Could not add new order for user ${order.user_id}. ${err}`
            )
        }
    }

    async addProductToOrder(
        quantity: number,
        order_id: number,
        product_id: number
    ): Promise<ProductofOrder> {
        // check order if it is active
        try {
            const ordersql = 'SELECT * FROM orders WHERE order_id=($1)'
            //@ts-ignore
            const conn = await Client.connect()

            const result = await conn.query(ordersql, [order_id])

            const order = result.rows[0]

            if (order.status !== 'active') {
                throw new Error(
                    `Could not add product ${product_id} to order ${order_id} because order status is ${order.status}`
                )
            }

            conn.release()
        } catch (err) {
            throw new Error(`${err}`)
        }

        try {
            const sql =
                'INSERT INTO product_of_order (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *'
            //@ts-ignore
            const conn = await Client.connect()

            const result = await conn.query(sql, [
                quantity,
                order_id,
                product_id,
            ])

            const order_products = result.rows[0]

            conn.release()

            return order_products
        } catch (err) {
            throw new Error(
                `Could not add product ${product_id} to order ${order_id}: ${err}`
            )
        }
    }
    async deleteOrder(id: number): Promise<Order> {
        try {
            const connection = await Client.connect()
            const orderProductsSql =
                'DELETE FROM  product_of_order WHERE order_id=($1)'
            await connection.query(orderProductsSql, [id])

            const sql = 'DELETE FROM orders WHERE id=($1)'
            const rows = await connection.query(sql, [id])
            const order = rows.rows[0]

            connection.release()

            return order
        } catch (err) {
            throw new Error(`Could not delete order ${id}. ${err}`)
        }
    }
}
