import {Product, ProductStore} from '../product'

const store = new ProductStore()

describe("Product Model", () => {
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
        console.log(4)

        expect(store.create).toBeDefined();
    });

    it('should have a delete method', () => {
        console.log(5)

        expect(store.delete).toBeDefined();
    });

    it('create method should add a product', async () => {
        console.log(6)

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
        console.log(7)

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
        store.delete(1);
        const result = await store.index()
        expect(result).toEqual([]);
    });
});
