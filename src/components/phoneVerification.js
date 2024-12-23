import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BASE_URL } from "../baseURL";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";
import banner from "../faqbanner.png"
import mblbanner from "../faqbannermbl.png"
import HomeHeader from "./homeheader";
import HomeFooter from "./homefooter";
import { FooterComponent } from "./footer/footer.component";
import { HeaderComponent } from "./header/header.component";
export default function PhoneVerification() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [mobileSent, setMobileSent] = useState(false);
  const [countries,setCountries]=useState([{
    code:'',
    flag:'',
    country:''
  }])
  const [rememberPhoneNumber, setRememberPhoneNumber] = useState("")
  const [verificationData, setVerificationData] = useState({
    email: state?.email || "",
    mobile: "",
    mobileCode: "",
    countryCode:''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVerificationData({
      ...verificationData,
      [name]: value,
    });
  };

  const handleSendMobileVerification = async () => {
    let mobilenumber=verificationData.countryCode+verificationData.mobile
   

    if (verificationData.mobile.length === 0) {
      toast.error("Please enter mobile number", { containerId: "verificationPageMobile" })
      return;
    }else if(verificationData.countryCode.length==0){
      toast.error("Please select country code", { containerId: "verificationPageMobile" })
      return;
    }
    const mobileRegex = /^\+[1-9]\d{1,14}$/;

    if (!mobileRegex.test(mobilenumber)) {
      toast.error("Please enter a valid mobile number with '+' and country code", { containerId: "verificationPageMobile" });
      return;
    }

    try {
      let phoneNumber = verificationData.mobile;
      let token = localStorage.getItem('token')
      let headers = {
        headers: {
          authorization: `Bearer ${token}`
        }
      }
      let response = await axios.post(`${BASE_URL}/mobile-otp`, { phoneNumber:mobilenumber }, headers);
      toast.success(response.data.message, { containerId: "verificationPageMobile" });
      setMobileSent(true);
    } catch (e) {
      toast.error(e?.response?.data?.error || "Client error, please try again", {
        containerId: "verificationPageMobile",
      });
    }
  };

  const handleMobileVerify = async () => {
    if (verificationData.mobileCode.length == 0) {
      toast.error("Please enter the OTP", { containerId: "verificationPageMobile" })
      return;
    }
    try {
      let token = localStorage.getItem('token')
      let headers = {
        headers: {
          authorization: `Bearer ${token}`
        }
      }
      let response = await axios.post(`${BASE_URL}/verifyOTP`, {
        email: verificationData.email,
        otp: verificationData.mobileCode,
      }, headers);
      toast.success("Mobile verified successfully", { containerId: "verificationPageMobile" });
      navigate("/dashboard");
    } catch (e) {
      toast.error(e?.response?.data?.error || "Client error, please try again", {
        containerId: "verificationPageMobile",
      });
    }
  };


  const sendCodeAgain = async () => {
    if (rememberPhoneNumber.length === 0) {
      toast.error("Please enter mobile number", { containerId: "verificationPageMobile" })
      return;
    }
    const mobileRegex = /^\+[1-9]\d{1,14}$/;

    if (!mobileRegex.test(rememberPhoneNumber)) {
      toast.error("Please enter a valid mobile number with '+' and country code", { containerId: "verificationPageMobile" });
      return;
    }

    try {
      let phoneNumber = rememberPhoneNumber;
      let token = localStorage.getItem('token')
      let headers = {
        headers: {
          authorization: `Bearer ${token}`
        }
      }
      let response = await axios.post(`${BASE_URL}/mobile-otp`, { phoneNumber }, headers);
      toast.success(response.data.message, { containerId: "verificationPageMobile" });
      setMobileSent(true);
    } catch (e) {
      toast.error(e?.response?.data?.error || "Client error, please try again", {
        containerId: "verificationPageMobile",
      });
    }
  }

const getCountries=async()=>{
  try{
let response=await axios.get(`${BASE_URL}/getCountries`)
const transformedData = response?.data?.countries?.map((item) => ({
  code: item.code,
  flag: item.flag,
  country: item.name,
}));
console.log('get countries')
setCountries(transformedData)


  }catch(e){

  }
}


  useEffect(()=>{
    getCountries();

  },[])

  return (
    <>
      <ToastContainer limit={1} containerId="verificationPageMobile" />
      <HeaderComponent />
      <div className="relative flex items-center justify-center w-full h-[300px]">
        <img src={banner} className="lg:block hidden w-full h-full object-cover" alt="img" />
        <img src={mblbanner} className="block lg:hidden w-full h-full object-cover" alt="img" />
        <div className="absolute lg:px-0 px-[1rem] gap-[20px] left-0 lg:pl-[10rem] top-0 w-full h-full flex flex-col lg:items-start items-center justify-center">
          <h1 className="lg:text-[2.38rem] text-[1.9rem] md:text-start text-center text-white font-bold">Verify your email to secure your account and complete setup.</h1>
          <p className="lg:text-[0.94rem] text-[.75rem] text-white">Fostering growth, forging relationships, and unlocking potential.</p>
        </div>
      </div>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-[700px] mx-auto  p-6 border border-[#E9E9E9] bg-white">
          <h2 className="text-center lg:text-[38px] font-semibold mb-6">Verify Your Phone Number</h2>
          <div className="flex flex-col items-center gap-6">
            <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M95.6467 63.0992L86.7841 54.2366C84.8799 52.4187 82.3485 51.4043 79.7159 51.4043C77.0832 51.4043 74.5518 52.4187 72.6476 54.2366L69.527 57.3573C67.4096 59.4668 64.5426 60.6513 61.5538 60.6513C58.5649 60.6513 55.6979 59.4668 53.5805 57.3573C51.1776 54.9544 49.6485 53.3316 48.1194 51.7401C46.5903 50.1486 44.9988 48.4322 42.5023 45.9669C40.3947 43.8549 39.211 40.9931 39.211 38.0093C39.211 35.0256 40.3947 32.1637 42.5023 30.0517L45.6229 26.9311C46.5535 26.0076 47.2919 24.9088 47.7954 23.6983C48.2988 22.4878 48.5575 21.1895 48.5563 19.8784C48.545 17.2331 47.4909 14.6989 45.6229 12.8258L36.7603 3.90079C34.2567 1.40788 30.8691 0.00573849 27.336 0C25.5957 0.00256457 23.8729 0.348432 22.2665 1.01779C20.66 1.68715 19.2014 2.66686 17.9741 3.90079L9.51717 12.2953C3.42297 18.398 0 26.6699 0 35.2944C0 43.9189 3.42297 52.1908 9.51717 58.2935C14.3854 63.1616 19.9401 68.654 25.4636 74.3959C30.9871 80.1379 36.417 85.5054 41.254 90.4984C47.3554 96.5831 55.6207 100 64.2375 100C72.8544 100 81.1196 96.5831 87.221 90.4984L95.6467 82.0727C98.1244 79.5844 99.5253 76.2222 99.5475 72.7108C99.5782 70.9286 99.2485 69.1585 98.5782 67.5068C97.9079 65.8552 96.9108 64.356 95.6467 63.0992ZM90.9345 77.2357L90.0295 78.0159L80.9797 68.9348C80.6784 68.5915 80.3099 68.3136 79.8969 68.1184C79.4839 67.9232 79.0352 67.8148 78.5787 67.7999C78.1221 67.785 77.6674 67.864 77.2425 68.0319C76.8177 68.1998 76.4319 68.4531 76.1089 68.7761C75.7859 69.0991 75.5326 69.485 75.3646 69.9098C75.1967 70.3346 75.1178 70.7894 75.1326 71.2459C75.1475 71.7025 75.2559 72.1512 75.4511 72.5641C75.6463 72.9771 75.9242 73.3457 76.2675 73.647L85.4734 82.8528L82.6649 85.6614C77.8097 90.5017 71.2336 93.2197 64.3779 93.2197C57.5222 93.2197 50.9461 90.5017 46.091 85.6614C41.2852 80.8556 35.8241 75.3009 30.4878 69.7462C25.1516 64.1915 19.3784 58.4807 14.5102 53.6125C9.66989 48.7574 6.95188 42.1813 6.95188 35.3256C6.95188 28.4699 9.66989 21.8938 14.5102 17.0387L17.3188 14.2301L26.2126 23.4048C26.8333 24.0462 27.6834 24.4148 28.5759 24.4294C29.4684 24.444 30.3301 24.1035 30.9715 23.4828C31.613 22.862 31.9815 22.0119 31.9962 21.1194C32.0108 20.227 31.6703 19.3652 31.0496 18.7238L21.6876 9.3619L22.5926 8.45692C23.2076 7.832 23.9412 7.33619 24.7504 6.99859C25.5596 6.66098 26.428 6.48839 27.3048 6.49092C29.0739 6.49623 30.7686 7.2033 32.0169 8.45692L40.9108 17.4756C41.528 18.0984 41.8755 18.9391 41.8782 19.816C41.8785 20.2506 41.7933 20.6809 41.6273 21.0825C41.4613 21.4841 41.2178 21.849 40.9108 22.1565L37.7901 25.2771C34.4362 28.6407 32.5528 33.1969 32.5528 37.9469C32.5528 42.6969 34.4362 47.2531 37.7901 50.6167C40.4115 53.0508 41.8469 54.5799 43.5321 56.1714C45.2172 57.7629 46.6527 59.4793 49.118 61.9134C52.4816 65.2673 57.0378 67.1507 61.7878 67.1507C66.5378 67.1507 71.094 65.2673 74.4576 61.9134L77.5782 58.7928C78.2153 58.1915 79.0582 57.8565 79.9343 57.8565C80.8104 57.8565 81.6533 58.1915 82.2904 58.7928L91.153 67.6554C91.7765 68.2714 92.2714 69.0052 92.6089 69.8141C92.9464 70.6231 93.1198 71.491 93.119 72.3675C93.103 73.2799 92.901 74.1795 92.5254 75.0112C92.1498 75.8429 91.6085 76.5892 90.9345 77.2045V77.2357Z" fill="#1DBF73" />
            </svg>

            <div className="w-full flex flex-col items-center">
              {!mobileSent ? (
                <div className="w-full">
                 <div className="relative w-full mt-2 flex items-center gap-2">
 
                 <Select
  id="countryCode"
  name="countryCode"
  className="block w-1/3 py-2 pl-2 pr-4 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
  onChange={(selectedOption) => {
    setVerificationData((prevData) => ({
      ...prevData,
      countryCode: `+${selectedOption.value}`,
    }));
  }}
  onInputChange={(inputValue) => {
    // Only allow numeric input
    if (/[^0-9]/.test(inputValue)) {
      return ''; // Clear the input if it's not a number
    }
  }}
  options={countries?.map((country) => ({
    value: country.code,
    label: (
      <div className="flex items-center">
        <img
          src={country.flag}
          alt={`Flag of ${country.country}`}
          className="w-5 h-5 mr-2"
        />
        <span>{`+${country.code}`}</span>
      </div>
    ),
  }))}
/>


<input
  type="tel"
  id="mobile"
  name="mobile"
  value={verificationData.mobile}
  onChange={(e) => {
    
    const cleanedValue = e.target.value;
    
   
    setVerificationData({
      ...verificationData,
      mobile: cleanedValue
    });

    setRememberPhoneNumber(
      verificationData.countryCode ? verificationData.countryCode + cleanedValue : cleanedValue
    );
    
  }}
  placeholder="Enter your mobile number"
  className="block w-2/3 pl-4 pr-12 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 placeholder-gray-400"
  pattern="[0-9]{1,15}" 
  maxLength={15} 
  title="Please enter a valid mobile number without the '+' symbol"
  required
/>

</div>

                  <button
                    onClick={handleSendMobileVerification}
                    className="w-full text-[15px] bg-black text-white py-2 px-4 mt-4 rounded-full font-medium"
                  >
                    Send Phone Verification
                  </button>
                </div>
              ) : (
                <div className="mt-4 w-full">
                  <div className="flex justify-center items-center space-x-4">
                    {Array.from({ length: 6 }, (_, index) => (
                    <input
                    key={index}
                    type="text"
                    maxLength={1}
                    value={verificationData.mobileCode[index] || ""}
                    onChange={(e) => {
                      const value = e.target.value;
                      
                      
                      if (/[^0-9]/.test(value)) {
                        return; 
                      }
                      
                      const updatedCode = verificationData.mobileCode.split("");
                      updatedCode[index] = value;
                      
                      setVerificationData({
                        ...verificationData,
                        mobileCode: updatedCode.join(""),
                      });
                  
                      if (value && e.target.nextElementSibling) {
                        e.target.nextElementSibling.focus();
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Backspace" && !e.target.value && e.target.previousElementSibling) {
                        e.target.previousElementSibling.focus();
                      }
                    }}
                    placeholder="_"
                    className={`w-[50px] h-[50px] text-center text-[28px] rounded-[4px] border outline-none ${verificationData.mobileCode[index]
                      ? "border-[#1DBF73] text-[#1DBF73]"
                      : "border-[#E9E9E9] text-gray-400"
                      }`}
                  />
                  
                    ))}
                  </div>

                  <button
                    onClick={handleMobileVerify}
                    className="w-full mt-[20px] bg-black mx-auto text-white py-2 px-4  rounded-full font-medium"
                  >
                    Verify Mobile
                  </button>
                </div>
              )}
              <button
                onClick={sendCodeAgain}
                className="w-full mt-[20px] bg-black mx-auto text-white py-2 px-4  rounded-full font-medium"
              >
                Send Code Again
              </button>
            </div>
          </div>
        </div>
      </div>
      <FooterComponent />
    </>
  );
}
