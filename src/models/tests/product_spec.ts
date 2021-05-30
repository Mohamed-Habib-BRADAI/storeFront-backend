import {Product, ProductStore} from '../product'
import supertest = require('supertest');
import { User,UserStore } from '../user';


import app from '../../server';
const store = new ProductStore()
const userStore = new UserStore()
const request = supertest(app);
import jwt from 'jsonwebtoken';


let user: User;
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
    });

    it('gets the /products endpoint ', async done => {
        const response = await request.get(
            '/products'
        );
        expect(response.status).toBe(200);
        done();
    });
    it('post the /products endpoint ', async done => {
        const response = await request.post(
            '/products'
        )
        expect(response.status).toBe(401);
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
        );
        expect(response.status).toBe(200);
        done();
    });
});

describe("Product Model", () => {
    beforeAll(async () => {
        await userStore.reset();
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

    it('create method should add a product', async () => {
        const result = await store.create({
            name: 'hat',
            price: 25,
            category: 'Easter bonnet',
        });
        expect(result).toEqual({
            id: 1,
            name: 'hat',
            price: 25,
            category: 'Easter bonnet',
        });
    });

    it('index method should return a list of products', async () => {

        const result = await store.index();
        expect(result).toEqual([{
            id: 1,
            name: 'hat',
            price: 25,
            category: 'Easter bonnet'
        }]);
    });

    it('show method should return the correct product', async () => {
        const result = await store.show("1");
        expect(result).toEqual({
            id: 1,
            name: 'hat',
            price: 25,
            category: 'Easter bonnet'
        });
    });

    it('delete method should remove the product', async () => {
        await store.delete('1');
        const result = await store.index()
        expect(result).toEqual([]);
    });
});
