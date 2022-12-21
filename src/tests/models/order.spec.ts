import { OrderStore } from '../../models/order'
import { Product, ProductStore } from '../../models/product'
import { UserStore } from '../../models/user'

const orderstore = new OrderStore()
const productStore = new ProductStore()
const userStore = new UserStore()
let userId: number
let product1: number
let product2: number

describe('Order Model', () => {
    beforeAll(async () => {
        const user = await userStore.create({
            username: 'ahmeddd',
            firstname: 'ahmed',
            lastname: 'alyyy',
            password: 'password1234',
        })
        userId = user.user_id as number

        const p1 = await productStore.create({
            product_id: 1,
            name: 'pants',
            price: 20,
            category: 'men',
        })
        product1 = p1.product_id as number
        const p2 = await productStore.create({
            product_id: 2,
            name: 'jacket',
            price: 40,
            category: 'men',
        })
        product1 = p2.product_id as number
    })

    afterAll(async () => {
        await userStore.delete(userId)
        await productStore.delete(product1)
        await productStore.delete(product2)
    })

    it('should create an order', async () => {
        const result = await orderstore.create({
            products: [
                { order_id: 1, product_id: 1, quantity: 10 },
                { order_id: 1, product_id: 2, quantity: 20 },
            ],
            user_id: userId,
            status: 'new',
        })
        expect(result).toEqual({
            order_id: 1,
            products: [
                { order_id: 1, product_id: 1, quantity: 10 },
                { order_id: 1, product_id: 2, quantity: 20 },
            ],
            user_id: userId,
            status: 'new',
        })
    })

    it('should return a list of orders', async () => {
        const result = await orderstore.index()
        expect(result).toEqual([
            {
                order_id: 1,
                products: [
                    { order_id: 1, product_id: 1, quantity: 10 },
                    { order_id: 1, product_id: 2, quantity: 20 },
                ],
                user_id: userId,
                status: 'new',
            },
        ])
    })

    it('should return the correct order', async () => {
        const result = await orderstore.show(1)
        expect(result).toEqual({
            order_id: 1,
            products: [
                { order_id: 1, product_id: 1, quantity: 10 },
                { order_id: 1, product_id: 2, quantity: 20 },
            ],
            user_id: userId,
            status: 'new',
        })
    })

    it('should delete the order', async () => {
        await orderstore.deleteOrder(1)
        const result = await orderstore.index()
        expect(result).toEqual([])
    })
})
