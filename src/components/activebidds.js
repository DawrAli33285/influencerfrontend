import { Link } from "react-router-dom";
import img from "../girl.png";
import scnd from "../girl2.png"
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import third from "../boy.png"
import { BASE_URL } from "../baseURL";
import { MoonLoader } from "react-spinners";
import { Navigation, Pagination } from 'swiper/modules';
export default function ActiveBids({ state, loading }) {
  return (
    <div className="w-full flex flex-col gap-[40px] px-[20px] py-[40px] xl:px-[40px]">
      {loading ? <div className='flex flex-col'>
        <p className="font-bold xl:text-[2.38rem] text-[1.50rem]">
          <span className="xl:text-[2.38rem] text-[#1DBF73]">Active Bids </span>
          in the Marketplace.
        </p>
        <div className="flex justify-between">
          <p className="font-bold xl:text-[1.5rem] text-[1.3rem]">


          </p>
          <Link to="/search?filter=bond&search=" className="text-[#1DBF73] font-bold lg:text-[0.94rem] text-[0.75rem]">Explore The Market</Link>
        </div>
        <MoonLoader color="#6B33E3" size={100} />
      </div> : <>
        <div className="flex   flex-col">
          <p className="font-bold xl:text-[2.38rem] text-[32px]">
            <span className=" text-[#1DBF73]">Active Bids </span>
            in the Marketplace.
          </p>
          <p className="lg:text-[0.94rem] text-[0.75rem]  lg:w-[50%]">Browse and manage your active bids in the marketplace, keeping track of ongoing opportunities. Stay updated on your potential projects and their status in real time.</p>

        </div>
        <div className="w-full">
          {state?.market?.length > 0 ? state?.market?.map((val, i) => {
            return (
              <div className="relative">
                <Swiper
                  modules={[Navigation, Pagination]}
                  slidesPerView={1}
                  spaceBetween={20}
                  pagination={{
                    clickable: true,
                    renderBullet: (index, className) => {
                      return `<span class="${className} w-[8px] h-[8px] rounded-full inline-block ${index === Swiper.activeIndex ? "bg-black" : "bg-[#C0C0C0]"
                        }"></span>`;
                    },
                  }}
                  navigation={{
                    nextEl: ".swiper-button-bid-next",
                    prevEl: ".swiper-button-bid-prev",
                  }}
                  breakpoints={{
                    640: {
                      slidesPerView: 1,
                    },
                    768: {
                      slidesPerView: 2,
                    },
                    1024: {
                      slidesPerView: 4,
                    },
                  }}
                >
                  {state?.market?.length > 0 ? (
                    state.market.map((val, i) => (
                      <SwiperSlide key={i}>
                        <div className=" bg-[#FADADD4D]  flex flex-col gap-[17px] rounded-[20px] relative">
                          <img
                            src={val?.photos[0]
                              ? val.photos[0].replace("http://localhost:5000", BASE_URL)
                              : img}
                            alt="cardimg"
                            className="rounded-tl-[20px] rounded-tr-[20px] w-full h-[250px] object-cover"
                          />
                          <div className=" px-[30px] shadow-lg w-full h-full pb-[20px] flex flex-col gap-[10px] rounded-bl-[20px] rounded-br-[20px] justify-end">
                            <p className="text-black lg:text-[1.063rem] w-full overflow-hidden text-[1rem] font-medium">
                              {val?.issuer_id?.user_id?.username}
                            </p>
                            <p className="lg:text-[0.88rem] w-full overflow-hidden text-[0.75rem] text-black">
                              {val?.missions?.length > 0
                                ? val?.missions[0]?.description?.slice(0, 50) + "..."
                                : `No mission`}
                            </p>
                            <span className="lg:text-[1.13rem] text-[1rem] font-medium text-black">
                              ${val?.bond_issuerance_amount}
                            </span>
                          </div>
                        </div>
                      </SwiperSlide>
                    ))
                  ) : (
                    <SwiperSlide>
                      <div className="flex w-full justify-center items-center text-center">
                        <p>No Record Found</p>
                      </div>
                    </SwiperSlide>
                  )}
                </Swiper>
                {/* Navigation Arrows */}
                <div className="swiper-button-bid-prev left-0 text-black"></div>
                <div className="swiper-button-bid-next right-0 text-black"></div>

              </div>
            );
          }) : (
            <div className="flex w-full justify-center items-center text-center">
              <p>No Record Found</p>
            </div>
          )}
        </div>

        <Link to="/search?filter=bond&search=" className="bg-white border border-black px-[20px] py-[10px] xl:py-[11px] lg:text-[0.94rem] text-[0.75rem] flex gap-[12px] items-center text-black font-bold rounded-[3.75rem] w-fit   mx-auto">
          Explore The Market
          <svg className="md:w-[16px] md:h-[17px] w-[11px] h-[11px]" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.5553 0.101562H5.77756C5.53189 0.101562 5.3331 0.300354 5.3331 0.546021C5.3331 0.791687 5.53189 0.990479 5.77756 0.990479H14.4824L0.129975 15.3429C-0.0436504 15.5165 -0.0436504 15.7978 0.129975 15.9714C0.216766 16.0581 0.330516 16.1016 0.444225 16.1016C0.557933 16.1016 0.671641 16.0581 0.758475 15.9714L15.1109 1.61894V10.3238C15.1109 10.5695 15.3097 10.7683 15.5553 10.7683C15.801 10.7683 15.9998 10.5695 15.9998 10.3238V0.546021C15.9998 0.300354 15.801 0.101562 15.5553 0.101562Z" fill="black" />
          </svg>
        </Link>

      </>}

    </div >
  )
}