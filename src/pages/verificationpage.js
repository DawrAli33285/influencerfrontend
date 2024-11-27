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
    const [emailVerification, setEmailVerification] = useState(false);
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

    const getVerificationData = async () => {

        try {
            let email = localStorage.getItem('email');
            let response = await axios.get(`${BASE_URL}/getVerificationData/${email}`);

            console.log(response.data)
            console.log("RESPONSE")
            if (response.data.token) {

                localStorage.setItem('token', response.data.token)
                navigate('/dashboard')
            }
            setEmailVerification(response.data.user.is_email_verified);
            setPhoneVerification(response.data.user.Is_mobile_number_verified);

        } catch (e) {
            console.error("Error fetching verification data:", e);
        }
    };

    return (
        <>
            <ToastContainer limit={1} containerId="verificationPage" />
            <div className="relative w-full h-full">
                <div className="w-full max-w-md mx-auto mt-20 p-6 border rounded-lg shadow-lg">
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
                    </div>

                    {/* Mobile Verification */}
                    <div className="mb-6 flex gap-[20px] flex-col items-center">
                        <svg width="48" height="74" viewBox="0 0 48 74" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.33366 73.6667C5.50033 73.6667 3.93088 73.0139 2.62533 71.7083C1.31977 70.4028 0.666992 68.8333 0.666992 67V7C0.666992 5.16667 1.31977 3.59722 2.62533 2.29167C3.93088 0.986114 5.50033 0.333336 7.33366 0.333336H40.667C42.5003 0.333336 44.0698 0.986114 45.3753 2.29167C46.6809 3.59722 47.3337 5.16667 47.3337 7V67C47.3337 68.8333 46.6809 70.4028 45.3753 71.7083C44.0698 73.0139 42.5003 73.6667 40.667 73.6667H7.33366ZM24.0003 65.3333C24.9448 65.3333 25.7364 65.0139 26.3753 64.375C27.0142 63.7361 27.3337 62.9444 27.3337 62C27.3337 61.0556 27.0142 60.2639 26.3753 59.625C25.7364 58.9861 24.9448 58.6667 24.0003 58.6667C23.0559 58.6667 22.2642 58.9861 21.6253 59.625C20.9864 60.2639 20.667 61.0556 20.667 62C20.667 62.9444 20.9864 63.7361 21.6253 64.375C22.2642 65.0139 23.0559 65.3333 24.0003 65.3333ZM7.33366 50.3333H40.667V17H7.33366V50.3333Z" fill="#1E1E1E" />
                        </svg>

                        <label htmlFor="mobile" className="block text-lg font-medium">Verify your phone number</label>
                        <p className="text-base text-[#1C1C1CA3]">We’ve send the verification OTP to provided phone number.</p>

                        {phoneVerification ? (
                            <svg width={50} height={50} fill="#30db24" viewBox="0 0 24 24">
                                <path d="M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm5.676,8.237-6,5.5a1,1,0,0,1-1.383-.03l-3-3a1,1,0,1,1,1.414-1.414l2.323,2.323,5.294-4.853a1,1,0,1,1,1.352,1.474Z"></path>
                            </svg>
                        ) : (
                            <>
                                {!mobileSent && (
                                    <button onClick={handleSendMobileVerification}
                                        className="w-full bg-[#1DBF73] text-white font-bold py-2 px-4 rounded-[20px] mt-2 hover:bg-[#1DBF73]">
                                        Send Mobile Verification
                                    </button>
                                )}
                                {mobileSent && (
                                    <>
                                        <input type="text" name="mobileCode" placeholder="Enter mobile verification code"
                                            value={verificationData.mobileCode} onChange={handleChange}
                                            className="mt-4 block w-full px-3 py-2 border border-gray-300 rounded-md" />
                                        <button onClick={handleMobileVerify}
                                            className="w-full bg-[#1DBF73] text-white font-bold py-2 px-4 rounded-[20px] mt-2 hover:bg-[#1DBF73]">
                                            Verify Mobile
                                        </button>
                                    </>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
