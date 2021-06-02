import {ProductStore, Product} from '../../../src/models/product'
import supertest = require('supertest');
import { User,UserStore } from '../../../src/models/user';


import app from '../../../src/server';
const store = new ProductStore()
const userStore = new UserStore()
const request = supertest(app);
import jwt from 'jsonwebtoken';


let user: User;
let token: string

describe('Test endpoint response', () => {
    beforeAll(async () => {
        await userStore.reset();
        await store.reset();
        user = await userStore.create({
            firstname: 'firstname',
            lastname: 'lastname',
            password: 'password',
        });
        if (process.env.TOKEN_SECRET) {
            token = jwt.sign({user: user}, process.env.TOKEN_SECRET)
        }
    });

    it('gets the /products endpoint ', async done => {
        const response = await request.get(
            '/products'
        );
        expect(response.status).toBe(200);
        done();
    });
    it('post the /products endpoint ', async done => {
        const product: Product = {
            name: 'hat',
            price: 25,
            category: 'cat1',
            
        }
        const response = await request.post(
            '/products'
        ).auth(token,{type:"bearer"}).send(product)
        expect(response.status).toBe(200);
        done();
    });
    it('show the /products/1 endpoint ', async done => {
        const response = await request.get(
            '/products/1'
        );
        expect(response.status).toBe(200);
        done();
    });

    it('delete the /products endpoint ', async done => {
        const response = await request.delete(
            '/products'
        ).auth(token,{type:"bearer"});
        expect(response.status).toBe(200);
        done();
    });
});
