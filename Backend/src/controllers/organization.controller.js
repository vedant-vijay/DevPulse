
import {getOrgByIdService, getOrgByUserIdService, createOrgService, updateOrgService, deleteOrgService} from '../services/organisation.service.js'

export const createOrgController = async (req, res, next) =>{
    const { userId } = req.user
    const { name } = req.body
    if(!(name && userId)){
        const error = new Error('Name and user are required')
        error.statusCode = 400
        return next(error)
    }
    try{
        await createOrgService(name, userId)
        return res.status(200).json({message:"new organization is created successfully"})
    }catch(err) {
        next(err)
    }
}

export const getOrgByIdController = async (req, res, next)=>{
    const {id} = req.params
    try{
        const getOrgById = await getOrgByIdService(id)
        return res.status(200).json({message:"organisation is fetched", organization : getOrgById})
    }catch(err) {
        next(err)
    }
}

export const getOrgByUserIdController = async (req, res, next)=>{
    const {userId} = req.user
    try{
        const getOrgByUserId = await getOrgByUserIdService(userId)
        return res.status(200).json({message:"organisation is fetched", organization : getOrgByUserId})
    }catch(err) {
        next(err)
    }
}

export const updateOrgController = async (req, res, next) => {
    const {id} = req.params
    const {name} = req.body
    if(!(name)){
        const error = new Error('Name is required')
        error.statusCode = 400
        return next(error)
    }
    try{
        const data = await updateOrgService(id, name)
        return res.status(200).json({message:"organisation is successful updated", data : data})

    }catch(err) {
        next(err)
    }
}

export const deleteOrgController = async(req, res, next) =>{
    const {id} = req.params
    try{
        const deleteOrg = await deleteOrgService(id)
        return res.status(200).json({message:"organistation deleted successfully", organization: deleteOrg})
    }catch(err) {
        next(err)
    }
}