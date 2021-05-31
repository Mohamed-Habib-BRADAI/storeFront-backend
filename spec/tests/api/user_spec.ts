import {User, UserStore} from '../../../src/models/user'
// @ts-ignore
import supertest = require('supertest');
import app from '../../../src/server';

const store = new UserStore()
const request = supertest(app);
describe('Test endpoint response', () => {
    beforeAll(async () => {
        await store.reset();
    });
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