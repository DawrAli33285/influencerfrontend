import { Link } from "react-router-dom"
import wedo from "../whatwedo.png"
export default function WhatWeDo() {
    return (
        <div className={`flex flex-col justify-center px-[20px] lg:gap-[40px] lg:px-[3rem] lg:flex-row  items-center py-[4rem]`}>
            <div className="w-full lg:w-1/2 max-h-[550px]">
                <img src={wedo} alt="machli" className="w-full object-cover" />
            </div>
            <div className="w-full lg:w-1/2">
                <h2 className="font-bold xl:text-[2.2rem] text-[1.6rem] mb-[10px] text-black">
                    What We <span className="font-bold text-[#1DBF73]">Do</span> ?
                </h2>
                <p className="text-lg text-[#222222]">
                    We are a platform built on the belief that talent deserves recognition, and every creator has the power to turn their unique skills into real opportunities. Our mission is simple: to connect creators, influencers, and skilled individuals with audiences who value their expertise.                </p>
                <div className="flex flex-col mt-[20px] gap-[10px]">
                    <div className="gap-[10px] flex items-center">
                        <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15.7657 0.359328C15.4533 0.0468906 14.9468 0.0468906 14.6343 0.359328L5.04983 9.94392L1.3657 6.2598C1.0533 5.94736 0.546797 5.94739 0.234328 6.2598C-0.0781094 6.5722 -0.0781094 7.0787 0.234328 7.39114L4.48414 11.6409C4.79645 11.9533 5.30333 11.9531 5.61552 11.6409L15.7657 1.4907C16.0781 1.1783 16.0781 0.671766 15.7657 0.359328Z" fill="#222222" />
                        </svg>
                        <p className="text-lg text-[#222222]">
                            Promise Bond lets individuals secure funding now by issuing bonds tied to their future value.
                        </p>
                    </div>
                    <div className="gap-[10px] flex items-center">
                        <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15.7657 0.359328C15.4533 0.0468906 14.9468 0.0468906 14.6343 0.359328L5.04983 9.94392L1.3657 6.2598C1.0533 5.94736 0.546797 5.94739 0.234328 6.2598C-0.0781094 6.5722 -0.0781094 7.0787 0.234328 7.39114L4.48414 11.6409C4.79645 11.9533 5.30333 11.9531 5.61552 11.6409L15.7657 1.4907C16.0781 1.1783 16.0781 0.671766 15.7657 0.359328Z" fill="#222222" />
                        </svg>
                        <p className="text-lg text-[#222222]">
                            It empowers influencers, professionals, and artists to monetize their talents.                        </p>
                    </div>
                    <div className="gap-[10px] flex items-center">
                        <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15.7657 0.359328C15.4533 0.0468906 14.9468 0.0468906 14.6343 0.359328L5.04983 9.94392L1.3657 6.2598C1.0533 5.94736 0.546797 5.94739 0.234328 6.2598C-0.0781094 6.5722 -0.0781094 7.0787 0.234328 7.39114L4.48414 11.6409C4.79645 11.9533 5.30333 11.9531 5.61552 11.6409L15.7657 1.4907C16.0781 1.1783 16.0781 0.671766 15.7657 0.359328Z" fill="#222222" />
                        </svg>
                        <p className="text-lg text-[#222222]">
                            Supporters can invest in meaningful connections and future success.                        </p>
                    </div>
                </div>
                <Link to="/signup" class="border-[#1dbf73] mt-[30px] rounded-[6px] flex border bg-white px-[20px] py-[10px] xl:py-[10px] xl:text-[.9rem] text-[.6rem] text-[#1dbf73] font-bold  w-fit ">
                    Get Started
                </Link>
            </div>

        </div>
    )
}