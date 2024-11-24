import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import avatar from "../avatar.webp"
import { useDropzone } from 'react-dropzone';
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";
  import 'react-toastify/dist/ReactToastify.css';
import { BASE_URL } from "../baseURL";
import { BondListContext } from "../contextAPI/bondListing";
import { MissionListContext } from "../contextAPI/missionListing";
import { useContext } from "react";
export default function DashboardHeader({ children }) {
    const location = useLocation();
    const [bondpopup, setBondPopup] = useState(false)
    const [missionpopup, setMissionPopup] = useState(false)
    const [sponsorData,setBondData]=useState([])
    const [menupopup, setMenuPopup] = useState(false)
    const [uploadedImages, setUploadedImages] = useState([]);
    const {state,setState}=useContext(BondListContext)
    const {missionStateContext,setMissionStateContext}=useContext(MissionListContext)
    const [missionState,setMissionState]=useState({
        bond_id:'',
        description:'',
        task_type:''
    })
    const [bondstate,setBondState]=useState({
        quantity:0,
        bond_price:0,
        validity_number:'',
    
        title:''
    })
    const [links, setLinks] = useState([]);
    const handleAddLink = () => {
        setLinks([...links, '']);
    };
    const handleLinkChange = (index, value) => {
        const newLinks = [...links];
        newLinks[index] = value;
        setLinks(newLinks);
    };
    const onDrop = (acceptedFiles) => {
        setUploadedImages((prevImages) => [...prevImages, ...acceptedFiles]);
    };

    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/*',
        multiple: true,
        onDrop,
    });

    const createBond=async()=>{
        if (uploadedImages?.length === 0) {
            toast.dismiss();
            toast.error("Please select images for verification",{containerId:'containerC'});
            return;  // Exit the function early if validation fails
          }
        
          // Check if links are empty
          if (links?.length === 0) {
            toast.dismiss();
            toast.error("Please enter social media link",{containerId:"containerC"});
            return;  // Exit the function early if validation fails
          }
        
          // Validate individual links
          if (links?.length > 0) {
            for (let i = 0; i < links.length; i++) {
              if (!links[i] || links[i].length === 0) {
                toast.dismiss();
                toast.error("Please enter a valid social media link",{containerId:"containerC"});
                return;  // Exit the function early if validation fails
              }
            }
          }
        
          // Validate bondstate fields
          if (bondstate.validity_number.length === 0) {
            toast.dismiss();
            toast.error("Please select validity number",{containerId:"containerC"});
            return;  // Exit the function early if validation fails
          }
        
          if (bondstate.title.length === 0) {
            toast.dismiss();
            toast.error("Please enter title of bond",{containerId:"containerC"});
            return;  // Exit the function early if validation fails
          }
        
          if (bondstate.quantity === 0 || bondstate.quantity.length === 0) {
            toast.dismiss();
            toast.error("Please enter valid quantity",{containerId:"containerC"});
            return;  // Exit the function early if validation fails
          }
        
          if (bondstate.bond_price === 0 || bondstate.bond_price.length === 0) {
            toast.dismiss();
            toast.error("Please enter valid price",{containerId:"containerC"});
            return;  // Exit the function early if validation fails
          }
        
        try{
     
      
            let formData=new FormData();
            formData.append('quantity',bondstate.quantity)
            formData.append('bond_price',bondstate.bond_price)
            formData.append('title',bondstate.title)
            formData.append('validity_number',bondstate.validity_number)
           
            uploadedImages.forEach((image) => {
                formData.append('photos', image); 
            });
            const token=localStorage.getItem('token')
            let headers={
                headers:{
                    authorization:`Bearer ${token}`
                }
            }
            formData.append('social_media_links',links)
let response=await axios.post(`${BASE_URL}/createBond`,formData,headers)
toast.success(response?.data?.message,{containerId:"containerC"})
setBondPopup(!bondpopup)
setState((prev)=>{
    let old;
    if(prev?.length>0){
old=[...prev,{
    quantity:bondstate.quantity,
    bond_price:bondstate.bond_price,
    total_bonds:bondstate.quantity,
    bond_issuerance_amount:bondstate.bond_price*bondstate.quantity,
    title:bondstate.title,
    createdAt:Date.now(),
    validity_number:bondstate.validity_number,
      status:"PENDING"
}]
    }else{
old=[{
    quantity:bondstate.quantity,
    total_bonds:bondstate.quantity,
    bond_issuerance_amount:bondstate.bond_price*bondstate.quantity,
    bond_price:bondstate.bond_price,
    createdAt:Date.now(),
    title:bondstate.title,
    validity_number:bondstate.validity_number,
    status:"PENDING"
}]
    }
    return old;
})
setBondState({
    quantity:0,
    bond_price:0,
    title:'',
    validity_number:0
})
setUploadedImages([])
setLinks([])

        }catch(e){
if(e?.response?.data?.error){
    toast.error(e?.response?.data?.error,{containerId:"containerC"})
  
    return;
}
        }
    }
    useEffect(()=>{
        fetchBondList();
    },[])

    const fetchBondList=async()=>{
        try{
  let token=localStorage.getItem('token')
  let headers={
    headers:{
        authorization:`Bearer ${token}`
    }
  }          
let response=await axios.get(`${BASE_URL}/bond-withoutMissions`,headers)
console.log(response.data)
console.log("NO MISSION BOND")
setBondData(response.data.bondsList)

   

        }catch(e){

        }
    }

const createMission=async()=>{
try{
    if(missionState.bond_id.length===0){
        toast.dismiss()
        toast.error("Please select bond",{containerId:"containerC"})
        return;
    }else if(missionState.task_type.length===0){
        toast.dismiss()
        toast.error("Please select mission",{containerId:"containerC"})
        return;
    }else if(missionState.description.length===0){
        toast.dismiss()
        toast.error("Please enter mission description",{containerId:"containerC"})
        return;
    }
let response=await axios.post(`${BASE_URL}/create-mission`,missionState)
console.log(response.data)
toast.dismiss();
toast.success("Mission created sucessfully",{containerId:"containerC"})
setBondData((prev)=>{
 let old;
 if(prev?.length===0){
    return [];
 }else{
    old=prev?.filter(u=>u._id!==missionState.bond_id)
    return old
 }
})
setMissionStateContext((prev) => {

    const updatedContext = prev && prev.length > 0 ? [...prev, response.data.getMission] : [response.data.getMission];

    return updatedContext;
});
setMissionState({
    bond_id:'',
    description:'',
    task_type:''
})


setMissionPopup(!missionpopup)

}catch(e){
if(e?.response?.data?.error){
    toast.dismiss()
    toast.error(e?.response?.data?.error,{containerId:"containerC"})
}else{
    toast.dismiss()
    toast.error("Client error please try again",{containerId:"containerC"})
}
}
}
const navigate=useNavigate()
    return (
<>
<ToastContainer containerId="containerC"  limit={1}/>
<div className="w-full bg-[#E1E1E1] relative  flex">
            <div className="xl:w-[20%] hidden xl:flex flex-col px-[20px] rounded-tr-[20px] rounded-br-[20px] py-[40px] justify-between bg-[#1DBF73]">
                <div className="flex flex-col gap-[10px]">
                    <h1 className="text-white text-[24px] font-semibold mb-[20px]">LOGOIPSUM</h1>
                    <Link
                        to="/dashboard"
                        className={`flex gap-[10px] rounded-[20px] items-center py-[10px] px-[20px] text-[18px] ${location.pathname === '/dashboard' ? 'bg-white text-[#1DBF73]' : 'text-white'}`}
                    >
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 13V15M10 9V15M14 5V15M5.8 19H14.2C15.8802 19 16.7202 19 17.362 18.673C17.9265 18.3854 18.3854 17.9265 18.673 17.362C19 16.7202 19 15.8802 19 14.2V5.8C19 4.11984 19 3.27976 18.673 2.63803C18.3854 2.07354 17.9265 1.6146 17.362 1.32698C16.7202 1 15.8802 1 14.2 1H5.8C4.11984 1 3.27976 1 2.63803 1.32698C2.07354 1.6146 1.6146 2.07354 1.32698 2.63803C1 3.27976 1 4.11984 1 5.8V14.2C1 15.8802 1 16.7202 1.32698 17.362C1.6146 17.9265 2.07354 18.3854 2.63803 18.673C3.27976 19 4.11984 19 5.8 19Z" stroke={`${location.pathname === '/dashboard' ? '#1DBF73' : 'white'}`} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>

                        Dashboard
                    </Link>
                    <Link
                        to="/sponsorbond"
                        className={`flex gap-[10px] rounded-[20px] items-center py-[10px] px-[20px] text-[18px] ${location.pathname === '/sponsorbond' ? 'bg-white text-[#1DBF73]' : 'text-white'}`}
                    >
                        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.10102 3C10.3636 1.76281 12.0927 1 14 1C17.866 1 21 4.13401 21 8C21 9.90734 20.2372 11.6365 18.9999 12.899M6.5 12L8 11V16.5M6.5 16.5H9.5M15 14C15 17.866 11.866 21 8 21C4.13401 21 1 17.866 1 14C1 10.134 4.13401 7 8 7C11.866 7 15 10.134 15 14Z" stroke={`${location.pathname === '/sponsorbond' ? '#1DBF73' : 'white'}`} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>

                        Sponsor Bond
                    </Link>
                    <Link
                        to="/mission"
                        className={`flex gap-[10px] rounded-[20px] items-center py-[10px] px-[20px] text-[18px] ${location.pathname === '/mission' ? 'bg-white text-[#1DBF73]' : 'text-white'}`}
                    >
                        <svg width="18" height="22" viewBox="0 0 18 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13 3C13.93 3 14.395 3 14.7765 3.10222C15.8117 3.37962 16.6204 4.18827 16.8978 5.22354C17 5.60504 17 6.07003 17 7V16.2C17 17.8802 17 18.7202 16.673 19.362C16.3854 19.9265 15.9265 20.3854 15.362 20.673C14.7202 21 13.8802 21 12.2 21H5.8C4.11984 21 3.27976 21 2.63803 20.673C2.07354 20.3854 1.6146 19.9265 1.32698 19.362C1 18.7202 1 17.8802 1 16.2V7C1 6.07003 1 5.60504 1.10222 5.22354C1.37962 4.18827 2.18827 3.37962 3.22354 3.10222C3.60504 3 4.07003 3 5 3M6 14L8 16L12.5 11.5M6.6 5H11.4C11.9601 5 12.2401 5 12.454 4.89101C12.6422 4.79513 12.7951 4.64215 12.891 4.45399C13 4.24008 13 3.96005 13 3.4V2.6C13 2.03995 13 1.75992 12.891 1.54601C12.7951 1.35785 12.6422 1.20487 12.454 1.10899C12.2401 1 11.9601 1 11.4 1H6.6C6.03995 1 5.75992 1 5.54601 1.10899C5.35785 1.20487 5.20487 1.35785 5.10899 1.54601C5 1.75992 5 2.03995 5 2.6V3.4C5 3.96005 5 4.24008 5.10899 4.45399C5.20487 4.64215 5.35785 4.79513 5.54601 4.89101C5.75992 5 6.03995 5 6.6 5Z" stroke={`${location.pathname === '/mission' ? '#1DBF73' : 'white'}`} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>

                        Mission
                    </Link>
                </div>
                <div className="flex flex-col gap-[10px]">
                    <Link
                        to="/"
                        className={`flex gap-[10px] rounded-[20px] items-center py-[10px] px-[20px] text-[18px] ${location.pathname === '/settings' ? 'bg-white text-[#1DBF73]' : 'text-white'}`}
                    >
                        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11 14C12.6569 14 14 12.6569 14 11C14 9.34315 12.6569 8 11 8C9.34315 8 8 9.34315 8 11C8 12.6569 9.34315 14 11 14Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M17.7273 13.7273C17.6063 14.0015 17.5702 14.3056 17.6236 14.6005C17.6771 14.8954 17.8177 15.1676 18.0273 15.3818L18.0818 15.4364C18.2509 15.6052 18.385 15.8057 18.4765 16.0265C18.568 16.2472 18.6151 16.4838 18.6151 16.7227C18.6151 16.9617 18.568 17.1983 18.4765 17.419C18.385 17.6397 18.2509 17.8402 18.0818 18.0091C17.913 18.1781 17.7124 18.3122 17.4917 18.4037C17.271 18.4952 17.0344 18.5423 16.7955 18.5423C16.5565 18.5423 16.3199 18.4952 16.0992 18.4037C15.8785 18.3122 15.678 18.1781 15.5091 18.0091L15.4545 17.9545C15.2403 17.745 14.9682 17.6044 14.6733 17.5509C14.3784 17.4974 14.0742 17.5335 13.8 17.6545C13.5311 17.7698 13.3018 17.9611 13.1403 18.205C12.9788 18.4489 12.8921 18.7347 12.8909 19.0273V19.1818C12.8909 19.664 12.6994 20.1265 12.3584 20.4675C12.0174 20.8084 11.5549 21 11.0727 21C10.5905 21 10.1281 20.8084 9.78708 20.4675C9.4461 20.1265 9.25455 19.664 9.25455 19.1818V19.1C9.24751 18.7991 9.15011 18.5073 8.97501 18.2625C8.79991 18.0176 8.55521 17.8312 8.27273 17.7273C7.99853 17.6063 7.69437 17.5702 7.39947 17.6236C7.10456 17.6771 6.83244 17.8177 6.61818 18.0273L6.56364 18.0818C6.39478 18.2509 6.19425 18.385 5.97353 18.4765C5.7528 18.568 5.51621 18.6151 5.27727 18.6151C5.03834 18.6151 4.80174 18.568 4.58102 18.4765C4.36029 18.385 4.15977 18.2509 3.99091 18.0818C3.82186 17.913 3.68775 17.7124 3.59626 17.4917C3.50476 17.271 3.45766 17.0344 3.45766 16.7955C3.45766 16.5565 3.50476 16.3199 3.59626 16.0992C3.68775 15.8785 3.82186 15.678 3.99091 15.5091L4.04545 15.4545C4.25503 15.2403 4.39562 14.9682 4.4491 14.6733C4.50257 14.3784 4.46647 14.0742 4.34545 13.8C4.23022 13.5311 4.03887 13.3018 3.79497 13.1403C3.55107 12.9788 3.26526 12.8921 2.97273 12.8909H2.81818C2.33597 12.8909 1.87351 12.6994 1.53253 12.3584C1.19156 12.0174 1 11.5549 1 11.0727C1 10.5905 1.19156 10.1281 1.53253 9.78708C1.87351 9.4461 2.33597 9.25455 2.81818 9.25455H2.9C3.2009 9.24751 3.49273 9.15011 3.73754 8.97501C3.98236 8.79991 4.16883 8.55521 4.27273 8.27273C4.39374 7.99853 4.42984 7.69437 4.37637 7.39947C4.3229 7.10456 4.18231 6.83244 3.97273 6.61818L3.91818 6.56364C3.74913 6.39478 3.61503 6.19425 3.52353 5.97353C3.43203 5.7528 3.38493 5.51621 3.38493 5.27727C3.38493 5.03834 3.43203 4.80174 3.52353 4.58102C3.61503 4.36029 3.74913 4.15977 3.91818 3.99091C4.08704 3.82186 4.28757 3.68775 4.50829 3.59626C4.72901 3.50476 4.96561 3.45766 5.20455 3.45766C5.44348 3.45766 5.68008 3.50476 5.9008 3.59626C6.12152 3.68775 6.32205 3.82186 6.49091 3.99091L6.54545 4.04545C6.75971 4.25503 7.03183 4.39562 7.32674 4.4491C7.62164 4.50257 7.9258 4.46647 8.2 4.34545H8.27273C8.54161 4.23022 8.77093 4.03887 8.93245 3.79497C9.09397 3.55107 9.18065 3.26526 9.18182 2.97273V2.81818C9.18182 2.33597 9.37338 1.87351 9.71435 1.53253C10.0553 1.19156 10.5178 1 11 1C11.4822 1 11.9447 1.19156 12.2856 1.53253C12.6266 1.87351 12.8182 2.33597 12.8182 2.81818V2.9C12.8193 3.19253 12.906 3.47834 13.0676 3.72224C13.2291 3.96614 13.4584 4.15749 13.7273 4.27273C14.0015 4.39374 14.3056 4.42984 14.6005 4.37637C14.8954 4.3229 15.1676 4.18231 15.3818 3.97273L15.4364 3.91818C15.6052 3.74913 15.8057 3.61503 16.0265 3.52353C16.2472 3.43203 16.4838 3.38493 16.7227 3.38493C16.9617 3.38493 17.1983 3.43203 17.419 3.52353C17.6397 3.61503 17.8402 3.74913 18.0091 3.91818C18.1781 4.08704 18.3122 4.28757 18.4037 4.50829C18.4952 4.72901 18.5423 4.96561 18.5423 5.20455C18.5423 5.44348 18.4952 5.68008 18.4037 5.9008C18.3122 6.12152 18.1781 6.32205 18.0091 6.49091L17.9545 6.54545C17.745 6.75971 17.6044 7.03183 17.5509 7.32674C17.4974 7.62164 17.5335 7.9258 17.6545 8.2V8.27273C17.7698 8.54161 17.9611 8.77093 18.205 8.93245C18.4489 9.09397 18.7347 9.18065 19.0273 9.18182H19.1818C19.664 9.18182 20.1265 9.37338 20.4675 9.71435C20.8084 10.0553 21 10.5178 21 11C21 11.4822 20.8084 11.9447 20.4675 12.2856C20.1265 12.6266 19.664 12.8182 19.1818 12.8182H19.1C18.8075 12.8193 18.5217 12.906 18.2778 13.0676C18.0339 13.2291 17.8425 13.4584 17.7273 13.7273Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>


                        Settings
                    </Link>
                 
                    <div
                                    onClick={()=>{
                                        navigate('/')
                                        localStorage.removeItem("token")
localStorage.removeItem("buyerToken")
                                    }}
                                    className={`flex gap-[10px] rounded-[20px] items-center py-[10px] px-[20px] text-[18px] ${location.pathname === '/logout' ? 'bg-white text-[#1DBF73]' : 'text-white'}`}
                                >
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M14 15L19 10M19 10L14 5M19 10H7M10 15C10 15.93 10 16.395 9.89778 16.7765C9.62038 17.8117 8.81173 18.6204 7.77646 18.8978C7.39496 19 6.92997 19 6 19H5.5C4.10218 19 3.40326 19 2.85195 18.7716C2.11687 18.4672 1.53284 17.8831 1.22836 17.1481C1 16.5967 1 15.8978 1 14.5V5.5C1 4.10217 1 3.40326 1.22836 2.85195C1.53284 2.11687 2.11687 1.53284 2.85195 1.22836C3.40326 1 4.10218 1 5.5 1H6C6.92997 1 7.39496 1 7.77646 1.10222C8.81173 1.37962 9.62038 2.18827 9.89778 3.22354C10 3.60504 10 4.07003 10 5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>


                                    Logout
                                </div>
                </div>
            </div>
            <div className="xl:w-[80%] w-full gap-[20px] px-[20px] py-[40px] flex flex-col">
                <div className="w-full rounded-[10px] px-[20px] py-[20px] flex justify-between items-center bg-white">
                    <div className="xl:hidden block hover:cursor-pointer" onClick={() => setMenuPopup(!menupopup)}>
                        <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M5 12H20" stroke="#1DBF73" stroke-width="2" stroke-linecap="round"></path> <path d="M5 17H20" stroke="#1DBF73" stroke-width="2" stroke-linecap="round"></path> <path d="M5 7H20" stroke="#1DBF73" stroke-width="2" stroke-linecap="round"></path> </g></svg>
                    </div>
                    <h1 className="text-[#1DBF73] text-[24px] font-semibold">
                        {location.pathname
                            .replace('/', '')
                            .split('/')[0]
                            .charAt(0).toUpperCase() +
                            location.pathname.slice(2)}
                    </h1>
                    <div className="flex items-center gap-[10px]">
                        <div className="flex items-center">
                            {
                                location.pathname == "/sponsorbond" ? <div className="flex bg-[#E9EFFD] text-[#1DBF73] px-[20px] gap-[20px] items-center font-semibold hover:cursor-pointer py-[10px] rounded-[20px]" onClick={() => setBondPopup(!bondpopup)}>
                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M11 6H6M6 6H1M6 6V1M6 6V11" stroke="#1DBF73" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                    <div className="lg:block hidden"> Create New Bond </div>
                                </div> : location.pathname == "/mission" ? <div className="flex bg-[#E9EFFD] text-[#1DBF73] gap-[20px] items-center font-semibold hover:cursor-pointer px-[20px] py-[10px] rounded-[20px]" onClick={() => setMissionPopup(!missionpopup)}>
                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M11 6H6M6 6H1M6 6V1M6 6V11" stroke="#1DBF73" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                    <div className="lg:block hidden"> Setup New Mission</div>
                                </div> : ''
                            }
                        </div>
                        <div className="rounded-[100%] w-[40px] h-[40px] xl:mr-[40px]">

                            <img src={avatar} alt="img" className="w-full h-full object-cover rounded-[100%]" />
                        </div>
                    </div>
                </div>
                {children}
            </div>
            {
                bondpopup && (
                    <div className="absolute w-full h-full flex justify-center items-center px-[20px] bg-[#00000085]">
                        <div className="bg-white flex h-[90%] overflow-auto flex-col gap-[10px] rounded-[20px] p-[20px] max-w-[800px] w-full">
                            <h1 className="text-[24px] font-semibold">
                                Create New Bond
                            </h1>
                            <h1 className="text-[18px]">Upload Image</h1>
                            <div
                                {...getRootProps()}
                                className="border-2 border-dashed border-gray-300 p-[20px] text-center rounded-[10px] cursor-pointer"
                            >
                                <div className="flex justify-center w-full">
                                    <svg width="80" height="66" viewBox="0 0 80 66" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M41.1612 28.0748C41.0947 27.9859 41.0096 27.9141 40.9125 27.8647C40.8154 27.8152 40.7089 27.7896 40.6009 27.7896C40.4929 27.7896 40.3863 27.8152 40.2892 27.8647C40.1921 27.9141 40.1071 27.9859 40.0405 28.0748L30.0787 41.2433C29.9966 41.3529 29.9456 41.4844 29.9316 41.6228C29.9177 41.7612 29.9413 41.9009 29.9997 42.026C30.0582 42.1511 30.1491 42.2564 30.2622 42.33C30.3752 42.4036 30.5058 42.4425 30.639 42.4422H37.2121V64.969C37.2121 65.3779 37.5323 65.7124 37.9236 65.7124H43.2603C43.6517 65.7124 43.9719 65.3779 43.9719 64.969V42.4514H50.5627C51.1586 42.4514 51.4877 41.7359 51.1231 41.2526L41.1612 28.0748Z" fill="#667085" />
                                        <path d="M66.497 19.497C62.4233 8.27074 52.0434 0.287842 39.8847 0.287842C27.7259 0.287842 17.346 8.26144 13.2723 19.4877C5.64975 21.5787 0.0195312 28.8367 0.0195312 37.4608C0.0195312 47.7298 7.9801 56.0473 17.7996 56.0473H21.3663C21.7577 56.0473 22.0779 55.7127 22.0779 55.3038V49.7279C22.0779 49.319 21.7577 48.9844 21.3663 48.9844H17.7996C14.8022 48.9844 11.9826 47.7391 9.88353 45.4809C7.79332 43.2319 6.68151 40.2023 6.77935 37.0612C6.8594 34.6078 7.6599 32.3031 9.10971 30.3608C10.5951 28.3813 12.6764 26.9409 14.989 26.2996L18.36 25.3796L19.5963 21.9783C20.3612 19.8594 21.4286 17.8799 22.7717 16.0864C24.0976 14.3086 25.6682 12.7459 27.4324 11.449C31.088 8.76328 35.3929 7.34141 39.8847 7.34141C44.3764 7.34141 48.6813 8.76328 52.337 11.449C54.107 12.7501 55.6724 14.3113 56.9977 16.0864C58.3407 17.8799 59.4081 19.8687 60.173 21.9783L61.4004 25.3703L64.7626 26.2996C69.5834 27.6564 72.9544 32.238 72.9544 37.4608C72.9544 40.5369 71.807 43.4364 69.7257 45.611C68.705 46.6837 67.4908 47.5342 66.1534 48.1132C64.8159 48.6923 63.3818 48.9884 61.9341 48.9844H58.3674C57.9761 48.9844 57.6559 49.319 57.6559 49.7279V55.3038C57.6559 55.7127 57.9761 56.0473 58.3674 56.0473H61.9341C71.7536 56.0473 79.7142 47.7298 79.7142 37.4608C79.7142 28.846 74.1018 21.5972 66.497 19.497Z" fill="#667085" />
                                    </svg>
                                </div>
                                <input {...getInputProps()} />
                                <p className="text-[16px] text-[#667085] my-[10px]">Drag and Drop Here</p>
                                <p className="text-[16px] text-[#667085] my-[10px]">or</p>
                                <div className="bg-[#F1EBFE] text-[#7638F9] text-[16px] font-semibold px-[20px] py-[10px] w-fit rounded-[20px] mx-auto">Browse Images</div>
                            </div>
                            <div className="flex flex-wrap gap-[10px] my-[10px]">
                                {uploadedImages.length > 0 &&
                                    uploadedImages.map((file, index) => (
                                        <div key={index} className="w-[100px] h-[100px] bg-gray-200 p-[5px] rounded-[10px]">
                                            <img
                                                src={URL.createObjectURL(file)}
                                                alt="uploaded"
                                                className="w-full h-full object-cover rounded-[10px]"
                                            />
                                        </div>
                                    ))}
                            </div>
                            <div>
                                <label htmlFor="socialLink" className="block text-xl  font-semibold text-[#272226]">Social Media Link</label>
                                {links.map((link, index) => (
                                    <div key={index} className="mt-4">
                                        <input
                                            type="text"
                                            name={`socialLink-${index}`}
                                            value={link}
                                            onChange={(e) => handleLinkChange(index, e.target.value)}
                                            className="mt-1 block w-full px-3 py-4 border rounded-[20px] border-gray-300 focus:outline-none focus:ring focus:border-blue-500"
                                            placeholder={`Link ${index + 1}`}
                                        />
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={handleAddLink}
                                    className="mt-4 px-6 py-2 bg-[#7638F9] text-white font-semibold rounded-[20px] hover:bg-blue-600"
                                >
                                    Add More Links
                                </button>

                            </div>
                            <div>
  <label htmlFor="validitynumber" className="block text-xl font-semibold text-[#272226]">Validity Number</label>
  <div className="mt-4">
    <select
    value={bondstate.validity_number}
    onChange={(e)=>{
    setBondState({
    ...bondstate,
    validity_number:e.target.value
    })
    }}
      name="validitynumber"
      className="mt-1 block w-full px-3 py-4 border rounded-[20px] border-gray-300 focus:outline-none focus:ring focus:border-blue-500"
    >
      <option value="">Select validity</option>
      {Array.from({ length: 16 }, (_, index) => {
        const months = (index + 3) * 2;  
        return (
          months <= 36 && (
            <option key={months} value={months}>
              {months} months
            </option>
          )
        );
      })}
    </select>
  </div>
</div>



                            <div className="mt-[10px]">
                                <label htmlFor="title" className="block text-xl  font-semibold text-[#272226]">Title</label>
                                <input
                                value={bondstate.title}
                                    type="text"
                                    name="title"
                                    placeholder="Enter Title"
                                    className="mt-4 block w-full px-3 py-4 border rounded-[20px] border-gray-300 focus:outline-none focus:ring focus:border-blue-500"
                                  onChange={(e)=>{
                                    setBondState({
                                        ...bondstate,
                                        title:e.target.value
                                    })
                                  }}
                                />

                            </div>
                            <div className="mt-[10px]">
                                <label htmlFor="quantity" className="block text-xl  font-semibold text-[#272226]">Quantity</label>
                                <input
                                value={bondstate.quantity}
                                    type="text"
                                    name="quantity"
                                    placeholder="Enter Quantity"
                                    className="mt-4 block w-full px-3 py-4 border rounded-[20px] border-gray-300 focus:outline-none focus:ring focus:border-blue-500"
                                  onChange={(e)=>{
                                    setBondState({
                                        ...bondstate,
                                        quantity:e.target.value
                                    })
                                  }}
                                />

                            </div>
                            <div className="mt-[10px]">
                                <label htmlFor="price" className="block text-xl  font-semibold text-[#272226]">Bond Price</label>
                                <input
                                value={bondstate.bond_price}
                                    type="text"
                                    name="price"
                                    className="mt-4 block w-full px-3 py-4 border rounded-[20px] border-gray-300 focus:outline-none focus:ring focus:border-blue-500"
                                    placeholder="Enter Bond Price"
                                    onChange={(e)=>{
                                        setBondState({
                                            ...bondstate,
                                            bond_price:e.target.value
                                        })
                                    }}
                                />

                            </div>
                            <div className="hover:cursor-pointer flex flex-col justify-between mt-4 gap-[10px] xl:flex-row">
                                <div onClick={() => setBondPopup(!bondpopup)} className="border-[1px] rounded-[10px] w-full xl:w-1/2 text-center text-[20px] border-[#7638F9] px-[20px] py-[10px] text-[#7638F9] font-semibold">
                                    Cancel
                                </div>
                                <div onClick={createBond} className="hover:cursor-pointer border-[1px] rounded-[10px] w-full xl:w-1/2 text-center text-[20px] bg-[#7638F9] px-[20px] py-[10px] text-white font-semibold">
                                    Create Bond
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
            {
                missionpopup && (
                    <div className="absolute w-full h-full flex justify-center items-center px-[20px] bg-[#00000085]">
                        <div className="bg-white flex flex-col gap-[10px] rounded-[20px] p-[20px] max-w-[800px] w-full">
                            <h1 className="text-[24px] font-semibold">
                                Mission Setup
                            </h1>
     

                            <div>
                                <label htmlFor="validitynumber" className="block text-xl  font-semibold text-[#272226]">Select bond</label>
                                <div className="mt-4">
                                { sponsorData.length === 0 ? (
    // Message when no bonds are available
    <p className="text-red-500">No bond available without a mission</p>
) : (
    // Render select dropdown if bonds are available
    <select
        onChange={(e) => {
            setMissionState({
                ...missionState,
                bond_id: e.target.value
            });
        }}
        value={missionState.bond_id}
        name="bond"
        className="mt-1 block w-full px-3 py-4 border rounded-[20px] border-gray-300 focus:outline-none focus:ring focus:border-blue-500"
    >
        <option>Select Bond</option>
        {sponsorData.map((bond, i) => (
            <option key={bond?._id} value={bond?._id}>
                {bond?.title}
            </option>
        ))}
    </select>
)}
                                </div>
                            </div>

                            <div className="mt-[10px]">
                                <label htmlFor="tasktype" className="block text-xl  font-semibold text-[#272226]">Task Type</label>
                                <select
                                value={missionState?.task_type}
                                 onChange={(e)=>{
                                    setMissionState({
                                        ...missionState,
                                        task_type:e.target.value
                                    })
                                 }}
                                    name="tasktype"
                                    className="mt-4 block w-full px-3 py-4 border rounded-[20px] border-gray-300 focus:outline-none focus:ring focus:border-blue-500"
                                >
                                    <option value="">Select Task Type</option>
                                    <option value="promoting the products">Promoting the products</option>
                                    <option value="promoting services during live stream">Promote services of bond purchasers during live broadcasts.</option>
                                    <option value="sponsoring offline events">Sponsoring offline events with bond purchasers.</option>
                                    <option value="creating permotional videos">Creating promotional videos and posting them on their own social media.</option>
                                    <option value="providing something of higher value than bond">Providing products, service vouchers, or gift certificates of higher value than the bond issuance price.</option>
                                </select>

                            </div>
       
                            <div className="mt-[10px]">
                                <label htmlFor="description" className="block text-xl  font-semibold text-[#272226]">Description</label>
                                <textarea value={missionState.description} onChange={(e)=>{
                                    setMissionState({
                                        ...missionState,
                                        description:e.target.value
                                    })
                                }} rows="5" placeholder="Description" className="mt-4 block w-full px-3 py-4 border rounded-[20px] border-gray-300 focus:outline-none focus:ring focus:border-blue-500"></textarea>

                            </div>
                            <div className="hover:cursor-pointer flex flex-col justify-between mt-4 gap-[10px] xl:flex-row">
                                <div onClick={() => setMissionPopup(!missionpopup)} className="border-[1px] rounded-[10px] w-full xl:w-1/2 text-center text-[20px] border-[#7638F9] px-[20px] py-[10px] text-[#7638F9] font-semibold">
                                    Cancel
                                </div>
                                <div onClick={createMission} className="hover:cursor-pointer border-[1px] rounded-[10px] w-full xl:w-1/2 text-center text-[20px] bg-[#7638F9] px-[20px] py-[10px] text-white font-semibold">
                                    Create Mission
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
            {
                menupopup && (
                    <div className="w-[80%] h-[100vh] flex flex-col fixed left-0 top-0 px-[20px] rounded-tr-[20px] rounded-br-[20px] py-[40px] justify-between bg-[#1DBF73]">
                        <div className="flex flex-col gap-[10px]">
                            <h1 className="text-white text-[24px] font-semibold mb-[20px]">LOGOIPSUM</h1>
                            <div className="absolute top-[4%] right-[5%]" onClick={() => setMenuPopup(!menupopup)}>
                                <svg width="30px" height="30px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" fill="white"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill="white" d="M195.2 195.2a64 64 0 0 1 90.496 0L512 421.504 738.304 195.2a64 64 0 0 1 90.496 90.496L602.496 512 828.8 738.304a64 64 0 0 1-90.496 90.496L512 602.496 285.696 828.8a64 64 0 0 1-90.496-90.496L421.504 512 195.2 285.696a64 64 0 0 1 0-90.496z"></path></g></svg>
                            </div>
                            <Link
                                to="/dashboard"
                                className={`flex gap-[10px] rounded-[20px] items-center py-[10px] px-[20px] text-[18px] ${location.pathname === '/dashboard' ? 'bg-white text-[#1DBF73]' : 'text-white'}`}
                            >
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6 13V15M10 9V15M14 5V15M5.8 19H14.2C15.8802 19 16.7202 19 17.362 18.673C17.9265 18.3854 18.3854 17.9265 18.673 17.362C19 16.7202 19 15.8802 19 14.2V5.8C19 4.11984 19 3.27976 18.673 2.63803C18.3854 2.07354 17.9265 1.6146 17.362 1.32698C16.7202 1 15.8802 1 14.2 1H5.8C4.11984 1 3.27976 1 2.63803 1.32698C2.07354 1.6146 1.6146 2.07354 1.32698 2.63803C1 3.27976 1 4.11984 1 5.8V14.2C1 15.8802 1 16.7202 1.32698 17.362C1.6146 17.9265 2.07354 18.3854 2.63803 18.673C3.27976 19 4.11984 19 5.8 19Z" stroke={`${location.pathname === '/dashboard' ? '#1DBF73' : 'white'}`} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>

                                Dashboard
                            </Link>
                            <Link
                                to="/sponsorbond"
                                className={`flex gap-[10px] rounded-[20px] items-center py-[10px] px-[20px] text-[18px] ${location.pathname === '/sponsorbond' ? 'bg-white text-[#1DBF73]' : 'text-white'}`}
                            >
                                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9.10102 3C10.3636 1.76281 12.0927 1 14 1C17.866 1 21 4.13401 21 8C21 9.90734 20.2372 11.6365 18.9999 12.899M6.5 12L8 11V16.5M6.5 16.5H9.5M15 14C15 17.866 11.866 21 8 21C4.13401 21 1 17.866 1 14C1 10.134 4.13401 7 8 7C11.866 7 15 10.134 15 14Z" stroke={`${location.pathname === '/sponsorbond' ? '#1DBF73' : 'white'}`} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>

                                Sponsor Bond
                            </Link>
                            <Link
                                to="/mission"
                                className={`flex gap-[10px] rounded-[20px] items-center py-[10px] px-[20px] text-[18px] ${location.pathname === '/mission' ? 'bg-white text-[#1DBF73]' : 'text-white'}`}
                            >
                                <svg width="18" height="22" viewBox="0 0 18 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M13 3C13.93 3 14.395 3 14.7765 3.10222C15.8117 3.37962 16.6204 4.18827 16.8978 5.22354C17 5.60504 17 6.07003 17 7V16.2C17 17.8802 17 18.7202 16.673 19.362C16.3854 19.9265 15.9265 20.3854 15.362 20.673C14.7202 21 13.8802 21 12.2 21H5.8C4.11984 21 3.27976 21 2.63803 20.673C2.07354 20.3854 1.6146 19.9265 1.32698 19.362C1 18.7202 1 17.8802 1 16.2V7C1 6.07003 1 5.60504 1.10222 5.22354C1.37962 4.18827 2.18827 3.37962 3.22354 3.10222C3.60504 3 4.07003 3 5 3M6 14L8 16L12.5 11.5M6.6 5H11.4C11.9601 5 12.2401 5 12.454 4.89101C12.6422 4.79513 12.7951 4.64215 12.891 4.45399C13 4.24008 13 3.96005 13 3.4V2.6C13 2.03995 13 1.75992 12.891 1.54601C12.7951 1.35785 12.6422 1.20487 12.454 1.10899C12.2401 1 11.9601 1 11.4 1H6.6C6.03995 1 5.75992 1 5.54601 1.10899C5.35785 1.20487 5.20487 1.35785 5.10899 1.54601C5 1.75992 5 2.03995 5 2.6V3.4C5 3.96005 5 4.24008 5.10899 4.45399C5.20487 4.64215 5.35785 4.79513 5.54601 4.89101C5.75992 5 6.03995 5 6.6 5Z" stroke={`${location.pathname === '/mission' ? '#1DBF73' : 'white'}`} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>

                                Mission
                            </Link>
                        </div>
                        <div className="flex flex-col gap-[10px]">
                            <Link
                                to="/"
                                className={`flex gap-[10px] rounded-[20px] items-center py-[10px] px-[20px] text-[18px] ${location.pathname === '/settings' ? 'bg-white text-[#1DBF73]' : 'text-white'}`}
                            >
                                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M11 14C12.6569 14 14 12.6569 14 11C14 9.34315 12.6569 8 11 8C9.34315 8 8 9.34315 8 11C8 12.6569 9.34315 14 11 14Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M17.7273 13.7273C17.6063 14.0015 17.5702 14.3056 17.6236 14.6005C17.6771 14.8954 17.8177 15.1676 18.0273 15.3818L18.0818 15.4364C18.2509 15.6052 18.385 15.8057 18.4765 16.0265C18.568 16.2472 18.6151 16.4838 18.6151 16.7227C18.6151 16.9617 18.568 17.1983 18.4765 17.419C18.385 17.6397 18.2509 17.8402 18.0818 18.0091C17.913 18.1781 17.7124 18.3122 17.4917 18.4037C17.271 18.4952 17.0344 18.5423 16.7955 18.5423C16.5565 18.5423 16.3199 18.4952 16.0992 18.4037C15.8785 18.3122 15.678 18.1781 15.5091 18.0091L15.4545 17.9545C15.2403 17.745 14.9682 17.6044 14.6733 17.5509C14.3784 17.4974 14.0742 17.5335 13.8 17.6545C13.5311 17.7698 13.3018 17.9611 13.1403 18.205C12.9788 18.4489 12.8921 18.7347 12.8909 19.0273V19.1818C12.8909 19.664 12.6994 20.1265 12.3584 20.4675C12.0174 20.8084 11.5549 21 11.0727 21C10.5905 21 10.1281 20.8084 9.78708 20.4675C9.4461 20.1265 9.25455 19.664 9.25455 19.1818V19.1C9.24751 18.7991 9.15011 18.5073 8.97501 18.2625C8.79991 18.0176 8.55521 17.8312 8.27273 17.7273C7.99853 17.6063 7.69437 17.5702 7.39947 17.6236C7.10456 17.6771 6.83244 17.8177 6.61818 18.0273L6.56364 18.0818C6.39478 18.2509 6.19425 18.385 5.97353 18.4765C5.7528 18.568 5.51621 18.6151 5.27727 18.6151C5.03834 18.6151 4.80174 18.568 4.58102 18.4765C4.36029 18.385 4.15977 18.2509 3.99091 18.0818C3.82186 17.913 3.68775 17.7124 3.59626 17.4917C3.50476 17.271 3.45766 17.0344 3.45766 16.7955C3.45766 16.5565 3.50476 16.3199 3.59626 16.0992C3.68775 15.8785 3.82186 15.678 3.99091 15.5091L4.04545 15.4545C4.25503 15.2403 4.39562 14.9682 4.4491 14.6733C4.50257 14.3784 4.46647 14.0742 4.34545 13.8C4.23022 13.5311 4.03887 13.3018 3.79497 13.1403C3.55107 12.9788 3.26526 12.8921 2.97273 12.8909H2.81818C2.33597 12.8909 1.87351 12.6994 1.53253 12.3584C1.19156 12.0174 1 11.5549 1 11.0727C1 10.5905 1.19156 10.1281 1.53253 9.78708C1.87351 9.4461 2.33597 9.25455 2.81818 9.25455H2.9C3.2009 9.24751 3.49273 9.15011 3.73754 8.97501C3.98236 8.79991 4.16883 8.55521 4.27273 8.27273C4.39374 7.99853 4.42984 7.69437 4.37637 7.39947C4.3229 7.10456 4.18231 6.83244 3.97273 6.61818L3.91818 6.56364C3.74913 6.39478 3.61503 6.19425 3.52353 5.97353C3.43203 5.7528 3.38493 5.51621 3.38493 5.27727C3.38493 5.03834 3.43203 4.80174 3.52353 4.58102C3.61503 4.36029 3.74913 4.15977 3.91818 3.99091C4.08704 3.82186 4.28757 3.68775 4.50829 3.59626C4.72901 3.50476 4.96561 3.45766 5.20455 3.45766C5.44348 3.45766 5.68008 3.50476 5.9008 3.59626C6.12152 3.68775 6.32205 3.82186 6.49091 3.99091L6.54545 4.04545C6.75971 4.25503 7.03183 4.39562 7.32674 4.4491C7.62164 4.50257 7.9258 4.46647 8.2 4.34545H8.27273C8.54161 4.23022 8.77093 4.03887 8.93245 3.79497C9.09397 3.55107 9.18065 3.26526 9.18182 2.97273V2.81818C9.18182 2.33597 9.37338 1.87351 9.71435 1.53253C10.0553 1.19156 10.5178 1 11 1C11.4822 1 11.9447 1.19156 12.2856 1.53253C12.6266 1.87351 12.8182 2.33597 12.8182 2.81818V2.9C12.8193 3.19253 12.906 3.47834 13.0676 3.72224C13.2291 3.96614 13.4584 4.15749 13.7273 4.27273C14.0015 4.39374 14.3056 4.42984 14.6005 4.37637C14.8954 4.3229 15.1676 4.18231 15.3818 3.97273L15.4364 3.91818C15.6052 3.74913 15.8057 3.61503 16.0265 3.52353C16.2472 3.43203 16.4838 3.38493 16.7227 3.38493C16.9617 3.38493 17.1983 3.43203 17.419 3.52353C17.6397 3.61503 17.8402 3.74913 18.0091 3.91818C18.1781 4.08704 18.3122 4.28757 18.4037 4.50829C18.4952 4.72901 18.5423 4.96561 18.5423 5.20455C18.5423 5.44348 18.4952 5.68008 18.4037 5.9008C18.3122 6.12152 18.1781 6.32205 18.0091 6.49091L17.9545 6.54545C17.745 6.75971 17.6044 7.03183 17.5509 7.32674C17.4974 7.62164 17.5335 7.9258 17.6545 8.2V8.27273C17.7698 8.54161 17.9611 8.77093 18.205 8.93245C18.4489 9.09397 18.7347 9.18065 19.0273 9.18182H19.1818C19.664 9.18182 20.1265 9.37338 20.4675 9.71435C20.8084 10.0553 21 10.5178 21 11C21 11.4822 20.8084 11.9447 20.4675 12.2856C20.1265 12.6266 19.664 12.8182 19.1818 12.8182H19.1C18.8075 12.8193 18.5217 12.906 18.2778 13.0676C18.0339 13.2291 17.8425 13.4584 17.7273 13.7273Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>


                                Settings
                            </Link>
                            <div
                                    onClick={()=>{
                                        navigate('/')
                                        localStorage.removeItem("token")
localStorage.removeItem("buyerToken")
                                    }}
                                    className={`flex gap-[10px] rounded-[20px] items-center py-[10px] px-[20px] text-[18px] ${location.pathname === '/logout' ? 'bg-white text-[#1DBF73]' : 'text-white'}`}
                                >
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M14 15L19 10M19 10L14 5M19 10H7M10 15C10 15.93 10 16.395 9.89778 16.7765C9.62038 17.8117 8.81173 18.6204 7.77646 18.8978C7.39496 19 6.92997 19 6 19H5.5C4.10218 19 3.40326 19 2.85195 18.7716C2.11687 18.4672 1.53284 17.8831 1.22836 17.1481C1 16.5967 1 15.8978 1 14.5V5.5C1 4.10217 1 3.40326 1.22836 2.85195C1.53284 2.11687 2.11687 1.53284 2.85195 1.22836C3.40326 1 4.10218 1 5.5 1H6C6.92997 1 7.39496 1 7.77646 1.10222C8.81173 1.37962 9.62038 2.18827 9.89778 3.22354C10 3.60504 10 4.07003 10 5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>


                                    Logout
                                </div>
                        </div>
                    </div>
                )
            }
        </div>
</>
    );
}
