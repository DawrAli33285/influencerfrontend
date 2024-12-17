import MissionListingTable from "../components/missionlisting";

export default function Mission() {
    return (
        <div className="h-[100vh]">
            <div className="w-full ] overflow-x-auto bg-[#f2f2f2] rounded-[20px] mt-[20px] px-[20px] lg:py-[40px]">
                <MissionListingTable />
            </div>
        </div>
    )
}