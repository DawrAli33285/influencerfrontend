import { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import HomeFooter from "../components/homefooter";
import HomeHeader from "../components/homeheader";
import axios from "axios";
import { ToastContainer,toast } from "react-toastify";
import { MoonLoader } from "react-spinners";
import { useLocation } from "react-router-dom";
import { BASE_URL } from "../baseURL";

export default function Search() {
    const [loading,setLoading]=useState(true)
    const [filter,setFilter]=useState("")
    const bondData = [
        {
            _id: '1',
            title: 'Influencer A',
            bond_issuerance_amount: 1000,
            total_bonds: 5000,
            validity_number: 12
        },
        {
            _id: '2',
            title: 'Influencer B',
            bond_issuerance_amount: 1500,
            total_bonds: 3000,
            validity_number: 6
        },
        {
            _id: '3',
            title: 'Influencer C',
            bond_issuerance_amount: 2000,
            total_bonds: 4500,
            validity_number: 24
        },
        {
            _id: '4',
            title: 'Influencer D',
            bond_issuerance_amount: 800,
            total_bonds: 12000,
            validity_number: 18
        }
    ];

    const [searchQuery, setSearchQuery] = useState("");
    const [state,setState]=useState([])
    const location=useLocation();

    const filteredBonds = bondData.filter(bond => 
        bond.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        bond.bond_issuerance_amount.toString().includes(searchQuery) ||
        bond.total_bonds.toString().includes(searchQuery) ||
        bond.validity_number.toString().includes(searchQuery)
    );
useEffect(()=>{
getSearchItems();
},[])

const getSearchItems=async()=>{
    try{
let params=new URLSearchParams(location.search)
let filter=params.get("filter")
setFilter(filter)
let search=params.get("search")
let response=await axios.post(`${BASE_URL}/searchItems`,{filter,search});
console.log("searchItems")
console.log(response.data)
setState(response.data.data)
setLoading(false)

}catch(e){
        if(e?.response?.data?.error){
            toast.error(e?.response?.data?.error,{containerId:"searchToast"})
        }else{
            toast.error("Client error please try again",{containerId:"searchToast"})
        }
    }
}


    return (
        <>
        <ToastContainer containerId={"searchToast"}/>
        
        <div className="w-full">
            <HomeHeader />
           {loading?<div className="w-full h-full flex justify-center items-center">
            
            <MoonLoader color="#6B33E3" size={100} />
            </div>:<>
           
            <div className="flex flex-col gap-[20px] lg:px-[3rem] lg:py-[40px] px-[2rem] py-[40px]">
                <div className="w-full xl:w-[500px] bg-[#1C1C1C14] rounded-[20px] px-[20px] py-[20px] flex items-center">
                    <input
                        type="text"
                        placeholder="Search here..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="outline-none border-none bg-transparent w-[90%]"
                    />
                    <button className="w-[10%] flex justify-center items-center">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_366_191)">
                                <circle cx="6.70768" cy="6.70829" r="5.54167" stroke="#1C1C1C" strokeOpacity="0.64" />
                                <path d="M10.791 10.7916L12.8327 12.8333" stroke="#1C1C1C" strokeOpacity="0.64" strokeLinecap="round" />
                            </g>
                            <defs>
                                <clipPath id="clip0_366_191">
                                    <rect width="14" height="14" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>
                    </button>
                </div>
               {filter==="bond"?<>
                <div>
                    <table className="min-w-full xl:table hidden table-auto border-gray-300 border-collapse">
                        <thead>
                            <tr className="bg-[#FDFBFD]">
                                <th className="p-[10px] text-left border-b border-gray-300">Issuer</th>
                                <th className="p-[10px] text-left border-b border-gray-300">Mission</th>
                                <th className="p-[10px] text-left border-b border-gray-300">Price</th>
                                <th className="p-[10px] text-left border-b border-gray-300">Validity</th>
                                <th className="p-[10px] text-left border-b border-gray-300"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {state?.map((bond, index) => (
                                <tr key={index}>
                                    <td className="p-[10px] font-bold">{bond?.issuer_id?.user_id?.username}</td>
                                    <td className="p-[10px]">{'$' + bond.bond_issuerance_amount}</td>
                                    <td className="p-[10px] text-[#1DBF73]">{bond.total_bonds}</td>
                                    <td className="p-[10px] font-bold">{bond.validity_number + ' months'}</td>
                                    <td className={`text-[#1DBF73] underline`}>
                                        <Link to={`/promisebonddetail/${bond._id}`}>View</Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className='w-full xl:hidden block'>
                        <div className="xl:grid-cols-4 grid-cols-2 gap-[20px] border-b border-gray-300 py-4">
                            {filteredBonds.map((bond, index) => (
                                <div key={index} className="grid xl:grid-cols-4 grid-cols-2 gap-[20px] border-b border-gray-300 py-4">
                                    <div className="flex flex-col gap-[10px]">
                                        <h1 className="text-[18px] font-semibold text-[#7E8183]">Issuer</h1>
                                        <p className="text-[16px] font-semibold">{bond.title}</p>
                                    </div>
                                    <div className="flex flex-col gap-[10px]">
                                        <h1 className="text-[18px] font-semibold text-[#7E8183]">Mission</h1>
                                        <p className="text-[16px] font-semibold">{'$' + bond.bond_issuerance_amount}</p>
                                    </div>
                                    <div className="flex flex-col gap-[10px]">
                                        <h1 className="text-[18px] font-semibold text-[#7E8183]">Price</h1>
                                        <p className="text-[16px] font-semibold">{bond.total_bonds}</p>
                                    </div>
                                    <div className="flex flex-col gap-[10px]">
                                        <p className="text-[16px] text-[#1DBF73] underline font-semibold">
                                            <Link to={`/promisebonddetail/${bond._id}`}>View</Link>
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
               </>:<>
               
               <div>
                    <table className="min-w-full xl:table hidden table-auto border-gray-300 border-collapse">
                        <thead>
                            <tr className="bg-[#FDFBFD]">
                                <th className="p-[10px] text-left border-b border-gray-300">Name</th>
                                <th className="p-[10px] text-left border-b border-gray-300">Email</th>
                                <th className="p-[10px] text-left border-b border-gray-300">Location</th>
                                <th className="p-[10px] text-left border-b border-gray-300">Joined On</th>
                                <th className="p-[10px] text-left border-b border-gray-300"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {state?.map((bond, index) => (
                                <tr key={index}>
                                    <td className="p-[10px] font-bold">{bond?.user_id?.username}</td>
                                    <td className="p-[10px]">{bond?.user_id?.email}</td>
                                    <td className="p-[10px] text-[#1DBF73]">{bond?.user_id?.location?bond?.user_id?.location:'Location not registered'}</td>
                                    <td className="p-[10px] font-bold">
  {bond?.user_id?.createdAt
    ? new Date(bond.user_id.createdAt).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : 'N/A'}
</td>

                                    <td className={`text-[#1DBF73] underline`}>
                                        <Link to={`/profile?id=${bond?._id}`}>View</Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className='w-full xl:hidden block'>
                        <div className="xl:grid-cols-4 grid-cols-2 gap-[20px] border-b border-gray-300 py-4">
                            {filteredBonds.map((bond, index) => (
                                <div key={index} className="grid xl:grid-cols-4 grid-cols-2 gap-[20px] border-b border-gray-300 py-4">
                                    <div className="flex flex-col gap-[10px]">
                                        <h1 className="text-[18px] font-semibold text-[#7E8183]">Issuer</h1>
                                        <p className="text-[16px] font-semibold">{bond.title}</p>
                                    </div>
                                    <div className="flex flex-col gap-[10px]">
                                        <h1 className="text-[18px] font-semibold text-[#7E8183]">Mission</h1>
                                        <p className="text-[16px] font-semibold">{'$' + bond.bond_issuerance_amount}</p>
                                    </div>
                                    <div className="flex flex-col gap-[10px]">
                                        <h1 className="text-[18px] font-semibold text-[#7E8183]">Price</h1>
                                        <p className="text-[16px] font-semibold">{bond.total_bonds}</p>
                                    </div>
                                    <div className="flex flex-col gap-[10px]">
                                        <p className="text-[16px] text-[#1DBF73] underline font-semibold">
                                            <Link to={`/promisebonddetail/${bond._id}`}>View</Link>
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
               </>}
                
            </div>
           </>}
            <HomeFooter />
        </div>
        </>
    );
}
