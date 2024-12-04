import HomeFooter from "../components/homefooter";
import HomeHeader from "../components/homeheader";
import left1 from "../leftside1.png"
import left2 from "../leftside2.png"
import left3 from "../leftside3.png"
import left4 from "../leftside4.png"
import midd from "../midsection.PNG"
import bsns from "../bussinessmen.png";

import machli from "../machli.png"
import img from "../serve1.png"
import scnd from "../serve2.png"
import third from "../serve3.png"
import banner from "../aboutbanner.png"
import WhatWeDo from "../components/whatwedo";
import OurVision from "../components/ourvision";
import WhyDifferent from "../components/whydifferent";
import { Link } from "react-router-dom";
export default function AboutUs() {
    return (
        <div className="w-full">
            <HomeHeader />
            <div className="w-full">
                <img src={banner} className="w-full" />
            </div>
            <div className="w-full max-w-[1440px] mx-auto">
                <WhatWeDo />
                <OurVision />

                <div className={`flex flex-col justify-center px-[20px] lg:gap-[40px] lg:px-[40px] lg:flex-row  items-center py-10`}>
                    <div className="w-full lg:w-1/2">
                        <img src={machli} alt="machli" className="w-full object-cover" />
                    </div>
                    <div className="w-full lg:w-1/2">
                        <h2 className="font-bold xl:text-[2.38rem] text-[1.50rem] mb-[10px] text-black">
                            Our <span className="font-bold text-[#1DBF73]">Mission</span>
                        </h2>
                        <p className="lg:text-[0.94rem] text-[0.75rem] text-gray-600">
                            Our mission is to create a seamless platform that bridges the gap between talent and opportunity. We empower creators to pursue their dreams by offering innovative tools to monetize their skills and passions. At the same time, we ensure supporters receive meaningful value and a chance to be part of the creator's journey. Together, we build a thriving ecosystem of creativity, connection, and mutual growth.                        </p>
                    </div>

                </div>
                <WhyDifferent />

                <div className="w-full flex flex-col gap-[40px] px-[20px] py-[40px] xl:px-[30px]">
                    <div className="flex justify-between">
                        <div className="w-full flex flex-col items-center">
                            <h2 className="font-bold xl:text-[2.38rem] text-[1.50rem] mb-[10px] text-center text-black">
                                Who We <span className="font-bold text-[#1DBF73]">Serve</span>
                            </h2>
                            <p className="lg:text-[0.94rem] text-[0.75rem] text-[#222222] text-center lg:w-[60%] mx-auto">
                                Browse and manage your active bids in the marketplace, keeping track of ongoing opportunities. Stay updated on your potential projects and their status in real time. </p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[40px]">
                        <div className="bg-white  flex flex-col gap-[20px] rounded-[20px] relative">
                            <img src={img} alt="cardimg" className="rounded-[10px] w-full h-full" />
                        </div>
                        <div className="bg-white  flex flex-col gap-[20px] rounded-[20px] relative">
                            <img src={scnd} alt="cardimg" className="rounded-[10px] w-full h-full" />
                        </div>
                        <div className="bg-white  flex flex-col gap-[20px] rounded-[20px] relative">
                            <img src={third} alt="cardimg" className="rounded-[10px] w-full h-full" />
                        </div>

                    </div>
                    <Link to={`/signup`} className="text-[#1DBF73] border-[#1DBF73] bg-[#1dbf7327] border rounded-[8px] w-fit px-[20px] py-[10px] mx-auto font-bold lg:text-[0.94rem] text-[0.75rem]">Explore the market</Link>

                </div>

            </div>
            <div className="w-full bg-[#1dbf735e] lg:p-[40px]  mx-auto lg:mt-[9rem] px-[20px] pt-[20px]">
                <div className="flex lg:flex-row flex-col lg:gap-[40px] gap-[20px] max-w-[980px] mx-auto">
                    <div className="flex lg:w-[50%] justify-center w-full flex-col gap-[20px]">
                        <div>
                            <h2 className="xl:text-[2.38rem] text-[1.50rem]  font-bold">Fullfill your promises, share</h2>
                            <h2 className="xl:text-[2.38rem] text-[1.50rem]  font-bold">your progress, and level up</h2>
                            <p className="lg:text-[0.94rem] text-[0.75rem]  mt-[10px]">Learn more about promise bonds</p>

                        </div>
                        <Link to="/signup" class="bg-[#1DBF73] px-[20px] py-[10px] xl:py-[10px] lg:text-[0.94rem] text-[0.75rem] text-white font-bold  w-fit ">
                            Get Started
                        </Link>
                    </div>
                    <div className="lg:w-[50%] w-full lg:mt-[-11rem]">
                        <img src={bsns} className="w-full" />
                    </div>
                </div>
            </div>
            <HomeFooter />
        </div>
    )
}