import HomeFooter from "../components/homefooter";
import HomeHeader from "../components/homeheader";
import left1 from "../leftside1.png"
import left2 from "../leftside2.png"
import left3 from "../leftside3.png"
import left4 from "../leftside4.png"
import midd from "../midsection.PNG"
import machli from "../machli.png"
import img from "../serve1.png"
import scnd from "../serve2.png"
import third from "../serve3.png"
export default function AboutUs() {
    return (
        <div className="w-full">
            <HomeHeader />
            <h2 className="font-bold xl:text-[2.2rem] text-[1.6rem] px-[30px] py-[40px]">
                Empowering Talent, Building Connections, and Creating Opportunities.
            </h2>
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-[20px] px-[30px] py-[40px]">
                <div className="flex flex-col gap-[20px] w-full">
                    <div className="relative flex text-[1rem] font-bold text-white justify-center items-center w-full h-[300px] rounded-[20px] overflow-hidden bg-black">
                        Welcome
                        <span className="absolute top-0 left-0">
                            <img src={left1} className="w-[150px] h-[100px] object-cover" />
                        </span>
                        <span className="absolute top-0 right-[20px]">
                            <img src={left2} className="w-[150px] h-[100px] object-cover" />
                        </span>
                        <span className="absolute bottom-0 left-[40px]">
                            <img src={left3} className="w-[150px] h-[100px] object-cover" />
                        </span>
                        <span className="absolute bottom-0 right-[-25px]">
                            <img src={left4} className="w-[200px] h-[100px] object-cover" />
                        </span>
                    </div>
                    <h2 className="font-bold xl:text-[1.6rem] text-[1.2rem]">
                        Welcome to  <span className="font-normal text-[#1DBF73]">Promise Bonds.</span> !
                    </h2>
                    <p>
                        We are a platform built on the belief that talent deserves recognition, and every creator has the power to turn their unique skills into real opportunities. Our mission is simple: to connect creators, influencers, and skilled individuals with audiences who value their expertise.
                    </p>
                </div>
                <div className="flex flex-col gap-[20px] w-full">
                    <div className="relative flex text-[1rem] font-bold text-white justify-center items-center w-full h-[300px] rounded-[20px] overflow-hidden bg-[#1dbf73]">
                        WE!!
                        <span className="absolute top-0 left-0">
                            <img src={left1} className="w-[150px] h-[100px] object-cover" />
                        </span>
                        <span className="absolute top-0 right-[20px]">
                            <img src={left2} className="w-[150px] h-[100px] object-cover" />
                        </span>
                        <span className="absolute bottom-0 left-[40px]">
                            <img src={left3} className="w-[150px] h-[100px] object-cover" />
                        </span>
                        <span className="absolute bottom-0 right-[-25px]">
                            <img src={left4} className="w-[200px] h-[100px] object-cover" />
                        </span>
                    </div>
                    <h2 className="font-bold xl:text-[1.6rem] text-[1.2rem]">
                        What Do  <span className="font-normal text-[#1DBF73]">We Do</span> !
                    </h2>
                    <p>
                        At Promise Bond, we help individuals issue Promise Bonds—a unique way to secure financial support today by promising to deliver value in the future. Whether you're a social media influencer, a skilled professional, or a creative artist, we empower you to monetize your talent while building meaningful connections with your supporters.                    </p>
                </div>


            </div>
            <div className="w-full">
                <img className="w-full" src={midd} />
            </div>
            <div className={`flex flex-col justify-center px-[20px] lg:gap-[40px] lg:px-[40px] lg:flex-row  items-center py-10`}>
                <div className="w-full lg:w-1/2">
                    <h2 className="xl:text-[2.2rem] text-[1.6rem]  font-semibold mb-4">
                        Our Mission
                    </h2>
                    <p className="text-lg text-gray-600">
                        To provide a seamless platform where talent meets opportunity, enabling creators to achieve their dreams while delivering value to their supporters.
                    </p>
                </div>
                <div className="w-full lg:w-1/2">
                    <img src={machli} alt="machli" className="w-full object-cover" />
                </div>
            </div>
            <h2 className="font-bold xl:text-[2.2rem] text-[1.6rem] text-center mt-[20px]">
                How We’re .<span className="font-normal text-[#1DBF73] italic">Different</span>
            </h2>
            <div className="px-[30px] py-[40px] gap-[40px] grid lg:grid-cols-2 grid-cols-1 flex-wrap justify-around">
                <div className="flex  w-full flex-col lg:pl-[10rem]">
                    <h2 className="font-bold xl:text-[1.6rem] italic text-[1.2rem] mt-[20px]">
                        Innovative Promise Bonds
                    </h2>
                    <p className="text-[1rem]">
                        A unique financial model designed to support creators and ensure accountability.
                    </p>
                </div>
                <div className="flex  w-full flex-col lg:pl-[10rem]">
                    <h2 className="font-bold xl:text-[1.6rem] italic text-[1.2rem] mt-[20px]">
                        Innovative Promise Bonds
                    </h2>
                    <p className="text-[1rem]">
                        A unique financial model designed to support creators and ensure accountability.
                    </p>
                </div>
                <div className="flex  w-full flex-col lg:pl-[10rem]">
                    <h2 className="font-bold xl:text-[1.6rem] italic text-[1.2rem] mt-[20px]">
                        Innovative Promise Bonds
                    </h2>
                    <p className="text-[1rem]">
                        A unique financial model designed to support creators and ensure accountability.
                    </p>
                </div>
                <div className="flex  w-full flex-col lg:pl-[10rem]">
                    <h2 className="font-bold xl:text-[1.6rem] italic text-[1.2rem] mt-[20px]">
                        Innovative Promise Bonds
                    </h2>
                    <p className="text-[1rem]">
                        A unique financial model designed to support creators and ensure accountability.
                    </p>
                </div>

            </div>
            <div className="w-full flex flex-col gap-[40px] px-[20px] py-[40px] xl:px-[30px]">
                <div className="flex justify-between">
                    <p className="font-bold xl:text-[1.5rem] text-[1.3rem]">
                        Who We <span className="font-normal text-[#1DBF73] italic">Serve.</span>
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[40px]">
                    <div className="bg-white  flex flex-col gap-[20px] rounded-[20px] relative">
                        <img src={img} alt="cardimg" className="rounded-[10px] w-full h-full" />
                    </div>
                    <div className="bg-white  flex flex-col gap-[20px] rounded-[20px] relative">
                        <img src={scnd} alt="cardimg" className="rounded-[10px] w-full h-full" />
                    </div>
                    <div className="bg-white  flex flex-col gap-[20px] rounded-[20px] relative">
                        <img src={third} alt="cardimg" className="rounded-[10px] w-full h-full" />
                    </div>

                </div>
            </div>
            <div className="w-full px-[30px] py-[40px]">
                <div className="px-[20px] py-[20px] flex flex-col gap-[10px] bg-[#1DBF73] lg:rounded-[20px]">
                    <h2 className="font-bold xl:text-[1.5rem] text-[1.3rem] text-white">
                        Join Us in Redefining Success
                    </h2>
                    <p className="text-white lg:text-[1.3rem] text-[1rem] ">
                        At Promise Bond, we believe success is about more than just financial gain—it's about building trust, delivering value, and creating a legacy of meaningful contributions.
                    </p>
                    <div className="flex lg:flex-row flex-col gap-[20px] justify-between lg:mt-[40px] mt-[20px]">
                        <p className="text-white lg:text-[1.3rem] text-[1rem] ">
                            Ready to get started?
                        </p>
                        <button class="bg-white px-[30px] py-[10px] xl:text-[1rem] text-[1rem] text-[#1DBF73] font-bold rounded-[1.4rem] w-fit">
                            Sign Up
                        </button>
                    </div>
                </div>
            </div>
            <HomeFooter />
        </div>
    )
}