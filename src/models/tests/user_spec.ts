import {User, UserStore, saltRounds, pepper} from '../user'
// @ts-ignore
import bcrypt from 'bcrypt'
import supertest = require('supertest');
import app from '../../server';

const store = new UserStore()
const request = supertest(app);

describe('Test endpoint response', () => {
    it('gets the /users endpoint ', async done => {
        const response = await request.get(
            '/users'
        );
        expect(response.status).toBe(200);
        done();
    });
    it('post the /users endpoint ', async done => {
        const user: User = {

            firstname: 'habib',
            lastname: 'bradai',
            password: 'password'
        }
        const response = await request.post(
            '/users'
        ).send(user)
        expect(response.status).toBe(200);
        done();
    });
    it('show the /users/1 endpoint ', async done => {
        const response = await request.get(
            '/users/1'
        );
        expect(response.status).toBe(200);
        done();
    });

    it('delete the /users endpoint ', async done => {
        const response = await request.delete(
            '/users'
        );
        expect(response.status).toBe(200);
        done();
    });
    it('uthenticate the /authenticate endpoint ', async done => {
        const response = await request.post(
            '/authenticate'
        );
        expect(response.status).toBe(200);
        done();
    });
});
describe("User Model", () => {
    const pepper = (process.env.BCRYPT_PASSWORD as unknown) as string;
    const saltRounds = (process.env.SALT_ROUNDS as unknown) as string;

    const hash = bcrypt.hashSync('password' + pepper,
        parseInt(saltRounds,10));
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
