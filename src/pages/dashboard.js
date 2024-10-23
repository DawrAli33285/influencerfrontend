import BondListingTable from "../components/bondlistingtable";
import MissionListingTable from "../components/missionlisting";
import NotificationCards from "../components/notificationcards";
import BondAnalyticsChart from "../components/splinechart";
import UserInfo from "../components/userinfo";

export default function Dashboard() {
    return (
        <div className="w-full  flex  flex-col">
            <div className="w-full  flex xl:flex-row gap-[20px] flex-col-reverse">
                <div className="w-full xl:w-[75%] flex flex-col gap-[20px] xl:justify-between">
                    <NotificationCards />
                    <BondAnalyticsChart />
                </div>
                <div className="w-full xl:w-[25%] px-[20px] py-[40px] bg-white rounded-[20px]">
                    <UserInfo />
                </div>
            </div>
            <div className="w-full overflow-x-auto bg-white rounded-[20px] mt-[40px] px-[20px] py-[40px]">
                    <BondListingTable />
            </div>
            <div className="w-full overflow-x-auto bg-white rounded-[20px] mt-[40px] px-[20px] py-[40px]">
                    <MissionListingTable />
            </div>
        </div>
    )
}