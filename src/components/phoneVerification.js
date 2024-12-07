import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BASE_URL } from "../baseURL";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function PhoneVerification() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [mobileSent, setMobileSent] = useState(false);
  const [verificationData, setVerificationData] = useState({
    email: state?.email || "",
    mobile: "",
    mobileCode: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVerificationData({
      ...verificationData,
      [name]: value,
    });
  };

  const handleSendMobileVerification = async () => {
    if(verificationData.mobile.length===0){
        toast.error("Please enter mobile number",{containerId:"verificationPageMobile"})
    return;
    }
    const mobileRegex = /^\+[1-9]\d{1,14}$/;

    if (!mobileRegex.test(verificationData.mobile)) {
        toast.error("Please enter a valid mobile number with '+' and country code", { containerId: "verificationPageMobile" });
        return;
    }

    try {
      let phoneNumber = verificationData.mobile;
      let token=localStorage.getItem('token')
      let headers={
headers:{
    authorization:`Bearer ${token}`
}
      }
      let response = await axios.post(`${BASE_URL}/mobile-otp`, { phoneNumber},headers);
      toast.success(response.data.message, { containerId: "verificationPageMobile" });
      setMobileSent(true);
    } catch (e) {
      toast.error(e?.response?.data?.error || "Client error, please try again", {
        containerId: "verificationPageMobile",
      });
    }
  };

  const handleMobileVerify = async () => {
    if(verificationData.mobileCode.length==0){
        toast.error("Please enter the OTP",{containerId:"verificationPageMobile"})
        return;
    }
    try {
        let token=localStorage.getItem('token')
        let headers={
            headers:{
                authorization:`Bearer ${token}`
            }
        }
      let response = await axios.post(`${BASE_URL}/verifyOTP`, {
        email: verificationData.email,
        otp: verificationData.mobileCode,
      },headers);
      toast.success("Mobile verified successfully", { containerId: "verificationPageMobile" });
      navigate("/dashboard"); 
    } catch (e) {
      toast.error(e?.response?.data?.error || "Client error, please try again", {
        containerId: "verificationPageMobile",
      });
    }
  };

  return (
    <>
      <ToastContainer limit={1} containerId="verificationPageMobile" />

      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white w-full max-w-md p-8 rounded-xl shadow-md">
          <h2 className="text-center text-2xl font-semibold mb-6">Phone Verification</h2>
          <div className="flex flex-col items-center gap-6">
            <svg
              width="68"
              height="54"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4 0C2.89543 0 2 0.895431 2 2V14C2 15.1046 2.89543 16 4 16H12C13.1046 16 14 15.1046 14 14V2C14 0.895431 13.1046 0 12 0H4ZM12 3H4V13H12V3Z"
                fill="#000000"
              />
            </svg>
            <label htmlFor="mobile" className="block text-lg font-medium text-gray-700">
              Verify Your Mobile
            </label>
            <p className="text-center text-sm text-gray-500">
              We will send a verification OTP to your number.
            </p>
            <div className="w-full">
              {!mobileSent ? (
                <div>
                  <div className="relative mt-2">
                    <input
                      type="tel"
                      id="mobile"
                      name="mobile"
                      value={verificationData.mobile}
                      onChange={handleChange}
                      placeholder="+ Enter your mobile number"
                      className="block w-full pl-4 pr-12 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 placeholder-gray-400"
                      pattern="\+[0-9]{1,15}"
                      title="Please enter a valid mobile number with a '+' at the start"
                      required
                    />
                  </div>
                  <button
                    onClick={handleSendMobileVerification}
                    className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 mt-4 rounded-full font-medium"
                  >
                    Send Phone Verification
                  </button>
                </div>
              ) : (
                <div className="mt-4">
                  <input
                    type="text"
                    name="mobileCode"
                    value={verificationData.mobileCode}
                    onChange={handleChange}
                    placeholder="Enter mobile verification code"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                  />
                  <button
                    onClick={handleMobileVerify}
                    className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 mt-2 rounded-full font-medium"
                  >
                    Verify Mobile
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
