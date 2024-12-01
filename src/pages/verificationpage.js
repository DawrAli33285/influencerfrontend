import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BASE_URL } from "../baseURL";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Verification() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const [phoneVerification, setPhoneVerification] = useState(false);
    const [selectedPlatform, setSelectedPlatform] = useState(null);
    const [showuserType, setShowUserType] = useState(false)
    const [showtype, setShowType] = useState(false)
    const [userType, setUserType] = useState(null);

    const [emailVerification, setEmailVerification] = useState(false);
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setVerificationData({
            ...verificationData,
            [name]: value,
        });
    };

    const handleSendEmailVerification = async () => {
        setEmailSent(!emailSent);
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
                // navigate('/dashboard')
                setShowUserType(!showtype);
            }
            setEmailVerification(response.data.user.is_email_verified);
            setPhoneVerification(true);

        } catch (e) {
            console.error("Error fetching verification data:", e);
        }
    };
    const handleSelection = (platform) => {
        setSelectedPlatform(platform);
        
    };
    return (
        <>
            <ToastContainer limit={1} containerId="verificationPage" />
            <div className="relative w-full h-full">
                <div className="w-full max-w-md mx-auto mt-20 p-6 border rounded-lg shadow-lg">
                    {
                        showuserType ?
                            <div>
                                {
                                    showtype ?
                                        <div className="flex flex-col gap-[20px]">
                                            <h2 className="text-center text-2xl font-semibold mb-4">What Type Of Influencer are you?</h2>
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
                                                onClick={() => navigate('/dashboard')}
                                                disabled={!selectedPlatform}
                                                className={`mt-4 w-full bg-[#1DBF73] text-white font-bold py-2 px-4 rounded-md ${selectedPlatform ? 'hover:bg-[#17a866]' : 'opacity-50 cursor-not-allowed'
                                                    }`}
                                            >
                                                Continue
                                            </button>
                                        </div>
                                        :
                                        <div>
                                            <h2 className="text-center text-2xl font-semibold mb-4">Are you a Buyer or an Influencer?</h2>
                                            <div className="flex flex-row justify-between gap-4">
                                                <div
                                                    onClick={() => handleUserSelection('Buyer')}
                                                    className={`flex items-center justify-center px-6 py-4 text-lg font-medium border rounded-md cursor-pointer transition ${userType === 'Buyer' ? 'bg-[#1DBF73] text-white border-transparent' : 'border-gray-300'
                                                        } hover:bg-[#1DBF73] hover:text-white`}
                                                >
                                                    Buyer
                                                </div>
                                                <div
                                                    onClick={() => handleUserSelection('Influencer')}
                                                    className={`flex items-center justify-center px-6 py-4 text-lg font-medium border rounded-md cursor-pointer transition ${userType === 'Influencer'
                                                        ? 'bg-[#1DBF73] text-white border-transparent'
                                                        : 'border-gray-300'
                                                        } hover:bg-[#1DBF73] hover:text-white`}
                                                >
                                                    Influencer
                                                </div>
                                            </div>

                                        </div>
                                }
                            </div>
                            :
                            <div>
                                <h2 className="text-center text-2xl font-semibold mb-4">Verification</h2>

                                {/* Email Verification */}
                                <div className="mb-6 flex flex-col gap-[20px] items-center">
                                    <svg width="68" height="54" viewBox="0 0 68 54" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M7.33268 53.6654C5.49935 53.6654 3.9299 53.0126 2.62435 51.707C1.31879 50.4015 0.666016 48.832 0.666016 46.9987V6.9987C0.666016 5.16536 1.31879 3.59592 2.62435 2.29036C3.9299 0.984809 5.49935 0.332031 7.33268 0.332031H60.666C62.4993 0.332031 64.0688 0.984809 65.3743 2.29036C66.6799 3.59592 67.3327 5.16536 67.3327 6.9987V46.9987C67.3327 48.832 66.6799 50.4015 65.3743 51.707C64.0688 53.0126 62.4993 53.6654 60.666 53.6654H7.33268ZM33.9993 29.7487C34.2771 29.7487 34.5688 29.707 34.8743 29.6237C35.1799 29.5404 35.4716 29.4154 35.7493 29.2487L59.3327 14.4987C59.7771 14.2209 60.1105 13.8737 60.3327 13.457C60.5549 13.0404 60.666 12.582 60.666 12.082C60.666 10.9709 60.1938 10.1376 59.2493 9.58203C58.3049 9.02647 57.3327 9.05425 56.3327 9.66536L33.9993 23.6654L11.666 9.66536C10.666 9.05425 9.69379 9.04036 8.74935 9.6237C7.8049 10.207 7.33268 11.0265 7.33268 12.082C7.33268 12.6376 7.44379 13.1237 7.66602 13.5404C7.88824 13.957 8.22157 14.2765 8.66602 14.4987L32.2493 29.2487C32.5271 29.4154 32.8188 29.5404 33.1243 29.6237C33.4299 29.707 33.7216 29.7487 33.9993 29.7487Z" fill="#1E1E1E" />
                                    </svg>

                                    <label htmlFor="email" className="block text-lg font-medium">Verify Your Email</label>
                                    <p className="text-base text-[#1C1C1CA3]">We’ve send the verification OTP to provided email.</p>
                                    {emailVerification ? (
                                        <svg width={50} height={50} fill="#30db24" viewBox="0 0 24 24">
                                            <path d="M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm5.676,8.237-6,5.5a1,1,0,0,1-1.383-.03l-3-3a1,1,0,1,1,1.414-1.414l2.323,2.323,5.294-4.853a1,1,0,1,1,1.352,1.474Z"></path>
                                        </svg>
                                    ) : (
                                        <>
                                            {!emailSent && (
                                                <button onClick={handleSendEmailVerification}
                                                    className="w-full bg-[#1DBF73] rounded-[20px] text-white font-bold py-2 px-4  mt-2 hover:bg-[#1DBF73]">
                                                    Send Email Verification
                                                </button>
                                            )}
                                            {emailSent && (
                                                <>
                                                    <input type="text" name="emailCode" placeholder="Enter email verification code"
                                                        value={verificationData.emailCode} onChange={handleChange}
                                                        className="mt-4 block w-full px-3 py-2 border border-gray-300 rounded-md" />
                                                    <button onClick={handleEmailVerify}
                                                        className="w-full bg-[#1DBF73] rounded-[20px] text-white font-bold py-2 px-4  mt-2 hover:bg-[#1DBF73]">
                                                        Verify Email
                                                    </button>
                                                </>
                                            )}
                                        </>
                                    )}
                                    <p onClick={() => getVerificationData(true)} className=" cursor-pointer">Skip</p>
                                </div>

                            </div>
                    }

                </div>
            </div>
        </>
    );
}
