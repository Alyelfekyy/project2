import { Product, ProductStore } from '../../models/product'

const store = new ProductStore()

describe('Product model', () => {
    it('should have index method', () => {
        expect(store.index).toBeDefined()
    })

    it('should have show method', () => {
        expect(store.show).toBeDefined()
    })

    it('should have create method', () => {
        expect(store.create).toBeDefined()
    })

    it('create method should add 1 product', async () => {
        const result = await store.create({
            name: 'jacket',
            price: 1000,
            category: 'men',
        })
        expect(result).toEqual({
            product_id: 1,
            name: 'jacket',
            price: 1000,
            category: 'men',
        })
    })

    it('index method should return list', async () => {
        const result = await store.index()
        expect(result).toEqual([
            {
                product_id: 1,
                name: 'jacket',
                price: 1000,
                category: 'men',
            },
        ])
    })

    it('show method should return single product', async () => {
        const result = await store.show(1)
        expect(result).toEqual({
            product_id: 1,
            name: 'jacket',
            price: 1000,
            category: 'men',
        })
    })
})
