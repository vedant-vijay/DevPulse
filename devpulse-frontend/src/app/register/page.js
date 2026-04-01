'use client'
import { useState } from "react"

function Register(){
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [confirmPassword, setConfirmPassword] = useState()

    async function submitHandler(email, password, confirmPassword){
        if(!(password === confirmPassword)){
            alert("please add valid confirm password")
            throw new Error("password does not match")
            
        }
        const response = await fetch("http://localhost:3000/auth/v1/register", {
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

            <input
                value ={confirmPassword}
                onChange={(e)=>setConfirmPassword(e.target.value)}
                placeholder="re-enter password here"

            ></input>

            <button onClick={()=>submitHandler(email, password, confirmPassword)}>Register</button>
        </form>

        
        
    )
}

export default Register