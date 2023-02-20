import { UserStore } from '../../models/user'

const store = new UserStore()

describe('User Model', () => {
    it('should create a user', async () => {
        const result = await store.create({
            username: 'ahmeddd',
            firstname: 'ahmed',
            lastname: 'alyyy',
            password: 'password1',
        })
        expect(result.username).toEqual('ahmeddd')
    })

    it('should return a list of users', async () => {
        const result = await store.index()
        expect(result.length).toEqual(1)
    })

    it('should return the correct user', async () => {
        const result = await store.show(1)
        expect(result.username).toEqual('ahmeddd')
    })
})
