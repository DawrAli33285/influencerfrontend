
import SellerBondListingTable from "../components/sellercomponents/sellerbondlisting";

export default function MyBond() {
    return (
        <div className="h-[130vh] ">
            <div className="w-full max-h-[900px]  overflow-y-auto overflow-x-auto bg-white rounded-[20px] mt-[20px] px-[20px] py-[40px]">
                <SellerBondListingTable />
            </div>
        </div>
    )
}