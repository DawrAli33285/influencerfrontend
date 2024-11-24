
import { MoonLoader } from 'react-spinners';
export default function NotificationCards({state,loading}) {
const filterBondCount=(filterName)=>{
   return state?.bondList?.filter(bond=>bond?.status===filterName)?.length

}
const filterMissionCount=(filterName)=>{
    return state?.missionList?.filter(mission=>mission?.status===filterName)?.length
 
 }

    return (
<div className="w-full grid xl:grid-cols-3 md:grid-cols-2 h-fit grid-cols-1 gap-[10px]">

            {loading?<div className='flex justify-center items-center'>
            <MoonLoader color="#6B33E3" size={100} />
                </div>:<>
                <div className="bg-white rounded-[20px] p-[20px] flex gap-[10px] custom-inset-shadow">
                <div className="flex justify-center items-center p-[20px] rounded-[20px] bg-[#C0A3FC]">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4.16699 11.9054C2.62419 12.586 1.66699 13.5344 1.66699 14.5834C1.66699 16.6545 5.39795 18.3334 10.0003 18.3334C14.6027 18.3334 18.3337 16.6545 18.3337 14.5834C18.3337 13.5344 17.3765 12.586 15.8337 11.9054M15.0003 6.66675C15.0003 10.0532 11.2503 11.6667 10.0003 14.1667C8.75033 11.6667 5.00033 10.0532 5.00033 6.66675C5.00033 3.90532 7.2389 1.66675 10.0003 1.66675C12.7617 1.66675 15.0003 3.90532 15.0003 6.66675ZM10.8337 6.66675C10.8337 7.12699 10.4606 7.50008 10.0003 7.50008C9.54009 7.50008 9.16699 7.12699 9.16699 6.66675C9.16699 6.20651 9.54009 5.83341 10.0003 5.83341C10.4606 5.83341 10.8337 6.20651 10.8337 6.66675Z" stroke="#6B33E3" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </div>
                <div className="flex flex-col">
                    <h1 className="text-[16px] text-[#344054]">Pending</h1>
                    <h2 className="text-[18px] font-semibold">{filterBondCount("PENDING")}</h2>
                </div>
            </div>
            <div className="bg-white rounded-[20px] p-[20px] flex gap-[10px] custom-inset-shadow">
                <div className="flex justify-center items-center p-[20px] rounded-[20px] bg-[#C0A3FC]">
                    <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.99967 8.75L9.66634 10.4167L13.4163 6.66667M17.1663 17.5V6.5C17.1663 5.09987 17.1663 4.3998 16.8939 3.86502C16.6542 3.39462 16.2717 3.01217 15.8013 2.77248C15.2665 2.5 14.5665 2.5 13.1663 2.5H7.83301C6.43288 2.5 5.73281 2.5 5.19803 2.77248C4.72763 3.01217 4.34517 3.39462 4.10549 3.86502C3.83301 4.3998 3.83301 5.09987 3.83301 6.5V17.5L6.12467 15.8333L8.20801 17.5L10.4997 15.8333L12.7913 17.5L14.8747 15.8333L17.1663 17.5Z" stroke="#6B33E3" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>

                </div>
                <div className="flex flex-col">
                    <h1 className="text-[16px] text-[#344054]">Approved</h1>
                    <h2 className="text-[18px] font-semibold">{filterBondCount("APPROVED")}</h2>
                </div>
            </div>
            <div className="bg-white rounded-[20px] p-[20px] flex gap-[10px] custom-inset-shadow">
                <div className="flex justify-center items-center p-[20px] rounded-[20px] bg-[#C0A3FC]">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_254_5841)">
                            <path d="M13.2818 13.2815C16.1339 12.8997 18.3337 10.4568 18.3337 7.50008C18.3337 4.27842 15.722 1.66675 12.5003 1.66675C9.54364 1.66675 7.10073 3.86647 6.71888 6.71864M6.25033 10.8334L7.50033 10.0001V14.5834M6.25033 14.5834H8.75033M13.3337 12.5001C13.3337 15.7217 10.722 18.3334 7.50033 18.3334C4.27866 18.3334 1.66699 15.7217 1.66699 12.5001C1.66699 9.27842 4.27866 6.66675 7.50033 6.66675C10.722 6.66675 13.3337 9.27842 13.3337 12.5001Z" stroke="#6B33E3" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
                        </g>
                        <defs>
                            <clipPath id="clip0_254_5841">
                                <rect width="20" height="20" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>

                </div>
                <div className="flex flex-col">
                    <h1 className="text-[16px] text-[#344054]">Live</h1>
                    <h2 className="text-[18px] font-semibold">{filterBondCount("PENDING")}</h2>
                </div>
            </div>
            <div className="bg-white rounded-[20px] p-[20px] flex gap-[10px] custom-inset-shadow">
                <div className="flex justify-center items-center p-[20px] rounded-[20px] bg-[#C0A3FC]">
                    <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.6667 1.33325V14.6666M12.6667 14.6666L9.33333 11.3333M12.6667 14.6666L16 11.3333M4.33333 14.6666V1.33325M4.33333 1.33325L1 4.66659M4.33333 1.33325L7.66667 4.66659" stroke="#6B33E3" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>

                </div>
                <div className="flex flex-col">
                    <h1 className="text-[16px] text-[#344054]">Completed</h1>
                    <h2 className="text-[18px] font-semibold">{filterBondCount("COMPLETED")}</h2>
                </div>
            </div>
            <div className="bg-white rounded-[20px] p-[20px] flex gap-[10px] custom-inset-shadow">
                <div className="flex justify-center items-center p-[20px] rounded-[20px] bg-[#C0A3FC]">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4.16699 11.9054C2.62419 12.586 1.66699 13.5344 1.66699 14.5834C1.66699 16.6545 5.39795 18.3334 10.0003 18.3334C14.6027 18.3334 18.3337 16.6545 18.3337 14.5834C18.3337 13.5344 17.3765 12.586 15.8337 11.9054M15.0003 6.66675C15.0003 10.0532 11.2503 11.6667 10.0003 14.1667C8.75033 11.6667 5.00033 10.0532 5.00033 6.66675C5.00033 3.90532 7.2389 1.66675 10.0003 1.66675C12.7617 1.66675 15.0003 3.90532 15.0003 6.66675ZM10.8337 6.66675C10.8337 7.12699 10.4606 7.50008 10.0003 7.50008C9.54009 7.50008 9.16699 7.12699 9.16699 6.66675C9.16699 6.20651 9.54009 5.83341 10.0003 5.83341C10.4606 5.83341 10.8337 6.20651 10.8337 6.66675Z" stroke="#6B33E3" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </div>
                <div className="flex flex-col">
                    <h1 className="text-[16px] text-[#344054]">Pending Mission</h1>
                    <h2 className="text-[18px] font-semibold">{filterMissionCount("PENDING")}</h2>
                </div>
            </div>
            <div className="bg-white rounded-[20px] p-[20px] flex gap-[10px] custom-inset-shadow">
                <div className="flex justify-center items-center p-[20px] rounded-[20px] bg-[#C0A3FC]">
                    <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.99967 8.75L9.66634 10.4167L13.4163 6.66667M17.1663 17.5V6.5C17.1663 5.09987 17.1663 4.3998 16.8939 3.86502C16.6542 3.39462 16.2717 3.01217 15.8013 2.77248C15.2665 2.5 14.5665 2.5 13.1663 2.5H7.83301C6.43288 2.5 5.73281 2.5 5.19803 2.77248C4.72763 3.01217 4.34517 3.39462 4.10549 3.86502C3.83301 4.3998 3.83301 5.09987 3.83301 6.5V17.5L6.12467 15.8333L8.20801 17.5L10.4997 15.8333L12.7913 17.5L14.8747 15.8333L17.1663 17.5Z" stroke="#6B33E3" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>

                </div>
                <div className="flex flex-col">
                    <h1 className="text-[16px] text-[#344054]">Approved Mission</h1>
                    <h2 className="text-[18px] font-semibold">{filterMissionCount("APPROVED")}</h2>
                </div>
            </div>
            <div className="bg-white rounded-[20px] p-[20px] flex gap-[10px] custom-inset-shadow">
                <div className="flex justify-center items-center p-[20px] rounded-[20px] bg-[#C0A3FC]">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_254_5841)">
                            <path d="M13.2818 13.2815C16.1339 12.8997 18.3337 10.4568 18.3337 7.50008C18.3337 4.27842 15.722 1.66675 12.5003 1.66675C9.54364 1.66675 7.10073 3.86647 6.71888 6.71864M6.25033 10.8334L7.50033 10.0001V14.5834M6.25033 14.5834H8.75033M13.3337 12.5001C13.3337 15.7217 10.722 18.3334 7.50033 18.3334C4.27866 18.3334 1.66699 15.7217 1.66699 12.5001C1.66699 9.27842 4.27866 6.66675 7.50033 6.66675C10.722 6.66675 13.3337 9.27842 13.3337 12.5001Z" stroke="#6B33E3" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
                        </g>
                        <defs>
                            <clipPath id="clip0_254_5841">
                                <rect width="20" height="20" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>

                </div>
                <div className="flex flex-col">
                    <h1 className="text-[16px] text-[#344054]">Completed Mission</h1>
                    <h2 className="text-[18px] font-semibold">{filterMissionCount("COMPLETED")}</h2>
                </div>
            </div>

            </>}
        </div>
    )
}