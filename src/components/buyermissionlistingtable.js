import React, { useState, useEffect } from 'react';
import { BASE_URL } from '../baseURL';
import { MoonLoader } from 'react-spinners';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useContext } from 'react';
import { MissionListContext } from '../contextAPI/missionListing';
const BuyerMissionListingTable = () => {
    const [selectedMonth, setSelectedMonth] = useState('default');
    const [originalMissionData, setOriginalMissionData] = useState([])
    const [missionpopup, setMissionPopup] = useState(false)
    const [sponsorData, setBondData] = useState([])
    const { missionStateContext: missionData, setMissionStateContext: setMissionData } = useContext(MissionListContext)

    const [missionState, setMissionState] = useState({
        bond_id: '',
        description: '',
        task_type: ''
    })
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        fetchMissionData();
    }, [])
    const createMission = async () => {
        try {
            if (missionState.bond_id.length === 0) {
                toast.dismiss()
                toast.error("Please select bond", { containerId: "containerA" })
                return;
            } else if (missionState.task_type.length === 0) {
                toast.dismiss()
                toast.error("Please select mission", { containerId: "containerA" })
                return;
            } else if (missionState.description.length === 0) {
                toast.dismiss()
                toast.error("Please enter mission description", { containerId: "containerA" })
                return;
            }
            let response = await axios.post(`${BASE_URL}/create-mission`, missionState)
            toast.dismiss();
            toast.success(response.data.message, { containerId: "containerA" })
            setMissionState({
                bond_id: '',
                description: '',
                task_type: ''
            })
            setMissionPopup(!missionpopup)

        } catch (e) {
            if (e?.response?.data?.error) {
                toast.dismiss()
                toast.error(e?.response?.data?.error, { containerId: "containerA" })
            } else {
                toast.dismiss()
                toast.error("Client error please try again", { containerId: "containerA" })
            }
        }
    }
    const fetchMissionData = async () => {
        try {
            let token = localStorage.getItem('token')
            let headers = {
                headers: {
                    authorization: `Bearer ${token}`
                }
            }
            let response = await axios.get(`${BASE_URL}/get-missionList`, headers)
            setMissionData(response.data.missionList)
            setOriginalMissionData(response.data.missionList)
            setLoading(false)
            console.log(response.data)
        } catch (e) {
            if (e?.response?.data?.error) {
                toast.dismiss()
                toast.error(e?.response?.data?.error, { containerId: "containerD" })
                return;
            } else {
                toast.dismiss()
                toast.error("Client error please try again", { containerId: "containerD" })
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
    useEffect(() => {
        if (originalMissionData?.length <= missionData?.length) {
            setOriginalMissionData(missionData)
        }
    }, [missionData])


    const getStatusClass = (status) => {
        switch (status) {
            case 'Active':
                return 'text-[#1DBF73]';
            case 'Pending':
                return 'text-yellow-500';
            case 'Removed':
                return 'text-red-500';
            case 'NOT STARTED':
                return 'text-orange-500'
            default:
                return '';
        }
    };





    return (
        <>
            <ToastContainer containerId="containerD" limit={1} />
            <div className="bg-[#f2f2f2] min-h-[600px]    p-[20px] rounded-[20px]">
                <div className="flex justify-between lg:flex-row flex-col gap-[20px] items-center mb-[20px]">
                    <div className='flex flex-col'>
                        <h1 className="lg:text-[2rem] text-black  text-[1.50rem] font-medium  lg:text-left text-center lg:font-bold">Your Promise Mission</h1>
                        <p className='lg:text-[0.94rem] text-black text-[0.75rem] lg:text-left text-center lg:mb-0 mb-[25px]'>Define and manage your bond's mission for your buyers</p>
                    </div>
                    <div className="flex w-full lg:w-fit  gap-[18px] lg:flex-row flex-col lg:mt-0 mt-[40px]">

                        <select
                            value={selectedMonth}
                            onChange={fetchAccordingToMonth}
                            className="p-[8px] lg:max-w-[140px] w-full bg-white font-medium text-[.88rem] text-black rounded-[2rem] shadow-md outline-none"
                        >
                            <option value="default">Status</option>
                            {months.map((month) => (
                                <option key={month} value={month}>
                                    {month}
                                </option>
                            ))}
                        </select>


                        <div className="flex gap-[10px] xl:flex-row flex-col lg:w-[340px]   w-full">
                            <div className="w-full border bg-white border-[#E9E9E9] rounded-[20px] px-[10px] py-[10px] flex items-center">
                                <input
                                    type="text"
                                    placeholder="Search here..."
                                    className="outline-none border-none bg-transparent w-[90%]"
                                />
                            </div>
                        </div>


                        {/* <button onClick={() => { setMissionPopup(!missionpopup) }} className="p-[10px] bg-[#1DBF73] text-white font-semibold rounded-[10px] lg:col-span-4">
                            Create Mission
                        </button> */}
                    </div>

                </div>

                {loading ? <div className='flex justify-center items-center'>
                    <MoonLoader color="#6B33E3" size={100} />
                </div> : missionData?.length > 0 ?
                    <div className='lg:p-[30px] lg:bg-white'>
                        <table className="min-w-full table-auto xl:table hidden border-collapse">
                            <thead>
                                <tr className="bg-[#FDFBFD]">

                                    <th className="p-[10px] bg-[#1DBF7314]  text-[1.07rem] font-medium lg:px-[30px] lg:py-[30px] text-left border-b border-gray-300">Mission</th>
                                    <th className="p-[10px] bg-[#1DBF7314] text-[1.07rem] font-medium text-left border-b lg:py-[30px] border-gray-30">Price</th>
                                    <th className="p-[10px] bg-[#1DBF7314] text-[1.07rem] font-medium text-left border-b lg:py-[30px] border-gray-30  ">Validity</th>
                                    <th className="p-[10px] bg-[#1DBF7314] text-[1.07rem] font-medium text-left border-b lg:py-[30px] border-gray-30  ">Status</th>

                                </tr>
                            </thead>
                            <tbody>
                                {missionData?.map((mission, index) => (
                                    <tr key={index} className="border-b">

                                        <td className="p-[10px] lg:pl-[30px] text-[0.94rem] border-b border-b-[#E9E9E9]  font-normal pt-[30px] ">{mission?.mission_title}</td>
                                        <td className="p-[10px] text-[0.94rem] font-normal border-b border-b-[#E9E9E9]  pt-[30px]  text-[#1DBF73]">${mission?.bond_id?.bond_price}/bond</td>
                                        <td className="p-[10px] text-[0.94rem] font-normal border-b border-b-[#E9E9E9]  pt-[30px]"> {(() => {
    const createdAt = mission?.bond_id?.createdAt;
    const validityNumber = mission?.bond_id?.validity_number || 0;

    if (!createdAt) return "Invalid Date";

    const createdDate = new Date(createdAt);
    createdDate.setMonth(createdDate.getMonth() + validityNumber);

    return createdDate.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  })()}</td>
                                        <td className={`p-[10px] text-[0.94rem] font-normal border-b border-b-[#E9E9E9]  pt-[30px] ${getStatusClass(mission?.status)}`}>
                                            {mission?.status?.toLocaleLowerCase()?.charAt(0)?.toUpperCase() + mission?.status?.toLocaleLowerCase()?.slice(1)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className='w-full xl:hidden block'>
                            <div className="flex bg-[#f2f2f2] flex-col gap-[20px]">
                                {missionData?.map((mission, index) => (
                                    <div key={index} className="p-[20px] bg-white flex flex-col gap-[20px] border-b border-gray-300 py-4">
                                        <div className='flex flex-col gap-[20px]'>
                                            <div className="flex flex-col gap-[10px]">

                                                <p className="text-[14px] font-semibold">{mission?.mission_title}</p>
                                            </div>
                                            <div className="flex items-center  gap-[10px]">
                                                <h1 className="text-[0.75rem]">Validity:</h1>
                                                <p className="text-[0.75rem]">
  {(() => {
    const createdAt = mission?.bond_id?.createdAt;
    const validityNumber = mission?.bond_id?.validity_number || 0; 

    if (!createdAt) return "Invalid Date";

    const createdDate = new Date(createdAt);
    createdDate.setMonth(createdDate.getMonth() + validityNumber);

    return createdDate.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  })()}
</p>

                                            </div>
                                            <div className="flex flex-col gap-[10px]">
                                                <p className={`text-[14px] font-semibold ${getStatusClass(mission?.status)}`}>{mission?.status?.toLocaleLowerCase()?.charAt(0)?.toUpperCase() + mission?.status?.toLocaleLowerCase()?.slice(1)}</p>
                                            </div>

                                        </div>
                                        <div className="flex justify-between items-center">
                                            <div className="flex flex-col gap-[10px]">
                                                <p className="text-[0.75rem] text-[#1DBF73]">${mission?.bond_id?.bond_price}/bond </p>
                                            </div>
                                         
                                        </div>
                                    </div>
                                ))}
                            </div>

                        </div>
                    </div> : <div className='flex justify-center items-center'>
                        <p>No record found</p>
                    </div>}
            </div>
            {
                missionpopup && (
                    <div className="fixed w-full top-0 left-0 h-full flex justify-center items-center px-[20px] bg-[#00000085]">
                        <div className="bg-white flex flex-col gap-[10px] rounded-[20px] p-[20px] max-w-[800px] w-full">
                            <h1 className="text-[24px] font-semibold">
                                Mission Setup
                            </h1>


                            <div>
                                <label htmlFor="validitynumber" className="block text-xl  font-semibold text-[#272226]">Select bond</label>
                                <div className="mt-4">
                                    <select
                                        onChange={(e) => {

                                            setMissionState({
                                                ...missionState,
                                                bond_id: e.target.value

                                            })
                                        }} value={missionState.bond_id}
                                        name="bond"
                                        className="mt-1 block w-full px-3 py-4 border rounded-[20px] border-gray-300 focus:outline-none focus:ring focus:border-blue-500"
                                    >
                                        <option >Select Bond</option>
                                        {sponsorData?.map((bond, i) => {
                                            return <option key={bond?._id} value={bond?._id}>
                                                {bond?.title}
                                            </option>
                                        })}
                                    </select>
                                </div>
                            </div>

                            <div className="mt-[10px]">
                                <label htmlFor="tasktype" className="block text-xl  font-semibold text-[#272226]">Task Type</label>
                                <select
                                    value={missionState?.task_type}
                                    onChange={(e) => {
                                        setMissionState({
                                            ...missionState,
                                            task_type: e.target.value
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
                                <textarea value={missionState.description} onChange={(e) => {
                                    setMissionState({
                                        ...missionState,
                                        description: e.target.value
                                    })
                                }} rows="5" placeholder="Description" className="mt-4 block w-full px-3 py-4 border rounded-[20px] border-gray-300 focus:outline-none focus:ring focus:border-blue-500"></textarea>

                            </div>
                            <div className="hover:cursor-pointer flex flex-col justify-between mt-4 gap-[10px] xl:flex-row">
                                <div onClick={() => setMissionPopup(!missionpopup)} className="border-[1px] rounded-[10px] w-full xl:w-1/2 text-center text-[20px] border-[#1DBF73] px-[20px] py-[10px] text-[#1DBF73] font-semibold">
                                    Cancel
                                </div>
                                <div onClick={createMission} className="hover:cursor-pointer border-[1px] rounded-[10px] w-full xl:w-1/2 text-center text-[20px] bg-[#1DBF73] px-[20px] py-[10px] text-white font-semibold">
                                    Create Mission
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    );
};

export default BuyerMissionListingTable;
