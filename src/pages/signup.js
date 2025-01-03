import { useState, useEffect } from "react";
import img from "../signuppage.jpeg";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import axios from "axios";
import { HeaderComponent } from '../components/header/header.component'
import { gapi } from "gapi-script";
import { BASE_URL } from "../baseURL";
import { Link, useNavigate } from "react-router-dom";
import HomeHeader from "../components/homeheader";
import banner from "../faqbanner.png"
import mblbanner from "../faqbannermbl.png"
import HomeFooter from "../components/homefooter";
import { FooterComponent } from "../components/footer/footer.component";
const CLIENT_ID = "18819315923-dgjfpoa60vhgf4c1ftba93aj6otb6sl3.apps.googleusercontent.com";


export default function SignUp() {
    const [signupemail, setSignupEmail] = useState(false);
    const [showusername, setShowUsername] = useState(false)
    const [formData, setFormData] = useState({
        country_code: '',
        acceptTerms: false,
        username: '',
        password: '',
        mobile_number: '',
        email: '',
        agree: false,
    });
    const [countryCodes, setCountryCodes] = useState([]);

    const [errors, setErrors] = useState({});
    let navigate = useNavigate();
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
        const mobileNumberRegex = /^\d{10}$/;
        if (!formData.username) newErrors.userName = 'User Name is required';
        if (!formData.password) newErrors.password = 'Password is required';
        if (!formData.acceptTerms) newErrors.acceptTerms = "Please accept termns and conditions"
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
                console.log(formData)
                console.log("Formdata")
   let userNameResponse=await axios.get(`${BASE_URL}/checkusername/${formData.username}`)
                let response = await axios.post(`${BASE_URL}/register`, formData)
                toast.dismiss()
                toast.success(response.data.message, { containerId: "containerF" })
                localStorage.setItem('token', response.data.token)
                localStorage.setItem('buyerToken', response.data.buyerToken)
                localStorage.setItem("phoneNumber", response.data.phoneNumber)
                localStorage.setItem("email", response.data.email)
                setFormData({
                    country_code: '',
                    username: '',
                    password: '',
                    mobile_number: '',
                    email: '',
                    agree: false,
                })

                navigate('/verification')
            } catch (e) {
                console.log(e)
                if (e?.response?.data?.error) {
                    toast.dismiss()
                    toast.error(e?.response?.data?.error, { containerId: "containerF" })
                } else {
                    toast.dismiss()
                    toast.error("Client error please try again", { containerId: "containerF" })
                }
                return;
            }

        }
    };
    useEffect(() => {

        function start() {
            gapi.client.init({
                clientId: CLIENT_ID,
                scope: "profile email",
            });
        }

        gapi.load("client:auth2", start);
    }, []);
    useEffect(() => {
        const fetchCountryCodes = async () => {
            try {


            } catch (error) {
                console.error("Error fetching country codes: ", error);
            }
        };

        fetchCountryCodes();
    }, []);

    const sortCountryCodes = () => {
        return countryCodes.sort((a, b) => {
            const nameA = a.name.toLowerCase();
            const nameB = b.name.toLowerCase();
            if (nameA < nameB) return -1;
            if (nameA > nameB) return 1;
            return 0;
        });
    };




    const googleSignup = async (e) => {
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
let response=await axios.get(`${BASE_URL}/alreadyExistsUser/${profile.getEmail()}`)

            setFormData({
                country_code: '',
                username: '',
                password: profile.getId() + profile.getEmail() + profile.getName(),
                mobile_number: '',
                email: profile.getEmail(),
                agree: false,
            })
            setSignupEmail("Google")
            setShowUsername(!showusername)

        } catch (error) {
            if (error?.response?.data?.error) {
                toast.error(error?.response?.data?.error, { containerId: "containerF" })
            } else {
                toast.error("Client error please try again", { containerId: "containerF" })
            }
            console.error("Google Sign-In Error:", error);
        }
    }

    const continueWithEmail=async()=>{
        try{
            let response=await axios.get(`${BASE_URL}/alreadyExistsUser/${formData.email}`)
            setShowUsername(!showusername)
        }catch(error){
            if (error?.response?.data?.error) {
                toast.error(error?.response?.data?.error, { containerId: "containerF" })
            } else {
                toast.error("Client error please try again", { containerId: "containerF" })
            }
        }
    }



    return (
        <>
            <HeaderComponent />
            {/* <div className="relative flex items-center justify-center w-full h-[300px]">
  <img src={banner} className="lg:block hidden w-full h-full object-cover" alt="img" />
  <img src={mblbanner} className="block lg:hidden w-full h-full object-cover" alt="img" />
  <div className="absolute lg:px-0 px-[1rem] gap-[20px] left-0 lg:pl-[10rem] top-0 w-full h-full flex flex-col lg:items-start items-center justify-center">
                    <h1 className="lg:text-[2.38rem] text-[1.9rem] text-white font-bold md:text-start text-center">Log in to access your account securely and manage everything in one place.</h1>
                    <p className="lg:text-[0.94rem] text-[.75rem] text-white">Fostering growth, forging relationships, and unlocking potential.</p>
                </div>
</div> */}


            <ToastContainer containerId="containerF" limit={1} />

            <div className="w-full relative md:py-[5rem] py-[2rem] h-[900px]">
                <h1 className="text-center font-bold text-[1.5rem] lg:text-[2.4rem]">Sign Up</h1>

               
                <div className="xl:w-[40%] mx-auto min-h-[520px] border-2 lg:min-h-[560px] border-[#E9E9E9] rounded-[20px] w-[95%] my-[3rem] md:w-full px-[20px] py-[40px]">

                    <div className="flex flex-col space-y-4 p-4">

                        {/* {(signupemail || signupemail === "Google") && (
                            <div
                                className="flex gap-2 items-center font-bold text-[1rem] cursor-pointer"
                                onClick={() => {
                                    setSignupEmail(false);
                                    setShowUsername(false)
                                }}
                            >
                                <svg
                                    className="cursor-pointer"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 1024 1024"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="#000000"
                                >
                                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                    <g id="SVGRepo_iconCarrier">
                                        <path
                                            fill="#000000"
                                            d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"
                                        ></path>
                                        <path
                                            fill="#000000"
                                            d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"
                                        ></path>
                                    </g>
                                </svg>
                                Back
                            </div>
                        )} */}


                        <p className="lg:text-[.975rem]">If you already have an account, please  <Link to='/signin' className="text-[#1DBF73]">Sign in</Link></p>

                        <div className="flex flex-col">
                            {
                                signupemail ? <form onSubmit={handleSubmit} className="flex flex-col space-y-4 p-4">


                                    {
                                        showusername ?
                                            <div className="flex flex-col gap-[10px]">
                                                <div>
                                                    <label htmlFor="userName" className="block  text-[.975rem] font-medium">User Name</label>
                                                    <input
                                                        type="text"
                                                        name="username"
                                                        maxLength={10}
                                                        placeholder="Enter username"
                                                        value={formData.username}
                                                        onChange={handleChange}
                                                        className={`mt-1 block w-full px-3 py-3 border rounded-md ${errors.userName ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-[#1DBF73] focus:border-[#1DBF73]`}
                                                    />
                                                    {errors.userName && <p className="text-red-500 text-sm">{errors.userName}</p>}
                                                </div>
                                                <div className="mt-4 flex items-start">
                                                    <input
                                                        type="checkbox"
                                                        name="acceptTerms"
                                                        id="acceptTerms"
                                                        checked={formData.acceptTerms}
                                                        onChange={handleChange}
                                                        className="h-4 w-4 text-[#1DBF73] border-gray-300 rounded focus:ring-[#1DBF73]"
                                                    />
                                                    <label
                                                        htmlFor="acceptTerms"
                                                        className="ml-2 text-sm text-gray-700"
                                                    >
                                                        I accept the{' '}
                                                        <a
                                                            href="/terms"
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-[#1DBF73] underline hover:text-[#16a55d]"
                                                        >
                                                            Terms and Services
                                                        </a>
                                                    </label>
                                                </div>
                                                {errors.acceptTerms && <p className="text-red-500 text-sm mt-1">{errors.acceptTerms}</p>}

                                                <button

                                                    type="submit"
                                                    className="w-full bg-black rounded-[3.8rem] xl:px-[20px] p-[10px] xl:py-[20px] lg:text-[0.94rem] text-[0.75rem] text-white"
                                                >
                                                    Sign Up
                                                </button>
                                            </div>
                                            :
                                            <div className="flex flex-col gap-[10px]">
                                                <div>
                                                    <label htmlFor="email" className="block text-[.975rem]  font-medium">Email</label>
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        placeholder="Enter email"
                                                        value={formData.email}
                                                        onChange={handleChange}
                                                        className={`mt-1 block w-full px-3 py-3 border  rounded-md ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-[#1DBF73] focus:border-[#1DBF73]`}
                                                    />
                                                    {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                                                </div>

                                                <div>
                                                    <label htmlFor="password" className="block text-[.975rem]  font-medium">Password</label>
                                                    <input
                                                        type="password"
                                                        name="password"
                                                        placeholder="Enter password"
                                                        maxLength={10}
                                                        value={formData.password}
                                                        onChange={handleChange}
                                                        className={`mt-1 block w-full px-3 py-3 border  rounded-md ${errors.password ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-[#1DBF73] focus:border-[#1DBF73]`}
                                                    />
                                                    {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                                                </div>
                                                {errors.agree && <p className="text-red-500 text-sm">{errors.agree}</p>}
                                                <button

                                                    onClick={ continueWithEmail }
                                                    className="w-full min-h-[45px]  bg-black rounded-[3.8rem] xl:px-[20px] p-[10px] xl:py-[20px] lg:text-[0.94rem] text-[0.75rem] text-white "
                                                >
                                                    Continue
                                                </button>

                                            </div>
                                    }





                                </form> :
                                    <div className="flex flex-col gap-[10px] mt-[30px]">
                                        <div className="w-full flex justify-center items-center">
                                            {!showusername ? <button

                                                onClick={() => { setSignupEmail(!signupemail) }}
                                                className="w-full min-h-[45px]  bg-black rounded-[3.8rem] xl:px-[20px] p-[10px] xl:py-[20px] lg:text-[0.94rem] text-[0.75rem] text-white "
                                            >
                                                Continue With Email
                                            </button> : ''}
                                        </div>
                                        {showusername ? <div className="flex flex-col gap-[10px]">
                                            <div>
                                                <label htmlFor="userName" className="block text-[.975rem]  font-medium">User Name</label>
                                                <input
                                                    type="text"
                                                    name="username"
                                                    maxLength={10}
                                                    placeholder="Enter username"
                                                    value={formData.username}
                                                    onChange={handleChange}
                                                    className={`mt-1 block w-full px-3 py-3 bg-white border rounded-md ${errors.userName ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-[#1DBF73] focus:border-[#1DBF73]`}
                                                />
                                                {errors.userName && <p className="text-red-500 text-sm">{errors.userName}</p>}
                                            </div>
                                            <div className="mt-4 flex items-start">
                                                <input
                                                    type="checkbox"
                                                    name="acceptTerms"
                                                    id="acceptTerms"
                                                    checked={formData.acceptTerms}
                                                    onChange={handleChange}
                                                    className="h-4 w-4 text-[#1DBF73] border-gray-300 rounded focus:ring-[#1DBF73]"
                                                />
                                                <label
                                                    htmlFor="acceptTerms"
                                                    className="ml-2 text-sm text-gray-700"
                                                >
                                                    I accept the{' '}
                                                    <a
                                                        href="/terms"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-[#1DBF73] underline hover:text-[#16a55d]"
                                                    >
                                                        Terms and Services
                                                    </a>
                                                </label>
                                            </div>
                                            {errors.acceptTerms && <p className="text-red-500 text-sm mt-1">{errors.acceptTerms}</p>}

                                            <button

                                                onClick={handleSubmit}
                                                className="w-full bg-black rounded-[3.8rem] xl:px-[20px] p-[10px] xl:py-[20px] lg:text-[0.94rem] text-[0.75rem] text-white"
                                            >
                                                Sign Up
                                            </button>
                                        </div> : <>
                                            <form onSubmit={handleSubmit} className="flex flex-col">

                                                <div className="flex flex-row space-x-5">
                                                    <button
                                                        onClick={googleSignup}
                                                        className="w-full justify-center gap-[10px] shadow-md items-center flex flex-row space-x-3 border border-[#D93025] bg-white text-[#D93025] font-bold py-[10px] lg:py-[20px] px-4 rounded-[3.8rem] focus:outline-none focus:ring"

                                                    >
                                                        <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M13.3438 7.91406C13.3438 7.47656 13.2891 7.14844 13.2344 6.79297H6.78125V9.11719H10.6094C10.4727 10.1289 9.46094 12.043 6.78125 12.043C4.45703 12.043 2.57031 10.1289 2.57031 7.75C2.57031 3.94922 7.05469 2.19922 9.46094 4.52344L11.3203 2.74609C10.1445 1.65234 8.58594 0.96875 6.78125 0.96875C3.00781 0.96875 0 4.00391 0 7.75C0 11.5234 3.00781 14.5312 6.78125 14.5312C10.6914 14.5312 13.3438 11.7969 13.3438 7.91406Z" fill="#D93025" />
                                                        </svg>

                                                        Sign Up with Google

                                                    </button>


                                                </div>
                                            </form>
                                        </>}
                                    </div>
                            }

                        </div>
                    </div>

                </div>
            </div>
            <FooterComponent />
        </>
    )
}