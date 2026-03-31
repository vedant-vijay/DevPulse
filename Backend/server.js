import 'dotenv/config';
import app from "./src/app.js"
import pool from "./src/db/pool.js"
import redis from "./src/db/redis.js"
import {startPingService} from "./src/services/pingEndpoint.service.js"
import { logger } from './src/utils/logger.js';
const port = process.env.PORT || 3000


let server;

async function gracefulShutdown() {
        logger.info('Shutting down server...');

            await new Promise((resolve) => server.close(resolve))
                logger.info('HTTP server closed.');         
                
            await new Promise((resolve) => pool.end(resolve))
                logger.info("Pools are closed")     
    
           await new Promise((resolve) => redis.quit(resolve))
                logger.info("redis are closed")
            
            setTimeout(() => {
                logger.error('Forcing shutdown due to timeout');
                process.exit(1); 
            }, 10000); 

        process.exit(0)
    }
try
{
    const res = await pool.query('SELECT NOW()');
    logger.info(res.rows[0])

    startPingService()

    server = app.listen(port, ()=>{
    logger.info(`listening on port ${port}`)})  
}
catch(err){
    logger.error(err)
    process.exit(1)
}

process.on('SIGTERM', gracefulShutdown)
process.on('SIGINT', gracefulShutdown)
