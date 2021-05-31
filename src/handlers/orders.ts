import express, {Request, Response} from 'express';
import {Order, OrderStore} from '../models/order'
import verifyAuthToken from '../utilities/tokenValidator';

const store = new OrderStore();

const index = async (_req: Request, _res: Response) => {
    const orders = await store.index();
    _res.json(orders);
}
const show = async (req: Request, res: Response) => {
    const order = await store.show(req.params.id)
    res.json(order)
}
const create = async (req: Request, res: Response) => {
    try {
        const order: Order = {
            status: req.body.status,
            user_id: req.body.user_id,
        }

        const newOrder = await store.create(order);
        res.json(newOrder);
    } catch (err) {
        res.status(400)
        res.json(err)
    }
}

const destroy = async (req: Request, res: Response) => {
    const deleted = await store.delete(req.params.id)
    res.json(deleted)
}
const addProduct = async (_req: Request, res: Response) => {
    const orderId: string = _req.params.id
    const productId: string = _req.body.productId
    const quantity: number = parseInt(_req.body.quantity)
    console.log('createProduct', orderId +'::'+productId+'::'+quantity);

    try {
        const addedProduct = await store.addProduct(quantity, orderId, productId)
        res.json(addedProduct)
    } catch (err) {
        res.status(400)
        res.json(err)
    }
}
const getOrdersByUser = async (_req: Request, res: Response) => {
    const userId: string = _req.params.id

    try {
        const ordersByUser = await store.getOrdersByUser(userId)
        res.json(ordersByUser)
    } catch (err) {
        res.status(400)
        res.json(err)
    }
}

const order_routes = (app: express.Application) => {
    app.get('/orders', index)
    app.get('/orders/:id', show)
    app.post('/orders',verifyAuthToken ,create)
    app.delete('/orders', destroy)
    app.post('/orders/:id/products',verifyAuthToken ,addProduct)
    app.post('/orders/users/:id',verifyAuthToken ,getOrdersByUser)

}

export default order_routes
