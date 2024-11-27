import { Link } from "react-router-dom";

export default function Invoice() {
    return (
        <div className="w-full flex-col">
            <div className='flex flex-col'>
                <h1 className="text-[24px] font-semibold">Billing & Payment settings</h1>
                <p className='text-[18px]'>Customise settings for billing and payments</p>
            </div>
            <div className="px-[30px] py-[40px]">
                <div className="bg-[#1DBF73] flex flex-col lg:flex-row lg:justify-between rounded-[20px] px-[20px] py-[30px]">
                    <div className="flex flex-col">
                        <h2 className="text-white text-[1rem] font-bold">Add Funds Easily</h2>
                        <p className="text-white text-[.8rem]">Recharge your account balance to ensure seamless purchases and transactions.</p>
                    </div>
                    <div className="flex flex-col lg:flex-row gap-[20px] items-center">

                        <button class="bg-black px-[20px] py-[10px] xl:text-[1rem] text-[.8rem] text-white font-bold rounded-[1.4rem]">
                            Top up balance
                        </button>
                    </div>
                </div>
            </div>
            <div className="grid lg:grid-cols-3 grid-cols-1 lg:gap-[3rem] gap-[20px]">
                <div className="flex flex-col items-center">
                    <h1 className="lg:text-[3rem] text-[1.5rem]">$16,678.00</h1>
                    <h1 className="text-[#1C1C1CA3]">Account Balance</h1>
                    <button class="bg-black mt-[20px] px-[50px] py-[10px] xl:text-[1rem] text-[.8rem] text-white font-bold rounded-[1.4rem]">
                        Request Pay Out
                    </button>
                </div>
                <div className="flex flex-col">
                    <div className="justify-between flex items-center w-full">
                        <h1 className="font-bold">Payment Methods</h1>
                        <Link to="/" className="text-[#1DBF73] underline">Edit Card</Link>

                    </div>
                    <div className="mt-[4rem]">
                        <svg width="72" height="54" viewBox="0 0 72 54" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g filter="url(#filter0_d_263_1802)">
                                <rect x="7.41667" y="7.41667" width="57.5" height="39.1667" rx="4.58333" fill="white" stroke="#D9D9D9" stroke-width="0.833333" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M36.5821 35.5948C34.5961 37.3086 32.02 38.3432 29.205 38.3432C22.9239 38.3432 17.832 33.1923 17.832 26.8382C17.832 20.4842 22.9239 15.3333 29.205 15.3333C32.02 15.3333 34.5961 16.3679 36.5821 18.0817C38.5681 16.3679 41.1442 15.3333 43.9592 15.3333C50.2403 15.3333 55.3322 20.4842 55.3322 26.8382C55.3322 33.1923 50.2403 38.3432 43.9592 38.3432C41.1442 38.3432 38.5681 37.3086 36.5821 35.5948Z" fill="#ED0006" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M36.582 35.5948C39.0273 33.4845 40.5779 30.3446 40.5779 26.8382C40.5779 23.3319 39.0273 20.1919 36.582 18.0817C38.568 16.3679 41.1441 15.3333 43.9591 15.3333C50.2403 15.3333 55.3321 20.4842 55.3321 26.8382C55.3321 33.1923 50.2403 38.3432 43.9591 38.3432C41.1441 38.3432 38.568 37.3086 36.582 35.5948Z" fill="#F9A000" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M36.5818 35.5947C39.0271 33.4845 40.5776 30.3445 40.5776 26.8382C40.5776 23.3319 39.0271 20.1919 36.5818 18.0817C34.1365 20.1919 32.5859 23.3319 32.5859 26.8382C32.5859 30.3445 34.1365 33.4845 36.5818 35.5947Z" fill="#FF5E00" />
                            </g>
                            <defs>
                                <filter id="filter0_d_263_1802" x="0.700788" y="0.700788" width="70.9324" height="52.5984" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                    <feOffset />
                                    <feGaussianBlur stdDeviation="3.14961" />
                                    <feComposite in2="hardAlpha" operator="out" />
                                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.07 0" />
                                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_263_1802" />
                                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_263_1802" result="shape" />
                                </filter>
                            </defs>
                        </svg>
                    </div>
                    <h2 className="font-bold mt-[10px]">6594-5245-2541-235</h2>
                    <div className="justify-between flex items-center w-full">
                        <h1 className="text-[#717171]">01/12</h1>
                        <span className=" cursor-pointer">
                            <svg width="18" height="6" viewBox="0 0 18 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.83691 0.258789H2.77344L2.6709 2.6582H1.93945L1.83691 0.258789ZM1.83691 5.05078L1.93945 2.6582H2.6709L2.77344 5.05078H1.83691ZM-0.00195312 1.81738L0.462891 1.09277L2.48633 2.37109L2.11719 2.93848L-0.00195312 1.81738ZM4.60547 1.81738L2.48633 2.93848L2.11719 2.37109L4.14062 1.09277L4.60547 1.81738ZM4.60547 3.49219L4.14062 4.2168L2.11719 2.93848L2.48633 2.37109L4.60547 3.49219ZM-0.00195312 3.49219L2.11719 2.37109L2.48633 2.93848L0.462891 4.2168L-0.00195312 3.49219ZM8.44043 0.258789H9.37695L9.27441 2.6582H8.54297L8.44043 0.258789ZM8.44043 5.05078L8.54297 2.6582H9.27441L9.37695 5.05078H8.44043ZM6.60156 1.81738L7.06641 1.09277L9.08984 2.37109L8.7207 2.93848L6.60156 1.81738ZM11.209 1.81738L9.08984 2.93848L8.7207 2.37109L10.7441 1.09277L11.209 1.81738ZM11.209 3.49219L10.7441 4.2168L8.7207 2.93848L9.08984 2.37109L11.209 3.49219ZM6.60156 3.49219L8.7207 2.37109L9.08984 2.93848L7.06641 4.2168L6.60156 3.49219ZM15.0439 0.258789H15.9805L15.8779 2.6582H15.1465L15.0439 0.258789ZM15.0439 5.05078L15.1465 2.6582H15.8779L15.9805 5.05078H15.0439ZM13.2051 1.81738L13.6699 1.09277L15.6934 2.37109L15.3242 2.93848L13.2051 1.81738ZM17.8125 1.81738L15.6934 2.93848L15.3242 2.37109L17.3477 1.09277L17.8125 1.81738ZM17.8125 3.49219L17.3477 4.2168L15.3242 2.93848L15.6934 2.37109L17.8125 3.49219ZM13.2051 3.49219L15.3242 2.37109L15.6934 2.93848L13.6699 4.2168L13.2051 3.49219Z" fill="#717171" />
                            </svg>

                        </span>

                    </div>
                </div>
                <div className="flex flex-col">
                    <div className="justify-between flex items-center w-full">
                        <h1 className="font-bold">Billing Address</h1>
                        <Link to="/" className="text-[#1DBF73] underline">Edit</Link>

                    </div>


                    <div className="flex flex-col gap-[6px] mt-[8rem]">
                        <h1 className="font-bold">Current Account</h1>
                        <h1 className="text-[#717171]">300 Post St, Refero Design, San Francisco, 94108-4902, CA</h1>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-[40px] mt-[5rem]">
                <div className="flex lg:justify-between w-full lg:flex-row flex-col">
                    <div className="flex flex-col gap-[10px]">
                        <h1 className="font-bold">Monitor Your Payment Requests</h1>
                        <h1 className="text-[#717171]">Track the status of your payout requests and receive updates on their progress.</h1>
                    </div>
                    <button class="bg-[#F5BD4E14]  px-[30px] py-[10px] xl:text-[1rem] text-[.8rem] text-[#F5BD4E] font-bold rounded-[1.4rem]">
                        Pending
                    </button>
                </div>
                <div className="flex lg:justify-between w-full lg:flex-row flex-col">
                    <div className="flex flex-col gap-[10px]">
                        <h1 className="font-bold">Understand Your Costs</h1>
                        <h1 className="text-[#717171]">View detailed breakdowns of service and transaction fees for complete transparency.</h1>
                    </div>
                    <button class="bg-black lg:mt-[0] mt-[20px]  px-[30px] py-[10px] xl:text-[1rem] text-[.8rem] text-white font-bold rounded-[1.4rem]">
                        Free Overview
                    </button>
                </div>
            </div>
        </div>
    )
}