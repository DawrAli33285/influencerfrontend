import { Link } from "react-router-dom";
import img from "../explore4.png";
import scnd from "../imagerst.png"
import third from "../signuppage.jpeg"
export default function TopIssuers() {
    return (
        <div className="w-full flex flex-col gap-[40px] px-[20px] py-[40px] xl:px-[40px]">
            <div className="flex justify-between">
                <p className="font-bold xl:text-[1.5rem] text-[1.3rem]">
                    Meet Our  <span className="font-normal text-[#1DBF73] italic">Top Issuers.</span>
                </p>
                <Link to="/" className="text-[#1DBF73] font-bold xl:text-[1.5rem] text-[1.3rem]">View All Promise Bond</Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[40px]">
                <div className="bg-white  flex flex-col gap-[20px] rounded-[20px] relative">
                    <img src={img} alt="cardimg" className="rounded-[10px] w-full h-full" />
                    <div className="absolute bg-[#0000003d] p-[20px] w-full h-full flex flex-col gap-[20px] rounded-[20px] justify-end">
                        <p className="text-white text-base font-bold">James Camron</p>
                        <p className="text-[1rem] font-bold text-[#74767E]">I'll create a personalized marketing strategy for your small business.</p>
                        <span className="text-[1rem] font-bold text-base text-white">15 Bonds Issued | Level 13</span>
                    </div>
                </div>
                <div className="bg-white  flex flex-col gap-[20px] rounded-[20px] relative">
                    <img src={scnd} alt="cardimg" className="rounded-[10px] w-full h-full" />
                    <div className="absolute bg-[#0000003d] p-[20px] w-full h-full flex flex-col gap-[20px] rounded-[20px] justify-end">
                        <p className="text-white text-base font-bold">James Camron</p>
                        <p className="text-[1rem] font-bold text-[#74767E]">I'll create a personalized marketing strategy for your small business.</p>
                        <span className="text-[1rem] font-bold text-base text-white">15 Bonds Issued | Level 13</span>
                    </div>
                </div>
                <div className="bg-white  flex flex-col gap-[20px] rounded-[20px] relative">
                    <img src={third} alt="cardimg" className="rounded-[10px] w-full h-full" />
                    <div className="absolute bg-[#0000003d] p-[20px] w-full h-full flex flex-col gap-[20px] rounded-[20px] justify-end">
                        <p className="text-white text-base font-bold">James Camron</p>
                        <p className="text-[1rem] font-bold text-[#74767E]">I'll create a personalized marketing strategy for your small business.</p>
                        <span className="text-[1rem] font-bold text-base text-white">15 Bonds Issued | Level 13</span>
                    </div>
                </div>

            </div>
        </div>
    )
}