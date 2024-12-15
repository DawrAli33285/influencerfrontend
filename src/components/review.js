import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import avatar from "../avatar.webp";
import { Navigation } from "swiper/modules";

const reviewsData = [
  {
    name: "Emily",
    profession: "WordPress Developer",
    avatar: "https://via.placeholder.com/80",
    review:
      "Love the convenience of YourBank's mobile banking app. It allows me to stay on top of my finances and make transactions on the go. The app is user-friendly and secure, giving me peace of mind.",
  },
  {
    name: "Tod",
    profession: "UI/UX Designer",
    avatar: "https://via.placeholder.com/80",
    review:
      "The innovative solutions offered by YourBank have greatly improved my productivity. The intuitive design and powerful tools are exactly what I needed to stay ahead in my career.",
  },
  {
    name: "John",
    profession: "Marketing Manager",
    avatar: "https://via.placeholder.com/80",
    review:
      "The innovative solutions offered by YourBank have greatly improved my productivity. The intuitive design and powerful tools are exactly what I needed to stay ahead in my career.",
  },
];

export default function Reviews() {
  const [activeSlide, setActiveSlide] = useState(0);

  return (
    <div className="flex flex-col bg-[#1dbf7321] lg:flex-row lg:h-[650px] gap-[40px] justify-between w-full px-[20px] py-[40px] xl:px-[12rem]">
      <div className="w-full lg:w-[50%] justify-center items-start flex flex-col gap-[1rem] lg:gap-[2rem]">
        <p className="font-bold xl:text-[2.38rem] text-[1.50rem]">
          Real <span className=" text-[#1DBF73]">Stories</span> Real{" "}
          <span className=" text-[#1DBF73]">Impact</span>
        </p>
        <p className="lg:text-[0.94rem] text-[0.75rem]">
          Our issuers' success stories highlight the impact of our innovative
          solutions and dedicated service. Read what they have to say about
          partnering with others.
        </p>
        <div className="grid lg:grid-cols-3 grid-cols-1 gap-[20px]">
          <div className="flex flex-col gap-[10px]">
            <p className="font-bold xl:text-[2rem] text-[1.50rem]">
              4.9/5
            </p>
            <p className="lg:text-[0.94rem] text-[0.75rem]">
              Clients rate professionals on Promise Bond
            </p>
          </div>
          <div className="flex flex-col gap-[10px]">
            <p className="font-bold xl:text-[2rem] text-[1.50rem]">
              95%
            </p>
            <p className="lg:text-[0.94rem] text-[0.75rem]">
              95% of customers are satisfied through to see their freelancers
            </p>
          </div>
          <div className="flex flex-col gap-[10px]">
            <p className="font-bold xl:text-[2rem] text-[1.50rem]">
              Award winner
            </p>
            <p className="lg:text-[0.94rem] text-[0.75rem]">
              G2’s 2023 Best Software Awards
            </p>
          </div>
        </div>
      </div>

      <div className="lg:w-[430px] flex flex-col gap-[10px] justify-center">
        <Swiper
          modules={[Navigation]}
          navigation={{
            prevEl: ".custom-prev",
            nextEl: ".custom-next",
          }}
          slidesPerView={1}
          spaceBetween={30}
          onSlideChange={(swiper) => setActiveSlide(swiper.activeIndex)}
          className="custom-swiper-container w-full"
        >
          {reviewsData.map((user, index) => (
            <SwiperSlide
              key={index}
              className="custom-swiper-slide flex flex-col bg-white rounded-[20px] px-[40px] pt-[40px] pb-[30px]"
            >
              <div className="mb-4">
                <p className="text-[#1DBF73] text-xl font-bold">Great Work</p>
                <p className="text-xl mt-4 leading-[30px]">{user.review}</p>
              </div>
              <div className="flex items-center gap-[20px] mt-6">
                <img
                  src={avatar}
                  alt={user.name}
                  className="w-[40px] h-[40px] rounded-full object-cover"
                />
                <div className="flex flex-col">
                  <p className="lg:text-[0.94rem] text-[1rem] font-semibold">
                    {user.name}
                  </p>
                  <p className="lg:text-[0.94rem] text-[0.75rem] text-[#404145]">
                    {user.profession}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="flex justify-center items-center mt-6 gap-[16px]">
          <button className="custom-prev rotate-180  rounded-full w-[30px] h-[30px] flex justify-center items-center"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.43 5.92999L20.5 12L14.43 18.07" stroke="#222222" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M3.5 12H20.33" stroke="#222222" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          </button>
          <div className="flex gap-[8px]">
            {reviewsData.map((_, index) => (
              <div
                key={index}
                className={`w-[8px] h-[8px] rounded-full ${index === activeSlide ? "bg-black" : "bg-[#C0C0C0]"
                  }`}
              ></div>
            ))}
          </div>
          <button className="custom-next  rounded-full w-[30px] h-[30px] flex justify-center items-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14.43 5.92999L20.5 12L14.43 18.07" stroke="#222222" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M3.5 12H20.33" stroke="#222222" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
            </svg>

          </button>
        </div>
      </div>
    </div>
  );
}
