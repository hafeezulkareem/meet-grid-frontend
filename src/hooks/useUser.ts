import { useContext, useEffect, useState } from "react"
import Cookies from 'js-cookie'
import { UserContext } from "../context/UserContext"

const useUser=()=>{
    const [userState,setUserState]=useState({loading:true,authenticated:false,error:false})

    const userContext=useContext(UserContext)

    useEffect(()=>{
        (async()=>{
            const jwtToken=Cookies.get("meet")

            if(userContext?.authenticated) {
                setUserState((prev)=>({...prev, authenticated: true, loading: false }))
            }
            else if(jwtToken) {
                const response=await fetch("http://localhost:4000/authenticate", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "authorization": `Bearer ${jwtToken}`
                    },
                })

                if(response.ok) {
                    setUserState({ authenticated: true, loading: false, error: false })
                    userContext?.setAuthenticated(true)
                }
                else {
                    setUserState({ authenticated: false, loading: false, error: true });
                }
            }
            else {
                setUserState((prev)=>({...prev, authenticated: false, loading: false }))
            }
        })()
    },[])

    return userState
}

export default useUser