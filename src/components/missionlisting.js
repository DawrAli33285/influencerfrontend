import React, { useState, useEffect } from 'react';
import { BASE_URL } from '../baseURL';
import { MoonLoader } from 'react-spinners';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useContext } from 'react';
import { MissionListContext } from '../contextAPI/missionListing';
const MissionListingTable = () => {
    const [selectedMonth, setSelectedMonth] = useState('default');
    const [originalMissionData, setOriginalMissionData] = useState([])
    const [missionpopup, setMissionPopup] = useState(false)
    const [sponsorData, setBondData] = useState([])
    const [bondIds,setBondIds]=useState([])
    const [search,setSearch]=useState("")
    const [selectedPriceRange,setSelectedPriceRange]=useState("default")
    const { missionStateContext: missionData, setMissionStateContext: setMissionData } = useContext(MissionListContext)

    const [missionState, setMissionState] = useState({
        bond_id: '',
        description: '',
        task_type: ''
    })
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        fetchMissionData();
        fetchBondList()
    }, [])
    const filterItems = (value) => {
        setSearch(value);
        applyFilters(); 
    };

    
    const handlePriceRangeChange = (e) => {
        setSelectedPriceRange(e.target.value);
        applyFilters(); 
    };
    
   
    const applyFilters = () => {
        let filteredData = originalMissionData;
 
        if (selectedMonth && selectedMonth !== "default") {
            const monthIndex = months.indexOf(selectedMonth);
            if (monthIndex !== -1) {
                filteredData = filteredData.filter((bond) => {
                    const bondDate = new Date(bond.createdAt);
                    return bondDate.getMonth() === monthIndex;
                });
            }
        }
    
       
        if (selectedPriceRange && selectedPriceRange !== "default") {
            const [min, max] = selectedPriceRange.split("-").map((val) => parseFloat(val));
            filteredData = filteredData.filter((bond) => {
                const amount = Number(bond.bond_issuerance_amount);
                return max ? amount >= min && amount <= max : amount >= min;
            });
        }
    
        
        if (search) {
            const searchValue = search.toLowerCase();
            filteredData = filteredData.filter((bond) => {
                console.log("BOND")
                console.log(bond)
                const titleMatch = bond.task_type.toLowerCase().includes(searchValue);
                
                return titleMatch 
            });
        }
    
        setMissionData(filteredData);
    };

    

    useEffect(() => {
        applyFilters();
    }, [selectedMonth, selectedPriceRange, search]);
    
    const fetchAccordingToMonth = (e) => {
        setSelectedMonth(e.target.value);
        applyFilters(); 
    };
    
   
    const createMission = async () => {
        
        try {
            if (missionState.bond_id.length === 0) {
                toast.dismiss()
                toast.error("Please select bond", { containerId: "containerD" })
                return;
            } else if (missionState.task_type.length === 0) {
                toast.dismiss()
                toast.error("Please select mission", { containerId: "containerD" })
                return;
            } else if (missionState.description.length === 0) {
                toast.dismiss()
                toast.error("Please enter mission description", { containerId: "containerD" })
                return;
            }
            let response = await axios.post(`${BASE_URL}/create-mission`, missionState)
            toast.dismiss();
            setBondIds((prev)=>{
                let old;
                if(prev.length==0){
                    old=[missionState.bond_id]
                }else{
                    old=[...prev,missionState.bond_id]
                }
                return old
            })
            toast.success(response.data.message, { containerId: "containerD" })
            setMissionState({
                bond_id: '',
                description: '',
                task_type: ''
            })
            setMissionData((prev)=>{
                let old;
                if(prev.length==0){
                    old=[response.data.getMission]
                }else{
                    old=[...prev,response.data.getMission]
                }
                return old
            })
            setMissionPopup(!missionpopup)

        } catch (e) {
            if (e?.response?.data?.error) {
                toast.dismiss()
                toast.error(e?.response?.data?.error, { containerId: "containerD" })
            } else {
                toast.dismiss()
                toast.error("Client error please try again", { containerId: "containerD" })
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
    
    useEffect(() => {
        if (originalMissionData?.length <= missionData?.length) {
            setOriginalMissionData(missionData)
        }
    }, [missionData])



    
    const fetchBondList = async () => {
        try {
            let token = localStorage.getItem('token')
            let headers = {
                headers: {
                    authorization: `Bearer ${token}`
                }
            }
            let response = await axios.get(`${BASE_URL}/bond-listing`, headers)

            setBondData(response.data.bondsList)



        } catch (e) {
            if (e?.response?.data?.error) {
                toast.error(e?.response?.data?.error, { containerId: "containerD" })
            } else {
                toast.error("Client error please try again", { containerId: "containerD" })
            }
        }
    }

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
            <div className="bg-white max-h-[700px]  overflow-y-auto xl:px-[20px]">
                <div className="flex xl:justify-between xl:flex-row flex-col items-center mb-[20px]">
                    <div className='flex flex-col'>
                        <h1 className="text-[24px] font-semibold">Create Your Promise Mission</h1>
                        <p className='text-[18px]'>Define and manage your bond's mission for your buyers</p>
                    </div>
                    <div className="grid lg:grid-cols-12 gap-[20px] grid-cols-1 lg:mt-0 mt-[40px]">

                    <select
                            value={selectedMonth}
                            onChange={fetchAccordingToMonth}
                            className="p-[8px] bg-white font-semibold text-black rounded-[10px] border-[1px] border-black outline-none lg:col-span-2"
                        >
                            <option value="default">Month</option>
                            {months.map((month) => (
                                <option key={month} value={month}>
                                    {month}
                                </option>
                            ))}
                        </select>


                        <div className="flex gap-[10px] xl:flex-row flex-col w-full lg:col-span-6">
                            <div className="w-full bg-[#F6F6F6] rounded-[20px] px-[10px] py-[10px] flex items-center">
                            <input
                                    type="text"
                                    value={search}
                                    onChange={(e)=>filterItems(e.target.value)}
                                    placeholder="Search here..."
                                    className="outline-none border-none bg-transparent w-[90%]"
                                />
                            </div>
                        </div>


                        <button onClick={() => { setMissionPopup(!missionpopup) }} className="p-[10px] bg-[#1DBF73] text-white font-semibold rounded-[10px] lg:col-span-4">
                            Create Mission
                        </button>
                    </div>

                </div>

                {loading ? <div className='flex justify-center items-center'>
                    <MoonLoader color="#6B33E3" size={100} />
                </div> : missionData?.length > 0 ?
                    <div>
                        <table className="min-w-full table-auto xl:table hidden border-collapse">
                            <thead>
                                <tr className="bg-[#FDFBFD]">

                                    <th className="p-[10px] border-gray-300 border-b text-left">Mission</th>
                                    <th className="p-[10px] border-gray-300 border-b text-left">Price</th>
                                    <th className="p-[10px] border-gray-300 border-b text-left  ">Validity</th>
                                    <th className="p-[10px] border-gray-300 border-b text-left  ">Status</th>
                                    <th className="p-[10px] border-gray-300 border-b text-left  "></th>
                                </tr>
                            </thead>
                            <tbody>
                                {missionData?.map((mission, index) => (
                                    <tr key={index} className="border-b">

                                        <td className="p-[10px] ">{mission?.task_type}</td>
                                        <td className="p-[10px] text-[#1DBF73]">${mission?.bond_id?.bond_price}/bond</td>
                                        <td className="p-[10px] font-bold "> {new Date(mission?.bond_id?.createdAt).toLocaleDateString('en-GB', {
                                            day: '2-digit',
                                            month: 'long',
                                            year: 'numeric',
                                        })}</td>
                                        <td className={`p-[10px] ${getStatusClass(mission?.status)}`}>
                                            {mission?.status?.toLocaleLowerCase()?.charAt(0)?.toUpperCase() + mission?.status?.toLocaleLowerCase()?.slice(1)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className='w-full xl:hidden block'>
                            <div className="xl:grid-cols-4 grid-cols-2 gap-[20px] border-b border-gray-300 py-4">
                                {missionData?.map((mission, index) => (
                                    <div key={mission?._id} className="grid xl:grid-cols-4 grid-cols-2 gap-[20px] border-b border-gray-300 py-4">
                                        <div className="flex flex-col gap-[10px]">
                                            <h1 className="text-[18px] font-semibold text-[#7E8183]">Mission</h1>
                                            <p className="text-[16px] font-semibold">{mission?.task_type}</p>
                                        </div>

                                        <div className="flex flex-col gap-[10px]">
                                            <h1 className="text-[18px] font-semibold text-[#7E8183]">Price</h1>
                                            <p className="text-[16px] font-semibold">{mission?.bond_id?.bond_price}</p>
                                        </div>

                                        <div className="flex flex-col gap-[10px]">
                                            <h1 className="text-[18px] font-semibold text-[#7E8183]">Validity</h1>
                                            <p className="text-[16px] font-semibold">{new Date(mission?.bond_id?.createdAt).toLocaleDateString('en-GB', {
                                            day: '2-digit',
                                            month: 'long',
                                            year: 'numeric',
                                        })}</p>
                                        </div>
                                        <div className="flex flex-col gap-[10px]">
                                            <h1 className="text-[18px] font-semibold text-[#7E8183]">Status</h1>
                                            <p className={`text-[16px] font-semibold ${getStatusClass(mission?.status)}`}>  {mission?.status?.toLocaleLowerCase()?.charAt(0)?.toUpperCase() + mission?.status?.toLocaleLowerCase()?.slice(1)}</p>
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
                                           if(!bondIds.find(u=>u==bond?._id)){
                                            return <option key={bond?._id} value={bond?._id}>
                                            {bond?.title}
                                        </option>
                                           }
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

export default MissionListingTable;
