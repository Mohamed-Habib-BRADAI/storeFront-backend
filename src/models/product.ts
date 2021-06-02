// @ts-ignore
import client from '../database';

export type Product = {
    id?: number;
    name: string;
    price: number;
    category: string;
}

export class ProductStore {
    async index(): Promise<Product[]> {
        try {
            // @ts-ignore
            const conn = await client.connect()
            const sql = 'SELECT * FROM products'

            const result = await conn.query(sql)

            conn.release()

            return result.rows
        } catch (err) {
            throw new Error(`Could not get products. Error: ${err}`)
        }
    }

    async show(id: string): Promise<Product> {
        try {
            const sql = 'SELECT * FROM products WHERE id=($1)'
            // @ts-ignore
            const conn = await client.connect()

            const result = await conn.query(sql, [id])

            conn.release()

            return result.rows[0]
        } catch (err) {
            throw new Error(`Could not find product ${id}. Error: ${err}`)
        }
    }

    async create(p: Product): Promise<Product> {
        try {
            const sql = 'INSERT INTO products (name, price, category) VALUES($1, $2, $3) RETURNING *'
            // @ts-ignore
            const conn = await client.connect()

            const result = await conn
                .query(sql, [p.name, p.price, p.category])

            const product = result.rows[0]

            conn.release()

            return product
        } catch (err) {
            throw new Error(`Could not add new product ${p.name}. Error: ${err}`)
        }
    }

    async delete(id: string): Promise<Product> {
        try {
            const sql1 = 'DELETE FROM products WHERE id=($1)'
            // @ts-ignore
            const conn = await client.connect()

            const result1 = await conn.query(sql1, [id])
            const product = result1.rows[0]
            conn.release()
            return product
        } catch (err) {
            throw new Error(`Could not delete product ${id}. Error: ${err}`)
        }
    }
    async reset ():Promise<void> {
        try {
            const sql = 'TRUNCATE products RESTART IDENTITY CASCADE'
            // @ts-ignore
            const conn = await client.connect()

            const result = await conn.query(sql)
            conn.release()
        } catch (err) {
            throw new Error(`Could not reset products`)
        }
    }
}
