import avatar from "../../avatar.webp"
import { MoonLoader } from 'react-spinners';
export default function SellerUserInfo({ state, loading }) {
    return (
        <div className="flex flex-col gap-[40px] h-[fit-content]  w-full">
            {loading ? <div className='flex justify-center items-center'>
                <MoonLoader color="#6B33E3" size={100} />
            </div> : <>
                <div className="flex items-center gap-[20px] mx-auto">
                    <div className="rounded-[100%] w-[80px] h-[80px]">
                        <img src={avatar} alt="img" className="w-full h-full object-cover rounded-[100%]" />
                    </div>
                    <div className="flex flex-col">
                        <h1 className="text-[20px] font-semibold">User</h1>
                        <h1 className="text-[20px] font-semibold">{state?.user?.username}</h1>
                        <h2 className="text-[18px] text-[#344054] ">Buyer</h2>
                    </div>
                </div>
            
                <div className="flex flex-col">
                    <h1 className="text-[20px] text-[#344054] font-semibold">Email</h1>
                    
                    <h2 className="text-[18px]">{state?.user?.email}</h2>
                </div>
                <div className="flex flex-col">
                    <h1 className="text-[20px] text-[#344054] font-semibold">Phone Number</h1>
                    <h2 className="text-[18px]">+923356896251</h2>
                </div>
                <div className="flex flex-col">
                    <h1 className="text-[20px] text-[#344054] font-semibold">Location</h1>
                    <h2 className="text-[18px]">California,USA</h2>
                    <h2 className="text-[18px]">{state?.user?.country_code_id?.country_code + state?.user?.mobile_number}</h2>
                </div>

            </>}

        </div>
    )
}
