import { useState } from "react";
import img from "../signuppage.jpeg";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { BASE_URL } from "../baseURL";
import { useNavigate } from "react-router-dom";
export default function SignUp() {
    const [formData, setFormData] = useState({
        country_code:'',
        username: '',
        password: '',
        mobile_number: '',
        email: '',
        agree: false,
    });

    const [errors, setErrors] = useState({});
    let navigate=useNavigate();
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
       if(!formData.country_code)newErrors.country_code="Country code is required"
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
    const handleSubmit =async (e) => {
        e.preventDefault();
        const formErrors = validate();
        setErrors(formErrors);

        if (Object.keys(formErrors).length === 0) {
            try{
let response=await axios.post(`${BASE_URL}/register`,formData)

toast.success(response.data.message)
localStorage.setItem('token',response.data.token)
navigate('/dashboard')

            }catch(e){
              if(e?.response?.data?.error){
                toast.error(e?.response?.data?.error)
              }else{
                toast.error("Client error please try again")
              }
            }
          
        }
    };



    return (
        <>
        <ToastContainer/>
       
        <div className="max-w-[1440px] m-auto lg:px-[40px] px-[20px] mt-[80px]">
            <div className="grid lg:grid-cols-2 grid-cols-1">
                <div className="flex flex-col lg:pr-20">
                    <h1 className="font-semibold text-center text-[36px]">Register Now</h1>
                    <div className="flex flex-col">
                        <form onSubmit={handleSubmit} className="flex flex-col space-y-4 p-4">
                          

                            <div>
                                <label htmlFor="userName" className="block text-lg font-medium">User Name</label>
                                <input
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    className={`mt-1 block w-full px-3 py-3 border rounded-md ${errors.userName ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring focus:border-blue-500`}
                                />
                                {errors.userName && <p className="text-red-500 text-sm">{errors.userName}</p>}
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-lg font-medium">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className={`mt-1 block w-full px-3 py-3 border rounded-md ${errors.password ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring focus:border-blue-500`}
                                />
                                {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                            </div>

                            <div className="flex space-x-4">

    <div className="w-1/4">
        <label htmlFor="countryCode" className="block text-lg font-medium">Country Code</label>
        <select
            name="country_code"
            value={formData.country_code}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-3 border rounded-md border-gray-300 focus:outline-none focus:ring focus:border-blue-500"
        >
            <option value="">Code</option>
            <option value="+1">+1 (USA)</option>
            <option value="+44">+44 (UK)</option>
            <option value="+91">+91 (India)</option>
        </select>
        {errors.country_code && <p className="text-red-500 text-sm">{errors.country_code}</p>}
    </div>


    <div className="w-3/4">
        <label htmlFor="phoneNumber" className="block text-lg font-medium">Phone Number</label>
        <input
            type="text"
            name="mobile_number"
            value={formData.mobile_number}
            onChange={handleChange}
            className={`mt-1 block w-full px-3 py-3 border rounded-md ${errors.phoneNumber ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring focus:border-blue-500`}
        />
        {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber}</p>}
    </div>
</div>

                            <div>
                                <label htmlFor="email" className="block text-lg font-medium">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={`mt-1 block w-full px-3 py-3 border rounded-md ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring focus:border-blue-500`}
                                />
                                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                            </div>

                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="agree"
                                    checked={formData.agree}
                                    onChange={handleChange}
                                    className={`h-4 w-4 ${errors.agree ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring focus:border-[#6B33E3]`}
                                />
                                <label htmlFor="agree" className="ml-2 block text-sm font-medium">I agree to the terms and conditions</label>
                            </div>
                            {errors.agree && <p className="text-red-500 text-sm">{errors.agree}</p>}

                            <button
                                type="submit"
                                className="w-full bg-[#6B33E3] text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring"
                            >
                                Sign Up
                            </button>
                        </form>

                    </div>
                </div>
                <div className=" hidden lg:block h-full w-full rounded-[20px]">
                    <img src={img} className="w-full h-full object-cover rounded-[20px]" alt="img"/>

                </div>
            </div>
        </div>
        </>
    )
}