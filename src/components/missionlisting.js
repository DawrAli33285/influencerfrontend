import React, { useState,useEffect } from 'react';
import { BASE_URL } from '../baseURL';
import { MoonLoader } from 'react-spinners';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useContext } from 'react';
import { MissionListContext } from '../contextAPI/missionListing';
const MissionListingTable = () => {
    const [selectedMonth, setSelectedMonth] = useState('default');
     const [originalMissionData,setOriginalMissionData]=useState([])
     const { missionStateContext:missionData,setMissionStateContext:setMissionData}=useContext(MissionListContext)
   
    
const [loading,setLoading]=useState(true)
    useEffect(()=>{
      fetchMissionData();
    },[])
    const fetchMissionData=async()=>{
        try{
            let token=localStorage.getItem('token')
            let headers={
              headers:{
                  authorization:`Bearer ${token}`
              }
            }        
let response=await axios.get(`${BASE_URL}/get-missionList`,headers)
setMissionData(response.data.missionList)
setOriginalMissionData(response.data.missionList)
setLoading(false)
console.log(response.data)
        }catch(e){
if(e?.response?.data?.error){
    toast.dismiss()
    toast.error(e?.response?.data?.error,{containerId:"containerD"})
    return;
}else{
    toast.dismiss()
    toast.error("Client error please try again",{containerId:"containerD"})
    return;
}
        }
    }


    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const fetchAccordingToMonth = (e) => {
        const monthName = e.target.value;
        setSelectedMonth(e.target.value)
        const monthIndex = months.indexOf(monthName);
        if (monthIndex === -1) return;
        setMissionData((prevBondData) => {
          return originalMissionData.filter((bond) => {
            const bondDate = new Date(bond.createdAt); 
            return bondDate.getMonth() === monthIndex; 
          });
        });
      };
useEffect(()=>{
if(originalMissionData?.length<=missionData?.length){
    setOriginalMissionData(missionData)
}
},[missionData])


    const getStatusClass = (status) => {
        switch (status) {
            case 'PENDING':
                return 'text-orange-500';
            case 'NOT STARTED':
                    return 'text-purple-400';
            case 'LIVE':
                return 'text-red-500';
            case 'COMPLETED':
                return 'text-green-500';
            default:
                return '';
        }
    };





    return (
        <>
        <ToastContainer containerId="containerD"  limit={1}/>
        <div className="bg-white p-[20px] rounded-[20px] shadow-md">
            <div className="flex justify-between items-center mb-[20px]">
                <h1 className="text-[#2563EB] text-[24px] font-semibold">Mission Listing</h1>
                <select
                    value={selectedMonth}
                    
                    onChange={fetchAccordingToMonth}
                    className="p-[8px] bg-white font-semibold text-black rounded-[10px] border-[1px] border-black outline-none"
                >
                    <option value="default">Select Month</option>
                    {months.map((month) => (
                        <option key={month} value={month}>
                            {month}
                        </option>
                    ))}
                </select>
            </div>

           {loading?<div className='flex justify-center items-center'>
            <MoonLoader color="#6B33E3" size={100} />
                </div>:missionData?.length>0? <table className="min-w-full table-auto border-gray-300 border-collapse">
                <thead>
                    <tr className="bg-[#FDFBFD]">

                        <th className="p-[10px] text-left border-l border-t border-gray-300">Bond Name</th>
                        <th className="p-[10px] text-left border-l border-t border-gray-300">Purchaser</th>
                        <th className="p-[10px] text-left border-l border-t border-gray-300">Created On</th>
                        <th className="p-[10px] text-left border-l border-t border-gray-300">Expiration Date</th>
                        <th className="p-[10px] text-left border-l border-t border-gray-300">Status</th>

                        <th className="p-[10px] text-left border-l border-t border-r border-gray-300">Evaluation Score</th>
                    </tr>
                </thead>
                <tbody>
                    {missionData?.map((mission, index) => (
                        <tr key={index} className="border-b">
                 
                            <td className="p-[10px] border-l border-gray-300">{mission?.bond_id?.title}</td>
                            <td className="p-[10px] border-l border-gray-300">{mission?.buyer_id?.user_id?.username?.length>0?mission?.buyer_id?.username:'none'}</td>
                            <td className="p-[10px] border-l border-gray-300"> {new Date(mission?.bond_id?.createdAt).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })}</td>
                            <td className="p-[10px] border-l border-gray-300">{mission?.bond_id?.validity_number+' months'}</td>
                            <td className={`border-l border-r border-gray-300 p-[10px] ${getStatusClass(mission?.status)}`}>
                                {mission?.status?.toLocaleLowerCase()?.charAt(0)?.toUpperCase() +mission?.status?.toLocaleLowerCase()?.slice(1)}
                            </td>

                            <td className="p-[10px] border-l border-r border-gray-300">{mission?.bond_id?.evaluation_id?.length>0?mission?.bond_id?.evaluation_id?.rating+'%':`Not started`}</td>
                        </tr>
                    ))}
                </tbody>
            </table>:<div className='flex justify-center items-center'>
            <p>No record found</p>
                </div>}
        </div>
        </>
    );
};

export default MissionListingTable;
