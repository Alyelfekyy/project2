import { ProductStore } from '../../models/product'

const store = new ProductStore()

describe('Product Model', () => {
    it('should create a product', async () => {
        const p1 = await store.create({
            product_id: 1,
            name: 'pants',
            price: 20,
            category: 'men',
        })
        expect(p1).toEqual({
            product_id: 1,
            name: 'pants',
            price: 20,
            category: 'men',
        })
    })

    it('should return a list of products', async () => {
        const result = await store.index()
        expect(result).toEqual([
            {
                product_id: 1,
                name: 'pants',
                price: 20,
                category: 'men',
            },
        ])
    })

    it('should return the correct product', async () => {
        const result = await store.show(1)
        expect(result).toEqual({
            product_id: 1,
            name: 'pants',
            price: 20,
            category: 'men',
        })
    })

    it('should delete the product', async () => {
        await store.delete(1)
        const result = await store.index()

        expect(result).toEqual([])
    })
})
