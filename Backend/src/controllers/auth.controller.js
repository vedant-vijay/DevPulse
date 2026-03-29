import {register, login, refresh, logout} from "../services/auth.service.js"

export const registerController = async(req, res, next)=>{
    const {email, password} = req.body

    if(!(email &&password)){
        const error = new Error('Email and password are required')
        error.statusCode = 400
        return next(error)
    }

    try{
         const newUser = await register(email, password)
         return res.status(201).json({message : "user is created", user:newUser})
    }
    catch(err) {
        next(err)
    }

}

export const loginController = async (req,res, next)=>{
    const {email, password} = req.body

    if(!(email && password)){
        const error = new Error('Email and password are required')
        error.statusCode = 400
        return next(error)
    }

    try{
        const user = await login(email, password)
        return res.status(201).cookie('refreshToken', user.REFtoken, {httpOnly:true, secure : true, sameSite:"strict"}).json({token : user.ACCtoken})

    }
    catch(err) {
        next(err)
    }
}

export const refreshController= async (req, res, next)=>{
    const oldREFtoken = req.cookies.refreshToken
    if(!oldREFtoken){
        const error = new Error('Refresh token not found')
        error.statusCode = 401
        return next(error)
    }

    try{
        const Tokens = await refresh(oldREFtoken)
        return res.status(201).cookie('refreshToken', Tokens.REFtoken, {httpOnly:true, secure:true, sameSite:"strict"}).json({token:Tokens.ACCtoken})
    }

    catch(err) {
        next(err)
    }

}

export const logoutController = async(req, res, next)=>{
    const oldREFtoken = req.cookies.refreshToken
    if(!oldREFtoken){
        const error = new Error('Refresh token not found')
        error.statusCode = 401
        return next(error)
    }

    try{
        await logout(oldREFtoken)
        return res.status(200).clearCookie('refreshToken').json({message:"logout successfully"})
    }
    catch(err) {
        next(err)
    }
}