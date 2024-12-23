
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
            let response = await axios.get(`${BASE_URL}/billing`, headers)
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
            <div className="bg-[#f2f2f2] max-h-[700px] min-h-[400px]  h-fit  overflow-y-auto p-[20px] rounded-[20px] ">
                <div className="flex justify-between items-center mb-[20px]">
                    <div className='flex flex-col'>
                        <h1 className="lg:text-[2rem] text-[1.5rem] font-bold">Explore Exciting Opportunities</h1>
                        <p className='lg:text-[0.94rem] text-[0.75rem]'>Discover and invest in unique missions by talented individuals.</p>
                    </div>

                </div>

                {loading ? <div className='flex justify-center items-center'>
                    <MoonLoader color="#6B33E3" size={100} />
                </div> : bondData?.length > 0 ?
                    <div className='lg:p-[30px] lg:bg-white'>
                        <table className="min-w-full xl:table hidden table-auto border-gray-300 border-collapse">
                            <thead>
                                <tr className="bg-[#FDFBFD]">

                                    <th className="p-[10px] bg-[#1DBF7314]  text-[1.07rem] font-medium lg:px-[30px] lg:py-[30px] text-left border-b border-gray-300">Bond</th>
                                    <th className="p-[10px] bg-[#1DBF7314]  text-[1.07rem] font-medium lg:px-[30px] lg:py-[30px] text-left border-b border-gray-300">Date</th>
                                    <th className="p-[10px] bg-[#1DBF7314] text-[1.07rem] font-medium text-left border-b lg:py-[30px] border-gray-30">Price</th>
                                    <th className="p-[10px] bg-[#1DBF7314] text-[1.07rem] font-medium text-left border-b lg:py-[30px] border-gray-30">Status</th>
                                    <th className="p-[10px] bg-[#1DBF7314] text-[1.07rem] font-medium text-left border-b lg:py-[30px] border-gray-30">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bondData?.map((bond, index) => (
                                    <tr key={index} className="">

                                        <td className="p-[10px] lg:pl-[30px] text-[0.94rem] border-b border-b-[#E9E9E9]  font-normal pt-[30px]">{bond?.issuer_id?.user_id?.username}</td>
                                        <td className="p-[10px] text-[0.94rem] font-normal  border-b border-b-[#E9E9E9] pt-[30px]">{bond?.validity_number + ' months'}</td>
                                        <td className="p-[10px] text-[0.94rem] font-normal border-b border-b-[#E9E9E9]  pt-[30px] text-[#1DBF73]"> ${bond?.bond_issuerance_amount}</td>

                                        <td className="p-[10px] text-[0.94rem] font-normal border-b border-b-[#E9E9E9]  pt-[30px]">{bond?.status}</td>
                                        <td className={`flex  p-[20px] items-center gap-[6px] border-b border-b-[#E9E9E9]  pt-[30px]`}>
                                            <Link to={`/invoice/${bond?._id}`} className="flex bg-[#FFEDE8] p-[20px] items-center gap-[6px]">
                                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <g clip-path="url(#clip0_220_908)">
                                                        <path d="M3.0503 15.3332H4.8658C5.15097 15.3332 5.3823 15.1183 5.3823 14.8332C5.3823 14.548 5.15114 14.3332 4.8658 14.3332H3.0503C2.28597 14.3332 1.66797 13.6548 1.66797 12.8613V5.49984H14.168V7.38017C14.168 7.66534 14.4661 7.89667 14.7513 7.89667C15.0365 7.89667 15.3346 7.6655 15.3346 7.38017V3.14884C15.3346 1.80334 14.0701 0.666504 12.739 0.666504H3.0503C1.71647 0.666504 0.667969 1.78 0.667969 3.14884V12.8613C0.667969 14.2243 1.71647 15.3332 3.0503 15.3332ZM1.66797 3.14884C1.66797 2.36317 2.29897 1.6665 3.0503 1.6665H12.739C13.5101 1.6665 14.168 2.36317 14.168 3.14884V4.49984H1.66797V3.14884Z" fill="#1F4B3F" />
                                                        <path d="M12.4066 2.6665H12.2001C11.9149 2.6665 11.6836 2.96467 11.6836 3.24984C11.6836 3.535 11.9148 3.83317 12.2001 3.83317H12.4066C12.6918 3.83317 12.9231 3.535 12.9231 3.24984C12.9231 2.96467 12.6918 2.6665 12.4066 2.6665Z" fill="#1F4B3F" />
                                                        <path d="M10.6488 2.6665H10.4423C10.1571 2.6665 9.92578 2.96467 9.92578 3.24984C9.92578 3.535 10.1569 3.83317 10.4423 3.83317H10.6488C10.9339 3.83317 11.1653 3.535 11.1653 3.24984C11.1653 2.96467 10.9339 2.6665 10.6488 2.6665Z" fill="#1F4B3F" />
                                                        <path d="M8.78941 2.6665H8.58291C8.29774 2.6665 8.06641 2.96467 8.06641 3.24984C8.06641 3.535 8.29757 3.83317 8.58291 3.83317H8.78941C9.07457 3.83317 9.30591 3.535 9.30591 3.24984C9.30591 2.96467 9.07457 2.6665 8.78941 2.6665Z" fill="#1F4B3F" />
                                                        <path d="M10.1662 7.85547C7.9015 7.85547 5.83333 9.27764 5 11.3945C5 11.3945 6.08417 15.3868 10.1662 15.2998C14.4792 15.208 15.3333 11.3945 15.3333 11.3945C14.5 9.27764 12.4315 7.85547 10.1662 7.85547ZM10.203 14.267C8.43067 14.267 6.812 13.1941 6.11367 11.5776C6.81183 9.96114 8.43067 8.8883 10.203 8.8883C11.9758 8.8883 13.5948 9.96114 14.2932 11.5776C13.595 13.1941 11.9758 14.267 10.203 14.267Z" fill="#1F4B3F" />
                                                        <path d="M10.2032 9.57422C9.09822 9.57422 8.19922 10.4731 8.19922 11.5781C8.19922 12.6831 9.09822 13.5819 10.2032 13.5819C11.3082 13.5819 12.2071 12.6831 12.2071 11.5781C12.2071 10.4731 11.3082 9.57422 10.2032 9.57422ZM10.2032 12.5491C9.66772 12.5491 9.23205 12.1134 9.23205 11.5781C9.23205 11.0427 9.66772 10.6071 10.2032 10.6071C10.7387 10.6071 11.1742 11.0427 11.1742 11.5781C11.1742 12.1134 10.7387 12.5491 10.2032 12.5491Z" fill="#1F4B3F" />
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0_220_908">
                                                            <rect width="16" height="16" fill="white" />
                                                        </clipPath>
                                                    </defs>
                                                </svg>
                                                View Invoice</Link>
                                        </td>



                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className='w-full xl:hidden block'>
                            <div className="flex bg-[#f2f2f2] flex-col gap-[20px]">
                                {bondData?.map((bond, index) => (
                                    <div key={index} className="p-[20px] bg-white flex flex-col gap-[20px] border-b border-gray-300 py-4">
                                        <div className='flex flex-col gap-[10px]'>
                                            <div className="flex flex-col gap-[10px]">

                                                <p className="text-[14px] font-semibold">{bond?.title}</p>
                                            </div>
                                            <div className="flex flex-col gap-[10px]">

                                                <p className="text-[14px] font-semibold">{bond?.bond_price}</p>
                                            </div>
                                            <div className="flex flex-col gap-[10px]">

                                                <p className="text-[14px] font-semibold">{bond?.validity_number + ' months'}</p>
                                            </div>

                                        </div>
                                        <div className='flex justify-between items-center'>
                                            <div className="flex flex-col gap-[10px]">
                                                
                                                <p className="text-[0.75rem] text-[#1DBF73] ">{bond?.total_bonds}/bond </p>
                                            </div>
                                            <Link to={`/invoice/${bond?.title}`} className="flex bg-[#FFEDE8] p-[20px] items-center gap-[6px]">
                                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <g clip-path="url(#clip0_220_908)">
                                                        <path d="M3.0503 15.3332H4.8658C5.15097 15.3332 5.3823 15.1183 5.3823 14.8332C5.3823 14.548 5.15114 14.3332 4.8658 14.3332H3.0503C2.28597 14.3332 1.66797 13.6548 1.66797 12.8613V5.49984H14.168V7.38017C14.168 7.66534 14.4661 7.89667 14.7513 7.89667C15.0365 7.89667 15.3346 7.6655 15.3346 7.38017V3.14884C15.3346 1.80334 14.0701 0.666504 12.739 0.666504H3.0503C1.71647 0.666504 0.667969 1.78 0.667969 3.14884V12.8613C0.667969 14.2243 1.71647 15.3332 3.0503 15.3332ZM1.66797 3.14884C1.66797 2.36317 2.29897 1.6665 3.0503 1.6665H12.739C13.5101 1.6665 14.168 2.36317 14.168 3.14884V4.49984H1.66797V3.14884Z" fill="#1F4B3F" />
                                                        <path d="M12.4066 2.6665H12.2001C11.9149 2.6665 11.6836 2.96467 11.6836 3.24984C11.6836 3.535 11.9148 3.83317 12.2001 3.83317H12.4066C12.6918 3.83317 12.9231 3.535 12.9231 3.24984C12.9231 2.96467 12.6918 2.6665 12.4066 2.6665Z" fill="#1F4B3F" />
                                                        <path d="M10.6488 2.6665H10.4423C10.1571 2.6665 9.92578 2.96467 9.92578 3.24984C9.92578 3.535 10.1569 3.83317 10.4423 3.83317H10.6488C10.9339 3.83317 11.1653 3.535 11.1653 3.24984C11.1653 2.96467 10.9339 2.6665 10.6488 2.6665Z" fill="#1F4B3F" />
                                                        <path d="M8.78941 2.6665H8.58291C8.29774 2.6665 8.06641 2.96467 8.06641 3.24984C8.06641 3.535 8.29757 3.83317 8.58291 3.83317H8.78941C9.07457 3.83317 9.30591 3.535 9.30591 3.24984C9.30591 2.96467 9.07457 2.6665 8.78941 2.6665Z" fill="#1F4B3F" />
                                                        <path d="M10.1662 7.85547C7.9015 7.85547 5.83333 9.27764 5 11.3945C5 11.3945 6.08417 15.3868 10.1662 15.2998C14.4792 15.208 15.3333 11.3945 15.3333 11.3945C14.5 9.27764 12.4315 7.85547 10.1662 7.85547ZM10.203 14.267C8.43067 14.267 6.812 13.1941 6.11367 11.5776C6.81183 9.96114 8.43067 8.8883 10.203 8.8883C11.9758 8.8883 13.5948 9.96114 14.2932 11.5776C13.595 13.1941 11.9758 14.267 10.203 14.267Z" fill="#1F4B3F" />
                                                        <path d="M10.2032 9.57422C9.09822 9.57422 8.19922 10.4731 8.19922 11.5781C8.19922 12.6831 9.09822 13.5819 10.2032 13.5819C11.3082 13.5819 12.2071 12.6831 12.2071 11.5781C12.2071 10.4731 11.3082 9.57422 10.2032 9.57422ZM10.2032 12.5491C9.66772 12.5491 9.23205 12.1134 9.23205 11.5781C9.23205 11.0427 9.66772 10.6071 10.2032 10.6071C10.7387 10.6071 11.1742 11.0427 11.1742 11.5781C11.1742 12.1134 10.7387 12.5491 10.2032 12.5491Z" fill="#1F4B3F" />
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0_220_908">
                                                            <rect width="16" height="16" fill="white" />
                                                        </clipPath>
                                                    </defs>
                                                </svg>
                                                View Invoice</Link>
                                        </div>
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