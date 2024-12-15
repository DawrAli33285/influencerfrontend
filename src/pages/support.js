import { useState } from "react";
import HomeFooter from "../components/homefooter";
import HomeHeader from "../components/homeheader";
import banner from "../faqbanner.png"
import mblbanner from "../faqbannermbl.png"
export default function Support() {
    const [openTabs, setOpenTabs] = useState([]);

    const toggleTab = (index) => {
        setOpenTabs((prev) =>
            prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
        );
    };

    const paymentsFAQs = [
        {
            question: "What methods of payments are supported?",
            answer: "We support credit cards, debit cards, and bank transfers. PayPal and other digital wallets are coming soon."
        },
        {
            question: "Can I sell a Promise Bond I purchased?",
            answer: "Yes, you can sell a purchased Promise Bond on our platform. Follow the selling guidelines available in your account dashboard."
        },
        {
            question: "What fees apply to transactions?",
            answer: "A standard transaction fee of 2% applies to all sales. Additional charges may apply based on your payment method."
        },
        {
            question: "Which license do I need?",
            answer: "You need a trading license issued by your local regulatory authority. Contact support for specific guidance."
        },
    ];

    const suggestionsFAQs = [
        {
            question: "What is a Promise Bond?",
            answer: "A Promise Bond is a financial instrument that enables individuals to pledge funds for specific missions or projects."
        },
        {
            question: "How do I create a Promise Bond?",
            answer: "Log into your account, navigate to 'Create Bond', and fill in the required details about your mission."
        },
        {
            question: "Can I sell a Promise Bond I purchased?",
            answer: "Yes, purchased Promise Bonds can be resold. Visit the trading section in your account for more details."
        },
        {
            question: "Which license do I need?",
            answer: "For issuing or trading Promise Bonds, you need a license approved by the financial authority in your country."
        },
    ];
    const renderFAQs = (faqs, startIndex) =>
        faqs.map((faq, index) => {
            const currentIndex = startIndex + index;
            const isOpen = openTabs.includes(currentIndex);
            return (
                <div
                    key={currentIndex}
                    className={`py-[10px] px-[20px] rounded-md  ${isOpen ? "bg-[#1DBF730D]" : ""
                        }`}
                >
                    <div
                        className="flex justify-between items-center cursor-pointer"
                        onClick={() => toggleTab(currentIndex)}
                    >
                        <p className="font-bold lg:text-[1.25rem] text-[1rem]">{faq.question}</p>
                        <span className="lg:text-[1.25rem] text-[1.13rem] font-bold">
                            {isOpen ? "-" : "+"}
                        </span>
                    </div>
                    {isOpen && (
                        <p className="mt-[10px] lg:text-[0.94rem] text-[0.9rem] text-[#1C1C1CA3]">
                            {faq.answer}
                        </p>
                    )}
                </div>
            );
        });
    return (
        <div className="w-full">
            <HomeHeader />
            <div className="relative flex items-center justify-center w-full h-[300px]">
  <img src={banner} className="lg:block hidden w-full h-full object-cover" alt="img" />
  <img src={mblbanner} className="block lg:hidden w-full h-full object-cover" alt="img" />
  <div className="absolute lg:px-0 px-[1rem] gap-[20px] left-0 lg:pl-[10rem] top-0 w-full h-full flex flex-col lg:items-start items-center justify-center">
                    <h1 className="lg:text-[2.38rem] text-[1.9rem] text-center md:text-start text-white font-bold">Find answers to common questions and get helpful information.</h1>
                    <p className="lg:text-[0.94rem] text-[.75rem] text-white">Fostering growth, forging relationships, and unlocking potential.</p>
                </div>
</div>
            
            <div className="lg:px-[30px] px-[15px] md:py-[5rem] py-[2rem]">
                <h2 className="xl:text-[2.38rem] text-[1.50rem] text-center  font-semibold">
                    How Can We Help You?
                </h2>
                <p className="lg:text-[0.94rem] text-[0.75rem] mt-[10px] lg:w-[60%] mx-auto md:text-center text-start text-black lg:text-[#1C1C1CA3]">
                    Our platform helps you monetize your talents, connect with supporters, and secure resources to grow, empowering you to achieve your dreams and build meaningful connections.                </p>
            </div>
            <div className="w-full px-[20px] py-[40px] max-w-[1440px] mx-auto xl:px-[30px] mb-[5rem] flex flex-col gap-[40px]">

                <div className="flex flex-col gap-[20px]">
                    <h2 className="lg:text-[1.38rem] text-[1.376rem] font-normal lg:font-medium">
                        Payments
                    </h2>
                    {renderFAQs(paymentsFAQs, 0)}
                </div>


                <div className="flex flex-col gap-[20px]">
                    <h2 className="lg:text-[1.38rem] text-[1.376rem] font-normal lg:font-medium">
                        Suggestions
                    </h2>
                    {renderFAQs(suggestionsFAQs, paymentsFAQs.length)}
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
    )
}