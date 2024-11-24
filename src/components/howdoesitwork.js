import cardone from "../cardone.png";
import cardtwo from "../cardtwo.png";
import cardthree from "../cardthree.png";
import cardbig from "../cardbig.png";
import { Link } from "react-router-dom";
export default function HowDoesItWork() {
    return (
        <div className="w-full bg-[#F1F1F1] px-[20px] py-[40px] xl:px-[40px] flex flex-col gap-[20px]">
            <div className="grid gap-[20px] md:grid-cols-3 grid-cols-1">
                <div className="bg-white p-[20px] flex flex-col gap-[20px] rounded-[20px]">
                    <img src={cardone} alt="cardimg" className="rounded-[10px]" />
                    <p className="text-[1rem]">Join our platform in minutes with email and phone verification.</p>
                    <span className="text-[#1DBF73] italic text-[1rem]">Sign Up</span>
                </div>

                <div className="bg-white p-[20px] flex flex-col gap-[20px] rounded-[20px]">
                    <img src={cardtwo} alt="cardimg" className="rounded-[10px]" />
                    <p className="text-[1rem]">Describe your mission, set a price, and get operator approval.</p>
                    <span className="text-[#1DBF73] italic text-[1rem]">Issue Promise Bonds</span>
                </div>


                <div className="bg-white p-[20px] flex flex-col gap-[20px] rounded-[20px]">
                    <img src={cardthree} alt="cardimg" className="rounded-[10px]" />
                    <p className="text-[1rem]">Share your bond on social media and start earning.</p>
                    <span className="text-[#1DBF73] italic text-[1rem]">Promote & Sell</span>
                </div>

            </div>
            <div className="bg-white p-[20px] flex flex-col gap-[20px] rounded-[20px] w-full">
                <img src={cardbig} alt="cardimg" className="rounded-[10px]" />
                <p className="text-[1rem]">Fulfill your promises, share your progress, and level up.</p>
                <span className="text-[#1DBF73] italic text-[1rem]">Perform Missions</span>
            </div>
            <Link to="/" className=" underline text-[1rem] mt-[40px] text-center w-full">Learn More About Promise Bonds</Link>
        </div>
    )
}