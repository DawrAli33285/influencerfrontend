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
                    <ExploreBond loading={loading} state={state} setState={setState} />
                    <TopIssuers loading={loading} state={state} setState={setState} />
                    <ActiveBids loading={loading} state={state} setState={setState} />
                    <Reviews />

                </div>
                <div className="w-full bg-[#1dbf735e] lg:p-[40px]  mx-auto lg:mt-[9rem] p-[20px]">
                    <div className="flex lg:flex-row flex-col-reverse lg:gap-[40px] gap-[20px] max-w-[900px] mx-auto">
                        <div className="flex lg:w-[50%] justify-center w-full flex-col gap-[20px]">
                            <div>
                                <h2 className="text-[1.2rem] font-bold">Fullfill your promises, share</h2>
                                <h2 className="text-[1.2rem] font-bold">your progress, and level up</h2>
                                <p className="text-[.8rem] mt-[10px]">Learn more about promise bonds</p>

                            </div>
                            <Link to="/signup" class="bg-[#1DBF73] px-[20px] py-[10px] xl:py-[10px] xl:text-[.9rem] text-[.6rem] text-white font-bold  w-fit ">
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
        </>
    )
}