import React, { useState, useEffect } from 'react';
import { BASE_URL } from '../../baseURL';
import { MoonLoader } from 'react-spinners';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

const SellerMissionListingTable = () => {
    const [selectedMonth, setSelectedMonth] = useState('default');
    const [originalBondData, setOriginalBondData] = useState([])
    const [popup, setPopup] = useState(false)
    const [disableSendOffer, setDisableSendOffer] = useState(false)
    const [search, setSearch] = useState("")
    const [selectedPriceRange, setSelectedPriceRange] = useState("default")
    const [cancelledpopup, setCancelledPopup] = useState(false)
    const [bids, setBids] = useState([])
    const [locationId, setLocationId] = useState()
    const [missions, setMissions] = useState([])
    const [disableOffer, setDisableOffer] = useState(true)
    const [currentIssuerId, setCurrentIssuerId] = useState()
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 7;
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
    const location = useLocation()
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
            setDisableOffer(response.data.disableOffer)
            setLoading(false)
            setDisableSendOffer(false)
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
            if (locationId == state.bond_id) {
                navigate(location.pathname, { replace: true });
            }
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

    const handleOfferClick = (bondid, buyer_id, total_bonds, price) => {


        setPopup(!popup)
        if (!buyer_id) buyer_id = ''
        setState({
            ...state,
            price: price,
            number_of_bonds: '',
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

    const filterItems = (value) => {
        setSearch(value);
        applyFilters();
    };
    const handlePriceRangeChange = (e) => {
        setSelectedPriceRange(e.target.value);
        applyFilters();
    };


    const applyFilters = () => {
        let filteredData = originalBondData;

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
                const titleMatch = bond.issuer_id.user_id.username.toLowerCase().includes(searchValue);

                return titleMatch
            });
        }

        setBondData(filteredData);
    };



    useEffect(() => {
        applyFilters();
    }, [selectedMonth, selectedPriceRange, search]);

    useEffect(() => {
        let params = new URLSearchParams(location.search)
        let id = params.get('id')
        setLocationId(id)
        let total_bonds = params.get('total_bonds')
        let price = params.get('key')
        setState({
            ...state,
            bond_id: id,
            price,
            limit_bonds: total_bonds
        })
        setDisableSendOffer(true)
        if (id) {
            setPopup(!popup)
        }
    }, [])
    const totalPages = Math.ceil(bondData?.length / rowsPerPage);
    const currentRows = bondData?.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );


    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrev = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <>
            <ToastContainer containerId="buyerMarket" limit={1} />
            <div className="bg-[#f2f2f2] min-h-[600px]    p-[20px] rounded-[20px]  ">
                <div className="flex justify-between lg:flex-row flex-col gap-[20px] items-center mb-[20px]">
                    <div className='flex flex-col'>
                        <h1 className="lg:text-[2rem] text-black  text-[1.50rem] font-medium  lg:text-left text-center lg:font-bold">Promise Bonds</h1>
                        <p className='lg:text-[0.94rem] text-black text-[0.75rem] lg:text-left text-center lg:mb-0 mb-[25px]'>Discover,Buy and Sell Promise Bonds</p>
                    </div>
                    <div className="flex w-full lg:w-fit  gap-[18px] lg:flex-row flex-col lg:mt-0 mt-[40px]">

                        <select
                            value={selectedMonth}
                            onChange={fetchAccordingToMonth}
                            className="p-[8px] lg:max-w-[140px] w-full bg-white font-medium text-[.88rem] text-black rounded-[2rem] shadow-md outline-none"
                        >
                            <option value="default">Month</option>
                            {months.map((month) => (
                                <option key={month} value={month}>
                                    {month}
                                </option>
                            ))}
                        </select>


                        <div className="flex gap-[10px] xl:flex-row flex-col lg:w-[340px]   w-full ">
                            <div className="w-full border bg-white border-[#E9E9E9] rounded-[20px] px-[10px] py-[10px] flex items-center">
                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) => filterItems(e.target.value)}
                                    placeholder="Search here..."
                                    className="outline-none border-none bg-transparent w-[90%]"
                                />
                            </div>
                        </div>



                    </div>
                </div>

                {loading ? <div className='flex justify-center items-center'>
                    <MoonLoader color="#6B33E3" size={100} />
                </div> : currentRows?.length > 0 ?
                    <div className='lg:p-[30px] lg:bg-white'>
                        <table className="min-w-full xl:table hidden table-auto border-gray-300 border-collapse">
                            <thead>
                                <tr className="bg-[#FDFBFD]">

                                    <th className="p-[10px] bg-[#1DBF7314]  text-[1.07rem] font-medium lg:px-[30px] lg:py-[30px] text-left border-b border-gray-300">Issuer</th>
                                    <th className="p-[10px] bg-[#1DBF7314] text-[1.07rem] font-medium text-left border-b lg:py-[30px] border-gray-30">Mission</th>
                                    <th className="p-[10px] bg-[#1DBF7314] text-[1.07rem] font-medium text-left border-b lg:py-[30px] border-gray-30">Bond Title</th>
                                    <th className="p-[10px] bg-[#1DBF7314] text-[1.07rem] font-medium text-left border-b lg:py-[30px] border-gray-30">Price</th>
                                    <th className="p-[10px] bg-[#1DBF7314] text-[1.07rem] font-medium text-left border-b lg:py-[30px] border-gray-30">Bonds</th>
                                    <th className="p-[10px] bg-[#1DBF7314] text-[1.07rem] font-medium text-left border-b lg:py-[30px] border-gray-30">Validity</th>
                                    <th className="p-[10px] bg-[#1DBF7314] text-[1.07rem] font-medium lg:pr-[30px] text-left lg:py-[30px] border-b border-gray-300">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bondData?.map((bond, index) => (
                                    <tr key={index} className="">

                                        <td className="p-[10px] lg:pl-[30px] text-[0.94rem] border-b border-b-[#E9E9E9]  font-normal pt-[30px] ">{bond?.issuer_id?.user_id?.username}</td>
                                        <td className="p-[10px] text-[0.94rem] font-normal  border-b border-b-[#E9E9E9] pt-[30px] "> {missions?.find(u => u?.bond_id === bond?._id)?.mission_title || 'N/A'}</td>
                                        <td className="p-[10px] text-[0.94rem] font-normal  border-b border-b-[#E9E9E9] pt-[30px] "> {bond?.title}</td>
                                        <td className="p-[10px] text-[0.94rem] font-normal border-b border-b-[#E9E9E9]  pt-[30px]  text-[#1DBF73]"> ${bond?.bond_issuerance_amount}</td>
                                        <td className="p-[10px] text-[0.94rem] font-normal border-b border-b-[#E9E9E9]  pt-[30px]">{bond?.total_bonds}</td>
                                        <td className="p-[10px] text-[0.94rem] font-normal border-b border-b-[#E9E9E9]  pt-[30px] ">{bond?.validity_number + ' months'}</td>
                                        <td>
                                            <button className="p-[10px] py-[30px]  flex items-center gap-[10px] lg:col-span-2 text-[0.94rem] font-normal border-b border-b-[#E9E9E9] ">
                                                {/* {bond?.status?.toLocaleLowerCase()?.charAt(0)?.toUpperCase() + bond?.status?.toLocaleLowerCase()?.slice(1)} */}
                                                {bond?.status === "AWAITING FOR PAYMENT" &&
                                                    bond?.issuer_id !== currentIssuerId &&
                                                    (
                                                        bond?.offers?.some(u => u?.buyer_id === currentBuyerId) ||
                                                        bond?.buyerOffers?.some(u => u?.newbuyer_id === currentBuyerId)
                                                    )
                                                    ? <a href={`/payment?bond_id=${bond?._id}`} className='bg-[#FFEDE8] p-[10px] '>Pay Now</a>
                                                    : ''
                                                }


                                                {bond?.status == "APPROVED" && bond?.issuer_id._id !== currentIssuerId && bond?.disableOffer == false ? <a onClick={() => handleOfferClick(bond?._id, bond?.buyer_id, bond?.total_bonds, bond?.bond_price)} className='bg-[#FFEDE8] p-[10px] cursor-pointer'>Send Offer</a> : ''}
                                                {bond?.status == "WAITING FOR EXCHANGE" && !bids.find(u => u.bond_id == bond._id && u.bidder == currentBuyerId && u?.status === "PENDING") && bond?.issuer_id != currentIssuerId && bond?.buyer_id != currentBuyerId ? <a onClick={() => navigate(`/bid?id=${bond?._id}`)} className='bg-[#FFEDE8] p-[10px] cursor-pointer'>Bid offer</a> : ''}
                                                {
  !(bond?.status === "AWAITING FOR PAYMENT" &&
    bond?.issuer_id !== currentIssuerId &&
    (
      bond?.offers?.some(u => u?.buyer_id === currentBuyerId) ||
      bond?.buyerOffers?.some(u => u?.newbuyer_id === currentBuyerId)
    )) &&
  !(bond?.status === "APPROVED" && bond?.issuer_id._id !== currentIssuerId && !bond?.disableOffer) &&
  !(bond?.status === "WAITING FOR EXCHANGE" && !bids.find(u => u.bond_id === bond._id && u.bidder === currentBuyerId && u?.status === "PENDING") && bond?.issuer_id !== currentIssuerId && bond?.buyer_id !== currentBuyerId)
    ? <p className='bg-[#FFEDE8] p-[10px] ' onClick={()=>{
        navigate(`/promisebonddetail/${bond?._id}`)
    }}>View</p>
    : ''
}
                                           
                                            </button>
                                        </td>



                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className='w-full xl:hidden block'>
                            <div className="flex bg-[#f2f2f2] flex-col gap-[20px]">
                                {currentRows?.map((bond, index) => (
                                    <div key={index} className="p-[20px] bg-white flex flex-col gap-[20px] border-b border-gray-300 py-4">
                                        <div className='flex flex-col gap-[10px]'>
                                            <div className="flex flex-col gap-[10px]">
                                                <p className="text-[14px] font-semibold">{bond?.issuer_id?.user_id?.username}</p>
                                            </div>

                                            <div className="flex flex-col gap-[10px]">
                                                <p className="text-[14px] font-semibold">{missions?.find(u => u?.bond_id === bond?._id)?.mission_title || 'N/A'}</p>
                                            </div>
                                            <div className="flex flex-col gap-[10px]">
                                                <p className="text-[14px] font-semibold">{bond?.title}</p>
                                            </div>
                                            <div className="flex flex-col gap-[10px]">
                                                <p className="text-[0.75rem]">{bond?.total_bonds} </p>
                                            </div>
                                            <div className="flex items-center  gap-[10px]">
                                                <h1 className="text-[0.75rem]">Validity:</h1>
                                                <p className="text-[0.75rem]">{bond?.validity_number + ' months'}</p>
                                            </div>

                                        </div>
                                        <div className="flex justify-between items-center">
                                            <div className="flex flex-col gap-[10px]">
                                                <p className="text-[0.75rem] text-[#1DBF73]">{bond?.bond_issuerance_amount}/bond </p>
                                            </div>
                                            <button className="p-[10px] py-[30px]  flex items-center gap-[10px] lg:col-span-2 text-[0.94rem] font-normal border-b border-b-[#E9E9E9]">
                                                {/* {bond?.status?.toLocaleLowerCase()?.charAt(0)?.toUpperCase() + bond?.status?.toLocaleLowerCase()?.slice(1)} */}
                                                {bond?.status === "AWAITING FOR PAYMENT" &&
                                                    bond?.issuer_id !== currentIssuerId &&
                                                    (
                                                        bond?.offers?.some(u => u?.buyer_id === currentBuyerId) ||
                                                        bond?.buyerOffers?.some(u => u?.newbuyer_id === currentBuyerId)
                                                    )
                                                    ? <a href={`/payment?bond_id=${bond?._id}`} className='bg-[#FFEDE8] p-[10px]'>Pay Now</a>
                                                    : ''
                                                }


                                                {bond?.status == "APPROVED" && bond?.issuer_id._id !== currentIssuerId && bond?.disableOffer == false ? <a onClick={() =>  handleOfferClick(bond?._id, bond?.buyer_id, bond?.total_bonds, bond?.bond_price)} className='bg-[#FFEDE8] p-[10px] cursor-pointer'>Send Offer</a> : ''}
                                                {bond?.status == "WAITING FOR EXCHANGE" && !bids.find(u => u.bond_id == bond._id && u.bidder == currentBuyerId && u?.status === "PENDING") && bond?.issuer_id != currentIssuerId && bond?.buyer_id != currentBuyerId ? <a onClick={() => navigate(`/bid?id=${bond?._id}`)} className='bg-[#FFEDE8] p-[10px] cursor-pointer'>Bid offer</a> : ''}
                                                {
  !(bond?.status === "AWAITING FOR PAYMENT" &&
    bond?.issuer_id !== currentIssuerId &&
    (
      bond?.offers?.some(u => u?.buyer_id === currentBuyerId) ||
      bond?.buyerOffers?.some(u => u?.newbuyer_id === currentBuyerId)
    )) &&
  !(bond?.status === "APPROVED" && bond?.issuer_id._id !== currentIssuerId && !bond?.disableOffer) &&
  !(bond?.status === "WAITING FOR EXCHANGE" && !bids.find(u => u.bond_id === bond._id && u.bidder === currentBuyerId && u?.status === "PENDING") && bond?.issuer_id !== currentIssuerId && bond?.buyer_id !== currentBuyerId)
    ? <p className='bg-[#FFEDE8] p-[10px] ' onClick={()=>{
        navigate(`/promisebonddetail/${bond?._id}`)
    }}>View</p>
    : ''
}
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                        </div>
                    </div> : <div className='flex justify-center items-center'>
                        <p>No record found</p>
                    </div>}
            </div>

            {popup ? (
                <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center px-[20px] bg-[#00000085] z-50">
                    <div className="bg-white flex flex-col gap-[10px] rounded-[20px] p-[20px] max-w-[800px] w-full">
                        <h1 className="text-[24px] font-semibold">Desired Purchase Price</h1>

                        <div>
                            <label htmlFor="price" className="block text-xl font-semibold text-[#272226]">Price</label>
                            <div className="mt-4">
                                <input
                                    disabled
                                    value={state.price*state?.number_of_bonds}
                                    onChange={(e) => {

                                        const newValue = e.target.value;
                                        if (/^\d*\.?\d*$/.test(newValue)) {
                                            setState({
                                                ...state,
                                                price: newValue
                                            });
                                        }
                                    }}
                                    type="text"
                                    name="price"
                                    className="mt-1 block w-full px-3 py-4 border rounded-[20px] border-gray-300 focus:outline-none focus:ring focus:border-blue-500"
                                    placeholder="Enter Your Desired Price"
                                    min="0"
                                />

                            </div>
                        </div>

                        <div>
                            <label htmlFor="bonds" className="block text-xl font-semibold text-[#272226]">Number of Bonds</label>
                            <div className="mt-4">
                                <input
                                    value={state.number_of_bonds}
                                    onChange={(e) => {

                                        const inputValue = e.target.value.replace(/^0+/, '');
                                        const parsedValue = Number(inputValue);


                                        if (!isNaN(parsedValue) && parsedValue <= state.limit_bonds) {
                                            setState({
                                                ...state,
                                                number_of_bonds: parsedValue
                                            });
                                        }
                                    }}
                                    type="text"
                                    name="bonds"
                                    className="mt-1 block w-full px-3 py-4 border rounded-[20px] border-gray-300 focus:outline-none focus:ring focus:border-blue-500"
                                    placeholder="Enter Your Bond Number"
                                />

                            </div>

                        </div>

                        <div className="hover:cursor-pointer flex flex-col justify-between mt-4 gap-[10px] xl:flex-row">
                            <div onClick={() => setPopup(!popup)} className="border-[1px] rounded-[10px] w-full xl:w-1/2 text-center text-[20px] border-[#1DBF73] px-[20px] py-[10px] text-[#1DBF73] font-semibold">
                                Cancel
                            </div>
                            <div onClick={sendOffer} className="hover:cursor-pointer border-[1px] rounded-[10px] w-full xl:w-1/2 text-center text-[20px] bg-[#1DBF73] px-[20px] py-[10px] text-white font-semibold">
                                Send Offer
                            </div>
                        </div>
                    </div>
                </div>
            ) : ''}

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

        </>
    );
};

export default SellerMissionListingTable;
