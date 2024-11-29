import { Link } from "react-router-dom";
import img from "../girl.png";
import scnd from "../girl2.png"
import third from "../boy.png"
import { BASE_URL } from "../baseURL";
import { MoonLoader } from "react-spinners";
export default function ActiveBids({state,loading}) {
    return (
        <div className="w-full flex flex-col gap-[40px] px-[20px] py-[40px] xl:px-[40px]">
            {loading?<div className='flex flex-col'>
                <p className="font-bold xl:text-[1.5rem] text-[1.3rem]">
                    <span className="font-normal text-[#1DBF73] italic">Active Bids </span>
                    in the Marketplace.
                </p>
                <div className="flex justify-between">
                <p className="font-bold xl:text-[1.5rem] text-[1.3rem]">
                   
                   
                </p>
                <Link to="/search?filter=bond&search=" className="text-[#1DBF73] font-bold xl:text-[1.5rem] text-[1.3rem]">Explore The Market</Link>
            </div>
                    <MoonLoader color="#6B33E3" size={100} />
                </div>:<>
                <div className="flex justify-between">
                <p className="font-bold xl:text-[1.5rem] text-[1.3rem]">
                    <span className="font-normal text-[#1DBF73] italic">Active Bids </span>
                    in the Marketplace.
                </p>
                <Link to="/search?filter=bond&search=" className="text-[#1DBF73] font-bold xl:text-[1.5rem] text-[1.3rem]">Explore The Market</Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[40px]">
                {state?.market?.length>0?state?.market?.map((val,i)=>{
                    return <div className="bg-white  flex flex-col gap-[20px] rounded-[20px] relative">
                    <img  src={val?.photos[0] 
        ? val.photos[0].replace('http://localhost:5000', BASE_URL) 
        : img}  alt="cardimg" className="rounded-[10px] w-full h-full" />
                    <div className="absolute bg-[#0000003d] p-[20px] w-full h-full flex flex-col gap-[20px] rounded-[20px] justify-end">
                        <p className="text-white text-[1.3rem] font-bold">{val?.issuer_id?.user_id?.username}</p>
                        <p className="text-[1.3rem] font-bold text-[#74767E]">{val?.missions?.length>0?val?.missions[0]?.description:`No mission`}</p>
                        <span className="text-[1.3rem] font-bold  text-white">${val?.bond_issuerance_amount}</span>
                    </div>
                </div>
                }):<div className="flex w-full justify-center items-center text-center">
                    <p>No Record Found</p>
                    </div>}
                
            </div>
            </>}
        </div>
    )
}