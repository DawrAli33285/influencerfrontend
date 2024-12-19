
import { MoonLoader } from 'react-spinners';
export default function SellerNotificationCards({ state, loading }) {
    const base_path_icon = "/assets/images/icons"
    const filterBondCount = (filterName) => {
        return state?.bondList?.filter(bond => bond?.status === filterName)?.length

    }


    return (
        <div className="w-full grid grid-cols-1 lg:grid-cols-4 mt-[30px] md:gap-[30px] gap-[10px]">

            {loading ? <div className='flex justify-center items-center'>
                <MoonLoader color="#6B33E3" size={100} />
            </div> : <>
                <div className="bg-white p-[20px] flex gap-[10px] rounded">
                    <div className="flex flex-col justify-between w-full">
                        <h1 className=" text-base text-primary-gray-500">Total Active Bonds</h1>
                        <div className='flex justify-between items-center'>
                            <h2 className="text-[18px] font-bold">{filterBondCount("IN PROGRESS")}</h2>
                            <img src={`${base_path_icon}/icon14.svg`} alt="icon" width={58} />

                        </div>
                        <div className='text-[14px] text-[#F21212BF]'>Dropped by: 0.2%</div>
                    </div>
                </div>
                <div className="bg-white p-[20px] flex gap-[10px] rounded ">
                    <div className="flex flex-col justify-between w-full">
                        <h1 className="text-[16px] text-[#344054]">Status</h1>
                        <div className='flex justify-between items-end'>
                            <h2 className="text-[18px] font-bold">{filterBondCount("IN PROGRESS")}% Sold</h2>
                            <img src={`${base_path_icon}/icon14.svg`} alt="icon" width={58} />
                        </div>
                        <div className='text-[14px] text-[#5BBB7BBF]'>Increased by: 1.2%</div>
                    </div>
                </div>
                <div className="bg-white p-[20px] flex gap-[10px] rounded ">

                    <div className="flex flex-col justify-between w-full">
                        <h1 className="text-[16px] text-[#344054]">Total Review</h1>
                        <div className='flex justify-between items-end'>
                            <h2 className="text-[18px] font-bold">{filterBondCount("Bond for Sale")}</h2>
                            <img src={`${base_path_icon}/icon14.svg`} alt="icon" width={58} />
                        </div>
                        <div className='text-[14px] text-[#5BBB7BBF]'>Increased by: 1.2%</div>
                    </div>
                </div>
                <div className="bg-white p-[20px] flex gap-[10px] rounded ">

                    <div className="flex flex-col justify-between w-full">
                        <h1 className="text-[16px] text-[#344054]">Total Value</h1>
                        <div className='flex justify-between items-end'>
                            <h2 className="text-[18px] font-bold">{filterBondCount("Bond for Sale")}</h2>
                            <img src={`${base_path_icon}/icon14.svg`} alt="icon" width={58} />
                        </div>
                        <div className='text-[14px] text-[#5BBB7BBF]'>Increased by: 1.2%</div>
                    </div>
                </div>
            </>}
        </div >
    )
}