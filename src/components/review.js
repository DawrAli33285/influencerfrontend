import React, { useState } from "react";
import avatar from "../avatar.webp"
const reviewsData = [
  {
    name: "Emily",
    profession: "WordPress Developer",
    avatar: "https://via.placeholder.com/80",
    review: "Love the convenience of YourBank's mobile banking app. It allows me to stay on top of my finances and make transactions on the go. The app is user-friendly and secure, giving me peace of mind.",
  },
  {
    name: "Tod",
    profession: "UI/UX Designer",
    avatar: "https://via.placeholder.com/80",
    review: "The innovative solutions offered by YourBank have greatly improved my productivity. The intuitive design and powerful tools are exactly what I needed to stay ahead in my career.",
  },
  {
    name: "John",
    profession: "Marketing Manager",
    avatar: "https://via.placeholder.com/80",
    review: "The innovative solutions offered by YourBank have greatly improved my productivity. The intuitive design and powerful tools are exactly what I needed to stay ahead in my career.",
  },
  // Add more users if needed
];

export default function Reviews() {
  const [selectedReview, setSelectedReview] = useState(reviewsData[0]);

  return (
    <div className="flex flex-col gap-[40px] w-full px-[20px] py-[40px] xl:px-[40px]">
      {/* Selected Review Section */}
      <div className="w-full text-center justify-center items-center flex flex-col gap-[1px] lg:gap-[2rem]">
        <p className="font-bold xl:text-[2.38rem] text-[1.50rem]">
          Real <span className="font-normal text-[#1DBF73] ">Stories</span>,
          Real <span className="font-normal text-[#1DBF73] ">Impact</span>
        </p>
        <p className="lg:text-[0.94rem] text-[0.75rem]">
          Our issuers' success stories highlight the impact of our innovative solutions and dedicated service. Read what they have to say about partnering with others.
        </p>


        <p className="text-base text-center flex flex-col justify-center items-center gap-[1rem] min-h-[100px] lg:w-[50%] mx-auto font-bold leading-[30px] mt-[40px]">
          <svg className="w-[30px] h-[20px] sm:w-[40px] sm:h-[30px] md:w-[50px] md:h-[35px] lg:w-[60px] lg:h-[43px]" viewBox="0 0 60 43" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.837 42.3289C11.0327 42.3289 7.60876 40.8071 4.56528 37.7637C1.5218 34.6115 6.10352e-05 29.9919 6.10352e-05 23.905C6.10352e-05 16.9484 1.84789 11.2963 5.54354 6.94845C9.34789 2.49193 14.7283 0.263672 21.6848 0.263672C24.1848 0.263672 26.1414 0.42671 27.5544 0.752793V8.25279C26.0327 8.0354 24.0761 7.92671 21.6848 7.92671C17.9892 7.92671 15.0001 9.17671 12.7175 11.6767C10.5435 13.8506 9.29354 16.7311 8.96745 20.318C10.3805 18.5789 12.6631 17.7093 15.8153 17.7093C19.0761 17.7093 21.8479 18.8506 24.1305 21.1332C26.4131 23.3071 27.5544 26.1876 27.5544 29.7745C27.5544 33.4702 26.3588 36.5137 23.9675 38.905C21.5761 41.1876 18.5327 42.3289 14.837 42.3289ZM47.2827 42.3289C43.4783 42.3289 40.0544 40.8071 37.0109 37.7637C33.9674 34.6115 32.4457 29.9919 32.4457 23.905C32.4457 16.9484 34.2935 11.2963 37.9892 6.94845C41.7935 2.49193 47.174 0.263672 54.1305 0.263672C56.6305 0.263672 58.587 0.42671 60.0001 0.752793V8.25279C58.4783 8.0354 56.5218 7.92671 54.1305 7.92671C50.4348 7.92671 47.4457 9.17671 45.1631 11.6767C42.9892 13.8506 41.7392 16.7311 41.4131 20.318C42.8261 18.5789 45.1088 17.7093 48.2609 17.7093C51.5218 17.7093 54.2935 18.8506 56.5761 21.1332C58.8587 23.3071 60.0001 26.1876 60.0001 29.7745C60.0001 33.4702 58.8044 36.5137 56.4131 38.905C54.0218 41.1876 50.9783 42.3289 47.2827 42.3289Z" fill="#5BBB7B" />
          </svg>
          "{selectedReview.review}"
        </p>

      </div>

      {/* Users Section */}
      <div className="flex lg:flex-row flex-col w-full justify-start items-center gap-[20px] overflow-x-auto px-[10px] scrollbar-none md:justify-center">
        {reviewsData.map((user, index) => (
          <div

            key={index}
            className={`flex items-center gap-[20px] border rounded-[100px] p-[10px] w-[90%]  h-[4.5rem] cursor-pointer ${user.name === selectedReview.name ? "border-[#1DBF73]" : "border-none"
              }`}
            onClick={() => setSelectedReview(user)}
          >
            <img
              src={avatar}
              alt={user.name}
              className="w-[40px] h-[40px] rounded-full object-cover"
            />
            <div className="flex flex-col">
              <p className="lg:text-[1.25rem] text-[1rem] font-semibold">{user.name}</p>
              <p className="lg:text-[0.94rem] text-[0.75rem] text-[#404145]">{user.profession}</p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
