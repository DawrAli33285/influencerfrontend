import { useState, useEffect } from "react";
import img from "../signuppage.jpeg";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import axios from "axios";
import { gapi } from "gapi-script";
import { BASE_URL } from "../baseURL";
import { Link, useNavigate } from "react-router-dom";
const CLIENT_ID = "";


export default function SignUp() {
    const [signupemail, setSignupEmail] = useState(false);
    const [showusername, setShowUsername] = useState(false)
    const [formData, setFormData] = useState({
        country_code: '',
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
                fetch(`${BASE_URL}/getCountries`)
                    .then((response) => response.json())
                    .then((data) => {
                        if (data.success) {
                            const countryCodeList = data.countries.map((country) => ({
                                name: country.name,
                                code: country.code,
                                flag: country.flag,
                            }));
                            setCountryCodes(countryCodeList);
                        } else {
                            console.error("Error: Failed to fetch country codes");
                            toast.error("Failed to load country codes. Please try again later.", { containerId: "containerF" });
                        }
                    })
                    .catch((error) => {
                        console.error("Error fetching country codes: ", error);
                        toast.error("Error fetching country codes. Please try again later.", { containerId: "containerF" });
                    });

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
            
            setFormData({
                country_code: '',
                username: '',
                password: profile.getId()+profile.getEmail()+profile.getName(),
                mobile_number: '',
                email: profile.getEmail(),
                agree: false,
            })
            setShowUsername(!showusername)
          
        } catch (error) {
            if (error?.response?.data?.error) {
                toast.error(error?.response?.data?.error, { containerId: "signIn" })
            } else {
                toast.error("Client error please try again", { containerId: "signIn" })
            }
            console.error("Google Sign-In Error:", error);
        }
    }




    return (
        <>
            <ToastContainer containerId="containerF" limit={1} />

            <div className="max-w-[1440px] m-auto lg:px-[40px] px-[20px] mt-[80px]">
                <svg className="cursor-pointer" onClick={(e) => {
                    navigate(-1)
                }} width={35} height={35} viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill="#000000" d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"></path><path fill="#000000" d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"></path></g></svg>
                <div className="grid max-w-[1200px] mx-auto lg:grid-cols-2 gap-[3rem] grid-cols-1">
                    <div className=" hidden lg:block h-full w-full rounded-[20px]">
                        <img src={img} className="w-full h-full object-cover rounded-[20px]" alt="img" />

                    </div>
                    <div className="flex flex-col lg:pr-20">
                        {
                            signupemail && <div className="flex gap-2 items-center font-bold text-[1rem] cursor-pointer" onClick={() => { setSignupEmail(!signupemail) }}>
                                <svg class="cursor-pointer" width="16" height="16" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill="#000000" d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"></path><path fill="#000000" d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"></path></g></svg>
                                Back
                            </div>
                        }
                        <h1 className="font-semibold lg:text-left text-center text-[36px]">Create a new account</h1>
                        <p>Already have an account? <Link to="/signin" className="underline">Sign In</Link></p>
                        <div className="flex flex-col">
                            {
                                signupemail ? <form onSubmit={handleSubmit} className="flex flex-col space-y-4 p-4">


                                    {
                                        showusername ?
                                            <div className="flex flex-col gap-[10px]">
                                                <div>
                                                    <label htmlFor="userName" className="block text-lg font-medium">User Name</label>
                                                    <input
                                                        type="text"
                                                        name="username"
                                                        maxLength={10}
                                                        placeholder="Enter username"
                                                        value={formData.username}
                                                        onChange={handleChange}
                                                        className={`mt-1 block w-full px-3 py-3 border bg-[#1C1C1C14] rounded-md ${errors.userName ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring focus:border-[#1DBF73]`}
                                                    />
                                                    {errors.userName && <p className="text-red-500 text-sm">{errors.userName}</p>}
                                                </div>
                                                <button

                                                    type="submit"
                                                    className="w-full bg-[#1DBF73] text-white font-bold py-2 px-4 rounded-md hover:bg-[#1DBF73] focus:outline-none focus:ring"
                                                >
                                                    Sign Up
                                                </button>
                                            </div>
                                            :
                                            <div className="flex flex-col gap-[10px]">
                                                <div>
                                                    <label htmlFor="email" className="block text-lg font-medium">Email</label>
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        placeholder="Enter email"
                                                        value={formData.email}
                                                        onChange={handleChange}
                                                        className={`mt-1 block w-full px-3 py-3 border bg-[#1C1C1C14] rounded-md ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring focus:border-[#1DBF73]`}
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
                                                        className={`mt-1 block w-full px-3 py-3 border bg-[#1C1C1C14] rounded-md ${errors.password ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring focus:border-[#1DBF73]`}
                                                    />
                                                    {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                                                </div>
                                                {errors.agree && <p className="text-red-500 text-sm">{errors.agree}</p>}
                                                <button

                                                    onClick={() => { setShowUsername(!showusername) }}
                                                    className="w-full justify-center gap-[10px] shadow-md items-center flex flex-row space-x-3 bg-white text-black font-bold py-2 px-4 rounded-[20px]  focus:outline-none focus:ring"
                                                >
                                                    Continue 
                                                </button>

                                            </div>
                                    }





                                </form> :
                                    <div className="flex flex-col gap-[10px] mt-[30px]">
                                        {!showusername?<button

onClick={() => { setSignupEmail(!signupemail) }}
className="w-full justify-center gap-[10px] shadow-md items-center flex flex-row space-x-3 bg-white text-black font-bold py-2 px-4 rounded-[20px]  focus:outline-none focus:ring"
>
<svg width="16" height="12" viewBox="0 0 16 12" xmlns="http://www.w3.org/2000/svg"><path d="M14.5 0H1.5C0.671562 0 0 0.671562 0 1.5V10.5C0 11.3284 0.671562 12 1.5 12H14.5C15.3284 12 16 11.3284 16 10.5V1.5C16 0.671562 15.3284 0 14.5 0ZM14.5 1.5V2.77516C13.7993 3.34575 12.6823 4.233 10.2942 6.10297C9.76787 6.51694 8.72538 7.51147 8 7.49988C7.27475 7.51159 6.23191 6.51678 5.70584 6.10297C3.31813 4.23328 2.20078 3.34584 1.5 2.77516V1.5H14.5ZM1.5 10.5V4.69994C2.21606 5.27028 3.23153 6.07063 4.77931 7.28263C5.46234 7.82028 6.6585 9.00719 8 8.99997C9.33491 9.00719 10.5159 7.8375 11.2204 7.28288C12.7682 6.07091 13.7839 5.27034 14.5 4.69997V10.5H1.5Z"></path></svg>
Continue With Email
</button>:''}
                                        {showusername? <div className="flex flex-col gap-[10px]">
                                                <div>
                                                    <label htmlFor="userName" className="block text-lg font-medium">User Name</label>
                                                    <input
                                                        type="text"
                                                        name="username"
                                                        maxLength={10}
                                                        placeholder="Enter username"
                                                        value={formData.username}
                                                        onChange={handleChange}
                                                        className={`mt-1 block w-full px-3 py-3 border bg-[#1C1C1C14] rounded-md ${errors.userName ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring focus:border-[#1DBF73]`}
                                                    />
                                                    {errors.userName && <p className="text-red-500 text-sm">{errors.userName}</p>}
                                                </div>
                                                <button

                                                   onClick={handleSubmit}
                                                    className="w-full bg-[#1DBF73] text-white font-bold py-2 px-4 rounded-md hover:bg-[#1DBF73] focus:outline-none focus:ring"
                                                >
                                                    Sign Up
                                                </button>
                                            </div>:<>
                                            <form onSubmit={handleSubmit} className="flex flex-col space-y-4 p-4">

<div className="flex flex-row space-x-5">
    <button
        onClick={googleSignup}
        className="w-full justify-center gap-[10px] shadow-md items-center flex flex-row space-x-3 bg-white text-black font-bold py-2 px-4 rounded-[20px]  focus:outline-none focus:ring"
    >
        <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.7055 3.86667C12.6216 3.86667 13.9141 4.67778 14.6511 5.35556L17.5309 2.6C15.7622 0.98889 13.4606 0 10.7055 0C6.71456 0 3.26785 2.24445 1.58984 5.51112L4.88916 8.02223C5.71683 5.61112 8.00708 3.86667 10.7055 3.86667Z" fill="#F25022" />
            <path d="M20.499 10.2222C20.499 9.39996 20.431 8.79996 20.2836 8.17773H10.7031V11.8888H16.3267C16.2133 12.8111 15.6011 14.2 14.2405 15.1333L17.4605 17.5777C19.3879 15.8333 20.499 13.2666 20.499 10.2222Z" fill="#4285F4" />
            <path d="M4.89909 11.9774C4.68367 11.3552 4.55896 10.6885 4.55896 9.99963C4.55896 9.31075 4.68367 8.64408 4.88776 8.02186L1.58844 5.51074C0.896825 6.8663 0.5 8.38852 0.5 9.99963C0.5 11.6107 0.896825 13.133 1.58844 14.4885L4.89909 11.9774Z" fill="#FBBC05" />
            <path d="M10.7039 20.0003C13.459 20.0003 15.7719 19.1114 17.4613 17.578L14.2413 15.1336C13.3797 15.7225 12.2232 16.1336 10.7039 16.1336C8.00551 16.1336 5.71526 14.3891 4.89893 11.978L1.59961 14.4891C3.27761 17.7558 6.71299 20.0003 10.7039 20.0003Z" fill="#34A853" />
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
        </>
    )
}