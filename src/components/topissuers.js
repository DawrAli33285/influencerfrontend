import { Link } from "react-router-dom";
import img from "../explore4.png";
import scnd from "../imagerst.png"
import { MoonLoader } from 'react-spinners';
import third from "../signuppage.jpeg"
export default function TopIssuers({loading,state,setState}) {
    return (
        <div className="w-full flex flex-col gap-[40px] px-[20px] py-[40px] xl:px-[40px]">
            <div className="flex justify-between">
                <p className="font-bold xl:text-[1.5rem] text-[1.3rem]">
                    Meet Our  <span className="font-normal text-[#1DBF73] italic">Top Issuers.</span>
                </p>
                <Link to="/search?filter=issuer&search=" className="text-[#1DBF73] font-bold xl:text-[1.5rem] text-[1.3rem]">View All Issuers</Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[40px]">
            {loading?<div className='flex'>
                    <MoonLoader color="#6B33E3" size={100} />
                </div>:!state?.issuers?.length>0?<div className='flex justify-center items-center'>
                    <p>No record found</p>
                </div>:state?.issuers?.map((val,i)=>{
                return <div key={val?._id} className="bg-white  flex flex-col gap-[20px] rounded-[20px] relative">
                <img src={val?.user_id?.avatar?val?.user_id?.avatar:img} alt="cardimg" className="rounded-[10px] w-full h-full" />
                <div className="absolute bg-[#0000003d] p-[20px] w-full h-full flex flex-col gap-[20px] rounded-[20px] justify-end">
                    <p className="text-white text-base font-bold">{val?.user_id?.username}</p>
                    <p className="text-[1rem] font-bold text-[#74767E]">{val?.bonds[0]?.missions[0]?.task_type}</p>
                    <span className="text-[1rem] font-bold text-base text-white">{val?.bonds?.length} Bonds Issued | Level 13</span>
                </div>
            </div>
            })}
          
            </div>
        </div>
    )
}