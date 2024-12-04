import { useState } from "react";
import HomeFooter from "../components/homefooter";
import HomeHeader from "../components/homeheader";

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
            <div className="px-[30px]">
                <h2 className="xl:text-[2.38rem] text-[1.50rem] font-semibold">
                    Terms and Privacy
                </h2>
                <p className="text-[1rem] mt-[10px] text-[#1C1C1CA3]">
                    Read our Terms and Privacy policy to understand how we protect your information and outline the rules for using our platform. Your privacy and security are our top priorities.
                </p>
            </div>
            <div className="w-full flex flex-col gap-[40px] px-[20px] py-[40px] xl:px-[30px]">


                {/* Content Section */}
                <div className="flex flex-col lg:flex-row gap-[20px]">
                    {/* Left-side Options */}
                    <div className="flex flex-col gap-[10px] w-full lg:w-[30%] border-r-[1px] border-[#E9E9E9]">
                        {options.map((option, index) => (
                            <div
                                key={index}
                                className={`flex items-center lg:text-[1.25rem] text-[1rem] gap-[10px] cursor-pointer border-l-[4px] pl-[10px] ${activeOption === option
                                    ? "border-[#1DBF73] text-[#1DBF73] font-bold"
                                    : "border-transparent text-[#1C1C1CA3]"
                                    }`}
                                onClick={() => setActiveOption(option)}
                            >
                                <span>{option}</span>
                            </div>
                        ))}
                    </div>

                    {/* Right-side Content */}
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
            <div className="w-full bg-[#1dbf733b] flex-col gap-[20px] flex justify-center items-center min-h-[425px]">
                <h2 className="xl:text-[2.38rem] text-[1.50rem] text-center  font-semibold">
                    Still Have Question
                </h2>
                <p className="lg:text-[0.94rem] text-[0.75rem] mt-[10px] text-center">
                    Contact us at <span className="underline">support@sponsorbond.com</span> for more assistance!
                </p>
                <div className="flex bg-white rounded-[6px] lg:w-[600px] py-[10px] px-[20px] justify-between">
                    <input type="email" placeholder="Enter Your Email" className="lg:text-[0.94rem] text-[0.75rem] outline-none border-none w-[80%]" />
                    <button className="bg-[#1DBF73] xl:px-[20px] xl:py-[10px] lg:text-[0.94rem] text-[0.75rem] text-white font-bold  xl:w-fit lg:w-[30%]">
                        Send
                    </button>
                </div>
            </div>
            <HomeFooter />
        </div>
    );
}
