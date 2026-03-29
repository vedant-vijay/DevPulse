import {createEndpointService, getEndpointByIdService, getEndpointsByOrgService, updateEndpointService, deleteEndpointService} from "../services/endpoints.service.js"
import {getOrgByUserIdService} from "../services/organisation.service.js"

export const createEndpointController = async (req, res, next) => {
    const {orgId, url, method, expectedStatus, checkInterval} = req.body
    if(!(orgId && url && method && expectedStatus && checkInterval)){
        const error = new Error('missing fields')
        error.statusCode = 400
        return next(error)
    }
    try{
        await createEndpointService(orgId, url, method, expectedStatus, checkInterval)
        return res.status(200).json({message:"new endpoint is created"})
    }
    catch(err) {
        next(err)
    }
}

export const getEndpointByIdController = async (req, res, next) =>{
    const {id} = req.params 
    try{
        const getEndpoint = await getEndpointByIdService(id)
        return res.status(200).json({message:"endpoint is fetched", endpoint : getEndpoint})
    }
    catch(err) {
        next(err)
    }
}

export const getEndpointsByOrgController = async(req, res, next) =>{
    const {userId} = req.user
    const orgId = await getOrgByUserIdService(userId)
    try{
        const getEndpoint = await getEndpointsByOrgService(orgId.id)
        return res.status(200).json({message:"endpoint is fetched", endpoint : getEndpoint})
    }
    catch(err) {
        next(err)
    }
}

export const updateEndpointController = async (req, res, next) =>{
    const {id, orgId, url, method, expectedStatus, checkInterval} = req.body

    if(!(id && orgId && url && method && expectedStatus && checkInterval)){
        const error = new Error('field is missing')
        error.statusCode = 400
        return next(error)
    }
    try{
        const updateEndpoint = await updateEndpointService(id, orgId, url, method, expectedStatus, checkInterval)
        return res.status(200).json({message:"endpoint is updated", endpoint: updateEndpoint})
    }
    catch(err) {
        next(err)
    }
}

export const deleteEndpointController = async (req, res, next) =>{
    const {id} = req.params
    const {orgId} = req.user
    try{
        const deleteEndpoint = await deleteEndpointService(id, orgId)
        return res.status(200).json({message:"endpoint is successfully deleted", endpoint : deleteEndpoint})
    }
    catch(err) {
        next(err)
    }
}