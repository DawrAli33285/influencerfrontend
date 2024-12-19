import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BASE_URL } from "../baseURL";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import banner from "../faqbanner.png"
import mblbanner from "../faqbannermbl.png"
import HomeHeader from "../components/homeheader";
import HomeFooter from "../components/homefooter";
import { HeaderComponent } from "../components/header/header.component";
import { FooterComponent } from "../components/footer/footer.component";

export default function Verification() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const [phoneVerification, setPhoneVerification] = useState(false);
    const [selectedPlatform, setSelectedPlatform] = useState(null);
    const [showuserType, setShowUserType] = useState(false)
    const [showtype, setShowType] = useState(false)
    const [userType, setUserType] = useState(null);
    const [followers, setFollowers] = useState(false)
    const [emailVerification, setEmailVerification] = useState(false);
    const [followersCount, setFollowersCount] = useState(0)
    const [token, setToken] = useState("")

    const handleUserSelection = (type) => {
        setUserType(type);
        setShowType(true);
    };
    const platforms = [
        {
            name: 'Facebook',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.676 0h-21.352c-.729 0-1.324.595-1.324 1.324v21.352c0 .729.595 1.324 1.324 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.672c0-3.1 1.892-4.788 4.657-4.788 1.325 0 2.464.099 2.795.143v3.24l-1.918.001c-1.505 0-1.797.715-1.797 1.765v2.311h3.594l-.468 3.622h-3.126v9.293h6.125c.729 0 1.324-.595 1.324-1.324v-21.352c0-.729-.595-1.324-1.324-1.324z" />
                </svg>
            ),
        },
        {
            name: 'Instagram',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.849.07 1.366.062 2.633.349 3.608 1.324.976.976 1.261 2.244 1.323 3.608.059 1.265.071 1.645.071 4.849s-.012 3.584-.071 4.849c-.062 1.366-.349 2.633-1.323 3.608-.976.976-2.244 1.261-3.608 1.323-1.265.059-1.645.071-4.849.071s-3.584-.012-4.849-.071c-1.366-.062-2.633-.349-3.608-1.323-.976-.976-1.261-2.244-1.323-3.608-.059-1.265-.071-1.645-.071-4.849s.012-3.584.071-4.849c.062-1.366.349-2.633 1.323-3.608.976-.976 2.244-1.261 3.608-1.323 1.265-.059 1.645-.071 4.849-.071zm0-2.163c-3.259 0-3.667.014-4.947.073-1.354.062-2.72.349-3.765 1.395-1.046 1.046-1.333 2.412-1.395 3.765-.059 1.28-.073 1.688-.073 4.947s.014 3.667.073 4.947c.062 1.354.349 2.72 1.395 3.765 1.046 1.046 2.412 1.333 3.765 1.395 1.28.059 1.688.073 4.947.073s3.667-.014 4.947-.073c1.354-.062 2.72-.349 3.765-1.395 1.046-1.046 1.333-2.412 1.395-3.765.059-1.28.073-1.688.073-4.947s-.014-3.667-.073-4.947c-.062-1.354-.349-2.72-1.395-3.765-1.046-1.046-2.412-1.333-3.765-1.395-1.28-.059-1.688-.073-4.947-.073z" />
                </svg>
            ),
        },
        {
            name: 'TikTok',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M16.571 0h-4.571v17.482c-.389.152-.811.234-1.247.234-1.992 0-3.611-1.62-3.611-3.611s1.62-3.611 3.611-3.611c.186 0 .367.017.547.044v-4.68c-.181-.019-.362-.044-.547-.044-4.624 0-8.371 3.747-8.371 8.371 0 4.624 3.747 8.371 8.371 8.371 4.591 0 8.322-3.698 8.365-8.263h-4.479v4.522h8.613v-12.504c-2.225-.001-4.273-.906-5.658-2.372z" />
                </svg>
            ),
        },
        {
            name: 'YouTube',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.615 3.184c-2.259-2.184-15.162-2.184-17.421 0-2.259 2.184-2.259 13.632 0 15.816 2.259 2.184 15.162 2.184 17.421 0 2.259-2.184 2.259-13.632 0-15.816zm-9.615 13.632v-10l8 5-8 5z" />
                </svg>
            ),
        },
    ];
    const [verificationData, setVerificationData] = useState({
        email: state?.email || '',
        mobile: '',
        emailCode: '',
        mobileCode: '',
    });
    const [emailSent, setEmailSent] = useState(false);
    const [mobileSent, setMobileSent] = useState(false);
    const handleChange = (e, index) => {
        const { value } = e.target;

        const updatedCode = verificationData.emailCode.split("");
        updatedCode[index] = value.slice(-1);

        setVerificationData({
            ...verificationData,
            emailCode: updatedCode.join(""),
        });

    };

    const handleSendEmailVerification = async () => {
        setEmailSent(true);
        setVerificationData({
            email: state?.email || '',
            mobile: '',
            emailCode: '',
            mobileCode: '',
        })
        try {
            let email = localStorage.getItem('email');
            let response = await axios.post(`${BASE_URL}/emailOTP`, { email });
            toast.success("OTP sent successfully", { containerId: "verificationPage" });
        } catch (e) {
            toast.error(e?.response?.data?.error || "Client error, please try again", { containerId: "verificationPage" });
        }
    };

    const handleSendMobileVerification = async () => {
        try {
            let phoneNumber = localStorage.getItem('phoneNumber');
            let email = localStorage.getItem('email');
            let response = await axios.post(`${BASE_URL}/mobile-otp`, { phoneNumber, email });
            toast.success(response.data.message, { containerId: "verificationPage" });
            setMobileSent(true);
        } catch (e) {
            toast.error(e?.response?.data?.error || "Client error, please try again", { containerId: "verificationPage" });
        }
    };

    const handleEmailVerify = async () => {
        try {
            let email = localStorage.getItem('email');
            let response = await axios.post(`${BASE_URL}/verifyEmailOTP`, { email, otp: verificationData.emailCode });
            toast.success("Email verified successfully", { containerId: "verificationPage" });
            setEmailVerification(true);
        } catch (e) {
            toast.error(e?.response?.data?.error || "Client error, please try again", { containerId: "verificationPage" });
        }
    };

    const handleMobileVerify = async () => {
        try {
            let email = localStorage.getItem('email');
            let response = await axios.post(`${BASE_URL}/verifyOTP`, { email, otp: verificationData.mobileCode });
            toast.success("Mobile verified successfully", { containerId: "verificationPage" });
            setPhoneVerification(true);
        } catch (e) {
            toast.error(e?.response?.data?.error || "Client error, please try again", { containerId: "verificationPage" });
        }
    };



    useEffect(() => {
        getVerificationData();
    }, [emailVerification, phoneVerification]);

    const getVerificationData = async (skip) => {

        try {
            let email = localStorage.getItem('email');
            let response = await axios.get(`${BASE_URL}/getVerificationData/${email}/${skip}`);

            console.log(response.data)
            console.log("RESPONSE")

            if (response.data.token) {

                localStorage.setItem('token', response.data.token)
                localStorage.setItem("buyerToken", response.data.buyertoken)
                setToken(response.data.token)
                // navigate('/dashboard')

            }
            setEmailVerification(response.data.user.is_email_verified);
            setPhoneVerification(true);
            if (emailVerification) {

                setShowUserType(!showtype);
            }
            if (!response.data.questions) {

            } else {
                navigate('/buyerdashboard')
            }

        } catch (e) {
            console.error("Error fetching verification data:", e);
        }
    };
    const handleSelection = (platform) => {
        setSelectedPlatform(platform);

    };


    const answerQuestions = async () => {
        try {
            if (followersCount.length == 0 || followersCount == 0) {
                toast.error("Please enter valid followers counts", { containerId: "verificationPage" })
                return;
            }
            let data = {
                userType: userType,
                socialMedia: selectedPlatform,
                no_of_followers: followersCount
            }

            let headers = {
                headers: {
                    authorization: `Bearer ${token}`
                }
            }

            let response = await axios.post(`${BASE_URL}/answerQuestions`, data, headers)
            navigate('/buyerdashboard')
        } catch (e) {
            if (e?.response?.data?.error) {
                toast.error(e?.response?.data?.error, { containerId: "verificationPage" })
            } else {
                toast.error("Something went wrong", { containerId: "verificationPage" })
            }
        }
    }

    const answerBuyerQuestion = async (type) => {
        try {
            let data = {
                userType: type,
            }

            let headers = {
                headers: {
                    authorization: `Bearer ${token}`
                }
            }

            let response = await axios.post(`${BASE_URL}/answerQuestions`, data, headers)
            navigate('/buyerdashboard')
        } catch (e) {
            if (e?.response?.data?.error) {
                toast.error(e?.response?.data?.error, { containerId: "verificationPage" })
            } else {
                toast.error("Something went wrong", { containerId: "verificationPage" })
            }
        }
    }


    return (
        <>
            <HeaderComponent />
            <ToastContainer limit={1} containerId="verificationPage" />
            <div className="relative flex items-center justify-center w-full h-[300px]">
                <img src={banner} className="lg:block hidden w-full h-full object-cover" alt="img" />
                <img src={mblbanner} className="block lg:hidden w-full h-full object-cover" alt="img" />
                <div className="absolute lg:px-0 px-[1rem] gap-[20px] left-0 lg:pl-[10rem] top-0 w-full h-full flex flex-col lg:items-start items-center justify-center">
                    <h1 className="lg:text-[2.38rem] text-[1.9rem] md:text-start text-center text-white font-bold">Verify your email to secure your account and complete setup.</h1>
                    <p className="lg:text-[0.94rem] text-[.75rem] text-white">Fostering growth, forging relationships, and unlocking potential.</p>
                </div>
            </div>

            <div className="relative w-full h-full">
                <div className="w-full max-w-[700px] mx-auto mt-20 p-6 border border-[#E9E9E9] rounded-lg shadow-lg">
                    {
                        followers ? <div className="flex flex-col gap-[20px]">
                            <h2 className="text-center text-2xl font-semibold mb-4">How Many Followers/Subscribers You have</h2>
                            <input
                                value={followersCount}
                                onChange={(e) => {
                                    setFollowersCount(e.target.value)
                                }}
                                type="number"
                                className="block w-full px-3 py-4 border rounded-[20px] border-gray-300 focus:outline-none focus:ring focus:border-blue-500"
                                placeholder="Followers/Subscribers"
                            />
                            <button
                                onClick={answerQuestions}
                                disabled={!selectedPlatform}
                                className={`mt-4 w-full bg-[#1DBF73] text-white font-bold py-2 px-4 rounded-md ${selectedPlatform ? 'hover:bg-[#17a866]' : 'opacity-50 cursor-not-allowed'
                                    }`}
                            >
                                Continue
                            </button>

                        </div> : <div>
                            {
                                showuserType ?
                                    <div >
                                        {
                                            showtype ?
                                                <div className="flex flex-col gap-[20px]">
                                                    <h2 className="text-center text-2xl font-semibold mb-4">What Type Of Issuer are you?</h2>
                                                    <div className="grid grid-cols-2 gap-4">
                                                        {platforms.map((platform) => (
                                                            <div
                                                                key={platform.name}
                                                                onClick={() => handleSelection(platform.name)}
                                                                className={`flex flex-col items-center justify-center gap-2 p-4 cursor-pointer border ${selectedPlatform === platform.name ? 'border-black' : 'border-gray-300'
                                                                    } rounded-[20px] hover:shadow-md transition`}
                                                            >
                                                                {platform.icon}
                                                                <span className="font-medium">{platform.name}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                    <button
                                                        onClick={() => { setFollowers(!followers) }}
                                                        disabled={!selectedPlatform}
                                                        className={`mt-4 w-full bg-[#1DBF73] text-white font-bold py-2 px-4 rounded-md ${selectedPlatform ? 'hover:bg-[#17a866]' : 'opacity-50 cursor-not-allowed'
                                                            }`}
                                                    >
                                                        Continue
                                                    </button>
                                                </div>
                                                :
                                                <div>
                                                    <h2 className="text-center text-2xl font-semibold mb-4">Are you a Buyer or an Issuer?</h2>
                                                    <div className="flex flex-row justify-between gap-4">
                                                        <div
                                                            onClick={() => answerBuyerQuestion('Buyer')}
                                                            className={`flex items-center justify-center px-6 py-4 text-lg font-medium border rounded-md cursor-pointer transition ${userType === 'Buyer' ? 'bg-[#1DBF73] text-white border-transparent' : 'border-gray-300'
                                                                } hover:bg-[#1DBF73] hover:text-white`}
                                                        >
                                                            Buyer
                                                        </div>
                                                        <div
                                                            onClick={() => handleUserSelection('Issuer')}
                                                            className={`flex items-center justify-center px-6 py-4 text-lg font-medium border rounded-md cursor-pointer transition ${userType === 'Issuer'
                                                                ? 'bg-[#1DBF73] text-white border-transparent'
                                                                : 'border-gray-300'
                                                                } hover:bg-[#1DBF73] hover:text-white`}
                                                        >
                                                            Issuer
                                                        </div>
                                                    </div>

                                                </div>
                                        }
                                    </div>
                                    :
                                    <div>
                                        <h2 className="text-center lg:text-[2.4rem] text-[1.5rem] font-semibold ">Verify Your Email Address</h2>
                                        <p className="lg:text-[.975rem] text-[.75rem] mb-[4rem] text-center mt-[20px]">We’ve send the verification OTP to provided email.</p>


                                        <div className="mb-6 flex flex-col gap-[20px] items-center">
                                            <svg className="w-[110px] h-[75px] md:w-[146px] md:h-[100px]" width="147" height="100" viewBox="0 0 147 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M121.101 19.4375L73.5024 61.3815L25.8933 19.4369C23.9976 17.7668 21.108 17.9503 19.4385 19.8448C17.7696 21.7399 17.9513 24.6295 19.847 26.2996L70.4799 70.9082C71.3439 71.6692 72.4238 72.0496 73.5031 72.0496C74.5823 72.0496 75.6628 71.6692 76.5268 70.9076L127.149 26.299C129.044 24.6295 129.226 21.7393 127.557 19.8442C125.886 17.9509 122.997 17.768 121.101 19.4375Z" fill="#1DBF73" />
                                                <path d="M133.267 0H13.7193C6.1548 0 0 6.15419 0 13.7193V86.2807C0 93.8458 6.1548 100 13.7193 100H133.267C140.832 100 146.987 93.8458 146.987 86.2807V13.7193C146.987 6.1548 140.832 0 133.267 0ZM137.84 86.2807C137.84 88.802 135.789 90.8538 133.267 90.8538H13.7193C11.1974 90.8538 9.14623 88.802 9.14623 86.2807V13.7193C9.14623 11.198 11.1974 9.14623 13.7193 9.14623H133.267C135.789 9.14623 137.84 11.198 137.84 13.7193V86.2807Z" fill="#1DBF73" />
                                            </svg>


                                            {emailVerification ? (
                                                <svg width={50} height={50} fill="#30db24" viewBox="0 0 24 24">
                                                    <path d="M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm5.676,8.237-6,5.5a1,1,0,0,1-1.383-.03l-3-3a1,1,0,1,1,1.414-1.414l2.323,2.323,5.294-4.853a1,1,0,1,1,1.352,1.474Z"></path>
                                                </svg>
                                            ) : (
                                                <>
                                                    {!emailSent && (
                                                        <>
                                                            <p >
                                                                Didn’t get the code? <a onClick={handleSendEmailVerification} to="#" className="text-[#1DBF73] cursor-pointer underline">

                                                                    Resend
                                                                </a>
                                                            </p>
                                                            <button onClick={handleSendEmailVerification}
                                                                className="w-full md:h-[60px] bg-black rounded-[20px] lg:text-[.975rem] text-[.75rem] text-white font-bold py-[10px] px-4  mt-2">
                                                                Send Email Verification
                                                            </button>

                                                        </>
                                                    )}
                                                    {emailSent && (
                                                        <>
                                                            <div className="flex justify-center gap-2 mt-4">
                                                                {Array.from({ length: 6 }).map((_, index) => (
                                                                    <input
                                                                        key={index}
                                                                        type="text"
                                                                        maxLength={1}
                                                                        className="md:w-[100px] md:h-[45px] w-[40px] h-[30px] text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1DBF73] focus:border-[#1DBF73]"
                                                                        value={verificationData.emailCode[index] || ""}
                                                                        onChange={(e) => handleChange(e, index)}
                                                                    />
                                                                ))}
                                                            </div>


                                                            <p >
                                                                Didn’t get the code? <a onClick={handleSendEmailVerification} to="#" className="text-[#1DBF73] cursor-pointer underline">

                                                                    Resend
                                                                </a>
                                                            </p>
                                                            <button onClick={handleEmailVerify}
                                                                className="w-full md:h-[60px] bg-black rounded-[20px] lg:text-[.975rem] text-[.75rem] text-white font-bold py-[10px] px-4  mt-2">
                                                                Verify Email
                                                            </button>

                                                        </>
                                                    )}
                                                    {/* <button onClick={handleSendEmailVerification} className="w-full bg-black lg:text-[.975rem] text-[.75rem] rounded-[20px] text-white font-bold py-[10px] px-4  mt-2 ">
                                                        Send Code Again
                                                    </button> */}
                                                </>
                                            )}
                                            {/* <p onClick={() => getVerificationData(true)} className=" cursor-pointer">Skip</p> */}
                                        </div>

                                    </div>
                            }
                        </div>
                    }

                </div>
            </div>
            <FooterComponent />
        </>
    );
}
