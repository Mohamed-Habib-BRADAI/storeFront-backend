import { OrderStore} from '../../../src/models/order'
import {UserStore, User} from '../../../src/models/user';
import {ProductStore, Product} from '../../../src/models/product';
import supertest = require('supertest');
// @ts-ignore
import app from '../../../src/server'

const store = new OrderStore()
const userStore = new UserStore()
const productStore = new ProductStore()
const request = supertest(app);
import jwt from 'jsonwebtoken';


let user: User;
let product: Product
let token: string

describe('Test endpoint response', () => {
    beforeAll(async () => {
        await store.reset();
        console.log('token secret',process.env.TOKEN_SECRET )
        await userStore.reset();
        await productStore.reset();
        user = await userStore.create({
            firstname: 'firstname',
            lastname: 'lastname',
            password: 'password',
        });
        if (process.env.TOKEN_SECRET) {
            token = jwt.sign({user: user}, process.env.TOKEN_SECRET)
        }
        product = await productStore.create({
            name: 'hat',
            price: 25,
            category: 'Easter bonnet'
        });
    });
    it('gets the /orders endpoint ', async done => {
        const response = await request.get(
            '/orders'
        );
        expect(response.status).toBe(200);
        done();
    });
    it('post the /orders endpoint ', async done => {
        console.log('token',token);
        const response = await request.post(
            '/orders'
        ).auth(token, {type: "bearer"})
        expect(response.status).toBe(200);
        done();
    });
    it('show the /orders/1 endpoint ', async done => {
        const response = await request.get(
            '/orders/1'
        );
        expect(response.status).toBe(200);
        done();
    });

    it('delete the /orders endpoint ', async done => {
        const response = await request.delete(
            '/orders'
        ).auth(token,{type:"bearer"});
        expect(response.status).toBe(200);
        done();
    });
    it('post the /orders/:id/products  endpoint', async done => {
        const product  = {
            productId: 1,
            quantity:25
        }
        const response = await request.post(
            '/orders/1/products'
        ).auth(token, {type: "bearer"}).send(product);
        expect(response.status).toBe(200);
        done();
    });
});
