import {createOrg, getOrgById, getOrgByUserId, updateOrg, deleteOrg} from "../repositories/organisation.repository.js"

export async function getOrgByUserIdService(userId){
    if (!userId){
        throw new Error("userId now exist hence organization is not created")
    }

    const getData = await getOrgByUserId(userId)
    const result = await getOrgById(getData)
    if(!getData) {
        throw new Error("Organization not found")
    }

    return result
}

export async function getOrgByIdService(id){
    if(!id){
        throw new Error("Id now exist hence organization is not created")
    }

    const getData = await getOrgById(id)
    if(!getData) {
        throw new Error("Organization not found")
    }

    return getData
}

export async function createOrgService(name, ownerId){
    if(!(name && ownerId)){
        throw new Error("please set the required fields")
    }
    const data = await createOrg(name, ownerId)

    return data
}

export async function updateOrgService(id, name){
    if(!(name && id)){
        throw new Error("please set the required fields")
    }
    const data = await updateOrg(id, name)

    return data
}

export async function deleteOrgService(id){
    const data = await deleteOrg(id)
    return "organisation deleted successfully"
}