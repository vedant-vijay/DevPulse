import 'dotenv/config';
import app from "./src/app.js"
import pool from "./src/db/pool.js"
import redis from "./src/db/redis.js"

const port = process.env.PORT || 3000

try
{
    const res = await pool.query('SELECT NOW()');
    console.log(res.rows[0])

    app.listen(port, ()=>{
    console.log(`listening on port ${port}`)})
}

catch(err){
    console.log(err)
    process.exit(1)
}