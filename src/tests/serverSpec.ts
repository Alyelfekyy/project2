import supertest from 'supertest'
import app from '../server'

const request = supertest(app)

let token: string

describe('Test endpoint responses', () => {
    // get token
    beforeAll(async () => {
        const response = await request
            .post('/authenticate')
            .send({ username: 'ahmeddd', password: 'password1' })
        token = response.body.token
    })

    describe('User endpoint', () => {
        it('create user endpoint', async () => {
            const data = {
                username: 'ssmith',
                firstname: 'Sally',
                lastname: 'Smothers',
                password: 'test1234',
            }
            const response = await request.post('/users').send(data)
            expect(response.status).toBe(200)
        })

        it(' index user endpoint', async () => {
            const response = await request.get('/users')
            expect(response.status).toBe(200)
        })

        it(' show user endpoint', async () => {
            const response = await request.get('/users/1')
            expect(response.status).toBe(200)
        })
    })

    it('create product endpoint', async () => {
        const response = await request
            .post('/products')
            .send({ name: 'jeans', price: 500, category: 'men' })
        expect(response.status).toBe(200)
    })

    it('index product endpoint', async () => {
        const response = await request.get('/products')
        expect(response.status).toBe(200)
    })

    it('show product endpoint', async () => {
        const response = await request.get('/products/1')
        expect(response.status).toBe(200)
    })
})

describe('Order endpoint', () => {
    it(' create order endpoint', async () => {
        const data = {
            user_id: 1,
            status: 'new',
        }
        const response = await request.post('/orders').send(data)
        expect(response.status).toBe(200)
    })

    it('index order endpoint', async () => {
        const response = await request.get('/orders')
        expect(response.status).toBe(200)
    })

    it('show order endpoint', async () => {
        const response = await request.get('/orders/1')
        expect(response.status).toBe(200)
    })

    it('addProduct order endpoint', async () => {
        const response = await request
            .post('/orders/1/products')
            .set('Authorization', 'Bearer ' + token)
            .send({ quantity: 5, product_id: '1' })
        expect(response.status).toBe(200)
    })
})
