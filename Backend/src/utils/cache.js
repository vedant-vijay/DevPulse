import redis  from "../db/redis.js";
import { logger } from "./logger.js";

export async function getCache(key){
    try{
        const res = await redis.get(key)
        return res
    }
    catch(err){
        logger.error('Cache get error:', err)
        return null
    }
}

export async function setCache(key, value, ttl){
    try{
        const stringifiedValue = JSON.stringify(value)
        const res = await redis.set(key, stringifiedValue,'EX', ttl)
        return res
    }
    catch(err){
        logger.error("cache st error:", err)
        return null
    }
}

export async function deleteCache(key){
    try{
        const res = await redis.del(key)
        return res
    }
    catch(err){
        logger.error("cache delete err:", err)
        return null
    }

}

