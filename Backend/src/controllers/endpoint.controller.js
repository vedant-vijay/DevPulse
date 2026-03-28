import {createEndpointService, getEndpointByIdService, getEndpointsByOrgService, updateEndpointService, deleteEndpointService} from "../services/endpoints.service.js"
import {getOrgByUserIdService} from "../services/organisation.service.js"

export const createEndpointController = async (req, res) => {
    const {orgId, url, method, expectedStatus, checkInterval} = req.body
    if(!(orgId && url && method && expectedStatus && checkInterval)){
        return res.status(400).json({message:"please fill the empty field"})
    }
    try{
        await createEndpointService(orgId, url, method, expectedStatus, checkInterval)
        return res.status(200).json({message:"new endpoint is created"})
    }
    catch(err){
        console.log(err)
        return res.status(400).json({message:'endpoint creation failed'})
    }
}

export const getEndpointByIdController = async (req, res) =>{
    const {id} = req.params 
    try{
        const getEndpoint = await getEndpointByIdService(id)
        return res.status(200).json({message:"endpoint is fetched", endpoint : getEndpoint})
    }
    catch(err){
        return res.status(400).json({error: err})
    }
}

export const getEndpointsByOrgController = async(req, res) =>{
    const {userId} = req.user
    const orgId = await getOrgByUserIdService(userId)
    try{
        const getEndpoint = await getEndpointsByOrgService(orgId.id)
        return res.status(200).json({message:"endpoint is fetched", endpoint : getEndpoint})
    }
    catch(err){
        return res.status(400).json({error: err})
    }
}

export const updateEndpointController = async (req, res) =>{
    const {id, orgId, url, method, expectedStatus, checkInterval} = req.body

    if(!(id && orgId && url && method && expectedStatus && checkInterval)){
        return res.status(400).json({message: 'Missing fields'}) 
    }
    try{
        const updateEndpoint = await updateEndpointService(id, orgId, url, method, expectedStatus, checkInterval)
        return res.status(200).json({message:"endpoint is updated", endpoint: updateEndpoint})
    }
    catch(err){
        return res.status(400).json({error:err})
    }
}

export const deleteEndpointController = async (req, res) =>{
    const {id} = req.params
    const {orgId} = req.user
    try{
        const deleteEndpoint = await deleteEndpointService(id, orgId)
        return res.status(200).json({message:"endpoint is successfully deleted", endpoint : deleteEndpoint})
    }
    catch(err){
        return res.status(400).json({error:err})
    }

}