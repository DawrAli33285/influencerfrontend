import { useState } from "react";
import img from "../signuppage.jpeg";
export default function SignUp() {
    const [formData, setFormData] = useState({
        userId: '',
        userName: '',
        password: '',
        phoneNumber: '',
        email: '',
        agree: false,
    });

    const [errors, setErrors] = useState({});
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };
    const validate = () => {
        const newErrors = {};
        if (!formData.userId) newErrors.userId = 'User ID is required';
        if (!formData.userName) newErrors.userName = 'User Name is required';
        if (!formData.password) newErrors.password = 'Password is required';
        if (!formData.phoneNumber) newErrors.phoneNumber = 'Phone Number is required';
        if (!formData.email) newErrors.email = 'Email is required';
        if (!formData.agree) newErrors.agree = 'You must agree to the terms';

        return newErrors;
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const formErrors = validate();
        setErrors(formErrors);

        if (Object.keys(formErrors).length === 0) {
            console.log('Form data:', formData);
        }
    };
    return (
        <div className="max-w-[1440px] m-auto lg:px-[40px] px-[20px] mt-[80px]">
            <div className="grid lg:grid-cols-2 grid-cols-1">
                <div className="flex flex-col lg:pr-20">
                    <h1 className="font-semibold text-center text-[36px]">Register Now</h1>
                    <div className="flex flex-col">
                        <form onSubmit={handleSubmit} className="flex flex-col space-y-4 p-4">
                            <div>
                                <label htmlFor="userId" className="block text-lg font-medium">User ID</label>
                                <input
                                    type="text"
                                    name="userId"
                                    value={formData.userId}
                                    onChange={handleChange}
                                    className={`mt-1 block w-full px-3 py-3 border rounded-md ${errors.userId ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring focus:border-blue-500`}
                                />
                                {errors.userId && <p className="text-red-500 text-sm">{errors.userId}</p>}
                            </div>

                            <div>
                                <label htmlFor="userName" className="block text-lg font-medium">User Name</label>
                                <input
                                    type="text"
                                    name="userName"
                                    value={formData.userName}
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

                            <div>
                                <label htmlFor="phoneNumber" className="block text-lg font-medium">Phone Number</label>
                                <input
                                    type="text"
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                    className={`mt-1 block w-full px-3 py-3 border rounded-md ${errors.phoneNumber ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring focus:border-blue-500`}
                                />
                                {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber}</p>}
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
    )
}