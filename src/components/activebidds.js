import { Link } from "react-router-dom";
import img from "../girl.png";
import scnd from "../girl2.png"
import third from "../boy.png"
export default function ActiveBids({state}) {
    return (
        <div className="w-full flex flex-col gap-[40px] px-[20px] py-[40px] xl:px-[40px]">
            <div className="flex justify-between">
                <p className="font-bold xl:text-[1.5rem] text-[1.3rem]">
                    <span className="font-normal text-[#1DBF73] italic">Active Bids </span>
                    in the Marketplace.
                </p>
                <Link to="/" className="text-[#1DBF73] font-bold xl:text-[1.5rem] text-[1.3rem]">Explore The Market</Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[40px]">
                {state?.market?.map((val,i)=>{
                    return <div className="bg-white  flex flex-col gap-[20px] rounded-[20px] relative">
                    <img src={val?.photos[0]?val?.photos[0]:img} alt="cardimg" className="rounded-[10px] w-full h-full" />
                    <div className="absolute bg-[#0000003d] p-[20px] w-full h-full flex flex-col gap-[20px] rounded-[20px] justify-end">
                        <p className="text-white text-[1.3rem] font-bold">{val?.issuer_id?.user_id?.username}</p>
                        <p className="text-[1.3rem] font-bold text-[#74767E]">{val?.missions[0]?.length>0?val?.missions[0]?.description:`No mission`}</p>
                        <span className="text-[1.3rem] font-bold  text-white">${val?.bond_issuerance_amount}</span>
                    </div>
                </div>
                })}
                
            </div>
        </div>
    )
}