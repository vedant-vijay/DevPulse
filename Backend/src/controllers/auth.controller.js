import {register, login, refresh, logout} from "../services/auth.service.js"

export const registerController = async(req, res)=>{
    const {email, password} = req.body

    if(!(email &&password)){
        return res.status(400).json({ message: 'Email and password are required' })
    }

    try{
         const newUser = await register(email, password)
         return res.status(201).json({message : "user is created", user:newUser})
    }
    catch(err){
        return res.status(400).json({ message : "something went wrong"})
    }
}

export const loginController = async (req,res)=>{
    const {email, password} = req.body

    if(!(email && password)){
        return res.status(400).json({ message: 'Email and password are required' })
    }

    try{
        const user = await login(email, password)
        return res.status(201).cookie('refreshToken', user.REFtoken, {httpOnly:true, secure : true, sameSite:"strict"}).json({token : user.ACCtoken})

    }
    catch(err){
        return res.status(401).json({message:"unauthorized user"})
    }
}

export const refreshController= async (req, res)=>{
    const oldREFtoken = req.cookies.refreshToken
    if(!oldREFtoken){
        return res.status(401).json({message:"something went wrong"})
    }

    try{
        const Tokens = await refresh(oldREFtoken)
        return res.status(201).cookie('refreshToken', Tokens.REFtoken, {httpOnly:true, secure:true, sameSite:"strict"}).json({token:Tokens.ACCtoken})
    }

    catch(err){
        return res.status(401).json({message:"something went wrong"})
    }

}

export const logoutController = async(req, res)=>{
    const oldREFtoken = req.cookies.refreshToken
    if(!oldREFtoken){
        return res.status(401).json({message:"something went wrong"})
    }

    try{
        await logout(oldREFtoken)
        return res.status(200).clearCookie('refreshToken').json({message:"logout successfully"})
    }
    catch(err){
        return res.status(401).json({message:"something went wrong"})
    }
}