import { Link } from "react-router-dom";
import img from "../explore4.png";
import scnd from "../imagerst.png"
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';

import { MoonLoader } from 'react-spinners';
import third from "../signuppage.jpeg"
import { BASE_URL } from "../baseURL";
import { Navigation } from 'swiper/modules';
export default function TopIssuers({ loading, state, setState }) {

    return (
        <div className="w-full flex flex-col gap-[40px] px-[20px] py-[40px] xl:px-[40px]">
            <div className="flex items-center gap-[10px] flex-col">
                <p className="font-bold xl:text-[1.5rem] text-[1.3rem]">
                    Meet Our  <span className="font-normal text-[#1DBF73] italic">Top Issuers.</span>
                </p>
                <p className="text-[1rem] text-center lg:w-[70%] mx-auto">Discover the trusted issuers that power our platform, offering unmatched reliability and experties.Explore their unique features and benefits to find the perfect fit for your need</p>
            </div>
            <div>
                {loading ? (
                    <div className="flex justify-center items-center">
                        <MoonLoader color="#6B33E3" size={100} />
                    </div>
                ) : !state?.issuers?.length > 0 ? (
                    <div className="flex justify-center items-center">
                        <p>No record found</p>
                    </div>
                ) : (
                    <div className="relative">
                        <Swiper
                            navigation={{
                                nextEl: ".custom-next",
                                prevEl: ".custom-prev",
                            }}
                            modules={[Navigation]}
                            className="mySwiper"
                            slidesPerView={4}
                            spaceBetween={20}
                            breakpoints={{
                                1024: {
                                    slidesPerView: 4,
                                },
                                768: {
                                    slidesPerView: 2,
                                },
                                640: {
                                    slidesPerView: 1,
                                },
                            }}
                        >
                            {state?.issuers?.map((val) => (
                                <SwiperSlide>
                                    <div key={val?._id} className="p-2">
                                        <div className="bg-white flex flex-col gap-[20px] rounded-[20px] relative">
                                            <img
                                                src={
                                                    val?.user_id?.avatar
                                                        ? val.user_id.avatar.replace("http://localhost:5000", BASE_URL)
                                                        : img
                                                }
                                                alt="cardimg"
                                                className="rounded-[10px] w-full h-[400px]"
                                            />
                                            <div className="absolute bg-[#0000003d] p-[20px] w-full h-full flex flex-col gap-[20px] rounded-[20px] justify-end">
                                                <p className="text-white text-base font-bold">{val?.user_id?.username}</p>
                                                <p className="text-[1rem] font-bold text-[#74767E]">
                                                    {val?.bonds[0]?.missions[0]?.task_type}
                                                </p>
                                                <span className="text-[1rem] font-bold text-base text-white">
                                                    {val?.bonds?.length} Bonds Issued | Level 13
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                        <div className="absolute top-1/2 -left-6 transform -translate-y-1/2 bg-white text-black rounded-full w-10 h-10 flex items-center justify-center shadow cursor-pointer custom-prev z-10">
                            <svg width="9" height="15" viewBox="0 0 9 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.818725 8.00232L7.17851 14.3445C7.38688 14.5522 7.72424 14.5518 7.93226 14.3434C8.14012 14.1351 8.13958 13.7975 7.93118 13.5897L1.94995 7.62498L7.9314 1.6603C8.13977 1.45244 8.14031 1.11511 7.93247 0.906712C7.82819 0.802244 7.69158 0.75001 7.55497 0.75001C7.4187 0.75001 7.28263 0.801895 7.17854 0.905638L0.818725 7.24766C0.718367 7.34751 0.662051 7.4834 0.662051 7.62498C0.662051 7.76656 0.718528 7.90229 0.818725 8.00232Z" fill="#051036" />
                            </svg>

                        </div>
                        <div className="absolute top-1/2 -right-6 transform -translate-y-1/2 bg-white text-black rounded-full w-10 h-10 flex items-center justify-center shadow cursor-pointer custom-next z-10">
                            <svg width="9" height="15" viewBox="0 0 9 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.18128 7.24768L1.82149 0.90549C1.61312 0.697817 1.27576 0.698166 1.06774 0.906564C0.859882 1.11493 0.860419 1.45248 1.06882 1.66031L7.05005 7.62502L1.0686 13.5897C0.860231 13.7976 0.859694 14.1349 1.06753 14.3433C1.17181 14.4478 1.30842 14.5 1.44503 14.5C1.5813 14.5 1.71737 14.4481 1.82147 14.3444L8.18128 8.00234C8.28163 7.90249 8.33795 7.7666 8.33795 7.62502C8.33795 7.48344 8.28147 7.34771 8.18128 7.24768Z" fill="#051036" />
                            </svg>

                        </div>
                    </div>
                )}
            </div>
            <Link to="/search?filter=issuer&search=" className="text-[#1DBF73] border-[#1DBF73] bg-[#1dbf7327] border rounded-[8px] w-fit px-[20px] py-[10px] mx-auto font-bold xl:text-[1rem] text-[.9rem]">View All Issuers</Link>

        </div>
    )
}