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
            if(response.data.token){
         
            localStorage.setItem('token',response.data.token)
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
                    <div className="mb-6 flex flex-col items-center">
                        <label htmlFor="email" className="block text-lg font-medium">Email</label>
                        {emailVerification ? (
                            <svg width={50} height={50} fill="#30db24" viewBox="0 0 24 24">
                                <path d="M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm5.676,8.237-6,5.5a1,1,0,0,1-1.383-.03l-3-3a1,1,0,1,1,1.414-1.414l2.323,2.323,5.294-4.853a1,1,0,1,1,1.352,1.474Z"></path>
                            </svg>
                        ) : (
                            <>
                                {!emailSent && (
                                    <button onClick={handleSendEmailVerification}
                                            className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md mt-2 hover:bg-blue-600">
                                        Send Email Verification
                                    </button>
                                )}
                                {emailSent && (
                                    <>
                                        <input type="text" name="emailCode" placeholder="Enter email verification code"
                                               value={verificationData.emailCode} onChange={handleChange}
                                               className="mt-4 block w-full px-3 py-2 border border-gray-300 rounded-md" />
                                        <button onClick={handleEmailVerify}
                                                className="w-full bg-green-500 text-white font-bold py-2 px-4 rounded-md mt-2 hover:bg-green-600">
                                            Verify Email
                                        </button>
                                    </>
                                )}
                            </>
                        )}
                    </div>

                    {/* Mobile Verification */}
                    <div className="mb-6 flex flex-col items-center">
                        <label htmlFor="mobile" className="block text-lg font-medium">Mobile Number</label>
                        {phoneVerification ? (
                            <svg width={50} height={50} fill="#30db24" viewBox="0 0 24 24">
                                <path d="M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm5.676,8.237-6,5.5a1,1,0,0,1-1.383-.03l-3-3a1,1,0,1,1,1.414-1.414l2.323,2.323,5.294-4.853a1,1,0,1,1,1.352,1.474Z"></path>
                            </svg>
                        ) : (
                            <>
                                {!mobileSent && (
                                    <button onClick={handleSendMobileVerification}
                                            className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md mt-2 hover:bg-blue-600">
                                        Send Mobile Verification
                                    </button>
                                )}
                                {mobileSent && (
                                    <>
                                        <input type="text" name="mobileCode" placeholder="Enter mobile verification code"
                                               value={verificationData.mobileCode} onChange={handleChange}
                                               className="mt-4 block w-full px-3 py-2 border border-gray-300 rounded-md" />
                                        <button onClick={handleMobileVerify}
                                                className="w-full bg-green-500 text-white font-bold py-2 px-4 rounded-md mt-2 hover:bg-green-600">
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
