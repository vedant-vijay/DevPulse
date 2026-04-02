'use client'
import { useState, useContext, createContext } from "react"
import { useEffect } from "react"

const AuthContext = createContext()

export function AuthProvider({children}){
    const [accessToken, setAccessToken] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        setLoading(false)
    }, [])

    return (
        <AuthContext.Provider value={{ accessToken, setAccessToken, loading }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth(){
    return useContext(AuthContext)
}


