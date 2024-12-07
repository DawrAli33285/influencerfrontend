
import React, { useState, useEffect } from 'react';
import { BASE_URL } from '../baseURL';
import { MoonLoader } from 'react-spinners';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';
export default function Billing() {
    const [selectedMonth, setSelectedMonth] = useState('default');
    const [originalBondData, setOriginalBondData] = useState([])
    const [popup, setPopup] = useState(false)
    const [cancelledpopup, setCancelledPopup] = useState(false)
    const [bids, setBids] = useState([])
    const [missions, setMissions] = useState([])
    const [currentIssuerId, setCurrentIssuerId] = useState()
    const [cancellationState, setCancellationState] = useState({
        reason: '',
        description: '',
        bond_id: ''
    })
    const [currentBuyerId, setCurrentBuyerId] = useState()
    const [state, setState] = useState({
        price: '',
        number_of_bonds: '',
        bond_id: '',
        oldbuyer_id: '',
        limit_bonds: ''
    })
    const [bondData, setBondData] = useState([])


    const [loading, setLoading] = useState(true)
    useEffect(() => {
        fetchBondData();
    }, [])
    const fetchBondData = async () => {
        try {
            let token = localStorage.getItem('token')
            let headers = {
                headers: {
                    authorization: `Bearer ${token}`
                }
            }
            let response = await axios.get(`${BASE_URL}/get-bonds`, headers)
            setBondData(response.data.bonds)
            console.log("GET BONDS")
            console.log(response.data)
            setCurrentIssuerId(response.data.issuer_id)
            setOriginalBondData(response.data.bonds)
            setBids(response.data.bids)
            setCurrentBuyerId(response.data.buyer_id)
            setMissions(response.data.missions)
            setLoading(false)
            console.log(response.data)
        } catch (e) {
            if (e?.response?.data?.error) {
                toast.dismiss()
                toast.error(e?.response?.data?.error, { containerId: "buyerMarket" })
                return;
            } else {
                toast.dismiss()
                toast.error("Client error please try again", { containerId: "buyerMarket" })
                return;
            }
        }
    }
    const navigate = useNavigate()

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
            case 'In Process':
                return 'text-orange-500';
            case 'NOT STARTED':
                return 'text-purple-400';
            case 'Failed':
                return 'text-red-500';
            case 'Approved':
                return 'text-green-500';
            default:
                return '';
        }
    };


    const sendOffer = async () => {
        try {
            let token = localStorage.getItem("buyerToken")
            let headers = {
                headers: {
                    authorization: `Bearer ${token}`
                }
            }
            if (state?.price == 0 || state?.price?.length == 0) {
                toast.error("Please enter price of offer", { containerId: "buyerMarket" })
                return;
            } else if (state?.number_of_bonds == 0 || state?.number_of_bonds?.length === 0) {
                toast.error("Please enter number of bonds", { containerId: "buyerMarket" })
                return;
            }
            let response = await axios.post(`${BASE_URL}/create-offer`, state, headers)
            toast.success(response.data.message, { containerId: 'buyerMarket' })
            setBondData((prev) => {
                let old = [...prev]
                let bondIndex = old.findIndex(u => u._id == state.bond_id)
                let newBond = {
                    ...old[bondIndex],
                    status: "OFFER PENDING"
                }
                old.splice(bondIndex, 1, newBond)
                return old
            })
            setPopup(!popup)
        } catch (e) {
            if (e?.response?.data?.error) {
                toast.error(e?.response?.data?.error, { containerId: "buyerMarket" })

            } else {
                toast.error("Client error please try again", { containerId: "buyerMarket" })

            }
        }
    }

    const handleOfferClick = (bondid, buyer_id, total_bonds) => {


        setPopup(!popup)
        if (!buyer_id) buyer_id = ''
        setState({
            ...state,
            bond_id: bondid,
            oldbuyer_id: buyer_id,
            limit_bonds: total_bonds
        })
    }

    const cancellbond = async () => {
        try {
            let token = localStorage.getItem('buyerToken')
            let headers = {
                headers: {
                    authorization: `Bearer ${token}`
                }
            }
            let response = await axios.post(`${BASE_URL}/cancellBond`, cancellationState, headers)
            toast.success(response.data.message, { containerId: "buyerMarket" })
            setCancelledPopup(!cancelledpopup)
            setCancellationState({
                bond_id: '',
                description: '',
                reason: ''
            })
        } catch (e) {
            if (e?.response?.data?.error) {
                toast.error(e?.response?.data?.error, { containerId: "buyerMarket" })
            } else {
                toast.error("Client error please try again", { containerId: "buyerMarket" })
            }
        }
    }




    return (
        <>
            <ToastContainer containerId="buyerMarket" limit={1} />
            <div className="bg-white max-h-[700px] min-h-[400px]   overflow-y-auto p-[20px] rounded-[20px] shadow-md ">
                <div className="flex justify-between items-center mb-[20px]">
                    <div className='flex flex-col'>
                        <h1 className="text-[24px] font-semibold">Manage Your Billing Details</h1>
                        <p className='text-[18px]'>Keep track of your transactions and update payment preferences effortlessly.</p>
                    </div>
              
                </div>

                {loading ? <div className='flex justify-center items-center'>
                    <MoonLoader color="#6B33E3" size={100} />
                </div> : bondData?.length > 0 ?
                    <div>
                        <table className="min-w-full xl:table hidden table-auto border-gray-300 border-collapse">
                            <thead>
                                <tr className="bg-[#FDFBFD]">

                                    <th className="p-[10px] text-left  border-b border-gray-300">Bond</th>
                                    <th className="p-[10px] text-left  border-b border-gray-300">Date</th>
                                    <th className="p-[10px] text-left  border-b border-gray-300">Price</th>
                                    <th className="p-[10px] text-left  border-b  border-gray-300">Status</th>
                                    <th className="p-[10px] text-left  border-b  border-gray-300"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {bondData?.map((bond, index) => (
                                    <tr key={index} className="">

                                        <td className="p-[10px] font-bold ">{bond?.issuer_id?.user_id?.username}</td>
                                        <td className="p-[10px] font-bold ">{bond?.validity_number + ' months'}</td>
                                        <td className="p-[10px] text-[#1DBF73]"> ${bond?.bond_issuerance_amount}</td>
                                        
                                        <td className="p-[10px]">{bond?.validity_number + ' months'}</td>
                                        <td className={`text-[#1DBF73] underline`}>
                                            <Link to={`/invoice/${bond?.title}`}>View Invoice</Link>
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
                                            <h1 className="text-[18px] font-semibold text-[#7E8183]">Bond</h1>
                                            <p className="text-[16px] font-semibold">{bond?.title}</p>
                                        </div>

                                        <div className="flex flex-col gap-[10px]">
                                            <h1 className="text-[18px] font-semibold text-[#7E8183]">Date</h1>
                                            <p className="text-[16px] font-semibold">{bond?.bond_price}</p>
                                        </div>

                                        <div className="flex flex-col gap-[10px]">
                                            <h1 className="text-[18px] font-semibold text-[#7E8183]">Price</h1>
                                            <p className="text-[16px] font-semibold">{bond?.total_bonds} </p>
                                        </div>

                                        <div className="flex flex-col gap-[10px]">
                                            <h1 className="text-[18px] font-semibold text-[#7E8183]">Status</h1>
                                            <p className="text-[16px] font-semibold">{bond?.validity_number + ' months'}</p>
                                        </div>

                                        <button className="p-[10px] w-fit text-[#1DBF73] underline  font-semibold rounded-[10px] lg:col-span-2">
                                            View Invoice
                                        </button>

                                    </div>
                                ))}
                            </div>

                        </div>
                    </div> : <div className='flex justify-center items-center'>
                        <p>No record found</p>
                    </div>}
            </div>





        </>
    );
}