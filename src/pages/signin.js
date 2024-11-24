import { useState,useEffect } from "react";
import axios from "axios";
import { ToastContainer,toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { BASE_URL } from "../baseURL";
import { useNavigate } from "react-router-dom";
import { gapi } from "gapi-script";

const CLIENT_ID = "18819315923-dgjfpoa60vhgf4c1ftba93aj6otb6sl3.apps.googleusercontent.com"; 


export default function SignIn() {

    const [formData, setFormData] = useState({
        password: '',
        email: '',
    });

    const [errors, setErrors] = useState({});

    const navigate=useNavigate();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };



    const validate = () => {
        const newErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.password) newErrors.password = 'Password is required';
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = 'Invalid Email Format';
        }
        return newErrors;
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
   
        const formErrors = validate();
        setErrors(formErrors);

        if (Object.keys(formErrors).length === 0) {
try{

    let response=await axios.post(`${BASE_URL}/login`,formData)
console.log(response.data)
toast.success(response.data.message,{containerId:"signIn"})
if(response.data.user.is_email_verified==false || response.data.user.Is_mobile_number_verified==false){
    localStorage.setItem("email",response.data.user.email)
    let phoneNumber=response.data.user.country_code_id.country_code+response.data.user.mobile_number
    localStorage.setItem("phoneNumber",phoneNumber)
localStorage.removeItem("token")
localStorage.removeItem("buyerToken")
    navigate('/verification')
}else{
    localStorage.setItem("token",response.data.token)
    
localStorage.removeItem("buyerToken")
    navigate('/dashboard')
}
}catch(e){
    if(e?.response?.data?.error){
        toast.error(e?.response?.data?.error,{containerId:"signIn"})
        return;
    }else{
        toast.error("Client error please try again",{containerId:"signIn"})
    }
}
        }
    };

const googleLogin=async(e)=>{
e.preventDefault();
const auth2 = gapi.auth2.getAuthInstance();

    try {
      const googleUser = await auth2.signIn({
        prompt:"select_account"
      });
      const profile = googleUser.getBasicProfile();
      console.log("ID: " + profile.getId());
      console.log("Full Name: " + profile.getName());
      console.log("Email: " + profile.getEmail());
      const id_token = googleUser.getAuthResponse().id_token;
      console.log("ID Token: " + id_token);
      let response=await axios.post(`${BASE_URL}/socialLogin`,{email:profile.getEmail()})
    
      toast.success(response.data.message,{containerId:"signIn"})
      if(response.data.user.is_email_verified===false || response.data.user.Is_mobile_number_verified===false){
        localStorage.setItem("email",response.data.user.email)
        let phoneNumber=response.data.user.country_code_id.country_code+response.data.user.mobile_number
        localStorage.setItem("phoneNumber",phoneNumber)
        localStorage.removeItem("token")
        localStorage.removeItem("buyerToken")
        navigate('/verification')
          
      }else{
  
localStorage.removeItem("buyerToken")
        localStorage.setItem("token",response.data.token)
        navigate('/dashboard')
      }
    } catch (error) {
        if(error?.response?.data?.error){
            toast.error(error?.response?.data?.error,{containerId:"signIn"})
        }else{
            toast.error("Client error please try again",{containerId:"signIn"})
        }
      console.error("Google Sign-In Error:", error);
    }
}


useEffect(() => {

    function start() {
      gapi.client.init({
        clientId: CLIENT_ID,
        scope: "profile email",
      });
    }

    gapi.load("client:auth2", start);
  }, []);

