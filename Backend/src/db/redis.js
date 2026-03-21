import Redis from "ioredis"

const redis = new Redis({
    port:process.env.REDIS_PORT,
    host:process.env.REDIS_HOST
});

redis.on('connect', () => {
    console.log('Redis connected')
})

redis.on('error', (err) => {
    console.error('Redis error:', err)
})

export default redis;