import {findUserByEmail, createUser, saveRefreshToken, findRefreshToken, deleteRefreshToken} from "../repositories/auth.repository.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const ACCsecret = process.env.JWT_SECRET_ACCESS
const REFsecret = process.env.JWT_SECRET_REFRESH

export async function register(email, password) {
    const userEmail = await findUserByEmail(email);

    if(userEmail){
        throw new Error('User already exists')
    }
    const saltRounds = 10
    const passwordHashed = await bcrypt.hash(password, saltRounds)

    const newUser = await createUser(email, passwordHashed, "viewer" )     

    return newUser
}

export async function login(email, password){
    const userEmail = await findUserByEmail(email)
    if(!userEmail){
        throw new Error("user not exist")
    }

    const checkPassword = await bcrypt.compare(password, userEmail.password_hash)

    if(!checkPassword){
        throw new Error("password is wrong")
    }
    const ACCtoken = jwt.sign(
        {
            userId : userEmail.id,
            role : userEmail.role
        },
         ACCsecret,
        {expiresIn :'1h'})

    const REFtoken = jwt.sign(
        {
            userId : userEmail.id,
            role : userEmail.role
        },
         REFsecret,
        {expiresIn :'7d'})

        const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        await saveRefreshToken(userEmail.id, REFtoken, expiresAt)



    return {ACCtoken, REFtoken}
}

export async function refresh(token) {

    const decoded = jwt.verify(token, REFsecret)
    const userToken = await findRefreshToken(token)
    if(!userToken){
        throw new Error("token not found")
    }

    await deleteRefreshToken(userToken.token)

    const ACCtoken = jwt.sign(
        {
            userId : decoded.userId,
            role : decoded.role
        },
        ACCsecret,
        {expiresIn : '1h'})

    const REFtoken = jwt.sign(
        {
            userId : decoded.userId,
            role : decoded.role
        },
        REFsecret,
        {expiresIn:'7d'})

    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)

    await saveRefreshToken(decoded.userId, REFtoken, expiresAt)

    return {ACCtoken, REFtoken}   
}

export async function logout(token) {
    const sessionToken = await findRefreshToken(token)

    if(!sessionToken){
        throw new Error("token not found")
    }

    await deleteRefreshToken(sessionToken.token)


    return { message: 'Logged out successfully' }
    
}