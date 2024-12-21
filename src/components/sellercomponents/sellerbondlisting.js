import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { MoonLoader } from 'react-spinners';
import { BASE_URL } from '../../baseURL';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BondListContext } from "../../contextAPI/bondListing";
import { useContext } from 'react';
import { useDropzone } from 'react-dropzone';
import howto from "../../howtocreatebond.png"
import { Link, useNavigate } from 'react-router-dom';
const priceRanges = [
    { label: "Below $50", value: "0-50" },
    { label: "$50 - $100", value: "50-100" },
    { label: "$100 - $500", value: "100-500" },
    { label: "$500 - $1000", value: "500-1000" },
    { label: "Above $1000", value: "1000+" }
];
const SellerBondListingTable = () => {
    const [selectedMonth, setSelectedMonth] = useState('default');
    const [loading, setLoading] = useState(true)
    const [alreadyForExchange, setAlreadyForExchange] = useState(false)
    const [search, setSearch] = useState("")
    const [selectedPriceRange, setSelectedPriceRange] = useState("default")
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);
    const buttonRef = useRef(null);

    const [bondstate, setBondState] = useState({
        quantity: 0,
        bond_price: 0,
        validity_number: '',

        title: ''
    })
    const [uploadedImages, setUploadedImages] = useState([]);
    const [cancelledpopup, setCancelledPopup] = useState(false)
    const [bondpopup, setBondPopup] = useState(false)
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 7;
    const [cancellationState, setCancellationState] = useState({
        reason: 'Incomplete Information',
        description: '',
        bond_id: ''
    })
    const [links, setLinks] = useState(['']);
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
            setAlreadyForExchange(response.data.AlreadyForExchange)
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


    const getStatusClass = (status) => {
        switch (status) {
            case 'pending':
                return 'text-orange-500';
            case 'In progress':
                return 'text-red-500';
            case 'active':
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
                const titleMatch = bond.title.toLowerCase().includes(searchValue);
                const usernameMatch = bond?.issuer_id?.user_id?.username?.toLowerCase()?.includes(searchValue);
                return titleMatch || usernameMatch;
            });
        }

        setBondData(filteredData);
    };

    const cancellbond = async () => {
        try {
            let token = localStorage.getItem('buyerToken')
            let headers = {
                headers: {
                    authorization: `Bearer ${token}`
                }
            }
            console.log(cancellationState)
            if(cancellationState?.reason?.length==0){
                toast.error("Please select reason for cancellation",{containerId:"buyerbondListing"})
                return;
            }else if(cancellationState.description.length==0){
                toast.error("Please enter description for cancellation",{containerId:"buyerbondListing"})
                return;
            }

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
    const createBond = async () => {
        if (uploadedImages?.length === 0) {
            toast.dismiss()
            toast.error("Please select images for verification", { containerId: "containerB" })
            return;
        } else if (links?.length === 0) {
            toast.dismiss()
            toast.error("Please enter social media links", { containerId: "containerB" })
            return;
        } else if (bondstate.validity_number.length === 0) {
            toast.dismiss()
            toast.error("Please select validty number", { containerId: "containerB" })
            return;
        } else if (bondstate.title.length === 0) {
            toast.dismiss()
            toast.error("Please enter title of bond", { containerId: "containerB" })
            return;
        } else if (bondstate.quantity === 0 || bondstate.quantity.length === 0) {
            toast.dismiss()
            toast.error("Please enter valid quantity", { containerId: "containerB" })
            return;
        } else if (bondstate.bond_price === 0 || bondstate.bond_price.length === 0) {
            toast.dismiss()
            toast.error("Please enter valid price", { containerId: "containerB" })
            return;
        }
        try {


            let formData = new FormData();
            formData.append('quantity', bondstate.quantity)
            formData.append('bond_price', bondstate.bond_price)
            formData.append('title', bondstate.title)
            formData.append('validity_number', bondstate.validity_number)

            uploadedImages.forEach((image) => {
                formData.append('photos', image);
            });
            const token = localStorage.getItem('token')
            let headers = {
                headers: {
                    authorization: `Bearer ${token}`
                }
            }
            formData.append('social_media_links', links)
            let response = await axios.post(`${BASE_URL}/createBond`, formData, headers)
            console.log("BOND CREATED")
            console.log(response)
            toast.success(response?.data?.message)
            setBondPopup(!bondpopup)
            setBondState({
                quantity: 0,
                bond_price: 0
            })
            setUploadedImages([])
            setLinks([])
            toast.success(response.data.message, { containerId: "containerB" })
            setBondData((prev) => {
                let old;
                if (prev?.length > 0) {
                    old = [...prev, response.data.bond]
                } else {
                    old = [response.data.bond];
                }
                return old

            })

        } catch (e) {
            if (e?.response?.data?.error) {
                toast.error(e?.response?.data?.error, { containerId: "containerB" })

                return;
            } else {
                toast.error("Client error please try again", { containerId: "containerB" })
            }
        }
    }
    const fetchAccordingToMonth = (e) => {
        setSelectedMonth(e.target.value);
        applyFilters();
    };


    const filterItems = (value) => {
        setSearch(value);
        applyFilters();
    };

    const handlePriceRangeChange = (e) => {
        setSelectedPriceRange(e.target.value);
        applyFilters();
    };





    useEffect(() => {
        applyFilters();
    }, [selectedMonth, selectedPriceRange, search]);


    const requestMission = async (issuer_id, buyer_id, bond_id) => {
        try {
            let response = await axios.post(`${BASE_URL}/createMissionRequest`, { issuer_id, buyer_id, bond_id })
            setBondData((prev) => {

                const old = Array.isArray(prev) ? [...prev] : [prev];


                const findIndex = old.findIndex((u) => u._id === bond_id);


                if (findIndex !== -1) {
                    old[findIndex] = {
                        ...old[findIndex],
                        canRequestMission: false,
                    };
                }

                return old;
            });

            toast.success("Mission request sent", { containerId: "buyerbondListing" })
        } catch (e) {
            if (e?.response?.data?.error) {
                toast.error(e?.response?.data?.error, { containerId: "buyerbondListing" })

                return;
            } else {
                toast.error("Client error please try again", { containerId: "buyerbondListing" })
            }
        }
    }
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

       
       useEffect(() => {
        const handleClickOutside = (e) => {
            if (
                menuRef.current && !menuRef.current.contains(e.target) && 
                buttonRef.current && !buttonRef.current.contains(e.target) 
            ) {
                setMenuOpen(null);
            }
        };

       
        document.addEventListener('click', handleClickOutside);

      
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);


    return (
        <>
            <ToastContainer containerId="buyerbondListing" limit={1} />
            <div className="bg-[#f2f2f2]  min-h-[600px]  overflow-y-auto">
                <div className="flex justify-between lg:flex-row flex-col items-center mb-[20px]">
                    <div className='flex flex-col'>
                        <h1 className="lg:text-[2rem] text-[1.5rem] font-bold">Explore Exciting Opportunities</h1>
                        <p className='lg:text-[0.94rem] text-[0.75rem]'>Discover and invest in unique missions by talented individuals.</p>
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
                        <select
                            value={selectedPriceRange}
                            onChange={handlePriceRangeChange}
                            className="p-[8px] lg:max-w-[140px] w-full bg-white font-medium text-[.88rem] text-black rounded-[2rem] shadow-md outline-none"
                        >
                            <option value="default">Price Range</option>
                            {priceRanges.map((range) => (
                                <option key={range.value} value={range.value}>
                                    {range.label}
                                </option>
                            ))}
                        </select>


                        <div className="flex gap-[10px] xl:flex-row flex-col lg:w-[340px]   w-full">
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

                {!loading ? bondData?.length > 0 ?
                    <div className='lg:p-[30px] lg:bg-white'>
                        <table className="min-w-full xl:table hidden table-auto border-gray-300 border-collapse">
                            <thead>
                                <tr className="bg-[#FDFBFD]">
                                    <th className="p-[10px] bg-[#1DBF7314]  text-[1.07rem] font-medium lg:px-[30px] lg:py-[30px] text-left border-b border-gray-300">Bond Title</th>
                                    <th className="p-[10px] bg-[#1DBF7314]  text-[1.07rem] font-medium lg:px-[30px] lg:py-[30px] text-left border-b border-gray-300">Price</th>
                                    <th className="p-[10px] bg-[#1DBF7314]  text-[1.07rem] font-medium lg:px-[30px] lg:py-[30px] text-left border-b border-gray-300">Total Bonds</th>
                                    <th className="p-[10px] bg-[#1DBF7314]  text-[1.07rem] font-medium lg:px-[30px] lg:py-[30px] text-left border-b border-gray-300">Validity</th>
                                    <th className="p-[10px] bg-[#1DBF7314]  text-[1.07rem] font-medium lg:px-[30px] lg:py-[30px] text-left border-b border-gray-300">Status</th>
                                    <th className="p-[10px] bg-[#1DBF7314]  text-[1.07rem] font-medium lg:px-[30px] lg:py-[30px] text-left border-b border-gray-300">Action</th>
                                    <th className="p-[10px] bg-[#1DBF7314]  text-[1.07rem] font-medium lg:px-[30px] lg:py-[30px] text-left border-b border-gray-300"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentRows?.map((bond, index) => (
                                    <tr key={index}>
                                        <td className="p-[10px] text-[0.94rem] font-normal border-b border-b-[#E9E9E9]  pt-[30px]">{bond?.title}</td>
                                        <td className="p-[10px] text-[0.94rem] font-normal border-b border-b-[#E9E9E9]  pt-[30px]  text-[#1DBF73]">{'$' + bond?.bond_issuerance_amount}</td>
                                        <td className="p-[10px] text-[0.94rem] font-normal border-b border-b-[#E9E9E9]  pt-[30px]">{bond?.total_bonds
                                        }</td>
                                        <td className="p-[10px] text-[0.94rem] font-normal border-b border-b-[#E9E9E9]  pt-[30px]">{bond?.validity_number + ' months'}</td>
                                        <td className={`p-[10px] text-[0.94rem] font-normal border-b border-b-[#E9E9E9]  pt-[30px] ${getStatusClass(bond?.status)}`}> {bond?.status?.toLocaleLowerCase()?.charAt(0)?.toUpperCase() + bond?.status?.toLocaleLowerCase()?.slice(1)}</td>



                                        <td className={`p-[10px] text-[0.94rem] font-normal border-b border-b-[#E9E9E9]  pt-[30px]`} >
                                            <Link to={`/buyerpromisebonddetail/${bond?._id}`} className='flex bg-[#FFEDE8] p-[10px] items-center gap-[6px]'>
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
                                                View</Link>
                                        </td>

                                        <td className={` p-[10px] text-[0.94rem] font-normal border-b border-b-[#E9E9E9]  pt-[30px] relative`}>
                                            <div
                                            ref={buttonRef}
                                                className="cursor-pointer text-[20px] text-gray-500"
                                                onClick={(e) => {setMenuOpen((prev)=>{
                                                    let old=prev;
                                                    if(old==bond?._id){
                                                        return null
                                                    }else{
                                                       return bond?._id
                                                    }
                                                })
                                                    e.stopPropagation();

                                                }}
                                            >
                                                &#x22EE;
                                            </div>
                                            {menuOpen==bond?._id && (
                                                <div ref={menuRef} className="absolute top-[70%] right-[70%] bg-white border rounded-lg shadow-md w-max z-10">
                                                    <p
                                                        onClick={() => {
                                                            navigate(`/exchange?id=${bond?._id}`);
                                                        }}
                                                        className="cursor-pointer p-[10px] text-[0.94rem] font-normal hover:bg-gray-100 text-[#1DBF73] w-full"
                                                    >
                                                        Register for Exchange
                                                    </p>
                                                    
                                                    {bond?.cancancell==false?<p
                                                        onClick={() => {
                                                            setCancelledPopup((prev) => !prev);
                                                            setCancellationState({
                                                                ...cancellationState,
                                                                bond_id: bond?._id,
                                                            });
                                                            setMenuOpen(null)
                                                        }}
                                                        className="cursor-pointer p-[10px] text-[0.94rem] font-normal hover:bg-gray-100 border-t border-gray-300 w-full"
                                                    >
                                                        Cancel
                                                    </p>:''}
                                                    {bond?.canRequestMission && (
                                                        <p
                                                            onClick={() =>
                                                               {
                                                                requestMission(bond.issuer_id, bond.buyer_id, bond._id)
                                                                setMenuOpen(null)
                                                               }
                                                            
                                                            }
                                                            className="cursor-pointer p-[10px] text-[0.94rem] font-normal hover:bg-gray-100 border-t border-gray-300 w-full"
                                                        >
                                                            Request Mission
                                                        </p>
                                                    )}
                                                </div>
                                            )}
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

                                                <p className="text-[14px] font-semibold">{bond?.title}</p>
                                            </div>

                                            <div className="flex flex-col gap-[10px]">

                                                <p className="text-[14px] font-semibold">{bond?.total_bonds}</p>
                                            </div>
                                            <div className="flex items-center  gap-[10px]">
                                                <h1 className="text-[0.75rem]">Validity:</h1>
                                                <p className="text-[0.75rem]">{bond?.validity_number + ' months'}</p>
                                            </div>

                                            <div className="flex flex-col gap-[10px]">

                                                <p className="text-[0.75rem]">{bond?.status?.toLocaleLowerCase()?.charAt(0)?.toUpperCase() + bond?.status?.toLocaleLowerCase()?.slice(1)}</p>
                                            </div>



                                        </div>
                                        <div className="flex justify-between items-center">
                                            <div className="flex flex-col gap-[10px]">

                                                <p className="text-[0.75rem] text-[#1DBF73]">{'$' + bond?.bond_issuerance_amount}/bond</p>
                                            </div>
                                            <div className="flex  gap-[10px]">
                                                <p className="text-[0.75rem]  font-semibold">
                                                    <Link to={`/buyerpromisebonddetail/${bond?._id}`} className="flex bg-[#FFEDE8] p-[20px] items-center gap-[6px]"> <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                                                        View
                                                    </Link>
                                                </p>

                                                <td className={` p-[10px] text-[0.94rem] font-normal border-b border-b-[#E9E9E9]  pt-[30px] relative`}>
                                                    <div
                                                    ref={buttonRef}
                                                        className="cursor-pointer text-[20px] text-gray-500"
                                                        onClick={(e) => {setMenuOpen((prev)=>{
                                                            let old=prev
                                                            if(old==bond?._id){
                                                                return null
                                                            }else{
                                                                return bond?._id
                                                            }
                                                        })
                                                            e.stopPropagation();

                                                        }}
                                                    >
                                                        &#x22EE;
                                                    </div>
                                                    {menuOpen==bond?._id && (
                                                        <div ref={menuRef} className="absolute bottom-[70%] right-[70%] bg-white border rounded-lg shadow-md w-max z-10">
                                                            <p
                                                                onClick={() => {
                                                                    navigate(`/exchange?id=${bond?._id}`);
                                                                }}
                                                                className="cursor-pointer p-[10px] text-[0.94rem] font-normal hover:bg-gray-100 text-[#1DBF73] w-full"
                                                            >
                                                                Register for Exchange
                                                            </p>
                                                            {bond?.cancancell==false? <p
                                                                onClick={() => {
                                                                    setCancelledPopup((prev) => !prev);
                                                                    setCancellationState({
                                                                        ...cancellationState,
                                                                        bond_id: bond?._id,
                                                                    });
                                                                    setMenuOpen(null)
                                                                }}
                                                                className="cursor-pointer p-[10px] text-[0.94rem] font-normal hover:bg-gray-100 border-t border-gray-300 w-full"
                                                            >
                                                                Cancel
                                                            </p>:''}
                                                           
                                                            {bond?.canRequestMission && (
                                                                <p
                                                                    onClick={() =>{

                                                                        requestMission(bond.issuer_id, bond.buyer_id, bond._id)
                                                                        setMenuOpen(null)
                                                                    }
                                                                    }
                                                                    className="cursor-pointer p-[10px] text-[0.94rem] font-normal hover:bg-gray-100 border-t border-gray-300 w-full"
                                                                >
                                                                    Request Mission
                                                                </p>
                                                            )}
                                                        </div>
                                                    )}
                                                </td>
                                            </div>
                                        </div>




                                    </div>
                                ))}
                            </div>

                        </div>
                        <div className="flex justify-center items-center mt-5 gap-2">

                            <button
                                onClick={handlePrev}
                                disabled={currentPage === 1}
                                className={`p-2 border border-[#E9E9E9] rounded-full ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
                                    }`}
                            >
                                <svg
                                    width="9"
                                    height="15"
                                    viewBox="0 0 9 15"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M0.820556 8.00232L7.18034 14.3445C7.38871 14.5522 7.72607 14.5518 7.93409 14.3434C8.14195 14.1351 8.14141 13.7975 7.93301 13.5897L1.95178 7.62498L7.93323 1.6603C8.1416 1.45244 8.14214 1.11511 7.9343 0.906712C7.83003 0.802244 7.69341 0.75001 7.5568 0.75001C7.42053 0.75001 7.28446 0.801895 7.18037 0.905638L0.820556 7.24766C0.720197 7.34751 0.663881 7.4834 0.663881 7.62498C0.663881 7.76656 0.720358 7.90229 0.820556 8.00232Z"
                                        fill="#222222"
                                    />
                                </svg>
                            </button>


                            {Array.from({ length: totalPages }, (_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrentPage(i + 1)}
                                    className={`px-3 py-1 rounded-full ${currentPage === i + 1
                                        ? "bg-[#1DBF73] text-white"
                                        : "border border-[#E9E9E9] bg-white"
                                        }`}
                                >
                                    {i + 1}
                                </button>
                            ))}


                            <button
                                onClick={handleNext}
                                disabled={currentPage === totalPages}
                                className={`p-2 border border-[#E9E9E9] rounded-full ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
                                    }`}
                            >
                                <svg
                                    width="9"
                                    height="15"
                                    viewBox="0 0 9 15"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M8.17944 7.24768L1.81966 0.90549C1.61129 0.697817 1.27393 0.698166 1.06591 0.906564C0.858051 1.11493 0.858588 1.45248 1.06699 1.66031L7.04822 7.62502L1.06677 13.5897C0.8584 13.7976 0.857863 14.1349 1.0657 14.3433C1.16998 14.4478 1.30659 14.5 1.4432 14.5C1.57947 14.5 1.71554 14.4481 1.81963 14.3444L8.17944 8.00234C8.2798 7.90249 8.33612 7.7666 8.33612 7.62502C8.33612 7.48344 8.27964 7.34771 8.17944 7.24768Z"
                                        fill="#222222"
                                    />
                                </svg>
                            </button>
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
            {
                bondpopup && (
                    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center px-[20px] bg-[#00000085]">
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
                                <div className="bg-[#F1EBFE] text-[#1DBF73] text-[16px] font-semibold px-[20px] py-[10px] w-fit rounded-[20px] mx-auto">Browse Images</div>
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
                                    className="mt-4 px-6 py-2 bg-[#1DBF73] text-white font-semibold rounded-[20px] hover:bg-blue-600"
                                >
                                    Add More Links
                                </button>

                            </div>
                            <div className="mt-[10px]">
                                <label htmlFor="title" className="block text-xl  font-semibold text-[#272226]">Title</label>
                                <input
                                    value={bondstate.title}
                                    type="text"
                                    name="title"
                                    placeholder="Enter Title"
                                    className="mt-4 bg-[#1C1C1C14] block w-full px-3 py-4 border rounded-[20px] border-gray-300 focus:outline-none focus:ring focus:border-blue-500"
                                    onChange={(e) => {
                                        setBondState({
                                            ...bondstate,
                                            title: e.target.value
                                        })
                                    }}
                                />

                            </div>
                            <div>
                                <label htmlFor="validitynumber" className="block text-xl font-semibold text-[#272226]">Validity Number</label>
                                <div className="mt-4">
                                    <select
                                        value={bondstate.validity_number}
                                        onChange={(e) => {
                                            setBondState({
                                                ...bondstate,
                                                validity_number: e.target.value
                                            })
                                        }}
                                        name="validitynumber"
                                        className="mt-1 bg-[#1C1C1C14] block w-full px-3 py-4 border rounded-[20px] border-gray-300 focus:outline-none focus:ring focus:border-blue-500"
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
                                <label htmlFor="quantity" className="block text-xl  font-semibold text-[#272226]">Quantity</label>
                                <input
                                    value={bondstate.quantity}
                                    type="text"
                                    name="quantity"
                                    placeholder="Enter Quantity"
                                    className="mt-4 bg-[#1C1C1C14] block w-full px-3 py-4 border rounded-[20px] border-gray-300 focus:outline-none focus:ring focus:border-blue-500"
                                    onKeyPress={(e) => {

                                        if (!/^\d$/.test(e.key)) {
                                            e.preventDefault();
                                        }
                                    }}
                                    onChange={(e) => {
                                        const value = e.target.value.replace(/\D/g, "");
                                        setBondState({
                                            ...bondstate,
                                            quantity: value,
                                        });
                                    }}
                                />


                            </div>
                            <div className="mt-[10px]">
                                <label htmlFor="price" className="block text-xl  font-semibold text-[#272226]">Bond Price</label>
                                <input
                                    value={bondstate.bond_price}
                                    type="text"
                                    name="price"
                                    className="mt-4 bg-[#1C1C1C14] block w-full px-3 py-4 border rounded-[20px] border-gray-300 focus:outline-none focus:ring focus:border-blue-500"
                                    placeholder="Enter Bond Price"
                                    onKeyPress={(e) => {

                                        if (!/^\d$/.test(e.key)) {
                                            e.preventDefault();
                                        }
                                    }}
                                    onChange={(e) => {
                                        const value = e.target.value.replace(/\D/g, "");
                                        setBondState({
                                            ...bondstate,
                                            bond_price: value,
                                        });
                                    }}
                                />


                            </div>
                            <div className="hover:cursor-pointer flex flex-col justify-between mt-4 gap-[10px] xl:flex-row">
                                <div onClick={() => setBondPopup(!bondpopup)} className="border-[1px] rounded-[10px] w-full xl:w-1/2 text-center text-[20px] border-[#1DBF73] px-[20px] py-[10px] text-[#1DBF73] font-semibold">
                                    Cancel
                                </div>
                                <div onClick={createBond} className="hover:cursor-pointer border-[1px] rounded-[10px] w-full xl:w-1/2 text-center text-[20px] bg-[#1DBF73] px-[20px] py-[10px] text-white font-semibold">
                                    Create Bond
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    );
};

export default SellerBondListingTable;
