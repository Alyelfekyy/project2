import Client from '../database'

interface ProductofOrder {
    order_id: number
    product_id: number
    quantity: number
}

export interface Order {
    order_id?: number
    products: ProductofOrder[]
    user_id: number
    status: string
}

export class OrderStore {
    async index(): Promise<Order[]> {
        try {
            const connection = await Client.connect()
            const sql = 'SELECT * FROM orders'

            const row = await connection.query(sql)
            const rows = row.rows[0]

            const productsSql =
                'SELECT product_id , quantity FROM product_of_order WHERE order_id=($1)'
            const orders = []

            for (const order of rows) {
                const productsrows = await connection.query(productsSql, [
                    order.id,
                ])
                const products = productsrows.rows[0]
                orders.push({
                    ...order,
                    products,
                })
            }

            connection.release()

            return orders
        } catch (err) {
            throw new Error(`Could not get orders. ${err}`)
        }
    }

    async show(id: number): Promise<Order> {
        try {
            const orderSql = 'SELECT * FROM orders WHERE id=($1)'
            const connection = await Client.connect()
            const rows = await connection.query(orderSql, [id])
            const order = rows.rows[0]

            const productsSql =
                'SELECT product_id, quantity FROM product_of_order WHERE order_id=($1)'
            const prows = await connection.query(productsSql, [id])
            const products = prows.rows[0]
            connection.release()

            return {
                ...order,
                products,
            }
        } catch (err) {
            throw new Error(`Could not find order ${id}. ${err}`)
        }
    }

    async create(order: Order): Promise<Order> {
        try {
            const sql =
                'INSERT INTO orders (order_id, products, user_id, status) VALUES($1, $2, $3, $4) RETURNING *'
            const connection = await Client.connect()
            const rows = await connection.query(sql, [
                order.order_id,
                order.products,
                order.user_id,
                order.status,
            ])
            const createdOrder: Order = rows.rows[0]

            const orderProductsSql =
                'INSERT INTO product_of_order ( order_id, product_id, quantity) VALUES($1, $2, $3) RETURNING *'
            const orderProducts = []

            for (const product of order.products) {
                const rows = await connection.query(orderProductsSql, [
                    order.order_id,
                    product.product_id,
                    product.quantity,
                ])

                orderProducts.push(rows.rows[0])
            }

            connection.release()

            return {
                ...createdOrder,
                products: orderProducts,
            }
        } catch (err) {
            throw new Error(
                `Could not add new order for user ${order.user_id}. ${err}`
            )
        }
    }
    async deleteOrder(id: number): Promise<Order> {
        try {
            const connection = await Client.connect()
            const orderProductsSql =
                'DELETE FROM order_products WHERE order_id=($1)'
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
