import jwt from "jsonwebtoken"

const ACCsecret = process.env.JWT_SECRET_ACCESS

export const authMiddleware = (req, res, next)=>{
    const header = req.headers.authorization

    if(!header){
        return res.status(401).json({ message: 'Unauthorized' })
    }
    const REFtoken = header.split(" ")[1]

    try{
        const decoded = jwt.verify(REFtoken, ACCsecret)
        req.user = decoded
        next()
    }
    catch(err){
        return res.status(401).json({ message: 'Unauthorized' })
    }
}