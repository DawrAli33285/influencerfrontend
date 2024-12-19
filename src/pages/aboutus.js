import img from "../serve1.png";
import scnd from "../serve2.png";
import third from "../serve3.png";
import WhatWeDo from "../components/whatwedo";
import OurVision from "../components/ourvision";
import WhyDifferent from "../components/whydifferent";
import { NavLink } from "react-router-dom";
import { FooterComponent } from "../components/footer/footer.component";
import { HeaderComponent } from "../components/header/header.component";
export default function AboutUs() {
    const base_path_image = "/assets/images";

    return (
        <div className="w-full">
            <HeaderComponent />
            <div className="w-full relative">
                <img
                    src={`${base_path_image}/about-banner.png`}
                    className="w-full sm:block hidden"
                    alt="banner"
                />
                <img
                    src={`${base_path_image}/banner-sm.png`}
                    className="w-full block sm:hidden"
                    alt="banner"
                />
                <div className="container">
                    <div className=" left-30 absolute top-1/2 -translate-y-1/2 text-white  md:text-left text-center md:px-0 px-4">
                        <h1 className="md:text-[38px] md:leading-[38px] text-[30px] leading-[30px] empowering">
                            Empowering Talent, Building Connections, and Creating
                            Opportunities.
                        </h1>
                        <div className="md:pt-1 pt-4">
                            Fostering growth, forging relationships, and unlocking potential.
                        </div>
                    </div>
                </div>
            </div>
            <div className="container mx-auto">
                <WhatWeDo />
                <OurVision />
                <div className="md:mt-0 -mt-40">
                    <div className="flex items-center md:pt-[140px] md:flex-row flex-col">
                        <div className="w-full lg:w-1/2 max-h-[580px] max-w-[630px] md:pr-10 md:mt-0 mt-[30px]">
                            <img
                                src={`${base_path_image}/how-is.png`}
                                alt="machli"
                                className="w-full object-cover"
                            />
                        </div>

                        <div className="max-w-[565px] mx-auto md:order-1 -order-1">
                            <h2 className="font-bold xl:text-[2.38rem] text-[1.50rem] mb-[10px] text-black">
                                Our <span className="font-bold text-[#1DBF73]">Mission</span>
                            </h2>
                            <p className="text-base text-gray-600">
                                Our mission is to create a seamless platform that bridges the gap
                                between talent and opportunity. We empower creators to pursue
                                their dreams by offering innovative tools to monetize their skills
                                and passions. At the same time, we ensure supporters receive
                                meaningful value and a chance to be part of the creator's journey.
                                Together, we build a thriving ecosystem of creativity, connection,
                                and mutual growth.
                            </p>
                        </div>
                    </div>

                    <WhyDifferent />

                    <div className="w-full flex flex-col gap-x-[40px] md:py-[140px] pt-[50px]">
                        <div className="flex justify-between">
                            <div className="w-full flex flex-col items-center">
                                <h2 className="font-bold xl:text-[2.38rem] text-[1.50rem] mb-[10px] text-center text-black">
                                    Who We <span className="font-bold text-[#1DBF73]">Serve</span>
                                </h2>
                                <p className="text-base max-w-[960px] text-[#222222] text-center mx-auto mb-11">
                                    Browse and manage your active bids in the marketplace, keeping
                                    track of ongoing opportunities. Stay updated on your potential
                                    projects and their status in real time.{" "}
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[40px]">
                            <div className="bg-white  flex flex-col gap-x-[20px] rounded-[20px] relative">
                                <img
                                    src={img}
                                    alt="cardimg"
                                    className="rounded-[10px] w-full h-full"
                                />
                            </div>
                            <div className="bg-white  flex flex-col gap-[20px] rounded-[20px] relative">
                                <img
                                    src={scnd}
                                    alt="cardimg"
                                    className="rounded-[10px] w-full h-full"
                                />
                            </div>
                            <div className="bg-white  flex flex-col gap-[20px] rounded-[20px] relative">
                                <img
                                    src={third}
                                    alt="cardimg"
                                    className="rounded-[10px] w-full h-full"
                                />
                            </div>
                        </div>
                        <NavLink to={`/signup`} className="border md:mt-14 mt-6 border-primary-dark m-auto flex justify-center gap-x-3 items-center text-primary-dark rounded-full text-base font-bold text-center py-[14px] w-[235px]">Explore the market
                            <img src="/assets/images/icons/right-up-black.svg" alt="icon" />
                        </NavLink>
                    </div>
                </div>
            </div>
            <div className="bg-primary-sea-green-300 md:mt-0 mt-10 overflow-hidden">
                <div className="container mx-auto">
                    <div className="flex md:justify-between justify-center items-center relative md:py-[93px] md:flex-row flex-col pt-10">
                        <div className="flex lg:w-[50%] justify-center w-full flex-col md:text-start text-center">
                            <div className="px-7 md:px-0">
                                <h2 className="xl:text-[2.38rem] text-[1.50rem] leading-9 font-bold">
                                    Fullfill your promises, share
                                    your progress, and level up
                                </h2>
                                {/* <h2 className="xl:text-[2.38rem] text-[1.50rem]  font-bold">
                                    your progress, and level up
                                </h2> */}
                                <p className="lg:text-[0.94rem] text-[0.75rem]  mt-[10px]">
                                    Learn more about promise bonds
                                </p>
                            </div>
                            <NavLink to="/signup" className="my-7 bg-primary-dark flex justify-center gap-x-3 items-center text-white rounded-full text-base font-medium text-center py-[19px] w-[250px]">
                                Get Started
                                <img src="/assets/images/icons/right-up.svg" alt="" />
                            </NavLink>
                        </div>
                        <div className="md:absolute right-0 bottom-0 overflow-hidden">
                            <div className="absolute bg-primary-green h-full w-[100%] -bottom-[50%] rounded-full"></div>
                            <img src={`${base_path_image}/imag4.png`} className="w-full max-w-[490px] max-h-[520px] relative px-10" alt="image1" />
                        </div>
                    </div>
                </div>
            </div>
            <FooterComponent />
        </div>
    );
}
