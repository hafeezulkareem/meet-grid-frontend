import { createContext, useState } from "react"
import { UserContextType } from "../types"

export const UserContext=createContext<UserContextType | null>(null)

export const UserProvider=({children})=>{
    const [authenticated,setAuthenticated]=useState(false)

    return(
        <UserContext.Provider value={{authenticated,setAuthenticated}}>
            {children}
        </UserContext.Provider>
    )
}
