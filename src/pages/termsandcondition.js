import { useState } from "react";
import HomeFooter from "../components/homefooter";
import HomeHeader from "../components/homeheader";
import banner from "../faqbanner.png"
import mblbanner from "../faqbannermbl.png"
export default function Terms() {
    const [activeOption, setActiveOption] = useState("Terms of Use");

    const terms = [
        {
            question: "Terms of Use",
            answer: "By accessing or using SponsorBond.com, you agree to comply with our terms. Issuers and buyers are responsible for their actions, including fulfilling missions and resolving disputes independently. Our platform provides tools for bond issuance and trading but does not mediate legal matters."
        },
        {
            question: "Privacy Policy",
            answer: "We value your privacy and ensure your data is handled securely. Personal information is used only for platform functionality, such as payments or legal requirements. We never share data without your consent, except when required by law."
        },
        {
            question: "Data Security",
            answer: "Your financial and personal information is encrypted and stored securely. Transfers to third-party accounts are strictly prohibited to protect against fraud."
        },
        {
            question: "Dispute Resolution",
            answer: "Legal disputes are outside our jurisdiction. Users are encouraged to seek external legal support if issues arise. We will provide necessary information to authorities upon request."
        },
        {
            question: "Have Questions?",
            answer: "Reach out to privacy@sponsorbond.com for more details on our terms and policies."
        },
    ];

    const options = [
        "Terms of Use", 
        "Privacy Policy",
        "Data Security",
        "Dispute Resolution",
        "Have Questions?",
    ];

    return (
        <div className="w-full">
            <HomeHeader />
            <div className="relative flex items-center justify-center w-full h-[300px]">
  <img src={banner} className="lg:block hidden w-full h-full object-cover" alt="img" />
  <img src={mblbanner} className="block lg:hidden w-full h-full object-cover" alt="img" />
  <div className="absolute lg:px-0 px-[1rem] gap-[10px] left-0 lg:pl-[10rem] top-0 w-full h-full flex flex-col lg:items-start items-center justify-center">
                    <h1 className="lg:text-[2.38rem] text-[1.9rem] text-white font-bold md:text-start text-center">Learn about our terms and how we protect your data.</h1>
                    <p className="lg:text-[0.94rem] text-[.75rem] text-white">Fostering growth, forging relationships, and unlocking potential.</p>
                </div>
</div>
            
            <div className="lg:pl-[10rem] md:py-[5rem] py-[2rem]  px-[1rem]">
                <h2 className="xl:text-[2.38rem] text-[1.50rem] font-semibold">
                    Terms and Privacy
                </h2>
                <p className="text-[1rem] mt-[10px] lg:w-[50%] text-[#1C1C1CA3]">
                    Read our Terms and Privacy policy to understand how we protect your information and outline the rules for using our platform. Your privacy and security are our top priorities.
                </p>
            </div>
            <div className="w-full flex flex-col gap-[40px]  py-[40px] lg:pl-[10rem]  px-[1rem]">



                <div className="flex flex-col lg:flex-row gap-[20px]">

                    <div className="flex flex-col gap-[20px] w-full lg:w-[30%] border-r-[1px] border-[#E9E9E9]">
                        {options.map((option, index) => (
                            <div
                                key={index}
                                className={`flex items-center lg:text-[0.94rem] text-[1rem] gap-[20px] cursor-pointer border-l-[4px] pl-[10px] ${activeOption === option
                                    ? "border-[#1DBF73] text-[#1DBF73]"
                                    : "border-transparent text-[#1C1C1CA3]"
                                    }`}
                                onClick={() => setActiveOption(option)}
                            >
                                <span>{option}</span>
                            </div>
                        ))}
                    </div>


                    <div className="flex flex-col gap-[20px] w-full lg:w-[70%]">
                        {terms.map((term, index) => (
                            <div
                                key={index}
                                className={`flex flex-col gap-[20px] ${activeOption === term.question ? "" : "hidden"
                                    }`}
                            >
                                <h3 className="lg:text-[1.25rem] text-[1rem] font-bold">
                                    {term.question}
                                </h3>
                                <p className="lg:text-[0.94rem] text-[0.75rem] mt-[10px] text-[#1C1C1CA3]">
                                    {term.answer}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="w-full bg-[#1dbf7314] flex-col  flex justify-center items-center min-h-[200px] lg:min-h-[425px]">
                <h2 className="lg:text-[2rem] text-[1.50rem] text-center  font-bold">
                    Still Have Question
                </h2>
                <p className="lg:text-[0.94rem] text-[0.75rem] mb-[30px] text-center">
                    Contact us at <span className="underline">support@sponsorbond.com</span> for more assistance!
                </p>
                <div className="flex bg-white shadow-lg rounded-[3.8rem] lg:w-[600px] w-[90%] mx-auto py-[10px] px-[10px] justify-between">
                    <input type="email" placeholder="Your email address" className="outline-none lg:text-[0.94rem] px-[1rem] text-[0.75rem] border-none lg:w-[80%] w-[60%]" />
                    <button className="bg-black rounded-[3.8rem] xl:px-[20px] p-[10px] xl:py-[10px] lg:text-[0.94rem] text-[0.75rem] text-white font-bold md:w-[108px] md:h-[60px] w-[90px] h-[50px]  ">
                            Send
                    </button>
                </div>
            </div>
            <HomeFooter />
        </div>
    );
}
