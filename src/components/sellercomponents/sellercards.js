
import { MoonLoader } from 'react-spinners';
export default function SellerNotificationCards({ state, loading }) {
    const filterBondCount = (filterName) => {
        return state?.bondList?.filter(bond => bond?.status === filterName)?.length

    }


    return (
        <div className="w-full grid xl:grid-cols-3 md:grid-cols-2 h-fit grid-cols-1 gap-[10px]">

            {loading ? <div className='flex justify-center items-center'>
                <MoonLoader color="#6B33E3" size={100} />
            </div> : <>
                <div className="bg-[#0E1E6C14] rounded-[20px] p-[20px] flex gap-[10px]">

                    <div className="flex flex-col justify-between w-full">
                        <h1 className="text-[16px] text-[#344054]">Bonds Owned </h1>
                        <div className='flex justify-between items-end'>
                            <h2 className="text-[18px] font-semibold">{filterBondCount("IN PROGRESS")}</h2>
                            
                        </div>
                    </div>
                </div>
                <div className="bg-[#0E486C14] rounded-[20px] p-[20px] flex gap-[10px] ">
                    <div className="flex flex-col justify-between w-full">
                        <h1 className="text-[16px] text-[#344054]">In Progress</h1>
                        <div className='flex justify-between items-end'>
                            <h2 className="text-[18px] font-semibold">{filterBondCount("IN PROGRESS")}</h2>
                           
                        </div>
                    </div>
                </div>
                <div className="bg-[#3B0E6C14] rounded-[20px] p-[20px] flex gap-[10px] ">

                    <div className="flex flex-col justify-between w-full">
                        <h1 className="text-[16px] text-[#344054]">Bond for Sale</h1>
                        <div className='flex justify-between items-end'>
                            <h2 className="text-[18px] font-semibold">{filterBondCount("Bond for Sale")}</h2>
                           
                        </div>

                    </div>
                </div>


            </>}
        </div >
    )
}