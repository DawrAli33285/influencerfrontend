import wedo from "../ourvision.png"
import inner from "../inner.png"
export default function OurVision() {
    return (
        <div className={`flex flex-col bg-[#1dbf7318] relative px-[20px] lg:gap-[40px] lg:px-[3rem] lg:flex-row   py-[4rem]`}>

            <div className="w-full lg:w-1/2">
                <h2 className="font-bold xl:text-[2.2rem] text-[1.6rem] mb-[10px] text-black">
                    Our <span className="font-bold text-[#1DBF73]">Vision</span>
                </h2>
                <p className="text-lg text-[#222222]">
                    Inspiring trust, fostering growth, and reshaping connections between creators and audiences. </p>
            </div>
            <div className="w-[80%] lg:w-1/2 h-[500px] max-h-[500px]">
                <img src={wedo} alt="machli" className="w-full h-full object-cover" />
            </div>
            <div className="w-[70%] absolute h-[200px] top-[50%] left-0 translate-y-[-50%]">
                <img src={inner} className="w-full h-full" />
            </div>
        </div>
    )
}