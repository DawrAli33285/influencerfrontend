import { Link } from "react-router-dom";

export default function HomeFooter() {
    return (
        <div className="bg-[#321869] flex flex-col gap-[20px] px-[20px] py-[40px] justify-center">
            <nav className="flex lg:items-center gap-[30px] lg:flex-row flex-col justify-center">
                <Link to="/" className="text-[18px] text-white">Home</Link>
                <Link to="/sponsorbond" className="text-[18px] text-white ">SponsorBond</Link>
                <Link to="/mission" className="text-[18px] text-white ">Mission</Link>
            </nav>
            <h1 className="text-[36px] text-center font-semibold text-white">Subscribe for our newsletter</h1>
            <h1 className="text-[24px] text-center  text-white">Receive latest news, update, and many other things </h1>
            <h1 className="text-[24px] text-center  text-white">weekly. </h1>
            <div className="border-[1px] flex justify-between mx-auto text-white items-center border-white rounded-[20px] w-[80%] max-w-[360px] px-[20px] py-[10px]">
                <input type="email" placeholder="Email" className="bg-transparent outline-none border-none" />
                <div className="flex w-fit items-center hover:cursor-pointer">
                    <svg width="16" height="10" viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.5 5H15.5M15.5 5L11 0.5M15.5 5L11 9.5" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </div>
            </div>
            <div className="w-full flex justify-between lg:flex-row flex-col gap-[10px] items-center">
                <div className="flex items-center gap-[10px]">
                    <Link to="/" className="text-white text-[20px]">Privacy Policy </Link>
                    <Link to="/" className="text-white text-[20px]">Terms &  Condition </Link>
                </div>
                <div className="flex items-center text-white text-[20px]">
                        © 2024 — Web Name Here
                </div>
            </div>
        </div>
    )
}