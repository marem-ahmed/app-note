import { createContext, useState } from "react";

export let TokenContext=createContext()

export default function TokenContextProvider( props){
    const [token,settoken] = useState(null)

    return <TokenContext.Provider value={{token,settoken}}>
{props.children}
    </TokenContext.Provider>
}
