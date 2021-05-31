import {User, UserStore, saltRounds, pepper} from '../../../src/models/user'
// @ts-ignore
const store = new UserStore()


describe("User Model", () => {
    beforeAll(async () => {
        await store.reset();
    });
    it('should have an index method', () => {
        expect(store.index).toBeDefined();
    });

    it('should have a show method', () => {
        expect(store.show).toBeDefined();
    });

    it('should have a create method', () => {
        expect(store.create).toBeDefined();
    });

    it('should have a update method', () => {
        expect(store.create).toBeDefined();
    });

    it('should have a delete method', () => {
        expect(store.delete).toBeDefined();
    });

    it('create method should add a User', async () => {
        const result = await store.create({
            firstname: 'Habib',
            lastname: 'Bradai',
            password: 'password',
        });
        expect(result.firstname).toEqual('Habib');
        expect(result.lastname).toEqual('Bradai');

    });

    it('index method should return a list of users', async () => {
        const result = await store.index();
        expect(result.length).toEqual(1);
        expect(result[0].firstname).toEqual('Habib');
        expect(result[0].lastname).toEqual('Bradai');
    });

    it('show method should return the correct user', async () => {
        const result = await store.show("1");
        expect(result.firstname).toEqual('Habib');
        expect(result.lastname).toEqual('Bradai');
    });

    it('delete method should remove the user', async () => {
        await store.delete("1");
        const result = await store.index()
        expect(result).toEqual([]);
    });
});
