import { useState } from "react";
import HomeFooter from "../components/homefooter";
import HomeHeader from "../components/homeheader";

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
                    className={`p-[10px] rounded-md  ${isOpen ? "bg-[#1dbf733b]" : ""
                        }`}
                >
                    <div
                        className="flex justify-between items-center cursor-pointer"
                        onClick={() => toggleTab(currentIndex)}
                    >
                        <p className="font-bold text-[1.1rem]">{faq.question}</p>
                        <span className="text-[1.5rem] font-bold">
                            {isOpen ? "-" : "+"}
                        </span>
                    </div>
                    {isOpen && (
                        <p className="mt-[10px] text-[1rem] text-[#1C1C1CA3]">
                            {faq.answer}
                        </p>
                    )}
                </div>
            );
        });
    return (
        <div className="w-full">
            <HomeHeader />
            <div className="px-[30px]">
                <h2 className="lg:text-[2.2rem] text-center text-[1.6rem] font-semibold">
                    How Can We Help You?
                </h2>
                <p className="text-[1rem] mt-[10px] lg:w-[60%] mx-auto text-center text-[#1C1C1CA3]">
                    Our platform helps you monetize your talents, connect with supporters, and secure resources to grow, empowering you to achieve your dreams and build meaningful connections.                </p>
            </div>
            <div className="w-full px-[20px] py-[40px] max-w-[1440px] mx-auto xl:px-[30px] flex flex-col gap-[40px]">
                
                <div className="flex flex-col gap-[20px]">
                    <h2 className="text-[1.4rem] font-semibold">
                        Payments
                    </h2>
                    {renderFAQs(paymentsFAQs, 0)}
                </div>

             
                <div className="flex flex-col gap-[20px]">
                    <h2 className="text-[1.4rem] font-semibold">
                        Suggestions
                    </h2>
                    {renderFAQs(suggestionsFAQs, paymentsFAQs.length)}
                </div>
            </div>
            <div className="w-full bg-[#1dbf733b] flex-col gap-[20px] flex justify-center items-center min-h-[425px]">
                <h2 className="lg:text-[2.2rem] text-center text-[1.6rem] font-semibold">
                    Still Have Question
                </h2>
                <p className="text-[1rem] mt-[10px] text-center">
                    Contact us at <span className="underline">support@sponsorbond.com</span> for more assistance!
                </p>
                <div className="flex bg-white rounded-[6px] lg:w-[600px] py-[10px] px-[20px] justify-between">
                    <input type="email" placeholder="Enter Your Email" className="outline-none border-none w-[80%]" />
                    <button className="bg-[#1DBF73] xl:px-[20px] xl:py-[10px] xl:text-[1rem] text-[.8rem] text-white font-bold  xl:w-fit lg:w-[30%]">
                        Send
                    </button>
                </div>
            </div>
            <HomeFooter />
        </div>
    )
}