'use client'
import { useState } from "react"
import { useAuth } from "../context/AuthContext"
import { useRouter } from "next/navigation"

function Login(){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { setAccessToken } = useAuth()
    const router = useRouter()

    async function submitHandler(email, password){
        const response = await fetch("http://localhost:3000/auth/v1/login", {
            method : "POST",
            headers : {
                'Content-Type' : 'application/json'
            },
            'credentials' : 'include',
            body : JSON.stringify({email, password})
        })

        if (!response.ok) {
            const errorData = await response.json(); 
            throw new Error(`An error occurred: ${response.status} - ${errorData.message || response.statusText}`);
            }

            const responseData = await response.json(); 
            console.log('Success:', responseData);
            setAccessToken(responseData.token)
            router.push('/dashboard')
            return responseData;
    }

    return(
        <form>
            <input 
                value={email}
                onChange={(e)=>setEmail(e.target.value)} 
                placeholder="enter email here">
            </input>

            <input 
                value={password} 
                onChange={(e)=>setPassword(e.target.value)} 
                placeholder="enter password here">
            </input>

            <button type="button" onClick={()=>submitHandler(email, password)}>login</button>
        </form>

        
        
    )
}

export default Login