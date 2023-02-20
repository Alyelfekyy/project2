import { OrderStore } from '../../models/order'

const store = new OrderStore()

describe('Order model', () => {
    it('should have index method', () => {
        expect(store.index).toBeDefined()
    })

    it('should have show method', () => {
        expect(store.show).toBeDefined()
    })

    it('should have create method', () => {
        expect(store.create).toBeDefined()
    })

    it('create method should add 1 order', async () => {
        const result = await store.create({
            status: 'active',
            user_id: 1,
        })
        expect(result).toEqual({
            order_id: 1,
            status: 'active',
            user_id: 1,
        })
    })

    it('index method should return list', async () => {
        const result = await store.index()
        expect(result).toEqual([
            {
                order_id: 1,
                status: 'active',
                user_id: 1,
            },
        ])
    })

    it('show method should return single order', async () => {
        const result = await store.show(1)
        expect(result).toEqual({
            order_id: 1,
            status: 'active',
            user_id: 1,
        })
    })

    it('addProduct method should add 1 product', async () => {
        const result = await store.addProductToOrder(1, 1, 1)
        expect(result).toEqual({
            id: 1,
            order_id: 1,
            quantity: 1,
            product_id: 1,
        })
    })
})
