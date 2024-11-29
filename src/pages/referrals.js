import { useState } from "react"
import avatar from "../avatar.webp"
export default function Referrals() {
    const[promopopup,setPromoPopup] = useState(false)
    return (
        <div className="w-full flex flex-col gap-[20px]">
            <div className="px-[30px] py-[40px]">
                <div className="bg-[#1DBF73] flex flex-col lg:flex-row lg:justify-between rounded-[20px] px-[20px] py-[30px]">
                    <div className="flex flex-col">
                        <h2 className="text-white text-[1rem] font-bold">Referrals</h2>
                        <p className="text-white text-[.8rem]">Share the referral code and invite new user, This will also increaser your account level.</p>
                    </div>
                    <div className="flex flex-col lg:flex-row gap-[20px] items-center">
                        <h2 className="text-white text-[1rem] font-bold">Current Level: 2</h2>
                        <button onClick={()=>{setPromoPopup(!promopopup)}} class="bg-black px-[20px] py-[10px] xl:text-[1rem] text-[.8rem] text-white font-bold rounded-[1.4rem]">
                            Refer New User
                        </button>
                    </div>
                </div>
            </div>
            <div className="px-[30px] py-[40px]">
                <div className="flex justify-between items-center pb-[20px] border-b border-b-[#1C1C1C52]">
                    <h1 className="font-bold text-[1rem]">Name</h1>
                    <h1 className="font-bold text-[1rem]">Date</h1>
                </div>
                <div className="flex flex-col gap-[20px] mt-[20px]">
                    <div className="flex justify-between  items-center">
                        <div className="flex  items-center  gap-[6px]">
                            <div className="rounded-[100%] w-[80px] h-[80px]">
                                <img src={avatar} alt="img" className="w-full h-full object-cover rounded-[100%]" />
                            </div>
                            <div className="flex items-center">

                                <h1 className="text-[20px] flex items-center font-semibold">Daniels</h1>

                            </div>
                        </div>
                        <h1 className="font-bold text-[1rem] flex items-center">24/11/2024</h1>
                    </div>
                </div>
            </div>
            {
                promopopup && <div className="fixed top-0 left-0 w-full h-[100vh] bg-[#00000054]">
                    <div className="max-w-[600px] lg:w-[600px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] m-auto bg-white flex flex-col items-center gap-[20px] rounded-[20px] px-[30px] py-[40px]">
                        <h1 className="font-bold text-[1rem]">7 8 0 4 3 0</h1>
                        <p className="text-[.8rem] text-[#1C1C1CA3]">Your referral code</p>
                        <button onClick={()=>{setPromoPopup(!promopopup)}} class="bg-[#1DBF73] px-[20px] py-[10px] xl:text-[1rem] text-[.8rem] w-full text-white font-bold rounded-[1.4rem]">
                            Refer New User
                        </button>
                    </div>

                </div>
            }
        </div>
    )
}