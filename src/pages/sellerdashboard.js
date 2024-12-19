import { useEffect, useState } from "react";
import UserInfo from "../components/userinfo";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { BASE_URL } from "../baseURL";
import SellerBondAnalyticsChart from "../components/sellercomponents/sellersplinechart";
import SellerBondListingTable from "../components/sellercomponents/sellerbondlisting";
import SellerMissionListingTable from "../components/sellercomponents/sellermissionlistingtable";
import SellerNotificationCards from "../components/sellercomponents/sellercards";
import OfferListingTable from "../components/sellercomponents/offerlistingtable";
import SellerUserInfo from "../components/sellercomponents/sellerinfo";
import SellerLineChartComponent from "../components/sellerlinechartcomponent";
import SellerPieChartComponent from "../components/sellercirclechart";
import SellerHalfPieChartComponent from "../components/sellerhalfcircle";
import SellerMissionStatsChart from "../components/sellermultiline";


export default function SellerDashboard() {
 
    const [state, setState] = useState()
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        fetchDashboardData();
    }, [])
    const fetchDashboardData = async () => {
        try {
            let token = localStorage.getItem('buyerToken')
            let headers = {
                headers: {
                    authorization: `Bearer ${token}`
                }
            }
            let response = await axios.get(`${BASE_URL}/get-buyerdashboardData`, headers)
            console.log("RESPONSE")
            console.log(response.data)
            setState(response.data)
            setLoading(false)
        } catch (e) {
            if (e?.response?.data?.error) {
                toast.dismiss()
                toast.error(e?.response?.data?.error, { containerId: "containerE" })

            } else {
                toast.dismiss()
                toast.error("Client error please try again", { containerId: "containerE" })
            }
            return;
        }
    }
    return (
        <>
            <ToastContainer containerId="containerE" limit={1} />
            <div className="lg:p-[60px] pt-8 px-4">
                <div className="w-full">
                    <h1 className="font-bold md:text-[32px] text-2xl">Dashboard</h1>
                    <div className="md:text-base text-[12px] text-primary-dark md:mb-12 mb-[30px]">Your hub for managing projects, bonds, and account activity.</div>
                    <SellerNotificationCards loading={loading} state={state} />
                    <div className="grid grid-cols-2 lg:grid-cols-5 mt-[30px] md:gap-[30px] gap-[30px] min-h-[420px]">
                        <div className=" lg:col-span-3 col-span-6 bg-white">
                            <SellerLineChartComponent />
                        </div>
                        <div className=" lg:col-span-2 col-span-6 bg-white ">
                            <SellerPieChartComponent state={state} loading={loading} />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-12 mt-[30px] gap-[30px]">
                        <div className=" lg:col-span-4 col-span-6">
                            <SellerHalfPieChartComponent state={state} loading={loading} />
                        </div>
                        <div className=" lg:col-span-8 col-span-6">
                            <SellerMissionStatsChart state={state} loading={loading} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="min-h-[100px] lg:mt-0 mt-10 text-primary-dark md:px-[60px] px-4 flex sm:flex-row flex-col items-center justify-between bg-white">
                <p className="text-[14px] lg:text-left text-center lg:pb-0 pb-7 lg:mt-0 mt-4">Copyright © Promise Bond 2024 | All Rights Reserved</p>
                <div className="flex items-center gap-x-5 md:w-auto w-full  md:order-1 -order-1 md:pt-0 pt-7">
                    <div className="border rounded px-2 border-[#E9E9E9] bg-white flex-1">
                        <select className="min-w-[111px] min-h-[40px] w-full bg-white focus:outline-none" name='currency'>
                            <option value="US$ USD">US$ USD</option>
                        </select>
                    </div>
                    <div className="border rounded px-2 bg-white border-[#E9E9E9] flex-1">
                        <select className="min-w-[111px] min-h-[40px] w-full focus:outline-none bg-white" name='language'>
                            <option value="english">English</option>
                        </select>
                    </div>
                </div>
            </div>
        </>
    )
}