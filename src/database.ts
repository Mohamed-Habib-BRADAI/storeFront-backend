// @ts-ignore
import dotenv from 'dotenv';
import {Pool} from 'pg';

dotenv.config();
console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');


const {
    POSTGRES_HOST,
    POSTGRES_DB,
    POSTGRES_TEST_DB,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    ENV
} = process.env

let client
if (ENV=='test') {
    console.log('2222222222222222222');
    client = new Pool({
        host: POSTGRES_HOST,
        database: POSTGRES_TEST_DB,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD
    })
}
if (ENV=='dev') {
    console.log('3333333333333333333333');
    client = new Pool({
        host: POSTGRES_HOST,
        database: POSTGRES_DB,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD
    })
    
}
console.log('444444444444444444444');

export default client
