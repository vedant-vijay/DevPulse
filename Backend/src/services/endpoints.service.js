
import {createEndpoint, getEndpointById, getEndpointsByOrg, updateEndpoint, deleteEndpoint} from "../repositories/endpoints.repository.js"
import {getCache, setCache, deleteCache} from "../utils/cache.js"

export async function getEndpointsByOrgService(orgId) {
    const cacheKey = `endpoints:${orgId}`
    const cachedData = await getCache(cacheKey)

    if(cachedData){
        return JSON.parse(cachedData)
    }
    else{
        const dbData = await getEndpointsByOrg(orgId)
        await setCache(cacheKey, dbData, 60)
        return dbData
    }
}

export async function createEndpointService(orgId, url, method, expectedStatus, checkInterval){
    const data = await createEndpoint(orgId, url, method, expectedStatus, checkInterval)
    const cashedKey = `endpoints:${orgId}`
    await deleteCache(cashedKey)
    return data

}

export async function getEndpointByIdService(id){
    const dbData = await getEndpointById(id)
    return dbData
}

export async function updateEndpointService(id, orgId, url, method, expectedStatus, checkInterval){
    const cacheKey = `endpoints:${orgId}`
    await deleteCache(cacheKey)
    
    const cachedData = await updateEndpoint(id, url, method, expectedStatus, checkInterval)
    return cachedData
}

export async function deleteEndpointService(id, orgId){
    const cacheKey = `endpoints:${orgId}`
    await deleteCache(cacheKey)
    await deleteEndpoint(id)
    return "endpoint deleted successfully"
}