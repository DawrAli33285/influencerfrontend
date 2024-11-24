import HomeFooter from "../components/homefooter";
import HomeHeader from "../components/homeheader";

export default function Terms() {
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
    ]
    return (
        <div className="w-full">
            <HomeHeader />
            <div className="w-full flex flex-col gap-[40px] px-[20px] py-[40px] xl:px-[30px]">
                <h2 className="lg:text-[2.2rem] text-center text-[1.6rem]  font-semibold">
                    Terms and Privacy
                </h2>
                {
                    terms.map((term, index) => (
                        <div key={index} className="flex flex-col gap-[20px]">
                            <h3 className="text-[1.3rem] font-bold">
                                {term.question}
                            </h3>
                            <p className="text-[1rem] mt-[10px] text-[#1C1C1CA3]">
                                {term.answer}
                            </p>
                        </div>
                    ))
                }

            </div>
            <HomeFooter />
        </div>
    )
}