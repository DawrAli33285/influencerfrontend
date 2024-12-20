import HomeFooter from "../components/homefooter";
import HomeHeader from "../components/homeheader";
import avatar from "../avatar.webp"
import tiktok from "../tiktok.png"
import insta from "../insta.png"
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify";
import { MoonLoader } from "react-spinners";
import { BASE_URL } from "../baseURL";
import axios from "axios";
import { FooterComponent } from "../components/footer/footer.component";
import { HeaderComponent } from "../components/header/header.component";
export default function Profile() {
    const [state, setState] = useState({
        issuer: '',
        bonds: [],
        missions: [],
        successRate: ''
    })
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 7;
    const [loading, setLoading] = useState(true)
    const location = useLocation();
    useEffect(() => {
        getSingleIssuer();
    }, [])
    const getSingleIssuer = async () => {
        try {
            let params = new URLSearchParams(location.search)
            let id = params.get('id')
            let response = await axios.get(`${BASE_URL}/getSingleIssuer/${id}`)
            console.log("RESPONSE")
            setState(response.data)
            setLoading(false)
            console.log(response)
        } catch (e) {
            if (e?.response?.data?.error) {
                toast.error(e?.response?.data?.error, { containerId: "profileToast" })
            } else {
                toast.error("Client error please try again", { containerId: "profileToast" })
            }
        }
    }


    const bondData = [
        {
            _id: '1',
            title: 'Influencer A',
            description: 'Help Anna fund her vocal training sessions and receive a personalized thank-you performance!',
            bond_issuerance_amount: 1000,
            total_bonds: 5000,
            bond_sold: 12,
            status: '75% sold'
        },
        {
            _id: '2',
            title: 'Influencer B',
            description: 'Help Anna fund her vocal training sessions and receive a personalized thank-you performance!',
            bond_issuerance_amount: 1500,
            total_bonds: 3000,
            bond_sold: 6
            ,
            status: '75% sold'
        },
        {
            _id: '3',
            title: 'Influencer C',
            description: 'Help Anna fund her vocal training sessions and receive a personalized thank-you performance!',
            bond_issuerance_amount: 2000,
            total_bonds: 4500,
            bond_sold: 24,
            status: '75% sold'
        },
        {
            _id: '4',
            title: 'Influencer D',
            description: 'Help Anna fund her vocal training sessions and receive a personalized thank-you performance!',
            bond_issuerance_amount: 800,
            total_bonds: 12000,
            bond_sold: 18,
            status: '75% sold'
        }
    ];
    const navigate = useNavigate();
    const totalPages = Math.ceil(state?.length / rowsPerPage);
    const currentRows = state?.bonds?.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );


    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrev = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };
    return (
        <>
            <ToastContainer containerId={"profileToast"} />
            <div className="w-full flex  flex-col bg-[#0000000D] gap-[20px]">
                <HeaderComponent />
                {loading ? <div className="w-full min-h-[700px] flex justify-center items-center">
                    <MoonLoader color="#6B33E3" size={100} />

                </div> : <>
                    <div className="border-b  border-b-[#1C1C1C14] flex lg:flex-row lg:mt-[60px] flex-col gap-[30px] justify-between w-full">

                        <div className="flex lg:w-[40%] max-w-[400px] flex-col gap-[16px] px-[20px] lg:px-[3rem] lg:pb-[4rem]">
                            <div className="rounded-[100%] lg:w-[124px] lg:h-[124px] w-[80px] h-[80px]">
                                <img src={state?.issuer?.user_id?.avatar?.length > 0 ? state?.issuer?.user_id?.avatar : avatar} alt="img" className="w-full h-full object-cover rounded-[100%]" />
                            </div>
                            <h2 className="lg:text-[2rem] text-[1.5rem] font-bold">{state?.issuer?.user_id?.username} </h2>
                            <p className="lg:text-[0.94rem] text-[0.75rem]">Turning dreams into reality with your support.</p>
                            <div className="flex gap-[10px]  ">
                                <div className="flex items-center gap-[6px] lg:text-[0.94rem] text-[0.75rem]">
                                    <img src={tiktok} alt="img" className="w-[24px]" />
                                    @AnnaSings

                                </div>
                                <div className="flex items-center gap-[6px] lg:text-[0.94rem] text-[0.75rem]">
                                    <img src={insta} alt="img" className="w-[24px]" />
                                    @AnnaMusicSongs

                                </div>
                            </div>

                        </div>
                        <div className="flex flex-col lg:w-[60%] max-w-[600px] lg:gap-[45px] gap-[20px]">
                            <div className="flex flex-col gap-[10px] lg:px-[3rem] px-[2rem]">
                                <h2 className="text-black lg:text-[1.75rem] text-[1rem] font-semibold mb-1">Bio</h2>
                                <p className="text-[#1C1C1CA3] lg:text-[.88rem] text-[.75rem]">{state?.issuer?.user_id?.bio?state?.issuer?.user_id?.bio:'Hi, I’m Anna Johnson, a passionate singer with dreams of becoming a renowned artist. Thanks to promise bonds, I’m working towards [goal, e.g., participating in a national singing contest]. Every bond issued brings me closer to this dream.'}</p>
                            </div>
                            <div className="flex flex-col gap-[10px] lg:px-[3rem] px-[2rem]">
                                <h2 className="text-black lg:text-[1.75rem] text-[1rem] font-semibold mb-1">Achievements</h2>
                                <p className="text-[#1C1C1CA3] lg:text-[.88rem] text-[.75rem]">2023: Reached 50,000 followers on TikTok.</p>
                                <p className="text-[#1C1C1CA3] lg:text-[.88rem] text-[.75rem]">2024: Runner-up at Local Talent Hunt.</p>
                            </div>
                        </div>
                    </div>

                    <div className="w-full grid xl:grid-cols-4 md:grid-cols-2 h-fit grid-cols-1 mt-[2rem] px-[2rem] lg:px-[3rem] gap-[30px]">
                        <div className=" p-[20px] bg-white flex gap-[5px] justify-between">

                            <div className="flex flex-col justify-between w-full gap-[5px]">
                                <h1 className="text-[15px] text-[#344054]">Total Bonds Issued </h1>
                                <div className='flex justify-between items-end'>
                                    <h2 className="text-[28px] font-semibold">{state?.bonds?.length}</h2>

                                </div>
                                <p className="text-red-500 text-[14px]">Dropped by: 0.2%</p>
                            </div>
                            <div className="flex items-center">
                                <svg width="58" height="52" viewBox="0 0 58 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="38" cy="32" r="20" fill="#1DBF73" fill-opacity="0.08" />
                                    <path d="M31.3976 9.78932V4.58932H34.042V2.22266H5.95312V4.58932H8.59757V9.78932C8.59928 10.7652 8.82687 11.7274 9.26252 12.6006C9.69817 13.4739 10.3301 14.2344 11.1087 14.8227L18.0198 20.0004L11.1087 25.1782C10.3301 25.7665 9.69817 26.527 9.26252 27.4002C8.82687 28.2735 8.59928 29.2357 8.59757 30.2115V35.4115H5.95312V37.7782H34.042V35.4115H31.3976V30.2115C31.3959 29.2357 31.1683 28.2735 30.7326 27.4002C30.297 26.527 29.6651 25.7665 28.8865 25.1782L21.9753 20.0004L28.8865 14.8227C29.6651 14.2344 30.297 13.4739 30.7326 12.6006C31.1683 11.7274 31.3959 10.7652 31.3976 9.78932ZM27.4531 27.0782C27.938 27.4445 28.3316 27.9179 28.6034 28.4614C28.8751 29.0049 29.0177 29.6039 29.0198 30.2115V35.4115H10.9753V31.856H25.9198V29.4782H11.1087C11.2853 28.5191 11.812 27.6598 12.5865 27.0671L20.042 21.5115L27.4531 27.0782ZM27.4531 12.9338L19.9976 18.4893L12.542 12.9338C12.0557 12.5663 11.6611 12.0912 11.3893 11.5456C11.1175 11 10.9758 10.3989 10.9753 9.78932V4.58932H29.0198V8.14488H14.0753V10.5227H28.8865C28.7187 11.4712 28.2087 12.3252 27.4531 12.9227V12.9338Z" fill="#1F4B3F" />
                                </svg>

                            </div>
                        </div>
                        <div className=" p-[20px] bg-white flex gap-[5px] justify-between ">
                            <div className="flex flex-col justify-between w-full gap-[5px]">
                                <h1 className="text-[15px] text-[#344054]">Total Funds Raised</h1>
                                <div className='flex justify-between items-end'>
                                    <h2 className="text-[28px] font-semibold">$24000</h2>

                                </div>
                                <p className="text-[#5BBB7BBF] text-[14px]">Increased by: 1.2%</p>
                            </div>
                            <div className="flex items-center">
                                <svg width="58" height="52" viewBox="0 0 58 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="38" cy="32" r="20" fill="#1DBF73" fill-opacity="0.08" />
                                    <path d="M18.7094 23.8783C18.4518 23.878 18.2003 23.8006 17.9872 23.6561L14.1094 21.1116L15.5538 18.8894L18.6427 20.945L24.3649 16.3672L25.976 18.3894L19.5094 23.5561C19.2876 23.7522 19.0051 23.8659 18.7094 23.8783Z" fill="#1F4B3F" />
                                    <path d="M36.2249 15.8114L35.4471 14.9003C34.9146 14.2754 34.5954 13.4969 34.536 12.678L34.4471 11.4891C34.3296 9.9546 33.6667 8.51279 32.5784 7.42452C31.4902 6.33625 30.0484 5.67338 28.5138 5.55582L27.3138 5.46693C26.495 5.40757 25.7164 5.08837 25.0916 4.55582L24.1805 3.77804C23.0134 2.7745 21.5252 2.22266 19.986 2.22266C18.4468 2.22266 16.9586 2.7745 15.7916 3.77804L14.8805 4.55582C14.256 5.08905 13.4773 5.40834 12.6582 5.46693L11.4916 5.55582C9.95623 5.67115 8.51317 6.33331 7.42445 7.42202C6.33574 8.51073 5.67359 9.9538 5.55825 11.4891L5.45825 12.6891C5.39889 13.508 5.0797 14.2865 4.54714 14.9114L3.76936 15.8225C2.7688 16.9888 2.21875 18.4747 2.21875 20.0114C2.21875 21.548 2.7688 23.034 3.76936 24.2003L4.54714 25.1114C5.0797 25.7362 5.39889 26.5147 5.45825 27.3336L5.55825 28.5114C5.67581 30.0459 6.33868 31.4877 7.42695 32.576C8.51522 33.6643 9.95703 34.3271 11.4916 34.4447L12.6916 34.5336C13.5106 34.5922 14.2894 34.9115 14.9138 35.4447L15.8249 36.2225C16.992 37.226 18.4802 37.7779 20.0194 37.7779C21.5586 37.7779 23.0467 37.226 24.2138 36.2225L25.1249 35.4447C25.7498 34.9121 26.5283 34.5929 27.3471 34.5336L28.5138 34.4447C30.0484 34.3271 31.4902 33.6643 32.5784 32.576C33.6667 31.4877 34.3296 30.0459 34.4471 28.5114L34.5471 27.3114C34.6057 26.4923 34.925 25.7136 35.4582 25.0891L36.236 24.178C37.2321 23.0112 37.7784 21.5268 37.7763 19.9927C37.7743 18.4585 37.2241 16.9756 36.2249 15.8114ZM34.2583 22.478L33.4805 23.3891C32.5964 24.4229 32.0634 25.7107 31.9583 27.0669L31.8694 28.2558C31.7979 29.175 31.4004 30.0385 30.7485 30.6905C30.0965 31.3424 29.233 31.74 28.3138 31.8114L27.1138 31.9003C25.7576 32.0054 24.4698 32.5384 23.436 33.4225L22.5249 34.2003C21.8251 34.8032 20.932 35.1349 20.0082 35.1349C19.0845 35.1349 18.1914 34.8032 17.4916 34.2003L16.5805 33.4225C15.5467 32.5384 14.2589 32.0054 12.9027 31.9003L11.7138 31.8114C10.7946 31.74 9.93111 31.3424 9.27915 30.6905C8.6272 30.0385 8.22966 29.175 8.15825 28.2558L8.04714 27.1114C7.94127 25.7554 7.40835 24.4678 6.52492 23.4336L5.74714 22.5225C5.1463 21.8216 4.81603 20.929 4.81603 20.0058C4.81603 19.0827 5.1463 18.19 5.74714 17.4891L6.52492 16.578C7.41117 15.5413 7.94433 14.2492 8.04714 12.8891L8.13603 11.7003C8.20744 10.781 8.60498 9.91756 9.25693 9.26561C9.90889 8.61365 10.7723 8.21612 11.6916 8.1447L12.8916 8.05582C14.2478 7.9507 15.5356 7.41768 16.5694 6.53359L17.4805 5.75582C18.1803 5.15284 19.0734 4.82117 19.9971 4.82117C20.9209 4.82117 21.814 5.15284 22.5138 5.75582L23.4249 6.53359C24.4631 7.41583 25.755 7.94504 27.1138 8.0447L28.3027 8.13359C29.2219 8.20501 30.0854 8.60254 30.7373 9.2545C31.3893 9.90645 31.7868 10.7699 31.8582 11.6891L31.9583 12.8891C32.0634 14.2453 32.5964 15.5331 33.4805 16.5669L34.2583 17.478C34.8591 18.1789 35.1894 19.0716 35.1894 19.9947C35.1894 20.9178 34.8591 21.8105 34.2583 22.5114V22.478Z" fill="#1F4B3F" />
                                </svg>


                            </div>
                        </div>
                        <div className=" p-[20px] bg-white flex gap-[5px] justify-between ">

                            <div className="flex flex-col justify-between w-full gap-[5px]">
                                <h1 className="text-[15px] text-[#344054]">Mission Fulfillment Rate</h1>
                                <div className='flex justify-between items-end'>
                                    <h2 className="text-[28px] font-semibold">{state?.successRate}</h2>

                                </div>
                                <p className="text-[#5BBB7BBF] text-[14px]">Increased by: 1.2%</p>


                            </div>
                            <div className="flex items-center">
                                <svg width="58" height="52" viewBox="0 0 58 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="38" cy="32" r="20" fill="#1DBF73" fill-opacity="0.08" />
                                    <path d="M35.3449 4.65601C34.5765 3.88267 33.6623 3.26941 32.6553 2.85173C31.6483 2.43405 30.5684 2.22024 29.4782 2.22268H10.5227C9.43228 2.22121 8.35232 2.4349 7.34466 2.8515C6.337 3.26809 5.42143 3.87941 4.65042 4.65043C3.8794 5.42145 3.26808 6.33701 2.85148 7.34467C2.43489 8.35234 2.2212 9.43229 2.22266 10.5227V34.2227C2.22266 34.9689 2.45746 35.6963 2.8938 36.3016C3.33014 36.907 3.9459 37.3598 4.65385 37.5958C5.36181 37.8318 6.12607 37.839 6.83837 37.6165C7.55067 37.394 8.17491 36.953 8.62266 36.356L10.0004 34.4449C10.3328 34.0046 10.7625 33.6471 11.256 33.4004C11.7494 33.1537 12.2932 33.0244 12.8449 33.0227H29.4782C31.6748 33.0198 33.7809 32.1474 35.3361 30.5963C36.8914 29.0452 37.7694 26.9414 37.7782 24.7449V10.5227C37.7807 9.43248 37.5668 8.35263 37.1492 7.34562C36.7315 6.33861 36.1182 5.42443 35.3449 4.65601ZM35.4004 24.7449C35.3975 26.3147 34.7726 27.8193 33.6626 28.9293C32.5526 30.0393 31.048 30.6642 29.4782 30.6671H12.8893C11.9694 30.6684 11.0624 30.8828 10.2392 31.2934C9.41606 31.704 8.69922 32.2997 8.14489 33.0338L6.72266 34.9338C6.57225 35.1305 6.36415 35.2754 6.12742 35.3481C5.89069 35.4209 5.63716 35.4179 5.40221 35.3396C5.16726 35.2613 4.96264 35.1115 4.81691 34.9113C4.67118 34.7111 4.59161 34.4703 4.58933 34.2227V10.5227C4.58787 9.74309 4.74034 8.97088 5.038 8.25036C5.33566 7.52983 5.77265 6.87516 6.3239 6.32391C6.87515 5.77266 7.52982 5.33567 8.25034 5.03801C8.97087 4.74035 9.74308 4.58788 10.5227 4.58934H29.4782C31.0489 4.58934 32.5552 5.21329 33.6659 6.32392C34.7765 7.43455 35.4004 8.94089 35.4004 10.5116V24.7449Z" fill="black" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M12.7679 9.33203L13.679 10.4543L15.0234 10.9654L14.2345 12.1765L14.1679 13.6209L12.7679 13.2431L11.379 13.6209L11.3123 12.1765L10.5234 10.9654L11.8679 10.4543L12.7679 9.33203Z" fill="black" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M18.7009 9.33203L19.6009 10.4543L20.9564 10.9654L20.1675 12.1765L20.0898 13.6209L18.7009 13.2431L17.3009 13.6209L17.2342 12.1765L16.4453 10.9654L17.7898 10.4543L18.7009 9.33203Z" fill="black" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M24.6227 9.33203L25.5339 10.4543L26.8783 10.9654L26.0894 12.1765L26.0227 13.6209L24.6227 13.2431L23.2339 13.6209L23.1561 12.1765L22.3672 10.9654L23.7227 10.4543L24.6227 9.33203Z" fill="black" />
                                    <path d="M10.5234 23.5547H20.0012V25.9214H10.5234V23.5547Z" fill="black" />
                                    <path d="M10.5234 17.6328H30.6679V19.9995H10.5234V17.6328Z" fill="black" />
                                </svg>


                            </div>
                        </div>
                        <div className=" p-[20px] bg-white flex gap-[5px] justify-between ">

                            <div className="flex flex-col justify-between w-full gap-[5px]">
                                <h1 className="text-[15px] text-[#344054]">Total Value</h1>
                                <div className='flex justify-between items-end'>
                                    <h2 className="text-[28px] font-semibold">{state?.successRate}</h2>

                                </div>
                                <p className="text-[#5BBB7BBF] text-[14px]">Increased by: 1.2%</p>


                            </div>
                            <div className="flex items-center">
                                <svg width="58" height="52" viewBox="0 0 58 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="38" cy="32" r="20" fill="#1DBF73" fill-opacity="0.08" />
                                    <path d="M31.8541 37.7782H9.33191C8.08189 37.7692 6.88521 37.2706 5.99858 36.3894C5.55923 35.9524 5.21041 35.433 4.97208 34.861C4.73375 34.2891 4.6106 33.6757 4.60969 33.056V10.3116C4.60341 9.8426 4.69057 9.37706 4.86607 8.94212C5.04157 8.50718 5.30192 8.11153 5.63191 7.77824L10.1652 3.26713C10.4954 2.93446 10.8884 2.67079 11.3214 2.49148C11.7544 2.31217 12.2188 2.2208 12.6875 2.22268H31.8541C32.7971 2.22268 33.7015 2.59729 34.3683 3.26408C35.0351 3.93088 35.4097 4.83525 35.4097 5.77824V34.2227C35.4097 35.1657 35.0351 36.07 34.3683 36.7368C33.7015 37.4036 32.7971 37.7782 31.8541 37.7782ZM12.6875 4.58935C12.3752 4.59028 12.0759 4.71401 11.8541 4.9338L7.30969 9.47824C7.09091 9.70068 6.96736 9.99958 6.96525 10.3116V33.0338C6.96496 33.3459 7.0267 33.6549 7.14687 33.9429C7.26704 34.231 7.44324 34.4922 7.66525 34.7116C8.1122 35.1528 8.71495 35.4003 9.34302 35.4005H31.8541C32.0103 35.4005 32.1649 35.3697 32.3091 35.31C32.4533 35.2502 32.5844 35.1626 32.6948 35.0522C32.8052 34.9418 32.8928 34.8108 32.9525 34.6665C33.0123 34.5223 33.043 34.3677 33.043 34.2116V5.77824C33.043 5.46293 32.9178 5.16053 32.6948 4.93757C32.4718 4.71461 32.1694 4.58935 31.8541 4.58935H12.6875Z" fill="#1F4B3F" />
                                    <path d="M11.6992 11.6992H28.2881V14.0659H11.6992V11.6992Z" fill="#1F4B3F" />
                                    <path d="M11.6992 16.4453H28.2881V18.812H11.6992V16.4453Z" fill="#1F4B3F" />
                                    <path d="M11.6992 21.1875H19.9992V23.5542H11.6992V21.1875Z" fill="#1F4B3F" />
                                    <path d="M11.6992 28.3008H23.5548V30.6674H11.6992V28.3008Z" fill="#1F4B3F" />
                                    <path d="M25.9219 28.3008H28.2885V30.6674H25.9219V28.3008Z" fill="#1F4B3F" />
                                </svg>



                            </div>
                        </div>
                    </div >
                    <div className="lg:px-[3rem] lg:w-[90%] w-full mx-auto px-[2rem] lg:bg-white">
                        <table className="min-w-full xl:table hidden table-auto border-gray-300 border-collapse">
                            <thead>
                                <tr className="bg-[#FDFBFD]">
                                    <th className="p-[10px] bg-[#1DBF7314]  text-[1.07rem] font-medium lg:px-[30px] lg:py-[30px] text-left border-b border-gray-300">Bond Name</th>
                                    <th className="p-[10px] bg-[#1DBF7314] text-[1.07rem] font-medium text-left border-b lg:py-[30px] border-gray-30">Description</th>
                                    <th className="p-[10px] bg-[#1DBF7314] text-[1.07rem] font-medium text-left border-b lg:py-[30px] border-gray-30">Price</th>
                                    <th className="p-[10px] bg-[#1DBF7314] text-[1.07rem] font-medium text-left border-b lg:py-[30px] border-gray-30">Total Issued</th>
                                    <th className="p-[10px] bg-[#1DBF7314] text-[1.07rem] font-medium text-left border-b lg:py-[30px] border-gray-30">Bond Sold</th>
                                    <th className="p-[10px] bg-[#1DBF7314] text-[1.07rem] font-medium text-left border-b lg:py-[30px] border-gray-30">Status</th>
                                    <th className="p-[10px] bg-[#1DBF7314] text-[1.07rem] font-medium text-left border-b lg:py-[30px] border-gray-30">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {state?.bonds?.length > 0 ? currentRows?.map((bond, index) => (
                                    <tr key={index}>
                                        <td className="p-[10px] lg:pl-[30px] text-[0.94rem] border-b border-b-[#E9E9E9]  font-normal pt-[30px]">{bond.title}</td>
                                        <td className="p-[10px] lg:pl-[30px] text-[0.94rem] border-b border-b-[#E9E9E9]  font-normal pt-[30px]">{bond.description}</td>
                                        <td className="p-[10px] text-[0.94rem] font-normal border-b border-b-[#E9E9E9]  pt-[30px]  text-[#1DBF73]">{'$' + bond.bond_issuerance_amount}/bond</td>
                                        <td className="p-[10px] text-[0.94rem] font-normal border-b border-b-[#E9E9E9]  pt-[30px]">{bond.total_bonds}</td>
                                        <td className="p-[10px] text-[0.94rem] font-normal border-b border-b-[#E9E9E9]  pt-[30px]">{bond.bond_sold}</td>
                                        <td className="p-[10px] text-[0.94rem] font-normal border-b border-b-[#E9E9E9]  pt-[30px]">{bond.status}</td>
                                        <td className={`flex  p-[20px] items-center gap-[6px]`}>
                                            <Link to={`/promisebonddetail/${bond._id}`} className="flex bg-[#FFEDE8] p-[20px] items-center gap-[6px]">
                                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <g clip-path="url(#clip0_220_908)">
                                                        <path d="M3.0503 15.3332H4.8658C5.15097 15.3332 5.3823 15.1183 5.3823 14.8332C5.3823 14.548 5.15114 14.3332 4.8658 14.3332H3.0503C2.28597 14.3332 1.66797 13.6548 1.66797 12.8613V5.49984H14.168V7.38017C14.168 7.66534 14.4661 7.89667 14.7513 7.89667C15.0365 7.89667 15.3346 7.6655 15.3346 7.38017V3.14884C15.3346 1.80334 14.0701 0.666504 12.739 0.666504H3.0503C1.71647 0.666504 0.667969 1.78 0.667969 3.14884V12.8613C0.667969 14.2243 1.71647 15.3332 3.0503 15.3332ZM1.66797 3.14884C1.66797 2.36317 2.29897 1.6665 3.0503 1.6665H12.739C13.5101 1.6665 14.168 2.36317 14.168 3.14884V4.49984H1.66797V3.14884Z" fill="#1F4B3F" />
                                                        <path d="M12.4066 2.6665H12.2001C11.9149 2.6665 11.6836 2.96467 11.6836 3.24984C11.6836 3.535 11.9148 3.83317 12.2001 3.83317H12.4066C12.6918 3.83317 12.9231 3.535 12.9231 3.24984C12.9231 2.96467 12.6918 2.6665 12.4066 2.6665Z" fill="#1F4B3F" />
                                                        <path d="M10.6488 2.6665H10.4423C10.1571 2.6665 9.92578 2.96467 9.92578 3.24984C9.92578 3.535 10.1569 3.83317 10.4423 3.83317H10.6488C10.9339 3.83317 11.1653 3.535 11.1653 3.24984C11.1653 2.96467 10.9339 2.6665 10.6488 2.6665Z" fill="#1F4B3F" />
                                                        <path d="M8.78941 2.6665H8.58291C8.29774 2.6665 8.06641 2.96467 8.06641 3.24984C8.06641 3.535 8.29757 3.83317 8.58291 3.83317H8.78941C9.07457 3.83317 9.30591 3.535 9.30591 3.24984C9.30591 2.96467 9.07457 2.6665 8.78941 2.6665Z" fill="#1F4B3F" />
                                                        <path d="M10.1662 7.85547C7.9015 7.85547 5.83333 9.27764 5 11.3945C5 11.3945 6.08417 15.3868 10.1662 15.2998C14.4792 15.208 15.3333 11.3945 15.3333 11.3945C14.5 9.27764 12.4315 7.85547 10.1662 7.85547ZM10.203 14.267C8.43067 14.267 6.812 13.1941 6.11367 11.5776C6.81183 9.96114 8.43067 8.8883 10.203 8.8883C11.9758 8.8883 13.5948 9.96114 14.2932 11.5776C13.595 13.1941 11.9758 14.267 10.203 14.267Z" fill="#1F4B3F" />
                                                        <path d="M10.2032 9.57422C9.09822 9.57422 8.19922 10.4731 8.19922 11.5781C8.19922 12.6831 9.09822 13.5819 10.2032 13.5819C11.3082 13.5819 12.2071 12.6831 12.2071 11.5781C12.2071 10.4731 11.3082 9.57422 10.2032 9.57422ZM10.2032 12.5491C9.66772 12.5491 9.23205 12.1134 9.23205 11.5781C9.23205 11.0427 9.66772 10.6071 10.2032 10.6071C10.7387 10.6071 11.1742 11.0427 11.1742 11.5781C11.1742 12.1134 10.7387 12.5491 10.2032 12.5491Z" fill="#1F4B3F" />
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0_220_908">
                                                            <rect width="16" height="16" fill="white" />
                                                        </clipPath>
                                                    </defs>
                                                </svg>View</Link>
                                        </td>
                                    </tr>
                                )) : <div className="flex justify-center h-[100%] items-center text-center w-full">
                                    <p className="flex justify-center items-center w-full text-center">No Bond Fond</p>
                                </div>}
                            </tbody>
                        </table>
                        <div className='w-full xl:hidden block'>
                            <div className="flex bg-[#f2f2f2] flex-col gap-[20px]">
                                {currentRows?.map((bond, index) => (
                                    <div key={index} className="p-[20px] bg-white flex flex-col gap-[20px] border-b border-gray-300 py-4">
                                        <div className="flex flex-col gap-[10px]">
                                            <div className="flex flex-col gap-[10px]">

                                                <p className="text-[16px] font-semibold">{bond.title}</p>
                                            </div>
                                            <div className="flex flex-col gap-[10px]">

                                                <p className="text-[14px] font-semibold">{bond.description}</p>
                                            </div>

                                            <div className="flex flex-col gap-[10px]">

                                                <p className="text-[14px] font-semibold">{bond.total_bonds}</p>
                                            </div>
                                            <div className="flex flex-col gap-[10px]">

                                                <p className="text-[14px] font-semibold">{bond.bond_sold}</p>
                                            </div>
                                            <div className="flex flex-col gap-[10px]">

                                                <p className="text-[14px] font-semibold">{bond.status}</p>
                                            </div>

                                        </div>
                                        <div className="flex justify-between items-center">
                                            <div className="flex flex-col gap-[10px]">
                                                <p className="text-[0.75rem] text-[#1DBF73]">{'$' + bond.bond_issuerance_amount}/bond</p>
                                            </div>
                                            <div className="flex flex-col gap-[10px]">
                                                <p className="text-[0.75rem]  font-semibold">
                                                    <Link to={`/promisebonddetail/${bond._id}`} className="flex bg-[#FFEDE8] p-[20px] items-center gap-[6px]">View</Link>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="flex justify-center items-center mt-5 gap-2">

                            <button
                                onClick={handlePrev}
                                disabled={currentPage === 1}
                                className={`p-2 border border-[#E9E9E9] rounded-full ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
                                    }`}
                            >
                                <svg
                                    width="9"
                                    height="15"
                                    viewBox="0 0 9 15"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M0.820556 8.00232L7.18034 14.3445C7.38871 14.5522 7.72607 14.5518 7.93409 14.3434C8.14195 14.1351 8.14141 13.7975 7.93301 13.5897L1.95178 7.62498L7.93323 1.6603C8.1416 1.45244 8.14214 1.11511 7.9343 0.906712C7.83003 0.802244 7.69341 0.75001 7.5568 0.75001C7.42053 0.75001 7.28446 0.801895 7.18037 0.905638L0.820556 7.24766C0.720197 7.34751 0.663881 7.4834 0.663881 7.62498C0.663881 7.76656 0.720358 7.90229 0.820556 8.00232Z"
                                        fill="#222222"
                                    />
                                </svg>
                            </button>


                            {Array.from({ length: totalPages }, (_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrentPage(i + 1)}
                                    className={`px-3 py-1 rounded-full ${currentPage === i + 1
                                        ? "bg-[#1DBF73] text-white"
                                        : "border border-[#E9E9E9] bg-white"
                                        }`}
                                >
                                    {i + 1}
                                </button>
                            ))}


                            <button
                                onClick={handleNext}
                                disabled={currentPage === totalPages}
                                className={`p-2 border border-[#E9E9E9] rounded-full ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
                                    }`}
                            >
                                <svg
                                    width="9"
                                    height="15"
                                    viewBox="0 0 9 15"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M8.17944 7.24768L1.81966 0.90549C1.61129 0.697817 1.27393 0.698166 1.06591 0.906564C0.858051 1.11493 0.858588 1.45248 1.06699 1.66031L7.04822 7.62502L1.06677 13.5897C0.8584 13.7976 0.857863 14.1349 1.0657 14.3433C1.16998 14.4478 1.30659 14.5 1.4432 14.5C1.57947 14.5 1.71554 14.4481 1.81963 14.3444L8.17944 8.00234C8.2798 7.90249 8.33612 7.7666 8.33612 7.62502C8.33612 7.48344 8.27964 7.34771 8.17944 7.24768Z"
                                        fill="#222222"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </>}
                <FooterComponent />
            </div>
        </>
    )
}