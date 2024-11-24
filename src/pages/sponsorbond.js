import BondListingTable from "../components/bondlistingtable";

export default function SponsorBond() {
    return (
        <div className="h-[100vh]">
            <div className="w-full ] overflow-x-auto bg-white rounded-[20px] mt-[20px] px-[20px] py-[40px]">
                <BondListingTable />
            </div>
        </div>
    )
}