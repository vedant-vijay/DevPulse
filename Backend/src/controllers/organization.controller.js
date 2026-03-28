
import {getOrgByIdService, getOrgByUserIdService, createOrgService, updateOrgService, deleteOrgService} from '../services/organisation.service.js'

export const createOrgController = async (req, res) =>{
    const { userId } = req.user
    const { name } = req.body
    if(!(name && userId)){
        return res.status(400).json({message : "please set the empy fields"})
    }

    try{
        await createOrgService(name, userId)
        return res.status(200).json({message:"new organization is created successfully"})
    }catch(err){
        return res.status(400).json({message:"falied to create the organisation"})
    }
}

export const getOrgByIdController = async (req, res)=>{
    const {id} = req.params
    try{
        const getOrgById = await getOrgByIdService(id)
        return res.status(200).json({message:"organisation is fetched", organization : getOrgById})
    }catch(err){
        console.log(err)
        return res.status(400).json({error: err})
    }

}

export const getOrgByUserIdController = async (req, res)=>{
    const {userId} = req.user
    try{
        const getOrgByUserId = await getOrgByUserIdService(userId)
        return res.status(200).json({message:"organisation is fetched", organization : getOrgByUserId})
    }catch(err){
        console.log(err)
        return res.status(400).json({error: err})
    }  
}

export const updateOrgController = async (req, res) => {
    const {id} = req.params
    const {name} = req.body
    if(!(name)){
        return res.status(400).json({message : "please set the empy fields"})
    }

    try{
        const data = await updateOrgService(id, name)
        return res.status(200).json({message:"organisation is successful updated", data : data})

    }catch(err){
        return res.status(400).json({err : err})
    }
}

export const deleteOrgController = async(req, res) =>{
    const {id} = req.params
    try{
        const deleteOrg = await deleteOrgService(id)
        return res.status(200).json({message:"organistation deleted successfully", organization: deleteOrg})
    }catch(err){
        return res.status(400).json({error: err})
    }
}