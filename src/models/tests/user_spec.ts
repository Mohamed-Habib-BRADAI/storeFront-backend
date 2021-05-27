import {User, UserStore, saltRounds, pepper} from '../user'
// @ts-ignore
import bcrypt from 'bcrypt'

const store = new UserStore()

describe("User Model", () => {
    const pepper = (process.env.BCRYPT_PASSWORD as unknown) as string;
    const saltRounds = (process.env.SALT_ROUNDS as unknown) as string;

    const hash = bcrypt.hashSync('password' + pepper,
        parseInt(saltRounds,10));
    console.log(hash);
    it('should have an index method', () => {
        console.log(1)
        expect(store.index).toBeDefined();
    });

    it('should have a show method', () => {
        console.log(2)
        expect(store.show).toBeDefined();

    });

    it('should have a create method', () => {
        console.log(3)

        expect(store.create).toBeDefined();
    });

    it('should have a update method', () => {
        console.log(3)

        expect(store.create).toBeDefined();
    });

    it('should have a delete method', () => {
        console.log(4)

        expect(store.delete).toBeDefined();
    });

    it('create method should add a User', async () => {
        console.log(5)
        const result = await store.create({
            firstname: 'Habib',
            lastname: 'Bradai',
            password: 'password',
        });
        console.log(result);
        expect(result.id).toEqual(1);
        expect(result.firstname).toEqual('Habib');
        expect(result.lastname).toEqual('Bradai');

    });

    it('index method should return a list of users', async () => {
        console.log(6)
        const result = await store.index();
        expect(result.length).toEqual(1);
        expect(result[0].id).toEqual(1);
        expect(result[0].firstname).toEqual('Habib');
        expect(result[0].lastname).toEqual('Bradai');
    });

    it('show method should return the correct user', async () => {
        console.log(7)

        const result = await store.show("1");
        expect(result.id).toEqual(1);
        expect(result.firstname).toEqual('Habib');
        expect(result.lastname).toEqual('Bradai');
    });

    it('delete method should remove the user', async () => {
        store.delete("1");
        const result = await store.index()
        expect(result).toEqual([]);
    });
});
