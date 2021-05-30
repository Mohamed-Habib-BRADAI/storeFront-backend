// @ts-ignore
import client from '../database';

export type Order = {
    id?: number;
    status?: string;
    user_id?: string;
    order_id?: string;
    product_id?: string;
    quantity?: number;
}

export class OrderStore {


    async index(): Promise<Order[]> {
        try {
            // @ts-ignore
            const conn = await client.connect()
            const sql = 'SELECT * FROM orders'

            const result = await conn.query(sql)

            conn.release()

            return result.rows
        } catch (err) {
            throw new Error(`Could not get orders. Error: ${err}`)
        }
    }

    async show(id: string): Promise<Order> {
        try {
            const sql = 'SELECT * FROM orders WHERE id=($1)'
            // @ts-ignore
            const conn = await client.connect()

            const result = await conn.query(sql, [id])

            conn.release()

            return result.rows[0]
        } catch (err) {
            throw new Error(`Could not find order ${id}. Error: ${err}`)
        }
    }

    async create(o: Order): Promise<Order> {
        try {
            const sql = 'INSERT INTO orders (status, user_id) VALUES($1, $2) RETURNING *'
            // @ts-ignore
            const conn = await client.connect()

            const result = await conn
                .query(sql, [o.status, o.user_id])

            const order = result.rows[0]

            conn.release()

            return order
        } catch (err) {
            throw new Error(`Could not add new order ${o.id}. Error: ${err}`)
        }
    }

    async delete(id: string): Promise<Order> {
        try {
            const orderProduct = await this.deleteOrderProducts(id);
            const sql = 'DELETE FROM orders WHERE id=($1)'
            // @ts-ignore
            const conn = await client.connect()

            const result = await conn.query(sql, [id])

            const order = result.rows[0]

            conn.release()

            return order
        } catch (err) {
            throw new Error(`Could not delete order ${id}. Error: ${err}`)
        }
    }
    async deleteOrderProducts(id: string): Promise<Order> {
        try {
            const sql = 'DELETE FROM order_products WHERE order_id=($1)'
            // @ts-ignore
            const conn = await client.connect()

            const result = await conn.query(sql, [id])

            const order = result.rows[0]

            conn.release()

            return order
        } catch (err) {
            throw new Error(`Could not delete order ${id}. Error: ${err}`)
        }
    }

    async addProduct(quantity: number, orderId: string, productId: string): Promise<Order> {
        try {
            const sql = 'INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *'
            //@ts-ignore
            const conn = await client.connect()

            const result = await conn
                .query(sql, [quantity, orderId, productId])

            const order = result.rows[0]

            conn.release()

            return order
        } catch (err) {
            throw new Error(`Could not add product ${productId} to order ${orderId}: ${err}`)
        }
    }

    async getOrdersByUser(userId: string): Promise<Order[]>{
        try {
            // @ts-ignore
            const conn = await client.connect()
            const sql = 'SELECT order_products.id,order_products.product_id,order_products.order_id,order_products.quantity FROM order_products,orders WHERE (order_products.order_id = orders.id AND orders.user_id = $1)'
            const result = await conn.query(sql, [userId])
            conn.release()
            return result.rows
        } catch (err) {
            throw new Error(`Could not find orders for user ${userId}: ${err}`)
        }
    }
}
