import {User, UserStore} from '../../../src/models/user'
// @ts-ignore
import supertest = require('supertest');
import app from '../../../src/server';
import jwt from 'jsonwebtoken';

let user: User;
let token: string

const store = new UserStore()
const request = supertest(app);
describe('Test endpoint response', () => {
    beforeAll(async () => {
        await store.reset();
        user = await store.create({
            firstname: 'firstname',
            lastname: 'lastname',
            password: 'password',
        });
        if (process.env.TOKEN_SECRET) {
            token = jwt.sign({user: user}, process.env.TOKEN_SECRET)
        }
    });
    it('gets the /users endpoint ', async done => {
        const response = await request.get(
            '/users'
        ).auth(token,{type:"bearer"});
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
        ).auth(token,{type:"bearer"});
        expect(response.status).toBe(200);
        done();
    });

    it('delete the /users endpoint ', async done => {
        const response = await request.delete(
            '/users'
        ).auth(token,{type:"bearer"});
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
