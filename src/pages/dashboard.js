import { useEffect,useState } from "react";
import BondListingTable from "../components/bondlistingtable";
import MissionListingTable from "../components/missionlisting";
import NotificationCards from "../components/notificationcards";
import BondAnalyticsChart from "../components/splinechart";
import UserInfo from "../components/userinfo";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { BASE_URL } from "../baseURL";


export default function Dashboard() {
    const [state,setState]=useState()
    const [loading,setLoading]=useState(true)
    useEffect(()=>{
fetchDashboardData();
    },[])
    const fetchDashboardData=async()=>{
        try{
            let token=localStorage.getItem('token')
            let headers={
                headers:{
                    authorization:`Bearer ${token}`
                }
            }
      let response=await axios.get(`${BASE_URL}/get-dashboardData`,headers)

setState(response.data)
setLoading(false)
        }catch(e){
if(e?.response?.data?.error){
    toast.dismiss()
    toast.error(e?.response?.data?.error,{containerId:"containerE"})
    
}else{
    toast.dismiss()
    toast.error("Client error please try again",{containerId:"containerE"})
}
return;
        }
    }
    return (
       <>
       <ToastContainer containerId="containerE"  limit={1}/>
        <div className="w-full  flex  flex-col">
            <div className="w-full  flex xl:flex-row gap-[20px] flex-col-reverse">
                <div className="w-full xl:w-[75%] flex flex-col gap-[20px] xl:justify-between">
                    <NotificationCards loading={loading}   state={state}/>
                    <BondAnalyticsChart loading={loading} state={state} />
                </div>
                <div className="w-full xl:w-[30%] px-[20px] py-[40px] bg-white rounded-[20px]">
                    <UserInfo loading={loading} state={state} />
                </div>
            </div>
            <div className="w-full overflow-x-auto bg-white rounded-[20px] mt-[40px] px-[20px] py-[40px]">
                    <BondListingTable />
            </div>
            <div className="w-full overflow-x-auto bg-white rounded-[20px] mt-[40px] px-[20px] py-[40px]">
                    <MissionListingTable />
            </div>
        </div>
       </>
    )
}