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
      <div className="w-full text-center">
        <p className="font-bold xl:text-[1.5rem] text-[1.3rem]">
          Real <span className="font-normal text-[#1DBF73] italic">Stories</span>, 
          Real <span className="font-normal text-[#1DBF73] italic">Impact</span>
        </p>
        <p className="text-base text-center lg:w-[50%] mx-auto font-bold leading-[30px] mt-[40px]">
          "{selectedReview.review}"
        </p>
       
      </div>

      {/* Users Section */}
      <div className="flex justify-center flex-row gap-[20px] items-center">
        {reviewsData.map((user, index) => (
          <div
            key={index}
            className={`flex items-center gap-[20px] border  rounded-[100px] p-[10px] w-full max-w-[330px] h-[4.5rem] cursor-pointer ${
              user.name === selectedReview.name ? "border-[#1DBF73]" : "border-none"
            }`}
            onClick={() => setSelectedReview(user)}
          >
            <img
              src={avatar}
              alt={user.name}
              className="w-[40px] h-[40px] rounded-full object-cover"
            />
            <div className="flex flex-col">
              <p className=" text-lg font-semibold">{user.name}</p>
              <p className="text-sm text-[#404145]">{user.profession}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
