import { Link } from "react-router-dom";
import exploreone from "../explore1.png";
import exploretwo from "../explore2.png";
import explorethree from "../explore3.png";
import explorefour from "../explore4.png";
export default function ExploreBond() {
    return (
        <div className="w-full flex flex-col gap-[40px] px-[20px] py-[40px] xl:px-[40px]">
            <div className="flex justify-between">
                <p className="font-bold xl:text-[1.5rem] text-[1.3rem]">
                    Explore Trending <span className="font-normal text-[#1DBF73] italic">Promise Bonds.</span>
                </p>
                <Link to="/" className="text-[#1DBF73] font-bold xl:text-[1.5rem] text-[1.3rem]">View All Promise Bond</Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[10px]">
                <div className="bg-white p-[20px] flex flex-col gap-[20px] rounded-[20px]">
                    <img src={exploreone} alt="cardimg" className="rounded-[10px]" />
                    <div className="flex justify-between">
                        <div className="flex gap-[10px] font-bold">
                            <img src="https://png.pngitem.com/pimgs/s/22-223925_female-avatar-female-avatar-no-face-hd-png.png" alt="avatar" className="w-[24px] h-[24px] rounded-full" />
                            Anne Smith
                        </div>
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFWrR5v9UFxMrG0lwAPuJwNMY_YlOgG7f7lA&s" alt="avatar" className="w-[24px] h-[24px] rounded-full" />

                    </div>
                    <p className="text-[1rem] text-[#74767E]">I'll create a personalized marketing strategy for your small business.</p>
                    <span className="text-[1rem] font-bold">$200. Marketing</span>
                </div>
                <div className="bg-white p-[20px] flex flex-col gap-[20px] rounded-[20px]">
                    <img src={exploretwo} alt="cardimg" className="rounded-[10px]" />
                    <div className="flex justify-between">
                        <div className="flex gap-[10px] font-bold">
                            <img src="https://png.pngitem.com/pimgs/s/22-223925_female-avatar-female-avatar-no-face-hd-png.png" alt="avatar" className="w-[24px] h-[24px] rounded-full" />
                            Anne Smith
                        </div>
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFWrR5v9UFxMrG0lwAPuJwNMY_YlOgG7f7lA&s" alt="avatar" className="w-[24px] h-[24px] rounded-full" />

                    </div>
                    <p className="text-[1rem] text-[#74767E]">I'll create a personalized marketing strategy for your small business.</p>
                    <span className="text-[1rem] font-bold">$200. Marketing</span>
                </div>
                <div className="bg-white p-[20px] flex flex-col gap-[20px] rounded-[20px]">
                    <img src={explorethree} alt="cardimg" className="rounded-[10px]" />
                    <div className="flex justify-between">
                        <div className="flex gap-[10px] font-bold">
                            <img src="https://png.pngitem.com/pimgs/s/22-223925_female-avatar-female-avatar-no-face-hd-png.png" alt="avatar" className="w-[24px] h-[24px] rounded-full" />
                            Anne Smith
                        </div>
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFWrR5v9UFxMrG0lwAPuJwNMY_YlOgG7f7lA&s" alt="avatar" className="w-[24px] h-[24px] rounded-full" />

                    </div>
                    <p className="text-[1rem] text-[#74767E]">I'll create a personalized marketing strategy for your small business.</p>
                    <span className="text-[1rem] font-bold">$200. Marketing</span>
                </div>
                <div className="bg-white p-[20px] flex flex-col gap-[20px] rounded-[20px]">
                    <img src={explorefour} alt="cardimg" className="rounded-[10px]" />
                    <div className="flex justify-between">
                        <div className="flex gap-[10px] font-bold">
                            <img src="https://png.pngitem.com/pimgs/s/22-223925_female-avatar-female-avatar-no-face-hd-png.png" alt="avatar" className="w-[24px] h-[24px] rounded-full" />
                            Anne Smith
                        </div>
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFWrR5v9UFxMrG0lwAPuJwNMY_YlOgG7f7lA&s" alt="avatar" className="w-[24px] h-[24px] rounded-full" />

                    </div>
                    <p className="text-[1rem] text-[#74767E]">I'll create a personalized marketing strategy for your small business.</p>
                    <span className="text-[1rem] font-bold">$200. Marketing</span>
                </div>
            </div>
        </div>
    )
}