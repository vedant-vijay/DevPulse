import { getOrgByUserId, getRole } from "../repositories/organisation.repository.js"


export function requireRole(allowedRoles) {
    return async (req, res, next) => {
        const {userId} = req.user      

        try{   
            const getOrgId = await getOrgByUserId(userId)
            if(!getOrgId){
                return res.status(403).json({message: 'You are not a member of any organization'})
            }
            
            const role = await getRole(userId, getOrgId) 
            if(allowedRoles.includes(role.role)){
                next()
            }
            else{
                res.status(403).json({message:'the user role is not authorized'})
            }
        }catch(err){
            console.log(err)
            return res.status(500).json({ message: 'Internal server error' })
        }
    }
}