const loginWithFacebook=async(response)=>{
    
    console.log(response); 
    if (response.accessToken) {
     
      console.log("User ID:", response.userID);
      console.log("Access Token:", response.accessToken);
      console.log("User Name:", response.name);
      console.log("User Email:", response.email);
    }
}

    return (
      <>
      <ToastContainer containerId="signIn"/>
    
      <div className="w-full relative h-full">
            <div className="xl:w-[40%] mx-auto mt-[40px] w-full px-[20px] py-[40px]">
            <svg className="cursor-pointer" onClick={(e)=>{
                navigate(-1)
            }} width={35} height={35} viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill="#000000" d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"></path><path fill="#000000" d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"></path></g></svg>
                <h1 className="text-center font-semibold text-[32px]">Sign In</h1>
                <form onSubmit={handleSubmit} className="flex flex-col space-y-4 p-4">
                    <div>
                        <label htmlFor="email" className="block text-lg font-medium">Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`mt-1 block w-full px-3 py-3 border rounded-md ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring focus:border-blue-500`}
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-lg font-medium">Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter password"
                            maxLength={10}
                            value={formData.password}
                            onChange={handleChange}
                            className={`mt-1 block w-full px-3 py-3 border rounded-md ${errors.password ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring focus:border-blue-500`}
                        />
                        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                    </div>
                  <div className="flex flex-row space-x-5">
                  <button
                       onClick={googleLogin}
                       className="w-full justify-center items-center flex flex-row space-x-3 bg-[#6B33E3] text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring"
                   >
                    
                    <svg width={33} height={33} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M19.76 10.77L19.67 10.42H12.23V13.58H16.68C16.4317 14.5443 15.8672 15.3974 15.0767 16.0029C14.2863 16.6084 13.3156 16.9313 12.32 16.92C11.0208 16.9093 9.77254 16.4135 8.81999 15.53C8.35174 15.0685 7.97912 14.5191 7.72344 13.9134C7.46777 13.3077 7.33407 12.6575 7.33 12C7.34511 10.6795 7.86792 9.41544 8.79 8.47002C9.7291 7.58038 10.9764 7.08932 12.27 7.10002C13.3779 7.10855 14.4446 7.52101 15.27 8.26002L17.47 6.00002C16.02 4.70638 14.1432 3.9941 12.2 4.00002C11.131 3.99367 10.0713 4.19793 9.08127 4.60115C8.09125 5.00436 7.19034 5.59863 6.43 6.35002C4.98369 7.8523 4.16827 9.85182 4.15152 11.9371C4.13478 14.0224 4.918 16.0347 6.34 17.56C7.12784 18.3449 8.06422 18.965 9.09441 19.3839C10.1246 19.8029 11.2279 20.0123 12.34 20C13.3484 20.0075 14.3479 19.8102 15.2779 19.42C16.2078 19.0298 17.0488 18.4549 17.75 17.73C19.1259 16.2171 19.8702 14.2347 19.83 12.19C19.8408 11.7156 19.8174 11.2411 19.76 10.77Z" fill="#c05e35"></path> </g></svg>
                   </button>
                   {/* <FacebookLogin
        appId="YOUR_FACEBOOK_APP_ID" 
        autoLoad={false} 
        fields="name,email,picture"
        callback={loginWithFacebook}
        icon="fa-facebook"
        textButton="Login with Facebook"
      /> */}

                  </div>
                    
                    <button
                        type="submit"
                        className="w-full bg-[#6B33E3] text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring"
                    >
                        Sign In
                    </button>
                </form>


            </div>
            <div className="absolute top-[-15%] right-0">
                <svg width="229" height="160" viewBox="0 0 229 160" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M162.592 97.4314L554.689 -62.0001L571.253 -0.180889L179.157 159.251L162.592 97.4314Z" fill="#A37AFB" />
                    <path d="M0.879458 97.5266L583.112 -138L599.677 -76.1808L17.4439 159.346L0.879458 97.5266Z" fill="#6B33E3" />
                    <path d="M53.1407 9.27803L445.237 -150.153L461.802 -88.3342L69.7052 71.0973L53.1407 9.27803Z" fill="#D5C1FD" />
                </svg>

            </div>
            <div className="absolute bottom-[-15%] left-0">
                <svg width="189" height="171" viewBox="0 0 189 171" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M-220.408 159.432L171.689 0.000103235L188.253 61.8194L-203.843 221.251L-220.408 159.432Z" fill="#A37AFB" />
                    <path d="M-250.408 240.933L141.689 81.5016L158.253 143.321L-233.843 302.752L-250.408 240.933Z" fill="#D5C1FD" />
                </svg>


            </div>
        </div>
      </>
    );
}
