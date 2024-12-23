import React from "react"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
const Logout=()=>{
let navigate=useNavigate();
    useEffect(()=>{
localStorage.removeItem('token')
localStorage.removeItem('buyerToken')
localStorage.removeItem('email')
localStorage.removeItem('phoneNumber')
window.location.href='/'
    },[])
    return(
        <>
     
        </>
    )
}

export default Logout