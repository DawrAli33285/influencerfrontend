import HomeFooter from "../components/homefooter";
import HomeHeader from "../components/homeheader";
import avatar from "../avatar.webp"
import tiktok from "../tiktok.png"
import insta from "../insta.png"
import { Link, useNavigate } from "react-router-dom";
import { useEffect,useState } from "react";
import {useLocation} from 'react-router-dom'
import { ToastContainer,toast } from "react-toastify";
import { MoonLoader } from "react-spinners";
import { BASE_URL } from "../baseURL";
import axios from "axios";
import { FooterComponent } from "../components/footer/footer.component";
import { HeaderComponent } from "../components/header/header.component";
export default function Profile() {
    const [state,setState]=useState({
        issuer:'',
        bonds:[],
        missions:[],
        successRate:''
    })
    const [loading,setLoading]=useState(true)
    const location=useLocation();
    useEffect(()=>{
getSingleIssuer();
    },[])
const getSingleIssuer=async()=>{
try{
let params=new URLSearchParams(location.search)
let id=params.get('id')
let response=await axios.get(`${BASE_URL}/getSingleIssuer/${id}`)
console.log("RESPONSE")
setState(response.data)
setLoading(false)
console.log(response)
}catch(e){
if(e?.response?.data?.error){
    toast.error(e?.response?.data?.error,{containerId:"profileToast"})
}else{
    toast.error("Client error please try again",{containerId:"profileToast"})
}
}
}


    const bondData = [
        {
            _id: '1',
            title: 'Influencer A',
            description:'Help Anna fund her vocal training sessions and receive a personalized thank-you performance!',
            bond_issuerance_amount: 1000,
            total_bonds: 5000,
            bond_sold: 12,
            status:'75% sold'
        },
        {
            _id: '2',
            title: 'Influencer B',
            description:'Help Anna fund her vocal training sessions and receive a personalized thank-you performance!',
            bond_issuerance_amount: 1500,
            total_bonds: 3000,
            bond_sold: 6
,
status:'75% sold'        },
        {
            _id: '3',
            title: 'Influencer C',
            description:'Help Anna fund her vocal training sessions and receive a personalized thank-you performance!',
            bond_issuerance_amount: 2000,
            total_bonds: 4500,
            bond_sold: 24,
            status:'75% sold'
        },
        {
            _id: '4',
            title: 'Influencer D',
            description:'Help Anna fund her vocal training sessions and receive a personalized thank-you performance!',
            bond_issuerance_amount: 800,
            total_bonds: 12000,
            bond_sold: 18,
            status:'75% sold'
        }
    ];
const navigate=useNavigate();
    return (
        <>
        <ToastContainer containerId={"profileToast"}/>
        <div className="w-full flex flex-col gap-[20px]">
            <HeaderComponent />
           {loading?<div className="w-full flex justify-center items-center">
            <MoonLoader color="#6B33E3" size={100} />
            
            </div>:<>
            <svg onClick={()=>navigate(-1)} className="cursor-pointer mx-5" width={35} height={35} fill="#000000" viewBox="0 0 200 200" data-name="Layer 1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><title></title><path d="M160,89.75H56l53-53a9.67,9.67,0,0,0,0-14,9.67,9.67,0,0,0-14,0l-56,56a30.18,30.18,0,0,0-8.5,18.5c0,1-.5,1.5-.5,2.5a6.34,6.34,0,0,0,.5,3,31.47,31.47,0,0,0,8.5,18.5l56,56a9.9,9.9,0,0,0,14-14l-52.5-53.5H160a10,10,0,0,0,0-20Z"></path></g></svg>
            <div className="border-b border-b-[#1C1C1C14] flex lg:flex-row flex-col gap-[30px] justify-between w-full">
            
                <div className="flex flex-col gap-[10px] px-[20px] lg:px-[3rem] lg:py-[4rem]">
                    <div className="rounded-[100%] w-[80px] h-[80px]">
                        <img src={state?.issuer?.user_id?.avatar?.length>0?state?.issuer?.user_id?.avatar:avatar} alt="img" className="w-full h-full object-cover rounded-[100%]" />
                    </div>
                    <h2 className="text-black text-2xl font-semibold mb-1">{state?.issuer?.user_id?.username} </h2>
                    {/* <p className="text-[#1C1C1CA3]">Turning dreams into reality with your support.</p> */}
                </div>
                <div className="flex gap-[10px] items-end px-[20px] lg:px-[3rem] lg:py-[4rem]">
                    <div className="flex items-center gap-[6px]">
                        <img src={tiktok} alt="img" className="w-[30px]" />
                        @AnnaSings

                    </div>
                    <div className="flex items-center gap-[6px]">
                        <img src={insta} alt="img" className="w-[30px]" />
                        @AnnaMusicSongs

                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-[10px] lg:px-[3rem] px-[2rem]">
                <h2 className="text-black text-2xl font-semibold mb-1">Bio:</h2>
                <p className="text-[#1C1C1CA3]">Hi, I’m Anna Johnson, a passionate singer with dreams of becoming a renowned artist. Thanks to promise bonds, I’m working towards [goal, e.g., participating in a national singing contest]. Every bond issued brings me closer to this dream.</p>
            </div>
            <div className="flex flex-col gap-[10px] lg:px-[3rem] px-[2rem]">
                <h2 className="text-black text-2xl font-semibold mb-1">Achievements:</h2>
                <p className="text-[#1C1C1CA3]">2023: Reached 50,000 followers on TikTok.</p>
                <p className="text-[#1C1C1CA3]">2024: Runner-up at Local Talent Hunt.</p>
            </div>
            <div className="w-full grid xl:grid-cols-3 md:grid-cols-2 h-fit grid-cols-1 mt-[2rem] px-[2rem] lg:px-[3rem] gap-[10px]">
                <div className="bg-[#0E1E6C14] rounded-[20px] p-[20px] flex gap-[10px]">

                    <div className="flex flex-col justify-between w-full gap-[2rem]">
                        <h1 className="text-[16px] text-[#344054]">Total Bonds Issued </h1>
                        <div className='flex justify-between items-end'>
                            <h2 className="text-[18px] font-semibold">{state?.bonds?.length}</h2>

                        </div>
                    </div>
                </div>
                <div className="bg-[#0E486C14] rounded-[20px] p-[20px] flex gap-[10px] ">
                    <div className="flex flex-col justify-between w-full gap-[2rem]">
                        <h1 className="text-[16px] text-[#344054]">Total Funds Raised</h1>
                        <div className='flex justify-between items-end'>
                            <h2 className="text-[18px] font-semibold">$24000</h2>

                        </div>
                    </div>
                </div>
                <div className="bg-[#3B0E6C14] rounded-[20px] p-[20px] flex gap-[10px] ">

                    <div className="flex flex-col justify-between w-full gap-[2rem]">
                        <h1 className="text-[16px] text-[#344054]">Mission Fulfillment Rate</h1>
                        <div className='flex justify-between items-end'>
                            <h2 className="text-[18px] font-semibold">{state?.successRate}</h2>

                        </div>

                    </div>
                </div>

            </div >
            <div className="lg:px-[3rem] px-[2rem]">
                <table className="min-w-full xl:table hidden table-auto border-gray-300 border-collapse">
                    <thead>
                        <tr className="bg-[#FDFBFD]">
                            <th className="p-[10px] text-left border-b border-gray-300">Bond Name</th>
                            <th className="p-[10px] text-left border-b border-gray-300">Description</th>
                            <th className="p-[10px] text-left border-b border-gray-300">Price</th>
                            <th className="p-[10px] text-left border-b border-gray-300">Total Issued</th>
                            <th className="p-[10px] text-left border-b border-gray-300">Bond Sold</th>
                            <th className="p-[10px] text-left border-b border-gray-300">Status</th>
                            <th className="p-[10px] text-left border-b border-gray-300"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {state?.bonds?.length>0?state?.bonds?.map((bond, index) => (
                            <tr key={index}>
                                <td className="p-[10px] font-bold">{bond.title}</td>
                                <td className="p-[10px] text-[#74767E]">{bond.description}</td>
                                <td className="p-[10px] text-[#1DBF73]">{'$' + bond.bond_issuerance_amount}/bond</td>
                                <td className="p-[10px] font-bold">{bond.total_bonds}</td>
                                <td className="p-[10px] font-bold">{bond.bond_sold}</td>
                                <td className="p-[10px] font-bold">{bond.status}</td>
                                <td className={`text-[#1DBF73] underline`}>
                                    <Link to={`/promisebonddetail/${bond._id}`}>Buy</Link>
                                </td>
                            </tr>
                        )):<div className="flex justify-center h-[100%] items-center text-center w-full">
                            <p className="flex justify-center items-center w-full text-center">No Bond Fond</p>
                            </div>}
                    </tbody>
                </table>
                <div className='w-full xl:hidden block'>
                    <div className="xl:grid-cols-4 grid-cols-2 gap-[20px] border-b border-gray-300 py-4">
                        {bondData.map((bond, index) => (
                            <div key={index} className="grid xl:grid-cols-4 grid-cols-2 gap-[20px] border-b border-gray-300 py-4">
                                <div className="flex flex-col gap-[10px]">
                                    <h1 className="text-[18px] font-semibold text-[#7E8183]">name</h1>
                                    <p className="text-[16px] font-semibold">{bond.title}</p>
                                </div>
                                <div className="flex flex-col gap-[10px]">
                                    <h1 className="text-[18px] font-semibold text-[#7E8183]">description</h1>
                                    <p className="text-[16px] font-semibold">{bond.description}</p>
                                </div>
                                <div className="flex flex-col gap-[10px]">
                                    <h1 className="text-[18px] font-semibold text-[#7E8183]">price</h1>
                                    <p className="text-[16px] font-semibold">{'$' + bond.bond_issuerance_amount}/bond</p>
                                </div>
                                <div className="flex flex-col gap-[10px]">
                                    <h1 className="text-[18px] font-semibold text-[#7E8183]">total issued</h1>
                                    <p className="text-[16px] font-semibold">{bond.total_bonds}</p>
                                </div>
                                <div className="flex flex-col gap-[10px]">
                                    <h1 className="text-[18px] font-semibold text-[#7E8183]">bond sold</h1>
                                    <p className="text-[16px] font-semibold">{bond.bond_sold}</p>
                                </div>
                                <div className="flex flex-col gap-[10px]">
                                    <h1 className="text-[18px] font-semibold text-[#7E8183]">status</h1>
                                    <p className="text-[16px] font-semibold">{bond.status}</p>
                                </div>
                                <div className="flex flex-col gap-[10px]">
                                    <p className="text-[16px] text-[#1DBF73] underline font-semibold">
                                        <Link to={`/promisebonddetail/${bond._id}`}>Buy</Link>
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
           </>}
            <FooterComponent/>
        </div>
        </>
    )
}