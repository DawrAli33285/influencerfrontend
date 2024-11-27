import { ToastContainer,toast } from "react-toastify"
import { MoonLoader } from 'react-spinners';
import { useEffect,useState } from "react";
import axios from "axios";
import { BASE_URL } from "../baseURL";
import { useParams } from "react-router-dom";
export default function ViewBond() {
    let {id}=useParams();
    const [loading,setLoading]=useState(true)
    const [state,setState]=useState({
        bond:'',
        mission:'',
        offer:''
    })
useEffect(()=>{
getSingleBond();
},[])

const getSingleBond=async()=>{
   try{
let response=await axios.get(`${BASE_URL}/getSingleBond/${id}`)

setState({
    bond:response.data.bond,
    mission:response.data.mission
})
setLoading(false)
console.log("SINGLE BOND RESPONSe")
console.log(response.data)
   }catch(e){
    if(e?.response?.data?.error){
        toast.error(e?.response?.data?.error,{containerId:"viewBuyerBondIssuer"})
    }else{
        toast.error("Client error please try again",{containerId:"viewBuyerBondIssuer"})
    }
   } 
}


    return (
    <>
    <ToastContainer containerId={"viewBuyerBondIssuer"}/>
    
   
        <div className="w-full px-[30px] py-[40px]">
           {loading?<div className="flex justify-center items-center">
            
            <MoonLoader color="#6B33E3" size={100} />
            </div>:<>
            <div className="flex justify-between lg:flex-row flex-col items-center mb-[20px]">
                <div className='flex flex-col'>
                    <h1 className="text-[24px] font-semibold">Promise Bond Details</h1>
                    <p className='text-[18px] text-[#74767E]'>This section provides key details about the bond.</p>
                </div>

                <button className="p-[10px] bg-[#1DBF73] text-white font-semibold rounded-[10px]">
                    Purchase Bond
                </button>

         

            </div>
            <div className='flex flex-col'>
                <h1 className="text-[24px] font-semibold">{state?.bond?.title}</h1>
                
            </div>
            <div className='flex flex-col mt-[20px]'>
                <h1 className="text-[18px] font-semibold">Mission</h1>
                <p className='text-[16px] text-[#74767E]'>{state?.mission?.description?.length>0?state?.mission?.description:`No Mission Found`}</p>
            </div>
            <div className='flex flex-col mt-[20px]'>
                <h1 className="text-[18px] font-semibold">Validity</h1>
                <p className='text-[16px] text-[#74767E]'>{state?.bond?.validity_number}</p>
            </div>
            <div className='flex flex-col mt-[20px]'>
                <h1 className="text-[18px] font-semibold">PRice</h1>
                <p className='text-[16px] text-[#74767E]'>${state?.bond?.bond_issuerance_amount}</p>
            </div>
           </>}
        </div>

        </>
    )
}