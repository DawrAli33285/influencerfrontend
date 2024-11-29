import { useState, useEffect } from "react";
import img from "../signuppage.jpeg";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { BASE_URL } from "../baseURL";
import { useNavigate } from "react-router-dom";
export default function SignUp() {
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
        if (!formData.country_code) newErrors.country_code = "Country code is required"
        if (!formData.mobile_number) {
            newErrors.phoneNumber = 'Phone Number is required'
        }
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = 'Invalid Email Format';
        }
        if (!formData.agree) newErrors.agree = 'You must agree to the terms';

        return newErrors;
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formErrors = validate();
        setErrors(formErrors);

        if (Object.keys(formErrors).length === 0) {
            try {
                let response = await axios.post(`${BASE_URL}/register`, formData)
                toast.dismiss()
                toast.success(response.data.message, { containerId: "containerF" })
                localStorage.setItem('token', response.data.token)
                setFormData({
                    country_code: '',
                    username: '',
                    password: '',
                    mobile_number: '',
                    email: '',
                    agree: false,
                })

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
        const fetchCountryCodes = async () => {
            try {
                fetch('https://restcountries.com/v3.1/all')
                .then((response) => response.json())
                .then((countries) => {
                    const countryCodeList = countries.map((country) => ({
                        name: country.name.common,
                        code: country.idd.root + (country.idd.suffixes ? country.idd.suffixes[0] : ""),
                        flag: country.flags.svg,
                    }));
                    setCountryCodes(countryCodeList);
                })
                .catch((error) => console.error("Error fetching country codes: ", error));
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

    return (
        <>
            <ToastContainer containerId="containerF" limit={1} />

            <div className="max-w-[1440px] m-auto lg:px-[40px] px-[20px] mt-[80px]">
                <svg className="cursor-pointer" onClick={(e) => {
                    navigate(-1)
                }} width={35} height={35} viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill="#000000" d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"></path><path fill="#000000" d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"></path></g></svg>
                <div className="grid max-w-[800px] mx-auto lg:grid-cols-1 grid-cols-1">
                    <div className="flex flex-col lg:pr-20">
                        <h1 className="font-semibold text-center text-[36px]">Register Now</h1>
                        <div className="flex flex-col">
                            <form onSubmit={handleSubmit} className="flex flex-col space-y-4 p-4">


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

                                <div className="flex space-x-4">

                                    <div className="w-1/4">
                                        <label htmlFor="countryCode" className="block text-lg font-medium">Code</label>
                                        <select
                                            name="country_code"
                                            value={formData.country_code}
                                            onChange={handleChange}
                                            className="mt-1 block w-full px-3 py-3 border bg-[#1C1C1C14] rounded-md border-gray-300 focus:outline-none focus:ring focus:border-[#1DBF73]"
                                        >
                                            <option value="">Code</option>
                                            {sortCountryCodes()?.map((country, index) => (
                                                <option key={index} value={country.code}>
                                                    {`${country.code} (${country.name})`}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.country_code && <p className="text-red-500 text-sm">{errors.country_code}</p>}
                                    </div>

                                    <div className="w-3/4">
                                        <label htmlFor="phoneNumber" className="block text-lg font-medium">Phone Number</label>
                                        <input
                                            placeholder="Enter phone number without country code"
                                            type="text"
                                            name="mobile_number"
                                            maxLength={11}
                                            value={formData.mobile_number}
                                            onChange={handleChange}
                                            className={`mt-1 block w-full px-3 py-3 bg-[#1C1C1C14] border rounded-md ${errors.phoneNumber ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring focus:border-[#1DBF73]`}
                                        />
                                        {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber}</p>}
                                    </div>
                                </div>

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

                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        name="agree"
                                        checked={formData.agree}
                                        onChange={handleChange}
                                        className={`h-4 w-4 ${errors.agree ? 'border-red-500' : 'border-gray-300'} focus:outline-none bg-[#1C1C1C14] focus:ring focus:border-[#1DBF73]`}
                                    />
                                    <label htmlFor="agree" className="ml-2 block text-sm font-medium">I agree to the terms and conditions</label>
                                </div>
                                {errors.agree && <p className="text-red-500 text-sm">{errors.agree}</p>}

                                <button
                                    type="submit"
                                    className="w-full bg-[#1DBF73] text-white font-bold py-2 px-4 rounded-md hover:bg-[#1DBF73] focus:outline-none focus:ring"
                                >
                                    Sign Up
                                </button>
                            </form>

                        </div>
                    </div>
                  
                </div>
            </div>
        </>
    )
}