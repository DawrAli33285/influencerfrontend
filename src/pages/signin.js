import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { BASE_URL } from "../baseURL";
import { Link, useNavigate } from "react-router-dom";
import banner from "../faqbanner.png"
import mblbanner from "../faqbannermbl.png"
import { gapi } from "gapi-script";
import HomeHeader from "../components/homeheader";
import HomeFooter from "../components/homefooter";

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
                    localStorage.setItem("buyerToken", response.data.buyerToken)
                    let prevPath = localStorage.getItem("pathName")
                    localStorage.removeItem('pathName')
                    if (prevPath) {
                        navigate(prevPath)
                    } else {

                        navigate('/buyerdashboard')
                    }
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
                localStorage.setItem("buyerToken", response.data.buyerToken)
                let prevPath = localStorage.getItem("pathName")
                localStorage.removeItem('pathName')
                if (prevPath) {

                    navigate(prevPath)
                } else {

                    navigate('/buyerdashboard')
                }
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
            <HomeHeader />
            <ToastContainer containerId="signIn" />
            <div className="relative flex items-center justify-center w-full h-[300px]">
  <img src={banner} className="lg:block hidden w-full h-full object-cover" alt="img" />
  <img src={mblbanner} className="block lg:hidden w-full h-full object-cover" alt="img" />
  <div className="absolute lg:px-0 px-[1rem] gap-[20px] left-0 lg:pl-[10rem] top-0 w-full h-full flex flex-col lg:items-start items-center justify-center">
                    <h1 className="lg:text-[2.38rem] md:text-start text-center text-[1.9rem] text-white font-bold">Log in to access your account securely and manage everything in one place.</h1>
                    <p className="lg:text-[0.94rem] text-[.75rem] text-white">Fostering growth, forging relationships, and unlocking potential.</p>
                </div>
</div>
           
            <div className="w-full relative md:py-[5rem] py-[2rem] h-full">
                <h1 className="text-center font-bold text-[1.5rem] lg:text-[2.4rem]">Log In</h1>
                <p className="lg:text-[.975rem] text text-[.75rem]  mt-[10px] lg:mb-[40px] text-center ">Log in to access your account and manage your projects with ease.</p>
                <div className="xl:w-[40%] mx-auto border-2 border-[#E9E9E9] rounded-[20px] w-[95%] my-[3rem] md:w-full px-[20px] py-[40px]">
                    
                    <form onSubmit={handleSubmit} className="flex flex-col space-y-4 p-4">
                    <h2 className="font-medium text-[1.3rem]">We are glad to see you again!</h2>
                    <p className="lg:text-[.975rem]">Dont have an account? <Link to='/signup' className="text-[#1DBF73]">signup!</Link></p>
                        <div>
                            
                            <label htmlFor="email" className="block text-[.975rem]  font-medium">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                                className={`mt-1 block w-full px-3 py-3 border rounded-md ${errors.email ? 'border-red-500' : 'border-[#1DBF73]'} focus:outline-none focus:ring focus:border-blue-500`}
                            />
                            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-[.975rem] font-medium">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Password"
                                maxLength={10}
                                value={formData.password}
                                onChange={handleChange}
                                className={`mt-1 block w-full px-3 py-3 border rounded-md ${errors.password ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring focus:border-blue-500`}
                            />
                            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                        </div>

                        <div className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                id="rememberMe"
                                name="rememberMe"
                                className="h-4 w-4 border-gray-300 rounded"
                            />
                            <label htmlFor="rememberMe" className="text-[#041E42]">Remember Me</label>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-black rounded-[3.8rem] xl:px-[20px] p-[10px] xl:py-[20px] lg:text-[0.94rem] text-[0.75rem] text-white "
                        >
                            Login
                        </button>

                        <div className="flex items-center my-4">
                            <hr className="flex-grow border-gray-300" />
                            <span className="px-4 text-[#041E42] font-bold">OR</span>
                            <hr className="flex-grow border-gray-300" />
                        </div>

                        <div className="flex flex-row space-x-5">
                            <button
                                onClick={googleLogin}
                                className="w-full justify-center gap-[10px] shadow-md items-center flex flex-row space-x-3 border border-[#D93025] bg-white text-[#D93025] font-bold py-[10px] lg:py-[20px] px-4 rounded-[20px] focus:outline-none focus:ring"
                            >
                                <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M13.3438 7.91406C13.3438 7.47656 13.2891 7.14844 13.2344 6.79297H6.78125V9.11719H10.6094C10.4727 10.1289 9.46094 12.043 6.78125 12.043C4.45703 12.043 2.57031 10.1289 2.57031 7.75C2.57031 3.94922 7.05469 2.19922 9.46094 4.52344L11.3203 2.74609C10.1445 1.65234 8.58594 0.96875 6.78125 0.96875C3.00781 0.96875 0 4.00391 0 7.75C0 11.5234 3.00781 14.5312 6.78125 14.5312C10.6914 14.5312 13.3438 11.7969 13.3438 7.91406Z" fill="#D93025" />
                                </svg>

                                Continue Google
                            </button>
                        </div>
                    </form>

                </div>

            </div>
            <div className="md:mt-[15rem] mt-[25%]">
  <HomeFooter />
</div>

        </>
    );
}
