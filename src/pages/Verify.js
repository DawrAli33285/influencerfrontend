import axios from "axios";
import React,{useEffect,useState} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer,toast } from "react-toastify";
import { BASE_URL } from "../baseURL";
import { MoonLoader } from "react-spinners";



const Verify=()=>{
const location=useLocation();
const navigate=useNavigate();
useEffect(()=>{
verifyAndRedirect();
},[])
const verifyAndRedirect=async()=>{
try{
let params=new URLSearchParams(location.search)
let email=params.get('verify')
let response=await axios.get(`${BASE_URL}/verifyNow/${email}`)
toast.success("Email verified sucessfully",{containerId:"verify"})
setTimeout(()=>{
navigate('/verification?verified=true')
},500)
}catch(e){
if(e?.response?.data?.error){
    toast.error(e?.response?.data?.error,{containerId:"verify"})
}else{
    toast.error("Oops something went wrong",{containerId:"verify"})
}
}
}


    return(
        <>
<ToastContainer containerId={"verify"}/>
<div className="flex items-center justify-center h-screen w-screen bg-gray-100">
        <MoonLoader color="#6B33E3" size={100} />
      </div>
        </>
    )
}

export default Verify;