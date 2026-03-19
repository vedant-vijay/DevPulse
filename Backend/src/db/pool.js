import pg from 'pg';

const {Pool} = pg

const pool = new Pool({
    host : process.env.DB_HOST,
    max : process.env.POOL_MAX,
    user : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    port : process.env.DB_PORT,
    database : process.env.DB_NAME
})


export default pool;