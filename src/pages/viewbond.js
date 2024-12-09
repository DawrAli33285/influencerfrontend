import { ToastContainer,toast } from "react-toastify"
import { MoonLoader } from 'react-spinners';
import { useEffect,useState } from "react";
import axios from "axios";
import { BASE_URL } from "../baseURL";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
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

const navigate=useNavigate();

const getSingleBond=async()=>{
   try{
    let token=localStorage.getItem('token')
    let headers={
        headers:{
            authorization:`Bearer ${token}`
        }
    }
let response=await axios.get(`${BASE_URL}/getSingleBond/${id}`,headers)
setState({
    bond:response.data.bond,
    offer:response.data.offer,
currentIssuer:response.data.
currentIssuer,
    mission:response.data.mission
})
setLoading(false)
console.log("SINGLE BOND RESPONSe")
console.log(response.data)
   }catch(e){
    if(e?.response?.data?.error){
        toast.error(e?.response?.data?.error,{containerId:"viewBondIssuer"})
    }else{
        toast.error("Client error please try again",{containerId:"viewBondIssuer"})
    }
   }
}
useEffect(()=>{
console.log("UPDATED STATAE")
console.log(state)
},[state])


    return (
    <>
    <ToastContainer containerId={"viewBondIssuer"}/>
    
   
        <div className="w-full px-[30px] py-[40px]">
        <div className="flex justify-between items-center">
        <svg onClick={()=>{
          navigate(-1)
        }} className="cursor-pointer" width="35" height="35" fill="#000000" viewBox="0 0 200 200" data-name="Layer 1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><title></title><path d="M160,89.75H56l53-53a9.67,9.67,0,0,0,0-14,9.67,9.67,0,0,0-14,0l-56,56a30.18,30.18,0,0,0-8.5,18.5c0,1-.5,1.5-.5,2.5a6.34,6.34,0,0,0,.5,3,31.47,31.47,0,0,0,8.5,18.5l56,56a9.9,9.9,0,0,0,14-14l-52.5-53.5H160a10,10,0,0,0,0-20Z"></path></g></svg>
{state?.offer || state?.currentIssuer?._id==state?.bond?.issuer_id?'':<button
    onClick={() => {
      navigate(`/buyersponsorbond?id=${id}&total_bonds=${state?.bond?.total_bonds}`);
    }}
    className="p-[10px] bg-[#1DBF73] text-white font-semibold rounded-[10px]"
  >
    Purchase Bond
  </button>}


        </div>
           {loading?<div className="flex justify-center items-center">
            
            <MoonLoader color="#6B33E3" size={100} />
            </div>:<>
           
            <div className="flex justify-between lg:flex-row flex-col items-center mb-[20px]">
                <div className='flex flex-col'>
                    <h1 className="text-[24px] font-semibold">Promise Bond Details</h1>
                    <p className='text-[18px] text-[#74767E]'>This section provides key details about the bond.</p>
                </div>


         

            </div>
            <div className="mt-6">
    {state?.bond?.photos?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {state.bond.photos.map((val, i) => (
                <div 
                    key={i} 
                    className="relative group overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                    <img
                        src={val}
                        alt={`Bond Photo ${i + 1}`}
                        className="w-full h-[200px] md:h-[250px] lg:h-[300px] object-cover"
                    />
                    <div 
                        className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-semibold"
                    >
                        Photo {i + 1}
                    </div>
                </div>
            ))}
        </div>
    ) : (
        <p className="text-center text-gray-500">No photos available.</p>
    )}
</div>

            <div className='flex flex-col'>
                <h1 className="text-[24px] font-semibold">{state?.bond?.title}</h1>
                
            </div>
            <div className='flex flex-col mt-[20px]'>
                <h1 className="text-[18px] font-semibold">Mission</h1>
                <p className="text-[1rem] my-[10px] text-[#74767E] max-h-[150px] overflow-y-auto break-words">{state?.mission?.description?.length>0?state?.mission?.description:`No Mission Found`}</p>
            </div>
         <div className="flex justify-between">
         <div className='flex flex-col mt-[20px]'>
                <h1 className="text-[18px] font-semibold">Validity</h1>
                <p className='text-[16px] text-[#74767E]'>{state?.bond?.validity_number} months</p>
            </div>
            
         </div>
           <div className="flex justify-between">
           <div className='flex flex-col mt-[20px]'>
                <h1 className="text-[18px] font-semibold">Price</h1>
                <p className='text-[16px] text-[#74767E]'>${state?.bond?.bond_issuerance_amount}</p>
            </div>
            <div className='flex flex-col mt-[20px]'>
                <h1 className="text-[18px] font-semibold">Total Bonds</h1>
                <p className='text-[16px] text-[#74767E]'>${state?.bond?.total_bonds}</p>
            </div>
           </div>
           </>}
        </div>

        </>
    )
}