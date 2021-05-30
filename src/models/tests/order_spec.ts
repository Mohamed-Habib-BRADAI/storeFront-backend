import {Order, OrderStore} from '../order'
import {UserStore, User} from '../user';
import {ProductStore, Product} from '../product';
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
        );
        expect(response.status).toBe(200);
        done();
    });
    it('post the /orders/:id/products  endpoint', async done => {
        const product: Product = {
            name: 'hat',
            category: 'cat1',
            price: 25
        }
        const response = await request.post(
            '/orders/1/products'
        ).auth(token, {type: "bearer"}).send(product);
        expect(response.status).toBe(200);
        done();
    });
});
describe("Order Model", () => {
    beforeAll(async () => {
        if (user.id && product.id) {
            await userStore.reset();
            await productStore.reset();
        }
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

    it('create method should add a order', async () => {
        const result = await store.create({
            status: 'complete',
            user_id: '1',
        });
        expect(result).toEqual({
            id: 1,
            status: 'complete',
            user_id: '1',
        });
    });

    it('index method should return a list of orders', async () => {
        const result = await store.index();
        expect(result).toEqual([{
            id: 1,
            status: 'complete',
            user_id: '1',
        }]);
    });

    it('show method should return the correct order', async () => {
        const result = await store.show("1");
        expect(result).toEqual({
            id: 1,
            status: 'complete',
            user_id: '1',
        });
    });
    it('add product to order', async () => {
        const result = await store.addProduct(5, '1', '1');
        expect(result).toEqual({
            id: 1,
            quantity: 5,
            product_id: '1',
            order_id: '1'
        });
    });
    it('get orders by user', async () => {
        const result = await store.getOrdersByUser('1');
        expect(result).toEqual([{
            id: 1,
            quantity: 5,
            product_id: '1',
            order_id: '1'
        }]);
    });
    it('delete method should remove the order', async () => {
        store.delete('1');
        const result = await store.index()
        expect(result).toEqual([]);
    });
    afterAll(async () => {
        if (user.id && product.id) {
            await userStore.reset();
            await productStore.reset();
        }
    });
});
