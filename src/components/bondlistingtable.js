import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MoonLoader } from 'react-spinners';
import { BASE_URL } from '../baseURL';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BondListContext } from "../contextAPI/bondListing";
import { useContext } from 'react';
const BondListingTable = () => {
    const [selectedMonth, setSelectedMonth] = useState('default');
    const [loading,setLoading]=useState(true)
    const {state:bondData,setState:setBondData}=useContext(BondListContext)
    // const [bondData,setBondData]=useState([
     
    // ])
    const [originalBondData,setOriginalBondData]=useState([])
    useEffect(()=>{
        fetchBondList()
    },[])
    const fetchBondList=async()=>{
        try{
  let token=localStorage.getItem('token')
  let headers={
    headers:{
        authorization:`Bearer ${token}`
    }
  }          
let response=await axios.get(`${BASE_URL}/bond-listing`,headers)

    setBondData(response.data.bondsList)
    setOriginalBondData(response.data.bondsList)
setLoading(false)

        }catch(e){
    if(e?.response?.data?.error){
        toast.dismiss()
        toast.error(e?.response?.data?.error)
        return;
    }else{
        toast.dismiss()
toast.error("Client error please try again")
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
        setBondData((prevBondData) => {
          return originalBondData.filter((bond) => {
            const bondDate = new Date(bond.createdAt); 
            return bondDate.getMonth() === monthIndex; 
          });
        });
      };

    const getStatusClass = (status) => {
        switch (status) {
            case 'PENDING':
                return 'text-orange-500';
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
       <ToastContainer/>
        <div className="bg-white">
            <div className="flex justify-between items-center mb-[20px]">
                <h1 className="text-[#2563EB] text-[24px] font-semibold">BondListing</h1>
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

           {!loading?bondData?.length>0?<table className="min-w-full table-auto border-gray-300 border-collapse">
                <thead>
                    <tr className="bg-[#FDFBFD]">
                        <th className="p-[10px] text-left border-l border-t border-gray-300">Bond Name</th>
                        <th className="p-[10px] text-left border-l border-t border-gray-300">Total Issuance Value</th>
                        <th className="p-[10px] text-left border-l border-t border-gray-300">Quantity</th>
                        <th className="p-[10px] text-left border-l border-t border-gray-300">Validity Period</th>
                        <th className="p-[10px] text-left border-l border-t border-gray-300">Created On</th>
                        <th className="p-[10px] text-left border-l border-t border-gray-300">Status</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {bondData?.map((bond, index) => (
                        <tr key={index} className="border-b">
                            <td className="p-[10px] border-l border-gray-300">{bond?.title}</td>
                            <td className="p-[10px] border-l border-gray-300">{'$'+bond?.bond_issuerance_amount}</td>
                            <td className="p-[10px] border-l border-gray-300">{bond?.total_bonds
                            }</td>
                            <td className="p-[10px] border-l  border-gray-300">{bond?.validity_number+' months'}</td>
                            <td className="p-[10px] border-l border-gray-300">
  {new Date(bond?.createdAt).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })}
</td>
                          
                            <td className={`border-l border-r border-gray-300 p-[10px] ${getStatusClass(bond?.status)}`}>
                                {bond?.status?.toLocaleLowerCase()?.charAt(0)?.toUpperCase() + bond?.status?.toLocaleLowerCase()?.slice(1)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>:<div className='flex justify-center items-center'>
            <p>No record found</p>
                </div>:<div className='flex justify-center items-center'>
            <MoonLoader color="#6B33E3" size={100} />
                </div>
                }
        </div>
       </>
    );
};

export default BondListingTable;
