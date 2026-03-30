import Redis from "ioredis"
import { logger } from "../utils/logger.js";

const redis = new Redis({
    port:process.env.REDIS_PORT,
    host:process.env.REDIS_HOST
});

redis.on('connect', () => {
    logger.info('Redis connected')
})

redis.on('error', (err) => {
    logger.error('Redis error:', err)
})

export default redis;