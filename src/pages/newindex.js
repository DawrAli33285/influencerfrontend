import { useEffect, useState } from "react";
import ActiveBids from "../components/activebidds";
import Banner from "../components/banner";
import ExploreBond from "../components/explorebond";
import HomeFooter from "../components/homefooter";
import HomeHeader from "../components/homeheader";
import HowDoesItWork from "../components/howdoesitwork";
import Reviews from "../components/review";
import TopIssuers from "../components/topissuers";
import WhyChooseUs from "../components/whychooseus";
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import { BASE_URL } from "../baseURL";
import { MoonLoader } from 'react-spinners';
import bsns from "../bussinessmen.png";
import { Link } from "react-router-dom";

export default function NewIndex() {
    const [loading, setLoading] = useState(true)
    const [state, setState] = useState({
        bonds: [],
        issuers: []
    })
    useEffect(() => {
        getMainPageData();
    }, [])

    const getMainPageData = async () => {
        try {
            let response = await axios.get(`${BASE_URL}/getMainPageData`)
            setState({
                bonds: response.data.bonds,
                issuers: response.data.issuers,
                market: response.data.market
            })
            setLoading(false)
            console.log("RESPONSE")
            console.log(response.data)
        } catch (e) {
            if (e?.response?.data?.error) {
                toast.error(e?.response?.data?.error, { containerId: "mainPage" })
            } else {
                toast.error("Client error please try again", { containerId: "mainPage" })
            }
        }
    }



    return (
        <>
            <ToastContainer containerId={"mainPage"} />
            <div className="w-full relative">
                <HomeHeader />
                <Banner />
                <div className="max-w-[1440px] mx-auto">
                    <HowDoesItWork />
                    <WhyChooseUs />
                    <TopIssuers loading={loading} state={state} setState={setState} />
                    <ExploreBond loading={loading} state={state} setState={setState} />
                    <div className="w-full bg-[#1dbf7321] lg:px-[6rem]  mx-auto lg:mt-[4rem] pt-[30px] px-[30px] lg:h-[300px]">
                        <div className="flex lg:flex-row flex-col lg:gap-[40px] gap-[20px]  mx-auto h-full">
                            <div className="flex lg:w-[50%] justify-center w-full flex-col gap-[20px] h-full">
                                <div>
                                    <h2 className="lg:text-[2rem] text-[1.50rem] font-medium  lg:text-left text-center lg:font-bold">Fullfill your promises, share</h2>
                                    <h2 className="lg:text-[2rem] text-[1.50rem] font-medium  lg:text-left text-center lg:font-bold">your progress, and level up</h2>

                                </div>
                                <div className="flex gap-[10px] justify-center flex-row">
                                    <Link to="/search?filter=bond&search=" className="bg-black border border-black px-[20px] py-[10px] xl:py-[11px] lg:text-[0.94rem] text-[0.75rem] flex gap-[12px] items-center text-white font-bold rounded-[3.75rem] w-fit">
                                        Find Bonds
                                        <svg className="md:w-[16px] md:h-[17px] w-[11px] h-[11px]" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M15.5553 0.101562H5.77756C5.53189 0.101562 5.3331 0.300354 5.3331 0.546021C5.3331 0.791687 5.53189 0.990479 5.77756 0.990479H14.4824L0.129975 15.3429C-0.0436504 15.5165 -0.0436504 15.7978 0.129975 15.9714C0.216766 16.0581 0.330516 16.1016 0.444225 16.1016C0.557933 16.1016 0.671641 16.0581 0.758475 15.9714L15.1109 1.61894V10.3238C15.1109 10.5695 15.3097 10.7683 15.5553 10.7683C15.801 10.7683 15.9998 10.5695 15.9998 10.3238V0.546021C15.9998 0.300354 15.801 0.101562 15.5553 0.101562Z" fill="white" />
                                        </svg>
                                    </Link>
                                    <Link to="/signup" className="bg-white border border-black px-[20px] py-[10px] xl:py-[11px] lg:text-[0.94rem] text-[0.75rem] flex gap-[12px] items-center text-black font-bold rounded-[3.75rem] w-fit">
                                        Find Talent
                                        <svg className="md:w-[16px] md:h-[17px] w-[11px] h-[11px]" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M15.5553 0.101562H5.77756C5.53189 0.101562 5.3331 0.300354 5.3331 0.546021C5.3331 0.791687 5.53189 0.990479 5.77756 0.990479H14.4824L0.129975 15.3429C-0.0436504 15.5165 -0.0436504 15.7978 0.129975 15.9714C0.216766 16.0581 0.330516 16.1016 0.444225 16.1016C0.557933 16.1016 0.671641 16.0581 0.758475 15.9714L15.1109 1.61894V10.3238C15.1109 10.5695 15.3097 10.7683 15.5553 10.7683C15.801 10.7683 15.9998 10.5695 15.9998 10.3238V0.546021C15.9998 0.300354 15.801 0.101562 15.5553 0.101562Z" fill="black" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                            <div className="lg:w-[50%] w-full h-full">
                                <img src={bsns} className="w-full lg:max-w-[292px] h-full object-cover" />
                            </div>
                        </div>
                    </div>
                    <ActiveBids loading={loading} state={state} setState={setState} />



                </div>
                <Reviews />
                <HomeFooter />
            </div>
        </>
    )
}