import {ProductStore} from '../../../src/models/product'
import { UserStore } from '../../../src/models/user';


const store = new ProductStore()
const userStore = new UserStore()


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
