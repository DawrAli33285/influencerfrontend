import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MoonLoader } from 'react-spinners';
import { BASE_URL } from '../../baseURL';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BondListContext } from "../../contextAPI/bondListing";
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
const SellerBondListingTable = () => {
    const [selectedMonth, setSelectedMonth] = useState('default');
    const [loading, setLoading] = useState(true)
    const [cancelledpopup, setCancelledPopup] = useState(false)
    const navigate = useNavigate();
    const [cancellationState, setCancellationState] = useState({
        reason: 'Incomplete Information',
        description: '',
        bond_id: ''
    })
    const [bondData, setBondData] = useState([])
    // const [bondData,setBondData]=useState([

    // ])
    const [originalBondData, setOriginalBondData] = useState([])
    useEffect(() => {
        fetchBondList()
    }, [])
    const fetchBondList = async () => {
        try {
            let token = localStorage.getItem('buyerToken')
            let headers = {
                headers: {
                    authorization: `Bearer ${token}`
                }
            }
            let response = await axios.get(`${BASE_URL}/getBoughtBonds`, headers)
            console.log("RESPONSe")
            console.log(response.data)
            setBondData(response.data.bond)
            setOriginalBondData(response.data.bond)
            setLoading(false)

        } catch (e) {
            if (e?.response?.data?.error) {
                toast.dismiss()
                toast.error(e?.response?.data?.error, { containerId: "buyerbondListing" })
                return;
            } else {
                toast.dismiss()
                toast.error("Client error please try again", { containerId: "buyerbondListing" })
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
            case 'Pending':
                return 'text-orange-500';
            case 'Sold':
                return 'text-red-500';
            case 'ForSale':
                return 'text-green-500';
            default:
                return '';
        }
    };
    useEffect(() => {
        if (originalBondData?.length <= bondData?.length) {
            setOriginalBondData(bondData)
        }
    }, [bondData])



    const cancellbond = async () => {
        try {
            let token = localStorage.getItem('buyerToken')
            let headers = {
                headers: {
                    authorization: `Bearer ${token}`
                }
            }
            console.log(cancellationState)

            let response = await axios.post(`${BASE_URL}/cancellBond`, cancellationState, headers)
            toast.success(response.data.message, { containerId: "buyerbondListing" })
            setCancelledPopup(!cancelledpopup)
            setCancellationState({
                bond_id: '',
                description: '',
                reason: ''
            })
        } catch (e) {
            if (e?.response?.data?.error) {
                toast.error(e?.response?.data?.error, { containerId: "buyerbondListing" })
            } else {
                toast.error("Client error please try again", { containerId: "buyerbondListing" })
            }
        }
    }


    return (
        <>
            <ToastContainer containerId="buyerbondListing" limit={1} />
            <div className="bg-white max-h-[700px]  overflow-y-auto">
                <div className="flex max-h-[700px]  overflow-y-auto justify-between items-center mb-[20px]">
                    <h1 className="text-[#2563EB] text-[24px] font-semibold">My Sponsor Bond</h1>
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

                {!loading ? bondData?.length > 0 ?
                    <div>
                        <table className="min-w-full xl:table hidden table-auto border-gray-300 border-collapse">
                            <thead>
                                <tr className="bg-[#FDFBFD]">
                                    <th className="p-[10px] text-left border-l border-b border-t border-gray-300">Bond Name</th>
                                    <th className="p-[10px] text-left border-l border-b border-t border-gray-300">Unit Price</th>
                                    <th className="p-[10px] text-left border-l border-b border-t border-gray-300">Quantity</th>
                                    <th className="p-[10px] text-left border-l border-b border-t border-gray-300">Validity Period</th>
                                    <th className="p-[10px] text-left border-l border-b border-t border-gray-300">Status</th>
                                    <th className="p-[10px] text-left border-l border-b border-t border-r border-gray-300">Actions</th>

                                </tr>
                            </thead>
                            <tbody>
                                {bondData?.map((bond, index) => (
                                    <tr key={index} className="border-b">
                                        <td className="p-[10px] border-l border-gray-300">{bond?.title}</td>
                                        <td className="p-[10px] border-l border-gray-300">{'$' + bond?.bond_price}</td>
                                        <td className="p-[10px] border-l border-gray-300">{bond?.total_bonds
                                        }</td>
                                        <td className="p-[10px] border-l  border-gray-300">{bond?.validity_number + ' months'}</td>
                                        <td className={`border-l border-r border-gray-300 p-[10px] ${getStatusClass(bond?.status)}`}>
                                            {bond?.status?.toLocaleLowerCase()?.charAt(0)?.toUpperCase() + bond?.status?.toLocaleLowerCase()?.slice(1)}
                                        </td>
                                        <td className={`border-l border-r border-gray-300 p-[10px] flex justify-center py-[10px] `}>
                                            <p onClick={() => {
                                                navigate(`/exchange?id=${bond?._id}`)
                                            }} target="_blank" className='cursor-pointer border-[1px] rounded-[20px] px-[20px] py-[10px] w-fit text-[#6B33E3]'>Register for Exchange</p>
                                            <p onClick={(e) => {
                                                setCancelledPopup(!cancelledpopup)
                                                setCancellationState({
                                                    ...cancellationState,
                                                    bond_id: bond?._id
                                                })
                                            }} className="cursor-pointer p-[10px] border-l border-gray-300">Cancel</p>
                                        </td>

                                    </tr>
                                ))}
                            </tbody>

                        </table>
                        <div className='w-full xl:hidden block'>
                            <div className="xl:grid-cols-4 grid-cols-2 gap-[20px] border-b border-gray-300 py-4">
                                {bondData?.map((bond, index) => (
                                    <div key={index} className="grid xl:grid-cols-4 grid-cols-2 gap-[20px] border-b border-gray-300 py-4">
                                        <div className="flex flex-col gap-[10px]">
                                            <h1 className="text-[18px] font-semibold text-[#7E8183]">Bond Name</h1>
                                            <p className="text-[16px] font-semibold">{bond?.title}</p>
                                        </div>

                                        <div className="flex flex-col gap-[10px]">
                                            <h1 className="text-[18px] font-semibold text-[#7E8183]">Unit Price</h1>
                                            <p className="text-[16px] font-semibold">{'$' + bond?.bond_price}</p>
                                        </div>

                                        <div className="flex flex-col gap-[10px]">
                                            <h1 className="text-[18px] font-semibold text-[#7E8183]">Quantity</h1>
                                            <p className="text-[16px] font-semibold">{bond?.total_bonds} </p>
                                        </div>

                                        <div className="flex flex-col gap-[10px]">
                                            <h1 className="text-[18px] font-semibold text-[#7E8183]">Validity Period</h1>
                                            <p className="text-[16px] font-semibold">{bond?.validity_number + ' months'}</p>
                                        </div>
                                        <div className="flex flex-col gap-[10px]">
                                            <h1 className="text-[18px] font-semibold text-[#7E8183]">Status</h1>
                                            <p className={`text-[16px] font-semibold ${getStatusClass(bond?.status)}`}> {bond?.status?.toLocaleLowerCase()?.charAt(0)?.toUpperCase() + bond?.status?.toLocaleLowerCase()?.slice(1)}</p>
                                        </div>
                                        <div className="flex flex-col gap-[10px]">
                                            <h1 className="text-[18px] font-semibold text-[#7E8183]">Action</h1>
                                            <p className={`text-[16px] font-semibold`}>
                                                <p onClick={() => {
                                                    navigate(`/exchange?id=${bond?._id}`)
                                                }} target="_blank" className='cursor-pointer border-[1px] rounded-[20px] px-[20px] py-[10px] w-fit text-[#6B33E3]'>Register for Exchange</p>
                                                <p onClick={(e) => {
                                                    setCancelledPopup(!cancelledpopup)
                                                    setCancellationState({
                                                        ...cancellationState,
                                                        bond_id: bond?._id
                                                    })
                                                }} className="cursor-pointer p-[10px] border-l border-gray-300">Cancel</p>
                                            </p>
                                        </div>

                                    </div>
                                ))}
                            </div>

                        </div>
                    </div> : <div className='flex justify-center items-center'>
                        <p>No record found</p>
                    </div> : <div className='flex justify-center items-center'>
                    <MoonLoader color="#6B33E3" size={100} />
                </div>
                }

                {cancelledpopup && (
                    <>
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" onClick={(e) => {
                            setCancelledPopup(!cancelledpopup)
                        }}>
                            <div className="bg-white rounded-lg p-6 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
                                <h2 className="text-[24px] font-semibold mb-4">Rejection Reason</h2>

                                <div className="mb-4">
                                    <label className="text-[18px] font-semibold text-black" htmlFor="rejectionReason">
                                        Select Reason
                                    </label>
                                    <select
                                        id="rejectionReason"
                                        value={cancellationState.reason}
                                        onChange={(e) => {
                                            setCancellationState({
                                                ...cancellationState,
                                                reason: e.target.value
                                            })
                                        }}
                                        className="mt-4 block w-full px-3 py-4 border rounded-[20px] border-gray-300 focus:outline-none focus:ring focus:border-blue-500"
                                    >
                                        <option value="" disabled>Select a reason</option>
                                        <option value="Incomplete Information">Incomplete Information</option>
                                        <option value="Invalid Data">Invalid Data</option>
                                        <option value="Policy Violation">Policy Violation</option>
                                    </select>
                                </div>

                                <div className="mb-4">
                                    <label className="text-[18px] font-semibold text-black" htmlFor="note">
                                        Add Note
                                    </label>
                                    <textarea
                                        id="note"
                                        value={cancellationState.description}
                                        onChange={(e) => {
                                            setCancellationState({
                                                ...cancellationState,
                                                description: e.target.value
                                            })
                                        }}

                                        rows="4"
                                        className="mt-4 block w-full px-3 py-4 border rounded-[20px] border-gray-300 focus:outline-none focus:ring focus:border-blue-500"
                                        placeholder="Add additional details here"
                                    />
                                </div>

                                <button
                                    onClick={cancellbond}
                                    className="w-full py-3 mt-4 bg-blue-500 text-white rounded-[20px] font-semibold hover:bg-[#6b33e3]"
                                >
                                    Cancel bond
                                </button>
                            </div>
                        </div>
                    </>
                )}

            </div>
        </>
    );
};

export default SellerBondListingTable;
