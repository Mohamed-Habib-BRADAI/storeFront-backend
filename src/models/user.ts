// @ts-ignore
import client from '../database';
// @ts-ignore
import bcrypt from 'bcrypt';
import has = Reflect.has;
export type User = {
    id?: number;
    firstname: string;
    lastname: string;
    password: string;
}
export const pepper = (process.env.BCRYPT_PASSWORD as unknown) as string;
export const saltRounds = (process.env.SALT_ROUNDS as unknown) as string;

export class UserStore {
    async index(): Promise<User[]> {
        try {
            // @ts-ignore
            const conn = await client.connect()
            const sql = 'SELECT * FROM users'

            const result = await conn.query(sql)

            conn.release()

            return result.rows
        } catch (err) {
            throw new Error(`Could not get users. Error: ${err}`)
        }
    }

    async show(id: string): Promise<User> {
        try {
            const sql = 'SELECT * FROM users WHERE id=($1)'
            // @ts-ignore
            const conn = await client.connect()

            const result = await conn.query(sql, [id])

            conn.release()

            return result.rows[0]
        } catch (err) {
            throw new Error(`Could not find user ${id}. Error: ${err}`)
        }
    }
    async create(u: User): Promise<User> {
        try {
            const sql = 'INSERT INTO users (firstName, lastName, password) VALUES($1, $2, $3) RETURNING *'
            // @ts-ignore
            const conn = await client.connect()
            const hash = bcrypt.hashSync(u.password + pepper,
                parseInt(saltRounds,10));
            const result = await conn
                .query(sql, [u.firstname, u.lastname, hash])

            const user = result.rows[0]

            conn.release()

            return user
        } catch (err) {
            throw new Error(`Could not add new user ${u.firstname}. Error: ${err}`)
        }
    }
    async delete(id: string): Promise<User> {
        try {
            const sql = 'DELETE FROM orders WHERE user_id=($1)'

            const sql1 = 'DELETE FROM users WHERE id=($1)'
            // @ts-ignore
            const conn = await client.connect()

            const result = await conn.query(sql, [id])
            const result1 = await conn.query(sql1, [id])
            const user = result1.rows[0]

            conn.release()

            return user
        } catch (err) {
            throw new Error(`Could not delete user ${id}. Error: ${err}`)
        }
    }
    async authenticate(firstname: string, lastname: string, password: string): Promise<User | null> {
        // @ts-ignore
        const conn = await client.connect();

        const sql = 'SELECT password FROM users WHERE firstName=($1) and firstName=($2)'

        const result = await conn.query(sql, [firstname,lastname])

        if(result.rows.length) {

            const user = result.rows[0]

            if (bcrypt.compareSync(password+pepper, user.password)) {
                return user
            }
        }

        return null
    }
    async reset ():Promise<void> {
        try {
            const sql = 'TRUNCATE users RESTART IDENTITY CASCADE'
            // @ts-ignore
            const conn = await client.connect()

            const result = await conn.query(sql)
            conn.release()

        } catch (err) {
            throw new Error(`Could not reset users`)
        }
    }

}
