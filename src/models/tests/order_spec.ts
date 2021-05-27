import {Order,OrderStore} from '../order'
const store = new OrderStore()

describe("Order Model", () => {
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

    it('create method should add a order', async () => {
        console.log(6)

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
        console.log(7)

        const result = await store.index();
        expect(result).toEqual([{
            id: 1,
            status: 'complete',
            user_id: '1',
        }]);
    });

    it('show method should return the correct order', async () => {
        console.log(8)

        const result = await store.show("1");
        expect(result).toEqual({
            id: 1,
            status: 'complete',
            user_id: '1',
        });
    });

    it('delete method should remove the order', async () => {
        store.delete("1");
        const result = await store.index()
        expect(result).toEqual([]);
    });
});
