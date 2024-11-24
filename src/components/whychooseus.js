import whychoose from "../whychoose.png"
import bigball from "../bigball.png"
export default function WhyChooseUs() {
    return (
        <div className="w-full bg-white px-[20px] py-[40px] xl:px-[40px] flex flex-col gap-[20px]">
            <div className="w-full rounded-[20px] relative">
                <img src={whychoose} alt="banner" className="w-full object-cover" />
            </div>
            <div className="lg:grid flex flex-col-reverse lg:grid-cols-2 w-full mt-[40px] gap-[40px]">
                <div className="w-full flex flex-col justify-between gap-[20px]">
                    <div className="flex gap-[20px]">
                        <div className="w-[64px] h-[64px] rounded-[100%] bg-[#F6F6F6]">
                        </div>
                        <div className="flex flex-col justify-between">
                            <p className="font-bold italic text-[1rem]">
                                Secure Transactions
                            </p>
                            <p className="text-[.8rem]">
                                Payments processed with trust and transparency.
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-[20px]">
                        <div className="w-[64px] h-[64px] rounded-[100%] bg-[#F6F6F6]">
                        </div>
                        <div className="flex flex-col justify-between">
                            <p className="font-bold italic text-[1rem]">
                                Social Media Ready
                            </p>
                            <p className="text-[.8rem]">
                                Promote your bonds seamlessly across platforms.
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-[20px]">
                        <div className="w-[64px] h-[64px] rounded-[100%] bg-[#F6F6F6]">
                        </div>
                        <div className="flex flex-col justify-between">
                            <p className="font-bold italic text-[1rem]">
                                Market Opportunities
                            </p>
                            <p className="text-[.8rem]">
                                Bid and trade Promise Bonds in a live marketplace.
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-[20px]">
                        <div className="w-[64px] h-[64px] rounded-[100%] bg-[#F6F6F6]">
                        </div>
                        <div className="flex flex-col justify-between">
                            <p className="font-bold italic text-[1rem]">
                                Performance Evaluation
                            </p>
                            <p className="text-[.8rem]">
                                Build your reputation with mission feedback.
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-[20px]">
                        <div className="w-[64px] h-[64px] rounded-[100%] bg-[#F6F6F6]">
                        </div>
                        <div className="flex flex-col justify-between">
                            <p className="font-bold italic text-[1rem]">
                                Grow Your Reach
                            </p>
                            <p className="text-[.8rem]">
                                Level up to issue more bonds and expand your influence.
                            </p>
                        </div>
                    </div>
                    <button class="bg-[#1DBF73] px-[20px] py-[10px] xl:py-[20px] xl:text-[1.2rem] text-[1.2rem] text-white font-bold rounded-[1.4rem] ">
                        Discover All Features
                    </button>
                </div>
                <div className="w-full">
                    <img src={bigball} alt="img" className="w-full rounded-tl-[20px] rounded-bl-[20px]" />

                </div>
            </div>
        </div>
    )
}