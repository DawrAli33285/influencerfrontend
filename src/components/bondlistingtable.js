import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MoonLoader } from 'react-spinners';
import { useDropzone } from 'react-dropzone';

import { BASE_URL } from '../baseURL';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BondListContext } from "../contextAPI/bondListing";
import { useContext } from 'react';
import { Link } from "react-router-dom"
import howto from "../howtocreatebond.png"
const BondListingTable = () => {
    const [mission, setMission] = useState('');
    const [error, setError] = useState('');
    const [missionVideo,setMissionVideo]=useState("")
    const [isAccepted, setIsAccepted] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [currentBondId,setCurrentBondId]=useState("")
    const [disablecreateBond,setDisableCreateBond]=useState(false)
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
        platform:'',
        channel_name:'',
        social_id:'',
        reason:'',
        followers:'',
        mission_title:'',
        description:'',
        title:'',
        validity_number:'',
        quantity:'',
        bond_price:''
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
        } else if (bondstate.platform.length==0) {
            toast.dismiss()
            toast.error("Please enter platform", { containerId: "containerB" })
            return;
        }else if(bondstate.channel_name.length==0){
            toast.dismiss()
            toast.error("Please enter channel name", { containerId: "containerB" })
            return;
        } else if(bondstate.social_id.length==0){
            toast.dismiss()
            toast.error("Please enter social id", { containerId: "containerB" })
            return;
        } else if(bondstate.followers.length==0){
            toast.dismiss()
            toast.error("Please enter followers", { containerId: "containerB" })
            return;
        }else if(bondstate.mission_title.length==0){
            toast.dismiss()
            toast.error("Please enter mission title", { containerId: "containerB" })
            return;
        }else if(bondstate.description.length<1000){
            toast.dismiss()
            toast.error("Please enter mission description within minimum range", { containerId: "containerB" })
            return;
        }else if(bondstate.title.length==0){
            toast.dismiss()
            toast.error("Please enter bond title", { containerId: "containerB" })
            return;
        } else if (bondstate.validity_number.length === 0) {
            toast.dismiss()
            toast.error("Please select validty number", { containerId: "containerB" })
            return;
        }else if (bondstate.quantity === 0 || bondstate.quantity.length === 0) {
            toast.dismiss()
            toast.error("Please enter valid quantity", { containerId: "containerB" })
            return;
        } else if (bondstate.bond_price === 0 || bondstate.bond_price.length === 0) {
            toast.dismiss()
            toast.error("Please enter valid price", { containerId: "containerB" })
            return;
        }else if(bondstate.reason.length<500){
            toast.dismiss()
            toast.error("Please enter bond reason within minimum range", { containerId: "containerB" })
            return;
        }else if(isAccepted==false){
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
        setaggrement((prev)=>{
            let old=prev;
            if(old==true){
                return true
            }else{
               return user.tos
            }
        })
    }

const acceptTOS=async()=>{
   
    try{
        let token=localStorage.getItem('token')
let headers={
    headers:{
        authorization:`Bearer ${token}`
    }
}

setaggrement(true) 
let response=await axios.get(`${BASE_URL}/acceptTOS`,headers)


    }catch(e){
   
        console.log(e.message)
if(e?.response?.data?.error){
    toast.error(e?.response?.data?.error,{containerId:"containerB"})
}else{
    toast.error("Something went wrong please try again",{containerId:"containerB"})
}
    }
}
const rejectAgain=async(id)=>{

    try{
        setBondData((prev)=>{
            let old;
            if(prev.length>0){
                old=[...prev]
            }else{
                old=[prev]
            }
            let findIndex=old.findIndex(u=>u._id==id)
            old[findIndex]={
                ...old[findIndex],
                status:"PENDING"
            }
            return old
        })
let response=await axios.get(`${BASE_URL}/rejectAgain/${id}`)
console.log(response)
console.log('request again')
toast.success("Request for bond approval sent",{containerId:"containerB"})

    }catch(e){
        if(e?.response?.data?.error){
            toast.error(e?.response?.data?.error,{containerId:"containerB"})
        }else{
            toast.error("Something went wrong please try again",{containerId:"containerB"})
        }
    }
}


