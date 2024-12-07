import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
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

    const navigate = useNavigate();

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

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formErrors = validate();
        setErrors(formErrors);

        if (Object.keys(formErrors).length === 0) {
            try {

                let response = await axios.post(`${BASE_URL}/login`, formData)
                console.log(response.data)
                toast.success(response.data.message, { containerId: "signIn" })
                if (response.data.user.is_email_verified == false) {
                    localStorage.setItem("email", response.data.user.email)
                   
                   
                    localStorage.removeItem("token")
                    localStorage.removeItem("buyerToken")
                    navigate('/verification')
                } else {
                    localStorage.setItem("token", response.data.token)
                    localStorage.setItem("buyerToken",response.data.buyerToken)
                    
                    navigate('/dashboard')
                }
            } catch (e) {
                console.log(e.message)
                if (e?.response?.data?.error) {
                    toast.error(e?.response?.data?.error, { containerId: "signIn" })
                    return;
                } else {
                    toast.error("Client error please try again", { containerId: "signIn" })
                }
            }
        }
    };

    const googleLogin = async (e) => {
        e.preventDefault();
        const auth2 = gapi.auth2.getAuthInstance();

        try {
            const googleUser = await auth2.signIn({
                prompt: "select_account"
            });
            const profile = googleUser.getBasicProfile();
            console.log("ID: " + profile.getId());
            console.log("Full Name: " + profile.getName());
            console.log("Email: " + profile.getEmail());
            const id_token = googleUser.getAuthResponse().id_token;
            console.log("ID Token: " + id_token);
            let response = await axios.post(`${BASE_URL}/socialLogin`, { email: profile.getEmail() })

            toast.success(response.data.message, { containerId: "signIn" })
            if (response.data.user.is_email_verified === false) {
                localStorage.setItem("email", response.data.user.email)
               
                localStorage.removeItem("token")
                localStorage.removeItem("buyerToken")
                
                navigate('/verification')

            } else {

       
                localStorage.setItem("token", response.data.token)
                localStorage.setItem("buyerToken",response.data.buyerToken)
                navigate('/buyerdashboard')
            }
        } catch (error) {
            if (error?.response?.data?.error) {
                toast.error(error?.response?.data?.error, { containerId: "signIn" })
            } else {
                toast.error("Client error please try again", { containerId: "signIn" })
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

    const loginWithFacebook = async (response) => {

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
            <ToastContainer containerId="signIn" />

            <div className="w-full relative h-full">
                <div className="xl:w-[40%] mx-auto mt-[40px] w-full px-[20px] py-[40px]">
                    <svg className="cursor-pointer" onClick={(e) => {
                        navigate(-1)
                    }} width={35} height={35} viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill="#000000" d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"></path><path fill="#000000" d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"></path></g></svg>
                    <h1 className="text-center font-semibold text-[32px]">Sign In</h1>
                    <p className="text-[1rem] text-[#1C1C1CA3]">Enter your email and password to continue.</p>
                    <form onSubmit={handleSubmit} className="flex flex-col space-y-4 p-4">
                        <div>

                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                                className={`mt-1 block w-full px-3 py-3 border rounded-md ${errors.email ? 'border-red-500' : 'border-[#1DBF73]'} focus:outline-none focus:ring focus:border-blue-500`}
                            />
                            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                        </div>
                        <div>
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                maxLength={10}
                                value={formData.password}
                                onChange={handleChange}
                                className={`mt-1 block w-full px-3 py-3 border rounded-md bg-[#1c1c1c17s] ${errors.password ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring focus:border-blue-500`}
                            />
                            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                        </div>


                        <button
                            type="submit"
                            className="w-full bg-[#1DBF73] text-white rounded-[20px] font-bold py-2 px-4   focus:outline-none focus:ring"
                        >
                            Sign In
                        </button>
                        <div className="flex flex-row space-x-5">
                            <button
                                onClick={googleLogin}
                                className="w-full justify-center gap-[10px] shadow-md items-center flex flex-row space-x-3 bg-white text-black font-bold py-2 px-4 rounded-[20px]  focus:outline-none focus:ring"
                            >
                                <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10.7055 3.86667C12.6216 3.86667 13.9141 4.67778 14.6511 5.35556L17.5309 2.6C15.7622 0.98889 13.4606 0 10.7055 0C6.71456 0 3.26785 2.24445 1.58984 5.51112L4.88916 8.02223C5.71683 5.61112 8.00708 3.86667 10.7055 3.86667Z" fill="#F25022" />
                                    <path d="M20.499 10.2222C20.499 9.39996 20.431 8.79996 20.2836 8.17773H10.7031V11.8888H16.3267C16.2133 12.8111 15.6011 14.2 14.2405 15.1333L17.4605 17.5777C19.3879 15.8333 20.499 13.2666 20.499 10.2222Z" fill="#4285F4" />
                                    <path d="M4.89909 11.9774C4.68367 11.3552 4.55896 10.6885 4.55896 9.99963C4.55896 9.31075 4.68367 8.64408 4.88776 8.02186L1.58844 5.51074C0.896825 6.8663 0.5 8.38852 0.5 9.99963C0.5 11.6107 0.896825 13.133 1.58844 14.4885L4.89909 11.9774Z" fill="#FBBC05" />
                                    <path d="M10.7039 20.0003C13.459 20.0003 15.7719 19.1114 17.4613 17.578L14.2413 15.1336C13.3797 15.7225 12.2232 16.1336 10.7039 16.1336C8.00551 16.1336 5.71526 14.3891 4.89893 11.978L1.59961 14.4891C3.27761 17.7558 6.71299 20.0003 10.7039 20.0003Z" fill="#34A853" />
                                </svg>
                                Sign In with Google

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
