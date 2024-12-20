import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MoonLoader } from 'react-spinners';
import { useDropzone } from 'react-dropzone';

import { BASE_URL } from '../baseURL';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BondListContext } from "../contextAPI/bondListing";
import { useContext } from 'react';
import bsns from "../bussinessmen.png";
import { Link } from "react-router-dom"
import howto from "../howtocreatebond.png"
const BondListingTable = () => {
    const [mission, setMission] = useState('');
    const [error, setError] = useState('');
    const [missionVideo, setMissionVideo] = useState("")
    const [isAccepted, setIsAccepted] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [currentBondId, setCurrentBondId] = useState("")
    const [disablecreateBond, setDisableCreateBond] = useState(false)
    const handleCheckboxChange = (e) => {
        setIsAccepted(e.target.checked);
    };



    const handleChange = (e) => {
        const value = e.target.value;
        setMission(value);

        if (value.length < 1000) {
            setError(`Mission must be at least 1000 characters. Currently ${value.length} characters.`);
        } else {
            setError('');
        }
    };
    const [bondstate, setBondState] = useState({
        platform: '',
        channel_name: '',
        social_id: '',
        reason: '',
        followers: '',
        mission_title: '',
        description: '',
        title: '',
        validity_number: '',
        quantity: '',
        bond_price: ''
    })
    const [search, setSearch] = useState("")
    const [uploadedImages, setUploadedImages] = useState([]);
    const [selectedMonth, setSelectedMonth] = useState('default');
    const [loading, setLoading] = useState(true)
    const [aggrement, setaggrement] = useState(null)
    const { state: bondData, setState: setBondData } = useContext(BondListContext)
    const [selectedPriceRange, setSelectedPriceRange] = useState("default")
    const [bondpopup, setBondPopup] = useState(false)
    const [originalBondData, setOriginalBondData] = useState([])
    const [user, setUser] = useState("")
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 7;
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
        setUploadedImages((prevImages) => {
            if (prevImages.length + acceptedFiles.length > 4) {
                return [...prevImages, ...acceptedFiles.slice(0, 4 - prevImages.length)];
            }
            return [...prevImages, ...acceptedFiles];
        });
    };

    const handleRemoveImage = (index) => {
        setUploadedImages((prevImages) => prevImages.filter((_, i) => i !== index));
    };

    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/*',
        multiple: true,
        onDrop,
    });

    const createBond = async () => {
        if (uploadedImages?.length === 0) {
            toast.dismiss()
            toast.error("Please select images for verification", { containerId: "containerB" })
            return;
        } else if (bondstate.platform.length == 0) {
            toast.dismiss()
            toast.error("Please enter platform", { containerId: "containerB" })
            return;
        } else if (bondstate.channel_name.length == 0) {
            toast.dismiss()
            toast.error("Please enter channel name", { containerId: "containerB" })
            return;
        } else if (bondstate.social_id.length == 0) {
            toast.dismiss()
            toast.error("Please enter social id", { containerId: "containerB" })
            return;
        } else if (bondstate.followers.length == 0) {
            toast.dismiss()
            toast.error("Please enter followers", { containerId: "containerB" })
            return;
        } else if (bondstate.mission_title.length == 0) {
            toast.dismiss()
            toast.error("Please enter mission title", { containerId: "containerB" })
            return;
        } else if (bondstate.description.length < 1000) {
            toast.dismiss()
            toast.error("Please enter mission description within minimum range", { containerId: "containerB" })
            return;
        } else if (bondstate.title.length == 0) {
            toast.dismiss()
            toast.error("Please enter bond title", { containerId: "containerB" })
            return;
        } else if (bondstate.validity_number.length === 0) {
            toast.dismiss()
            toast.error("Please select validty number", { containerId: "containerB" })
            return;
        } else if (bondstate.quantity === 0 || bondstate.quantity.length === 0) {
            toast.dismiss()
            toast.error("Please enter valid quantity", { containerId: "containerB" })
            return;
        } else if (bondstate.bond_price === 0 || bondstate.bond_price.length === 0) {
            toast.dismiss()
            toast.error("Please enter valid price", { containerId: "containerB" })
            return;
        } else if (bondstate.reason.length < 500) {
            toast.dismiss()
            toast.error("Please enter bond reason within minimum range", { containerId: "containerB" })
            return;
        } else if (isAccepted == false) {
            toast.dismiss()
            toast.error("Please accept terms and conditions", { containerId: "containerB" })
            return;
        }
        try {

            setDisableCreateBond(true)
            let formData = new FormData();
            formData.append("platform", bondstate.platform);
            formData.append("channel_name", bondstate.channel_name);
            formData.append("social_id", bondstate.social_id);
            formData.append("followers", bondstate.followers);
            formData.append("mission_title", bondstate.mission_title);
            formData.append("description", bondstate.description);
            formData.append("title", bondstate.title);
            formData.append("validity_number", bondstate.validity_number);
            formData.append("quantity", bondstate.quantity);
            formData.append("bond_price", bondstate.bond_price);

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
            window.location.reload(true)
            // setBondData((prev) => {
            //     let old;
            //     if (prev?.length > 0) {
            //         old = [...prev, response.data.bond]
            //     } else {
            //         old = [response.data.bond];
            //     }
            //     return old

            // })

        } catch (e) {
            setDisableCreateBond(false)
            if (e?.response?.data?.error) {
                toast.error(e?.response?.data?.error, { containerId: "containerB" })

                return;
            } else {
                toast.error("Client error please try again", { containerId: "containerB" })
            }
        }
    }
    const priceRanges = [
        { label: "Below $50", value: "0-50" },
        { label: "$50 - $100", value: "50-100" },
        { label: "$100 - $500", value: "100-500" },
        { label: "$500 - $1000", value: "500-1000" },
        { label: "Above $1000", value: "1000+" }
    ];
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


    useEffect(() => {
        fetchBondList()
    }, [])
    const fetchBondList = async () => {
        try {
            let token = localStorage.getItem('token')
            let headers = {
                headers: {
                    authorization: `Bearer ${token}`
                }
            }
            let response = await axios.get(`${BASE_URL}/bond-listingData`, headers)
            console.log("BOND LISTING DATA")
            console.log(response.data)
            setBondData(response.data.bondsList)
            setOriginalBondData(response.data.bondsList)
            setUser(response.data.user)
            setLoading(false)

        } catch (e) {
            if (e?.response?.data?.error) {
                toast.dismiss()
                toast.error(e?.response?.data?.error, { containerId: "containerB" })
                return;
            } else {
                toast.dismiss()
                toast.error("Client error please try again", { containerId: "containerB" })
                return;
            }
        }
    }
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];


    const getStatusClass = (status) => {
        switch (status) {
            case 'pending':
                return 'text-orange-500';
            case 'in progress':
                return 'text-red-500';
            case 'completed':
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


    useEffect(() => {
        applyFilters();
    }, [selectedMonth, selectedPriceRange, search]);


    const showBondPopup = () => {

        setBondPopup(!bondpopup)
        setaggrement((prev) => {
            let old = prev;
            if (old == true) {
                return true
            } else {
                return user.tos
            }
        })
    }

    const acceptTOS = async () => {

        try {
            let token = localStorage.getItem('token')
            let headers = {
                headers: {
                    authorization: `Bearer ${token}`
                }
            }

            setaggrement(true)
            let response = await axios.get(`${BASE_URL}/acceptTOS`, headers)


        } catch (e) {

            console.log(e.message)
            if (e?.response?.data?.error) {
                toast.error(e?.response?.data?.error, { containerId: "containerB" })
            } else {
                toast.error("Something went wrong please try again", { containerId: "containerB" })
            }
        }
    }
    const rejectAgain = async (id) => {

        try {
            setBondData((prev) => {
                let old;
                if (prev.length > 0) {
                    old = [...prev]
                } else {
                    old = [prev]
                }
                let findIndex = old.findIndex(u => u._id == id)
                old[findIndex] = {
                    ...old[findIndex],
                    status: "PENDING"
                }
                return old
            })
            let response = await axios.get(`${BASE_URL}/rejectAgain/${id}`)
            console.log(response)
            console.log('request again')
            toast.success("Request for bond approval sent", { containerId: "containerB" })

        } catch (e) {
            if (e?.response?.data?.error) {
                toast.error(e?.response?.data?.error, { containerId: "containerB" })
            } else {
                toast.error("Something went wrong please try again", { containerId: "containerB" })
            }
        }
    }


    const handleCancel = () => {
        setIsOpen(false);
        setCurrentBondId("")
        setMissionVideo("")
    };

    const handleUpload = async () => {


        try {
            let token = localStorage.getItem('token')
            let headers = {
                headers: {
                    authorization: `Bearer ${token}`
                }
            }
            let formdata = new FormData();
            formdata.append('bond_id', currentBondId)
            formdata.append('video', missionVideo)
            let response = await axios.post(`${BASE_URL}/createMissionSubmission`, formdata, headers)
            toast.success("Mission submitted sucessfully", { containerId: "containerB" })

            setMissionVideo("")
            setIsOpen(false);
            setBondData((prev) => {

                const old = Array.isArray(prev) ? [...prev] : [];


                const findIndex = old.findIndex((u) => u._id === currentBondId);


                if (findIndex !== -1) {
                    old[findIndex] = {
                        ...old[findIndex],
                        bondRequested: false,
                    };
                }

                return old;
            });

            setCurrentBondId("")
        } catch (e) {
            if (e?.response?.data?.error) {
                toast.error(e?.response?.data?.error, { containerId: "containerB" })
            } else {
                toast.error("Something went wrong please try again", { containerId: "containerB" })
            }
        }
    };
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
            <ToastContainer containerId="containerB" limit={1} />
            <div className="bg-[#f2f2f2]  min-h-[800px]  overflow-y-auto">
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


                        {/* <div className="flex gap-[10px] xl:flex-row flex-col w-full lg:col-span-4">
                            <div className="w-full bg-[#F6F6F6] rounded-[20px] px-[10px] py-[10px] flex items-center">
                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) => filterItems(e.target.value)}
                                    placeholder="Search here..."
                                    className="outline-none border-none bg-transparent w-[90%]"
                                />
                            </div>
                        </div> */}


                        <Link to="/promisebondcreate"  className="p-[10px] lg:max-w-[140px] w-full bg-black text-white font-medium text-[.88rem] rounded-[2rem] ">
                            Create Bond
                        </Link>

                    </div>
                </div>
                <div className="w-full my-[40px]">
                    <div className="w-full bg-[#1dbf73] lg:px-[2rem]  mx-auto lg:mt-[4rem] pt-[30px] px-[30px] lg:h-[300px]">
                        <div className="flex lg:flex-row flex-col lg:gap-[40px] gap-[20px]  mx-auto h-full">
                            <div className="flex lg:w-[50%] justify-center w-full flex-col gap-[20px] h-full">
                                <div>
                                    <h2 className="lg:text-[2rem] text-white  text-[1.50rem] font-medium  lg:text-left text-center lg:font-bold">Not Sure How To Begin?</h2>
                                    <p className="lg:text-[0.94rem] text-white text-[0.75rem] lg:text-left text-center lg:mb-0 mb-[25px]">Check out our detailed guide on How to Create and Sell Promise Bonds or contact our support team for assistance.</p>

                                </div>
                                <div className="flex gap-[10px] flex-col  lg:flex-row">
                                    <Link to="/search?filter=bond&search=" className="bg-white border border-white px-[20px] py-[10px] xl:py-[11px] lg:text-[0.94rem] text-[0.75rem] flex gap-[12px] items-center text-black font-bold rounded-[3.75rem] w-full lg:text-left text-center lg:justify-start justify-center lg:w-fit">
                                        Find Bonds
                                        <svg className="md:w-[16px] md:h-[17px] w-[11px] h-[11px]" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M15.5553 0.101562H5.77756C5.53189 0.101562 5.3331 0.300354 5.3331 0.546021C5.3331 0.791687 5.53189 0.990479 5.77756 0.990479H14.4824L0.129975 15.3429C-0.0436504 15.5165 -0.0436504 15.7978 0.129975 15.9714C0.216766 16.0581 0.330516 16.1016 0.444225 16.1016C0.557933 16.1016 0.671641 16.0581 0.758475 15.9714L15.1109 1.61894V10.3238C15.1109 10.5695 15.3097 10.7683 15.5553 10.7683C15.801 10.7683 15.9998 10.5695 15.9998 10.3238V0.546021C15.9998 0.300354 15.801 0.101562 15.5553 0.101562Z" fill="black" />
                                        </svg>
                                    </Link>
                                    <Link to="/signup" className=" bg-transparent border border-white px-[20px] py-[10px] xl:py-[11px] lg:text-[0.94rem] text-[0.75rem] flex gap-[12px] items-center text-white font-bold rounded-[3.75rem] w-full lg:text-left text-center lg:justify-start justify-center lg:w-fit">
                                        Find Talent
                                        <svg className="md:w-[16px] md:h-[17px] w-[11px] h-[11px]" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M15.5553 0.101562H5.77756C5.53189 0.101562 5.3331 0.300354 5.3331 0.546021C5.3331 0.791687 5.53189 0.990479 5.77756 0.990479H14.4824L0.129975 15.3429C-0.0436504 15.5165 -0.0436504 15.7978 0.129975 15.9714C0.216766 16.0581 0.330516 16.1016 0.444225 16.1016C0.557933 16.1016 0.671641 16.0581 0.758475 15.9714L15.1109 1.61894V10.3238C15.1109 10.5695 15.3097 10.7683 15.5553 10.7683C15.801 10.7683 15.9998 10.5695 15.9998 10.3238V0.546021C15.9998 0.300354 15.801 0.101562 15.5553 0.101562Z" fill="white" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                            <div className="lg:w-[50%] flex lg:justify-end w-full h-full">
                                <img src={bsns} className="w-full lg:max-w-[292px] h-full object-cover" />
                            </div>
                        </div>
                    </div>
                </div>
                {!loading ? bondData?.length > 0 ?
                    <div className='lg:p-[30px] lg:bg-white'>
                        <table className="min-w-full xl:table hidden table-auto border-collapse">
                            <thead>
                                <tr className="bg-[#FDFBFD]">
                                    <th className="p-[10px] bg-[#1DBF7314]  text-[1.07rem] font-medium lg:px-[30px] lg:py-[30px] text-left border-b border-gray-300">Issuer</th>
                                    <th className="p-[10px] bg-[#1DBF7314] text-[1.07rem] font-medium text-left border-b lg:py-[30px] border-gray-30">Bond Title</th>
                                    <th className="p-[10px] bg-[#1DBF7314] text-[1.07rem] font-medium text-left border-b lg:py-[30px] border-gray-30">Mission</th>
                                    <th className="p-[10px] bg-[#1DBF7314] text-[1.07rem] font-medium text-left border-b lg:py-[30px] border-gray-30">Price</th>
                                    <th className="p-[10px] bg-[#1DBF7314] text-[1.07rem] font-medium text-left border-b lg:py-[30px] border-gray-30">Validity</th>
                                    <th className="p-[10px] bg-[#1DBF7314] text-[1.07rem] font-medium text-left border-b lg:py-[30px] border-gray-30">Status</th>
                                    <th className="p-[10px] bg-[#1DBF7314] text-[1.07rem] font-medium lg:pr-[30px] text-left lg:py-[30px] border-b border-gray-300">Action</th>

                                </tr>
                            </thead>
                            <tbody>
                                {currentRows?.map((bond, index) => (
                                    <tr key={index}>
                                        <td className="p-[10px] lg:pl-[30px] text-[0.94rem] border-b border-b-[#E9E9E9]  font-normal pt-[30px]">{bond?.issuer_id?.user_id?.username}</td>
                                        <td className="p-[10px] text-[0.94rem] font-normal  border-b border-b-[#E9E9E9] pt-[30px] ">{bond?.title}</td>
                                        <td className="p-[10px] text-[0.94rem] font-normal border-b border-b-[#E9E9E9]  pt-[30px]">{bond?.missions?.length > 0 ? bond?.missions[0]?.mission_title : 'No mission'}</td>
                                        <td className="p-[10px] text-[0.94rem] font-normal border-b border-b-[#E9E9E9]  pt-[30px]  text-[#1DBF73]">{'$' + bond?.bond_issuerance_amount}</td>
                                        <td className="p-[10px] text-[0.94rem] font-normal border-b border-b-[#E9E9E9]  pt-[30px]">{bond?.validity_number + ' months'}</td>
                                        <td className="p-[10px] text-[0.94rem] font-normal border-b border-b-[#E9E9E9]  pt-[30px]"> {bond?.status?.toLocaleLowerCase()?.charAt(0)?.toUpperCase() + bond?.status?.toLocaleLowerCase()?.slice(1)}</td>



                                        <td className={`flex  p-[20px] items-center gap-[6px]`}>
                                        {bond?.
                                            bondVerificationCode && bond?.status=="APPROVED"
                                            ? 
                                                <Link className="flex bg-[#FFEDE8] p-[20px] items-center gap-[6px]" to={`/promisebondverification/${bond?._id}`}>
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

                                                    Verify</Link>
                                            :bond?.rejectedTimes > 0 && bond?.status == "REJECTED" ? <p onClick={() => {
                                            rejectAgain(bond._id)
                                        }} className="flex w-[170px] h-[45px] bg-[#FFEDE8] p-[20px] items-center gap-[6px] cursor-pointer ">
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

                                            Request Again
                                        </p> :  bond?.bondRequested == true ? <p onClick={() => {
                                            setIsOpen(!isOpen)
                                            setCurrentBondId(bond._id)
                                        }} className="flex w-[170px] h-[45px] bg-[#FFEDE8] p-[20px] items-center gap-[6px] cursor-pointer ">
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
                                            Upload Mission 
                                        </p> : <Link to={`/promisebonddetail/${bond?._id}`} className="flex bg-[#FFEDE8] p-[20px] items-center gap-[6px]">
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
                                                View</Link>}
                                           
                                        </td>
                                        {/* {bond?.
                                            bondVerificationCode
                                            ? <td className={`text-[#1DBF73] underline`}>
                                                <Link to={`/promisebondverification/${bond?._id}`}>Verify</Link>
                                            </td> : null} */}

                                        {/* {bond?.rejectedTimes > 0 && bond?.status == "REJECTED" ? <td onClick={() => {
                                            rejectAgain(bond._id)
                                        }} className={`text-[#1DBF73] underline cursor-pointer`}>
                                            Request Again
                                        </td> : null} */}
                                        {/* {bond?.bondRequested == true ? <td onClick={() => {
                                            setIsOpen(!isOpen)
                                            setCurrentBondId(bond._id)
                                        }} className='cursor-pointer'>
                                            Upload Mission Video
                                        </td> : null} */}

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

                                                <p className="text-[14px] font-semibold">{bond?.title}</p>
                                            </div>

                                            <div className="flex flex-col gap-[10px]">

                                                <p className="text-[0.75rem]">{bond?.missions?.length > 0 ? bond?.missions[0]?.mission_title : 'No mission'}</p>
                                            </div>
                                            <div className="flex items-center  gap-[10px]">
                                                <h1 className="text-[0.75rem]">Validity:</h1>
                                                <p className="text-[0.75rem]">{bond?.validity_number + ' months'}</p>
                                            </div>
                                            <div className="w-full h-[1px] bg-[#00000014]"></div>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <div className="flex gap-[10px]">

                                                <p className="text-[0.75rem] text-[#1DBF73] ">{'$' + bond?.bond_issuerance_amount}/bond</p>
                                            </div>
                                            <div className="flex flex-col gap-[10px]">
                                            {bond?.
                                                    bondVerificationCode && bond?.status=="APPROVED"
                                                    ? <p className="text-[16px]  font-semibold">
                                                        <Link className="flex bg-[#FFEDE8] p-[20px] items-center gap-[6px]" to={`/promisebondverification/${bond?._id}`}>
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
                                                    Verify</Link>
                                                    </p> : bond?.rejectedTimes > 0 && bond?.status == "REJECTED" ? <p onClick={() => {
                                                    rejectAgain(bond._id)
                                                }} className="flex bg-[#FFEDE8] p-[20px] items-center gap-[6px]">
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
                                                    Request Again
                                                </p> :bond?.bondRequested == true ? <p onClick={() => {
                                                    setIsOpen(!isOpen)


                                                    setCurrentBondId(bond._id)

                                                }} className="flex bg-[#FFEDE8] p-[20px] items-center gap-[6px]">
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

                                                    Upload Mission 
                                                </p> :  <p className="text-[0.75rem]  font-semibold">
                                                    <Link to={`/promisebonddetail/${bond?._id}`} className="flex bg-[#FFEDE8] p-[20px] items-center gap-[6px]"> <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                                              
                                                }
                                               
                           
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
            </div>
            {
                bondpopup && (
                    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center px-[20px] bg-[#00000085]">
                        <div className="bg-white flex h-[90%] overflow-auto flex-col gap-[10px] rounded-[20px] p-[20px] max-w-[800px] w-full">
                            <div className='flex flex-row justify-between'>
                                <h1 className="lg:text-[2rem] text-[1.5rem] font-bold">
                                    Create New Bond
                                </h1>
                                <svg onClick={() => {
                                    setBondPopup(false)
                                }} className='cursor-pointer' width={35} height={35} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M6.99486 7.00636C6.60433 7.39689 6.60433 8.03005 6.99486 8.42058L10.58 12.0057L6.99486 15.5909C6.60433 15.9814 6.60433 16.6146 6.99486 17.0051C7.38538 17.3956 8.01855 17.3956 8.40907 17.0051L11.9942 13.4199L15.5794 17.0051C15.9699 17.3956 16.6031 17.3956 16.9936 17.0051C17.3841 16.6146 17.3841 15.9814 16.9936 15.5909L13.4084 12.0057L16.9936 8.42059C17.3841 8.03007 17.3841 7.3969 16.9936 7.00638C16.603 6.61585 15.9699 6.61585 15.5794 7.00638L11.9942 10.5915L8.40907 7.00636C8.01855 6.61584 7.38538 6.61584 6.99486 7.00636Z" fill="#0F0F0F"></path> </g></svg>
                            </div>
                            <h1 className="lg:text-[0.94rem] text-[0.75rem] font-medium">Upload Image</h1>
                            <div
                                {...getRootProps()}
                                className={`border-2 border-dashed border-gray-300 p-[20px] text-center rounded-[10px] cursor-pointer ${uploadedImages.length >= 4 ? 'opacity-50 cursor-not-allowed' : ''
                                    }`}
                            >
                                <div className="flex justify-center w-full">

                                    <svg width="80" height="66" viewBox="0 0 80 66" fill="none" xmlns="http://www.w3.org/2000/svg">

                                    </svg>
                                </div>
                                <input {...getInputProps()} disabled={uploadedImages.length >= 4} />
                                <p className="lg:text-[0.94rem] text-[0.75rem] text-[#667085] my-[10px]">
                                    Drag and Drop Here
                                </p>
                                <p className="lg:text-[0.94rem] text-[0.75rem] text-[#667085] my-[10px]">or</p>
                                <div className="bg-black text-white lg:text-[0.94rem] text-[0.75rem] font-medium px-[20px] py-[10px] w-fit rounded-[20px] mx-auto">
                                    Browse Images
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-[10px] my-[10px]">
                                {uploadedImages.map((file, index) => (
                                    <div
                                        key={index}
                                        className="relative w-[100px] h-[100px] bg-gray-200 p-[5px] rounded-[10px]"
                                    >
                                        <img
                                            src={URL.createObjectURL(file)}
                                            alt="uploaded"
                                            className="w-full h-full object-cover rounded-[10px]"
                                        />
                                        <button
                                            type="button"
                                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-[20px] h-[20px] flex items-center justify-center"
                                            onClick={() => handleRemoveImage(index)}
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}
                            </div>

                            <div>
                                <label htmlFor="socialMedia" className="lg:text-[0.94rem] text-[0.75rem] font-medium">
                                    Social Media Information
                                </label>
                                {links.map((link, index) => (
                                    <div key={index} className="mt-4">
                                        <div className="flex flex-col md:flex-row gap-4">

                                            <select
                                                name={`platform-${index}`}
                                                value={bondstate.platform}
                                                onChange={(e) => {
                                                    setBondState({
                                                        ...bondstate,
                                                        platform: e.target.value
                                                    })
                                                }}
                                                className="px-[20px] py-[8px]  w-full bg-white font-medium text-[.88rem] text-black rounded-[2rem] shadow-md outline-none"
                                            >
                                                <option value="">Select Platform</option>
                                                <option value="Facebook">Facebook</option>
                                                <option value="Twitter">Twitter</option>
                                                <option value="Instagram">Instagram</option>
                                                <option value="LinkedIn">LinkedIn</option>
                                                <option value="YouTube">YouTube</option>
                                            </select>

                                            <input
                                                type="text"
                                                name={`channelName-${index}`}
                                                value={bondstate.channel_name}
                                                onChange={(e) => {
                                                    setBondState({
                                                        ...bondstate,
                                                        channel_name: e.target.value
                                                    })
                                                }}
                                                className="px-[20px] py-[8px]  w-full bg-white font-medium text-[.88rem] text-black rounded-[2rem] shadow-md outline-none"
                                                placeholder="Channel Name"
                                            />


                                            <input
                                                type="text"
                                                name={`socialId-${index}`}
                                                value={bondstate.social_id}
                                                onChange={(e) => setBondState({
                                                    ...bondstate,
                                                    social_id: e.target.value
                                                })}
                                                className="px-[20px] py-[8px]  w-full bg-white font-medium text-[.88rem] text-black rounded-[2rem] shadow-md outline-none"
                                                placeholder="Social ID"
                                            />


                                            <input
                                                type="number"
                                                name={`followers-${index}`}
                                                value={bondstate.followers}
                                                onChange={(e) => {
                                                    setBondState({
                                                        ...bondstate,
                                                        followers: e.target.value
                                                    })
                                                }}
                                                className="px-[20px] py-[8px]  w-full bg-white font-medium text-[.88rem] text-black rounded-[2rem] shadow-md outline-none"
                                                placeholder="Followers/Subscribers"
                                            />
                                        </div>
                                    </div>
                                ))}

                            </div>
                            <div className="mt-[10px]">
                                <label htmlFor="title" className="lg:text-[0.94rem] text-[0.75rem] font-medium">Mission Title</label>
                                <input

                                    type="text"
                                    name="title"
                                    placeholder="Enter Title"
                                    className="mt-4 px-[20px] py-[8px]  w-full bg-white font-medium text-[.88rem] text-black rounded-[2rem] shadow-md outline-none"
                                    value={bondstate.mission_title}
                                    onChange={(e) => {
                                        setBondState({
                                            ...bondstate,
                                            mission_title: e.target.value
                                        })
                                    }}
                                />

                            </div>
                            <div className='mt-[10px]'>
                                <label htmlFor="mission" className="lg:text-[0.94rem] text-[0.75rem] font-medium">
                                    Mission
                                </label>
                                <textarea
                                    id="mission"
                                    value={bondstate.description}
                                    onChange={(e) => {
                                        setBondState({
                                            ...bondstate,
                                            description: e.target.value
                                        })
                                    }}
                                    maxLength={1200}
                                    className="mt-4 px-[20px] py-[8px]  w-full bg-white font-medium text-[.88rem] text-black rounded-[2rem] shadow-md outline-none"
                                    placeholder="Write your mission statement here..."
                                    rows={10}
                                ></textarea>
                                {error && <p className="text-red-500 mt-2">{error}</p>}
                                <p className="text-sm text-gray-600 mt-1">
                                    {bondstate.description.length} / 1000 characters required
                                </p>
                            </div>
                            <div className="mt-[10px]">
                                <label htmlFor="title" className="lg:text-[0.94rem] text-[0.75rem] font-medium">Bond Title</label>
                                <input
                                    value={bondstate.title}
                                    type="text"
                                    name="title"
                                    placeholder="Enter Title"
                                    className="mt-4 px-[20px] py-[8px]  w-full bg-white font-medium text-[.88rem] text-black rounded-[2rem] shadow-md outline-none"
                                    onChange={(e) => {
                                        setBondState({
                                            ...bondstate,
                                            title: e.target.value
                                        })
                                    }}
                                />

                            </div>
                            <div>
                                <label htmlFor="validitynumber" className="lg:text-[0.94rem] text-[0.75rem] font-medium">Validity Number</label>
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
                                        className="mt-4 px-[20px] py-[8px]  w-full bg-white font-medium text-[.88rem] text-black rounded-[2rem] shadow-md outline-none"
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
                                <label htmlFor="quantity" className="lg:text-[0.94rem] text-[0.75rem] font-medium">Quantity</label>
                                <input
                                    value={bondstate.quantity}
                                    type="text"
                                    name="quantity"
                                    placeholder="Enter Quantity"
                                    className="mt-4 px-[20px] py-[8px]  w-full bg-white font-medium text-[.88rem] text-black rounded-[2rem] shadow-md outline-none"
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
                                <label htmlFor="price" className="lg:text-[0.94rem] text-[0.75rem] font-medium">Bond Price</label>
                                <input
                                    value={bondstate.bond_price}
                                    type="text"
                                    name="price"
                                    className="mt-4 px-[20px] py-[8px]  w-full bg-white font-medium text-[.88rem] text-black rounded-[2rem] shadow-md outline-none"
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
                            <div className='mt-[10px]'>
                                <label htmlFor="reasonbond" className="lg:text-[0.94rem] text-[0.75rem] font-medium">
                                    Reason For Bond Issuance
                                </label>
                                <textarea
                                    id="reasonbond"
                                    value={bondstate.reason}
                                    maxLength={520}
                                    onChange={(e) => {
                                        setBondState({
                                            ...bondstate,
                                            reason: e.target.value
                                        })
                                    }}
                                    className="mt-4 px-[20px] py-[8px]  w-full bg-white font-medium text-[.88rem] text-black rounded-[2rem] shadow-md outline-none"
                                    placeholder="Write your bond issuance reason"
                                    rows={10}
                                ></textarea>
                                <p className="text-sm text-gray-600 mt-1">
                                    {bondstate.reason.length} / 500 characters required
                                </p>

                            </div>
                            <div className="mt-4">
                                <label className="flex items-center space-x-3">
                                    <input
                                        type="checkbox"
                                        checked={isAccepted}
                                        onChange={handleCheckboxChange}
                                        className="form-checkbox h-5 w-5 text-[#1DBF73]"
                                    />
                                    <span className="lg:text-[0.94rem] text-[0.75rem] font-medium">
                                        I agree to the{' '}
                                        <a href="/terms" className="text-[#1DBF73] underline">
                                            Terms and Conditions
                                        </a>.
                                    </span>
                                </label>
                            </div>
                            <div className="hover:cursor-pointer flex flex-col justify-between mt-4 gap-[10px] xl:flex-row">
                                <div onClick={() => setBondPopup(!bondpopup)} className="border-[1px] rounded-[10px] w-full xl:w-1/2 text-center lg:text-[0.94rem] text-[0.75rem] font-medium border-black px-[20px] py-[10px] text-black">
                                    Cancel
                                </div>
                                <div
                                    onClick={!disablecreateBond ? createBond : null}
                                    className={`border-[1px] rounded-[10px] w-full xl:w-1/2 text-center  px-[20px] py-[10px] lg:text-[0.94rem] text-[0.75rem] font-medium 
        ${disablecreateBond ? 'bg-gray-400 text-gray-300 cursor-not-allowed' : 'bg-black text-white hover:cursor-pointer'}`}
                                >
                                    Create Bond
                                </div>

                            </div>
                        </div>
                    </div>
                )
            }
            {
                aggrement === false && (
                    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center px-[20px] bg-[#00000085]">
                        <div className="bg-white flex h-[400px] overflow-auto flex-col gap-[10px] rounded-[20px] p-[20px] max-w-[400px] w-full">
                            <h1 className="text-[24px] font-semibold">Create New Bond</h1>
                            <h2 className="text-[18px] font-medium">Important Notice</h2>
                            <p className="text-[16px] leading-[1.5]">
                                By proceeding, you are informed that engaging in illegal activities such as fraud, phishing, or criminal conspiracy will result in the permanent suspension of your account. Additionally, judicial authorities will be notified of such actions.
                            </p>
                            <div className="flex justify-center gap-[10px] mt-[20px]">
                                <button onClick={acceptTOS} className="bg-[#1DBF73] text-white px-[20px] py-[10px] rounded-[10px] text-[16px] font-medium hover:bg-[#17a766] transition">
                                    Agree
                                </button>
                                <button onClick={() => {
                                    setaggrement(null)
                                    setBondPopup(false);

                                }} className="border border-[#1DBF73] text-[#1DBF73] px-[20px] py-[10px] rounded-[10px] text-[16px] font-medium hover:bg-[#1DBF73] hover:text-white transition">
                                    Decline
                                </button>
                            </div>
                        </div>
                    </div>
                )


            }
            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">
                            Upload Mission
                        </h2>

                        <input

                            onChange={(e) => {
                                setMissionVideo(e.target.files[0])
                            }}
                            type="file"
                            className="block w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-4"
                        />

                        <div className="flex justify-between mt-6">
                            <button
                                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition"
                                onClick={handleCancel}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                                onClick={handleUpload}
                            >
                                Upload Mission
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default BondListingTable;