const handleCancel = () => {
    setIsOpen(false);
    setCurrentBondId("")
    setMissionVideo("")
  };

  const handleUpload =async () => {

   
   try{
    let token=localStorage.getItem('token')
    let headers={
        headers:{
            authorization:`Bearer ${token}`
        }
    }
    let formdata=new FormData();
   formdata.append('bond_id',currentBondId)
   formdata.append('video',missionVideo)
       let response=await axios.post(`${BASE_URL}/createMissionSubmission`,formdata,headers)
       toast.success("Mission submitted sucessfully",{containerId:"containerB"})
   
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
   }catch(e){
    if(e?.response?.data?.error){
        toast.error(e?.response?.data?.error,{containerId:"containerB"})
    }else{
        toast.error("Something went wrong please try again",{containerId:"containerB"})
    }
   }
  };

    return (
        <>
            <ToastContainer containerId="containerB" limit={1} />
            <div className="bg-white max-h-[700px] min-h-[450px]  overflow-y-auto">
                <div className="flex justify-between lg:flex-row flex-col items-center mb-[20px]">
                    <div className='flex flex-col'>
                        <h1 className="text-[24px] font-semibold">Explore Exciting Opportunities</h1>
                        <p className='text-[18px]'>Discover and invest in unique missions by talented individuals.</p>
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
                        <select
                            value={selectedPriceRange}
                            onChange={handlePriceRangeChange}
                            className="p-[8px] bg-white font-semibold text-black rounded-[10px] border-[1px] border-black outline-none lg:col-span-2"
                        >
                            <option value="default">Price Range</option>
                            {priceRanges.map((range) => (
                                <option key={range.value} value={range.value}>
                                    {range.label}
                                </option>
                            ))}
                        </select>


                        <div className="flex gap-[10px] xl:flex-row flex-col w-full lg:col-span-4">
                            <div className="w-full bg-[#F6F6F6] rounded-[20px] px-[10px] py-[10px] flex items-center">
                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) => filterItems(e.target.value)}
                                    placeholder="Search here..."
                                    className="outline-none border-none bg-transparent w-[90%]"
                                />
                            </div>
                        </div>


                        <button disabled={loading} onClick={showBondPopup} className="p-[10px] bg-[#1DBF73] text-white font-semibold rounded-[10px] lg:col-span-4">
                            Create Bond
                        </button>

                    </div>
                </div>
                <div className="w-full my-[40px]">
                    <img src={howto} className="w-full" alt="img" />
                </div>
                {!loading ? bondData?.length > 0 ?
                    <div>
                        <table className="min-w-full xl:table hidden table-auto border-gray-300 border-collapse">
                            <thead>
                                <tr className="bg-[#FDFBFD]">
                                    <th className="p-[10px] text-left border-b border-gray-300">Issuer</th>
                                    <th className="p-[10px] text-left border-b border-gray-300">Bond Title</th>
                                    <th className="p-[10px] text-left border-b border-gray-300">Mission</th>
                                    <th className="p-[10px] text-left border-b border-gray-300">Price</th>
                                    <th className="p-[10px] text-left border-b border-gray-300">Validity</th>
                                    <th className="p-[10px] text-left border-b border-gray-300">Status</th>
                                    <th className="p-[10px] text-left border-b border-gray-300"></th>
                                    <th className="p-[10px] text-left border-b border-gray-300"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {bondData?.map((bond, index) => (
                                    <tr key={index}>
                                        <td className="p-[10px] font-bold">{bond?.issuer_id?.user_id?.username}</td>
                                        <td className="p-[10px] font-bold">{bond?.title}</td>
                                        <td className="p-[10px]">{bond?.missions?.length > 0 ? bond?.missions[0]?.mission_title : 'No mission'}</td>
                                        <td className="p-[10px]">{'$' + bond?.bond_issuerance_amount}</td>
                                        <td className="p-[10px] font-bold">{bond?.validity_number + ' months'}</td>
                                        <td className="p-[10px] font-bold"> {bond?.status?.toLocaleLowerCase()?.charAt(0)?.toUpperCase() + bond?.status?.toLocaleLowerCase()?.slice(1)}</td>



                                        <td className={`text-[#1DBF73] underline`}>
                                            <Link to={`/promisebonddetail/${bond?._id}`}>View</Link>
                                        </td>
                                        {bond?.
bondVerificationCode
? <td className={`text-[#1DBF73] underline`}>
<Link to={`/promisebondverification/${bond?._id}`}>Verify</Link>
</td>:null}
                                       
{bond?.rejectedTimes>0 && bond?.status=="REJECTED"? <td onClick={()=>{
    rejectAgain(bond._id)
}} className={`text-[#1DBF73] underline cursor-pointer`}>
                                            Request Again
                                        </td>:null}
                                        {bond?.bondRequested==true?<td onClick={()=>{
                                            setIsOpen(!isOpen)
                                            setCurrentBondId(bond._id)
                                        }} className='cursor-pointer'>
                 Upload Mission Video
                                     </td>:null}
                                      
                                    </tr>
                                    
                                ))}
                               
                                 
                            </tbody>
                        </table>
                        <div className='w-full xl:hidden block'>
                            <div className="xl:grid-cols-4 grid-cols-2 gap-[20px] border-b border-gray-300 py-4">
                                {bondData?.map((bond, index) => (
                                    <div key={index} className="grid xl:grid-cols-4 grid-cols-2 gap-[20px] border-b border-gray-300 py-4">
                                        <div className="flex flex-col gap-[10px]">
                                            <h1 className="text-[18px] font-semibold text-[#7E8183]">Issuer</h1>
                                            <p className="text-[16px] font-semibold">{bond?.issuer_id?.user_id?.username}</p>
                                        </div>

                                        <div className="flex flex-col gap-[10px]">
                                            <h1 className="text-[18px] font-semibold text-[#7E8183]">Bond Title</h1>
                                            <p className="text-[16px] font-semibold">{bond?.title}</p>
                                        </div>

                                        <div className="flex flex-col gap-[10px]">
                                            <h1 className="text-[18px] font-semibold text-[#7E8183]">Mission</h1>
                                            <p className="text-[16px] font-semibold">{bond?.missions?.length > 0 ? bond?.missions[0]?.mission_title : 'No mission'}</p>
                                        </div>

                                        <div className="flex flex-col gap-[10px]">
                                            <h1 className="text-[18px] font-semibold text-[#7E8183]">Price</h1>
                                            <p className="text-[16px] font-semibold">{'$' + bond?.bond_issuerance_amount}</p>
                                        </div>

                                        <div className="flex flex-col gap-[10px]">
                                            <h1 className="text-[18px] font-semibold text-[#7E8183]">Validity</h1>
                                            <p className="text-[16px] font-semibold">{bond?.validity_number + ' months'}</p>
                                        </div>
                                        <div className="flex flex-col gap-[10px]">
                                            <h1 className="text-[18px] font-semibold text-[#7E8183]">Status</h1>
                                            <p className="text-[16px] font-semibold">{bond?.status?.toLocaleLowerCase()?.charAt(0)?.toUpperCase() + bond?.status?.toLocaleLowerCase()?.slice(1)}</p>
                                        </div>

                                        <div className="flex flex-col gap-[10px]">

                                            <p className="text-[16px] text-[#1DBF73] underline font-semibold">
                                                <Link to={`/promisebonddetail/${bond?._id}`}>View</Link>
                                            </p>
                                            {bond?.
bondVerificationCode
?<p className="text-[16px] text-[#1DBF73] underline font-semibold">
                                                <Link to={`/promisebondverification/${bond?._id}`}>Verify</Link>
                                            </p>:null}
                                            {bond?.rejectedTimes>0 && bond?.status=="REJECTED"? <td onClick={()=>{
                                                rejectAgain(bond._id)
                                            }} className={`text-[#1DBF73] underline cursor-pointer`}>
                                            Request Again
                                        </td>:null}
                                        {bond?.bondRequested==true?<p onClick={()=>{setIsOpen(!isOpen)


                        setCurrentBondId(bond._id)

                                        }} className='cursor-pointer'>
                 Upload Mission Video
                                     </p>:null}
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
            </div>
            {
                bondpopup && (
                    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center px-[20px] bg-[#00000085]">
                        <div className="bg-white flex h-[90%] overflow-auto flex-col gap-[10px] rounded-[20px] p-[20px] max-w-[800px] w-full">
                            <div className='flex flex-row justify-between'>
                            <h1 className="text-[24px] font-semibold">
                                Create New Bond
                            </h1>
                            <svg onClick={()=>{
                                setBondPopup(false)
                            }} className='cursor-pointer' width={35} height={35} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M6.99486 7.00636C6.60433 7.39689 6.60433 8.03005 6.99486 8.42058L10.58 12.0057L6.99486 15.5909C6.60433 15.9814 6.60433 16.6146 6.99486 17.0051C7.38538 17.3956 8.01855 17.3956 8.40907 17.0051L11.9942 13.4199L15.5794 17.0051C15.9699 17.3956 16.6031 17.3956 16.9936 17.0051C17.3841 16.6146 17.3841 15.9814 16.9936 15.5909L13.4084 12.0057L16.9936 8.42059C17.3841 8.03007 17.3841 7.3969 16.9936 7.00638C16.603 6.61585 15.9699 6.61585 15.5794 7.00638L11.9942 10.5915L8.40907 7.00636C8.01855 6.61584 7.38538 6.61584 6.99486 7.00636Z" fill="#0F0F0F"></path> </g></svg>
                            </div>
                            <h1 className="text-[18px]">Upload Image</h1>
                            <div
                                {...getRootProps()}
                                className={`border-2 border-dashed border-gray-300 p-[20px] text-center rounded-[10px] cursor-pointer ${uploadedImages.length >= 4 ? 'opacity-50 cursor-not-allowed' : ''
                                    }`}
                            >
                                <div className="flex justify-center w-full">
                                    {/* SVG Icon */}
                                    <svg width="80" height="66" viewBox="0 0 80 66" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        {/* SVG paths */}
                                    </svg>
                                </div>
                                <input {...getInputProps()} disabled={uploadedImages.length >= 4} />
                                <p className="text-[16px] text-[#667085] my-[10px]">
                                    Drag and Drop Here
                                </p>
                                <p className="text-[16px] text-[#667085] my-[10px]">or</p>
                                <div className="bg-[#F1EBFE] text-[#1DBF73] text-[16px] font-semibold px-[20px] py-[10px] w-fit rounded-[20px] mx-auto">
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
                                <label htmlFor="socialMedia" className="block text-xl font-semibold text-[#272226]">
                                    Social Media Information
                                </label>
                                {links.map((link, index) => (
                                    <div key={index} className="mt-4">
                                        <div className="flex flex-col md:flex-row gap-4">
                                            {/* Social Media Platform Selection */}
                                            <select
                                                name={`platform-${index}`}
                                                value={bondstate.platform}
                                                onChange={(e) => {
                                                    setBondState({
                                                        ...bondstate,
                                                        platform:e.target.value
                                                    })
                                                }}
                                                className="block w-full px-3 py-4 border rounded-[20px] border-gray-300 focus:outline-none focus:ring focus:border-blue-500"
                                            >
                                                <option value="">Select Platform</option>
                                                <option value="Facebook">Facebook</option>
                                                <option value="Twitter">Twitter</option>
                                                <option value="Instagram">Instagram</option>
                                                <option value="LinkedIn">LinkedIn</option>
                                                <option value="YouTube">YouTube</option>
                                            </select>

                                            {/* Channel Name Input */}
                                            <input
                                                type="text"
                                                name={`channelName-${index}`}
                                                value={bondstate.channel_name}
                                                onChange={(e) => {
                                                    setBondState({
                                                        ...bondstate,
                                                        channel_name:e.target.value
                                                    })
                                                }}
                                                className="block w-full px-3 py-4 border rounded-[20px] border-gray-300 focus:outline-none focus:ring focus:border-blue-500"
                                                placeholder="Channel Name"
                                            />

                                            {/* Social ID Input */}
                                            <input
                                                type="text"
                                                name={`socialId-${index}`}
                                                value={bondstate.social_id}
                                                onChange={(e) => setBondState({
                                                    ...bondstate,
                                                    social_id:e.target.value
                                                })}
                                                className="block w-full px-3 py-4 border rounded-[20px] border-gray-300 focus:outline-none focus:ring focus:border-blue-500"
                                                placeholder="Social ID"
                                            />

                                            {/* Followers/Subscribers Input */}
                                            <input
                                                type="number"
                                                name={`followers-${index}`}
                                                value={bondstate.followers}
                                                onChange={(e) => {
                                                    setBondState({
                                                        ...bondstate,
                                                        followers:e.target.value
                                                    })
                                                }}
                                                className="block w-full px-3 py-4 border rounded-[20px] border-gray-300 focus:outline-none focus:ring focus:border-blue-500"
                                                placeholder="Followers/Subscribers"
                                            />
                                        </div>
                                    </div>
                                ))}
                               
                            </div>
                            <div className="mt-[10px]">
                                <label htmlFor="title" className="block text-xl  font-semibold text-[#272226]">Mission Title</label>
                                <input
                                   
                                    type="text"
                                    name="title"
                                    placeholder="Enter Title"
                                    className="mt-4 bg-[#1C1C1C14] block w-full px-3 py-4 border rounded-[20px] border-gray-300 focus:outline-none focus:ring focus:border-blue-500"
                                    value={bondstate.mission_title}
                                    onChange={(e)=>{
                                        setBondState({
                                            ...bondstate,
                                            mission_title:e.target.value
                                        })
                                    }}
                                />

                            </div>
                            <div className='mt-[10px]'>
                                <label htmlFor="mission" className="text-lg font-semibold text-gray-800 mb-2">
                                    Mission
                                </label>
                                <textarea
                                    id="mission"
                                    value={bondstate.description}
                                    onChange={(e)=>{
                                        setBondState({
                                            ...bondstate,
                                            description:e.target.value
                                        })
                                    }}
                                    maxLength={1200}
                                    className="w-full bg-[#1C1C1C14] p-4 border rounded-lg border-gray-300 focus:outline-none focus:ring focus:border-blue-500"
                                    placeholder="Write your mission statement here..."
                                    rows={10}
                                ></textarea>
                                {error && <p className="text-red-500 mt-2">{error}</p>}
                                <p className="text-sm text-gray-600 mt-1">
                                    {bondstate.description.length} / 1000 characters required
                                </p>
                            </div>
                            <div className="mt-[10px]">
                                <label htmlFor="title" className="block text-xl  font-semibold text-[#272226]">Bond Title</label>
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
                            <div className='mt-[10px]'>
                                <label htmlFor="reasonbond" className="text-lg font-semibold text-gray-800 mb-2">
                                    Reason For Bond Issuance
                                </label>
                                <textarea
                                    id="reasonbond"
                                    value={bondstate.reason}
                                    maxLength={520}
                                    onChange={(e)=>{
                                        setBondState({
                                            ...bondstate,
                                            reason:e.target.value
                                        })
                                    }}
                                    className="w-full bg-[#1C1C1C14] p-4 border rounded-lg border-gray-300 focus:outline-none focus:ring focus:border-blue-500"
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
                                    <span className="text-gray-700 text-sm">
                                        I agree to the{' '}
                                        <a href="/terms" className="text-[#1DBF73] underline">
                                            Terms and Conditions
                                        </a>.
                                    </span>
                                </label>
                            </div>
                            <div className="hover:cursor-pointer flex flex-col justify-between mt-4 gap-[10px] xl:flex-row">
                                <div onClick={() => setBondPopup(!bondpopup)} className="border-[1px] rounded-[10px] w-full xl:w-1/2 text-center text-[20px] border-[#1DBF73] px-[20px] py-[10px] text-[#1DBF73] font-semibold">
                                    Cancel
                                </div>
                                <div 
    onClick={!disablecreateBond ? createBond : null} 
    className={`border-[1px] rounded-[10px] w-full xl:w-1/2 text-center text-[20px] px-[20px] py-[10px] font-semibold 
        ${disablecreateBond ? 'bg-gray-400 text-gray-300 cursor-not-allowed' : 'bg-[#1DBF73] text-white hover:cursor-pointer'}`}
>
    Create Bond
</div>

                            </div>
                        </div>
                    </div>
                )
            }
            {
                aggrement===false && (
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
           
           onChange={(e)=>{
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
