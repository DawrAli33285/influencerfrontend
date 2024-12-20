import { useEffect, useState } from "react";
import BondListingTable from "../components/bondlistingtable";
import MissionListingTable from "../components/missionlisting";
import NotificationCards from "../components/notificationcards";
import BondAnalyticsChart from "../components/splinechart";
import { MoonLoader } from 'react-spinners';
import UserInfo from "../components/userinfo";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { BASE_URL } from "../baseURL";
import LineChartComponent from "../components/linechartcomponent";
import PieChartComponent from "../components/cirlcrchart";
import HalfPieChartComponent from "../components/halfchart";
import MissionStatsChart from "../components/multilinechart";


export default function Dashboard() {
    const [state, setState] = useState()
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        fetchDashboardData();
    }, [])
    const fetchDashboardData = async () => {
        try {
            let token = localStorage.getItem('token')
            let headers = {
                headers: {
                    authorization: `Bearer ${token}`
                }
            }
            let response = await axios.get(`${BASE_URL}/get-dashboardData`, headers)
            console.log("response")
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
            <div className="w-full  flex  flex-col">
                <div className="w-full  flex gap-[20px] flex-col">
                    {loading ? <div className="w-full flex min-h-[700px] justify-center items-center">

                        <MoonLoader color="#6B33E3" size={100} />
                    </div> : <>
                        <NotificationCards loading={loading} state={state} />
                        <div className="grid grid-cols-1 lg:grid-cols-5">
                            <div className=" lg:col-span-3">
                                <LineChartComponent lineGraphData={state?.lineGraphData} state={state} />
                            </div>
                            <div className=" lg:col-span-2">
                                <PieChartComponent state={state} />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-5">
                            <div className=" lg:col-span-2">
                                <HalfPieChartComponent />
                            </div>
                            <div className=" lg:col-span-3">
                                <MissionStatsChart state={state} />
                            </div>
                        </div>

                    </>}

                </div>

            </div>
        </>
    )
}