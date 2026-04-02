'use client'

import { useEffect }  from "react"
import { useRouter } from "next/navigation"
import { useAuth} from "../context/AuthContext.js"

function Dashboard(){
    const {accessToken, loading} = useAuth()
    const router = useRouter()

    useEffect(()=>{
        if(!loading && accessToken === null ){
            router.push('/login')
        }
    },[accessToken, loading])

    return(
        <h1>Dashboard</h1>
    )
}

export default Dashboard