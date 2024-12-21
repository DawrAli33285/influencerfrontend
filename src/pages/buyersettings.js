import { useEffect, useState } from "react";
import avatar from "../avatar.webp"
import { ToastContainer, toast } from "react-toastify";
import { MoonLoader } from "react-spinners";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../baseURL";
import { useDropzone } from 'react-dropzone';

export default function Buyersettings() {
    const [isOpen, setIsOpen] = useState(false);
    const [state, setState] = useState()
    const [loading, setLoading] = useState(true)
    const [locationState, setLocationState] = useState("")
    const onDrop = (acceptedFiles) => {
        if (acceptedFiles.length > 0) {
            const file = acceptedFiles[0];
            const reader = new FileReader();

            reader.onload = () => {
                const fileUrl = reader.result;
                setUser((prevUser) => ({
                    ...prevUser,
                    avatar: file,
                    avatarLink: fileUrl,
                }));
            };

            reader.readAsDataURL(file);

            console.log('Uploaded file:', file);
        }
    };
    const [user, setUser] = useState({
        username: '',
        email: '',
        mobile_number: '',
        avatarLink: '',
        bio: '',
        oldEmail: '',
        language: '',
        gender: '',
        avatar: ''
    })

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: 'image/jpeg, image/png',
        maxFiles: 1,
        maxSize: 1048576,
    });
    const [notificationState, setNotificationState] = useState({
        recieve_notifications: true,
        notification_type: 'Email'
    })
    const [passwordState, setPasswordState] = useState({
        old_password: '',
        password: '',
        confirmPassword: ''
    })
    const navigate = useNavigate();

    const toggleTab = () => {
        setIsOpen(!isOpen);
    }
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const togglePopup = () => {
        setIsPopupOpen(!isPopupOpen);
        setPasswordState({
            password: '',
            old_password: '',
            confirmPassword: ''
        })
    }

    useEffect(() => {
        fetchProfile();
    }, [])


    const fetchProfile = async () => {
        try {
            let token = localStorage.getItem('token')
            let headers = {
                headers: {
                    authorization: `Bearer ${token}`
                }
            }
            let response = await axios.get(`${BASE_URL}/get-currentIssuer`, headers)
            console.log(response.data)
            setUser({
                username: response.data.issuer.user_id.username,
                email: response.data.issuer.user_id.email,
                mobile_number: response?.data?.issuer?.user_id?.country_code_id?.country_code? + response?.data?.issuer?.user_id?.mobile_number:'',
                bio: response.data.issuer.user_id.bio,
                language: response.data.issuer.user_id.language,
                oldEmail: response.data.issuer.user_id.email,
                gender: response.data.issuer.user_id.gender,
                avatar: response.data.issuer.user_id.avatar,
                avatarLink: response.data.issuer.user_id.avatar
            })
            setState(response.data.issuer)
            setNotificationState(response.data.notificationsData)
            setLocationState(response.data.issuer.user_id.location)
            console.log("RESPONSE")
            setLoading(false)

        } catch (e) {
            if (e?.response?.data?.error) {
                toast.error(e?.response?.data?.error, { containerId: "settingsPageToast" })
            } else {
                toast.error("Client error please try again", { containerId: "settingsPageToast" })

            }
            console.log("ERROR")
            console.log(e.message)
        }
    }

    const savePassword = async (e) => {
        e.preventDefault();
        try {
            let token = localStorage.getItem('token')
            let headers = {
                headers: {
                    authorization: `Bearer ${token}`
                }
            }
            if (passwordState.old_password.length == 0) {
                toast.error("Please enter old password", { containerId: "settingsPageToast" })
                return;
            } else if (passwordState.password.length === 0) {
                toast.error("Please enter new password", { containerId: "settingsPageToast" })
                return;
            } else if (passwordState.password != passwordState.confirmPassword) {
                toast.error("Password mismatch", { containerId: "settingsPageToast" })
                return;
            }
            let response = await axios.post(`${BASE_URL}/updatePassword`, passwordState, headers)
            setPasswordState({
                password: '',
                old_password: '',
                confirmPassword: ''
            })
            toast.success(response.data.message, { containerId: "settingsPageToast" })
            setIsPopupOpen(!isPopupOpen);
        } catch (e) {
            if (e?.response.data?.error) {
                toast.error(e?.response?.data?.error, { containerId: "settingsPageToast" })
            } else {
                toast.error("Client error please try again", { containerId: "settingsPageToast" })
            }
        }

    }
    const [formData, setFormData] = useState({
        username: state?.user_id?.username || "",
        email: state?.user_id?.email || "",
        mobileNumber:
            state?.user_id?.mobile_number
                ? state?.user_id?.country_code_id?.country_code + state?.user_id?.mobile_number
                : "",
        description: state?.user_id?.description || "",
        gender: state?.user_id?.gender || "",
        country: state?.user_id?.country || "",
        city: state?.user_id?.city || "",
        languages: [],
    });

    const handleChange = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleAddLanguage = (e) => {
        const language = e.target.value;
        if (language && !formData.languages.includes(language)) {
            setFormData((prev) => ({
                ...prev,
                languages: [...prev.languages, language],
            }));
        }
        e.target.value = "";
    };

    const handleRemoveLanguage = (languageToRemove) => {
        setFormData((prev) => ({
            ...prev,
            languages: prev.languages.filter((lang) => lang !== languageToRemove),
        }));
    };

    const updateLocation = async (location) => {

        try {

            let token = localStorage.getItem('token')
            let headers = {
                headers: {
                    authorization: `Bearer ${token}`
                }
            }
            let response = await axios.patch(`${BASE_URL}/updateLocation`, { location }, headers)
            toast.success(response.data.message, { containerId: "settingsPageToast" })
            setState((prev) => {
                let old = prev;
                let newold = { ...old }
                let newuser = { ...newold.user_id, location }

                newold.user_id = newuser
                return newold

            })
        } catch (e) {
            if (e?.response.data?.error) {
                toast.error(e?.response?.data?.error, { containerId: "settingsPageToast" })
            } else {
                toast.error("Client error please try again", { containerId: "settingsPageToast" })
            }
        }
    }

    const updateNotificationsData = async (type) => {
        try {

            let token = localStorage.getItem('token')
            let headers = {
                headers: {
                    authorization: `Bearer ${token}`
                }
            }

            let response = await axios.patch(`${BASE_URL}/updateNotificationsData`, { recieve_notifications: notificationState?.recieve_notifications, notification_type: type }, headers)
            toast.success(response.data.message, { containerId: "settingsPageToast" })
        } catch (e) {
            console.log("ERROR")
            console.log(e.message)
            if (e?.response?.data?.error) {
                toast.error(e?.response?.data?.error, { containerId: "settingsPageToast" })
            } else {
                toast.error("Client error please try again", { containerId: "settingsPageToast" })
            }
        }
    }


    const updateRecieveNotificationsData = async (type) => {
        try {

            let token = localStorage.getItem('token')
            let headers = {
                headers: {
                    authorization: `Bearer ${token}`
                }
            }

            let response = await axios.patch(`${BASE_URL}/updateNotificationsData`, { recieve_notifications: type, notification_type: notificationState?.notification_type }, headers)
            toast.success(response.data.message, { containerId: "settingsPageToast" })
        } catch (e) {
            console.log("ERROR")
            console.log(e.message)
            if (e?.response?.data?.error) {
                toast.error(e?.response?.data?.error, { containerId: "settingsPageToast" })
            } else {
                toast.error("Client error please try again", { containerId: "settingsPageToast" })
            }
        }
    }

    const saveUser = async () => {
        try {
            const formData = new FormData();
            formData.append('username', user.username);
            formData.append('email', user.email);
            const [countryCode, ...numberParts] = user.mobile_number.startsWith('+')
                ? user.mobile_number.split(' ')
                : ['', user.mobile_number];

            const mobileNumberWithoutCode = numberParts.join(' ');
            formData.append('country_code', countryCode);
            formData.append('mobile_number', mobileNumberWithoutCode);
            formData.append('avatarLink', user.avatarLink);
            formData.append('bio', user.bio);
            formData.append('oldEmail', user.oldEmail);
            formData.append('language', user.language);
            formData.append('gender', user.gender);
            formData.append('avatar', user.avatar);

            let response = await axios.patch(`${BASE_URL}/admin/editUser/${user.oldEmail}`, formData)
            toast.success("User updated sucessfully", { containerId: "settingsPageToast" })
        } catch (e) {
            if (e?.response?.data?.error) {
                toast.error(e?.response?.data?.error, { containerId: "settingsPageToast" })
            } else {
                toast.error("Client error please try again", { containerId: "settingsPageToast" })
            }
        }
    }


    return (
        <>
            <ToastContainer containerId={"settingsPageToast"} />

            <div className="w-full flex flex-col lg:px-[30px] lg:py-[40px]">
                {loading ? <div className="w-full flex justify-center items-center">
                    <MoonLoader color="#6B33E3" size={100} />

                </div> : <>

                    <div className="w-full flex flex-col gap-[20px] p-[20px]">
                        <div className="flex flex-col p-[20px] gap[20px] bg-white">
                            <div className="py-[20px] border-b border-[#E9E9E9]">
                                <h2 className="lg:text-[1.25rem] text-black  text-[1.25rem] font-medium  lg:text-left text-center lg:font-bold">Personal Information</h2>
                            </div>
                            <div className="flex items-center lg:flex-row flex-col gap-6 my-[20px]">
                                <div className="rounded-[100%] w-[80px] h-[80px]">
                                    <img
                                        src={
                                            user.avatarLink
                                        }
                                        alt="img"
                                        className="w-full h-full object-cover rounded-[100%]"
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center gap-[10px]">
                                        <button onClick={() => {
                                            setUser({
                                                ...user,
                                                avatarLink: '',
                                                avatar: ''
                                            })
                                        }} className="bg-[#FFEDE8] flex items-center justify-center w-[40px] h-[40px] rounded-[4px]">
                                            <svg
                                                width="16"
                                                height="16"
                                                viewBox="0 0 16 16"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <g clipPath="url(#clip0_230_1893)">
                                                    <path
                                                        d="M14.4023 2.135H10.5523L10.3223 1.215C10.2362 0.867805 10.0363 0.559463 9.75441 0.339225C9.47254 0.118986 9.12499 -0.000446193 8.76729 3.3199e-06H7.23729C6.88025 -0.000723749 6.53322 0.117991 6.25144 0.337255C5.96966 0.556519 5.76931 0.863732 5.68228 1.21L5.45228 2.135H1.60229C1.52802 2.1278 1.45307 2.13621 1.38225 2.15969C1.31143 2.18317 1.2463 2.22121 1.19105 2.27136C1.1358 2.32151 1.09166 2.38265 1.06144 2.45088C1.03123 2.5191 1.01562 2.59289 1.01562 2.6675C1.01562 2.74212 1.03123 2.81591 1.06144 2.88413C1.09166 2.95235 1.1358 3.0135 1.19105 3.06365C1.2463 3.1138 1.31143 3.15183 1.38225 3.17532C1.45307 3.1988 1.52802 3.20721 1.60229 3.2H14.4023C14.4765 3.20721 14.5515 3.1988 14.6223 3.17532C14.6931 3.15183 14.7583 3.1138 14.8135 3.06365C14.8688 3.0135 14.9129 2.95235 14.9431 2.88413C14.9733 2.81591 14.9889 2.74212 14.9889 2.6675C14.9889 2.59289 14.9733 2.5191 14.9431 2.45088C14.9129 2.38265 14.8688 2.32151 14.8135 2.27136C14.7583 2.22121 14.6931 2.18317 14.6223 2.15969C14.5515 2.13621 14.4765 2.1278 14.4023 2.135ZM6.55229 2.135L6.71729 1.47C6.74541 1.3574 6.8094 1.25699 6.89959 1.18393C6.98979 1.11088 7.10129 1.06914 7.21729 1.065H8.75229C8.86828 1.06914 8.97978 1.11088 9.06998 1.18393C9.16017 1.25699 9.22416 1.3574 9.25229 1.47L9.41728 2.135H6.55229Z"
                                                        fill="#1F4B3F"
                                                    />
                                                    <path
                                                        d="M13.3356 4.26562H2.66565C2.59093 4.26593 2.51711 4.28188 2.44894 4.31244C2.38076 4.34301 2.31974 4.38752 2.26982 4.4431C2.21989 4.49868 2.18215 4.5641 2.15904 4.63515C2.13594 4.7062 2.12797 4.78131 2.13565 4.85563L3.00065 13.6006C3.06549 14.261 3.37479 14.8733 3.86786 15.3173C4.36092 15.7613 5.00213 16.005 5.66565 16.0006H10.3356C10.9992 16.005 11.6404 15.7613 12.1334 15.3173C12.6265 14.8733 12.9358 14.261 13.0006 13.6006L13.8656 4.85563C13.8726 4.7817 13.8641 4.70714 13.8406 4.63669C13.8172 4.56624 13.7793 4.50144 13.7295 4.44641C13.6796 4.39139 13.6189 4.34734 13.5511 4.31708C13.4833 4.28681 13.4099 4.27099 13.3356 4.27063V4.26562ZM11.9306 13.5006C11.8921 13.8954 11.7079 14.2616 11.4139 14.5278C11.1199 14.7941 10.7373 14.9413 10.3406 14.9406H5.66565C5.26816 14.9425 4.8843 14.7959 4.58926 14.5295C4.29422 14.2632 4.10927 13.8962 4.07065 13.5006L3.25565 5.33563H12.7556L11.9306 13.5006Z"
                                                        fill="#1F4B3F"
                                                    />
                                                </g>
                                                <defs>
                                                    <clipPath id="clip0_230_1893">
                                                        <rect width="16" height="16" fill="white" />
                                                    </clipPath>
                                                </defs>
                                            </svg>
                                        </button>
                                        <div
                                            {...getRootProps()}
                                            className="bg-[#1DBF730D] text-[#1F4B3F] text-[15px] font-medium px-4 py-2 rounded-[4px] cursor-pointer"
                                        >
                                            <input {...getInputProps()} />
                                            Upload
                                        </div>
                                        {user.avatar && (
                                            <div className="mt-4">
                                                <p>Selected file: {user.avatar.name}</p>
                                            </div>
                                        )}
                                    </div>
                                    <div className=" text-[15px]">
                                        Max file size is 1MB, Minimum dimension: 330x300 And Suitable files are .jpg & .png
                                    </div>
                                </div>

                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-[30px]">

                                <div className="flex flex-col">
                                    <label
                                        htmlFor="username"
                                        className="text-[15px] lg:text-[15px] sm:text-[14px] font-medium text-[#344054] mb-[8px]"
                                    >
                                        Username
                                    </label>
                                    <input
                                        id="username"
                                        type="text"
                                        className="border-[#E9E9E9] border rounded-[4px] px-[15px] py-[14px] focus:outline-none focus:ring-2 focus:ring-[#1DBF73]"
                                        placeholder="Enter your username"
                                        value={user.username}
                                        onChange={(e) => setUser({
                                            ...user,
                                            username: e.target.value
                                        })}
                                    />
                                </div>

                                <div className="flex flex-col">
                                    <label
                                        htmlFor="email"
                                        className="text-[15px] lg:text-[15px] sm:text-[14px] font-medium text-[#344054] mb-[8px]"
                                    >
                                        Email Address
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        className="border-[#E9E9E9] border rounded-[4px] px-[15px] py-[14px] focus:outline-none focus:ring-2 focus:ring-[#1DBF73]"
                                        placeholder="Enter your email"
                                        value={user.email}
                                        onChange={(e) => {
                                            setUser({
                                                ...user,
                                                email: e.target.value
                                            })
                                        }}
                                    />
                                </div>

                                <div className="flex flex-col">
                                    <label
                                        htmlFor="phoneNumber"
                                        className="text-[15px] lg:text-[15px] sm:text-[14px] font-medium text-[#344054] mb-[8px]"
                                    >
                                        Phone Number
                                    </label>
                                    <input
                                        id="phoneNumber"
                                        type="text"
                                        className="border-[#E9E9E9] border rounded-[4px] px-[15px] py-[14px] focus:outline-none focus:ring-2 focus:ring-[#1DBF73]"
                                        placeholder="Enter your phone number"
                                        value={user.mobile_number}
                                        onChange={(e) => {
                                            setUser({
                                                ...user,
                                                mobile_number: e.target.value
                                            })
                                        }}
                                    />
                                </div>

                                <div className="flex flex-col">
                                    <label
                                        htmlFor="description"
                                        className="text-[15px] lg:text-[15px] sm:text-[14px] font-medium text-[#344054] mb-[8px]"
                                    >
                                        Description
                                    </label>
                                    <textarea
                                        id="description"
                                        className="border-[#E9E9E9] border rounded-[4px] px-[15px] py-[14px] focus:outline-none focus:ring-2 focus:ring-[#1DBF73]"
                                        placeholder="Enter description"
                                        value={user.bio}
                                        onChange={(e) => {
                                            setUser({
                                                ...user,
                                                bio: e.target.value
                                            })
                                        }}
                                    />
                                </div>


                                <div className="flex flex-col">
                                    <label
                                        htmlFor="languages"
                                        className="text-[15px] lg:text-[15px] sm:text-[14px] font-medium text-[#344054] mb-[8px]"
                                    >
                                        Languages
                                    </label>
                                    <select
                                        id="languages"
                                        value={user.language}
                                        className="border-[#E9E9E9] border rounded-[4px] px-[15px] py-[14px] focus:outline-none focus:ring-2 focus:ring-[#1DBF73]"
                                        onChange={(e) => {
                                            setUser({
                                                ...user,
                                                language: e.target.value
                                            })
                                        }}
                                    >
                                        <option value="">Select language</option>
                                        <option value="English">English</option>
                                        <option value="Spanish">Spanish</option>
                                        <option value="French">French</option>
                                    </select>
                                    <div className="flex flex-wrap gap-[10px] mt-[10px]">
                                        {formData.languages.map((lang) => (
                                            <div
                                                key={lang}
                                                className="flex items-center bg-[#FFEDE8] px-[10px] py-[5px] rounded-[4px]"
                                            >
                                                <span>{lang}</span>
                                                <button
                                                    type="button"
                                                    className="ml-[5px] text-[#FF5773] font-bold"
                                                    onClick={() => handleRemoveLanguage(lang)}
                                                >
                                                    ×
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>


                                <div className="flex flex-col">
                                    <label
                                        htmlFor="gender"
                                        className="text-[15px] lg:text-[15px] sm:text-[14px] font-medium text-[#344054] mb-[8px]"
                                    >
                                        Gender
                                    </label>
                                    <select
                                        id="gender"
                                        className="border-[#E9E9E9] border rounded-[4px] px-[15px] py-[14px] focus:outline-none focus:ring-2 focus:ring-[#1DBF73]"
                                        value={user.gender}
                                        onChange={(e) => {
                                            setUser({
                                                ...user,
                                                gender: e.target.value
                                            })
                                        }}
                                    >
                                        <option value="" disabled>
                                            Select Gender
                                        </option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>


                                {/* <div className="flex flex-col">
                                    <label
                                        htmlFor="country"
                                        className="text-[15px] lg:text-[15px] sm:text-[14px] font-medium text-[#344054] mb-[8px]"
                                    >
                                        Country
                                    </label>
                                    <input
                                        id="country"
                                        type="text"
                                        className="border-[#E9E9E9] border rounded-[4px] px-[15px] py-[14px] focus:outline-none focus:ring-2 focus:ring-[#1DBF73]"
                                        placeholder="Enter country"
                                        value={formData.country}
                                        onChange={(e) => handleChange("country", e.target.value)}
                                    />
                                </div> */}

                                {/* 
                                <div className="flex flex-col">
                                    <label
                                        htmlFor="city"
                                        className="text-[15px] lg:text-[15px] sm:text-[14px] font-medium text-[#344054] mb-[8px]"
                                    >
                                        City
                                    </label>
                                    <input
                                        id="city"
                                        type="text"
                                        className="border-[#E9E9E9] border rounded-[4px] px-[15px] py-[14px] focus:outline-none focus:ring-2 focus:ring-[#1DBF73]"
                                        placeholder="Enter city"
                                        value={formData.city}
                                        onChange={(e) => handleChange("city", e.target.value)}
                                    />
                                </div> */}
                            </div>
                            <div className="w-full justify-start mt-[30px]">
                                <div onClick={saveUser} className="lg:w-fit w-full bg-black justify-center text-[15px] flex gap-[6px] items-center rounded-[60px] cursor-pointer text-white font-medium lg:px-[60px] px-[20px] py-[10px]">
                                    Save
                                    <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clip-path="url(#clip0_236_4257)">
                                            <path d="M16.0556 0H6.2778C6.03214 0 5.83334 0.198792 5.83334 0.444458C5.83334 0.690125 6.03214 0.888917 6.2778 0.888917H14.9827L0.630219 15.2413C0.456594 15.415 0.456594 15.6962 0.630219 15.8698C0.71701 15.9566 0.83076 16 0.944469 16C1.05818 16 1.17189 15.9566 1.25872 15.8698L15.6111 1.51737V10.2222C15.6111 10.4679 15.8099 10.6667 16.0556 10.6667C16.3013 10.6667 16.5001 10.4679 16.5001 10.2222V0.444458C16.5 0.198792 16.3012 0 16.0556 0Z" fill="white" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_236_4257">
                                                <rect width="16" height="16" fill="white" transform="translate(0.5)" />
                                            </clipPath>
                                        </defs>
                                    </svg>

                                </div>
                            </div>
                        </div>
                        <div className="bg-white flex flex-col gap-[20px] p-[20px]">
                            <div className="mt-[40px]">
                                <div className="flex justify-between items-center">
                                    <h1 className="text-[20px] font-semibold">Account & Notification</h1>

                                    <div
                                        onClick={toggleTab}
                                        className={`cursor-pointer transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                                    >
                                        <svg
                                            width="16"
                                            height="16"
                                            viewBox="0 0 16 16"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M4.66667 6.66667L8 10L11.3333 6.66667"
                                                stroke="#000000"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </div>
                                </div>


                                {isOpen && (
                                    <div className="mt-[10px] p-4 bg-[#F2F2F2] flex flex-col gap-[20px] rounded-[8px]">
                                        <div className="flex justify-between lg:flex-row flex-col gap-[10px]">
                                            <h1 className="text-[20px] font-semibold">Change Password</h1>
                                            <button onClick={togglePopup} class="bg-black px-[20px] py-[10px] xl:text-[1rem] text-[.8rem] text-white font-bold rounded-[1.4rem]">
                                                Change
                                            </button>
                                        </div>
                                        <div className="flex justify-between lg:flex-row flex-col gap-[10px]">
                                            <h1 className="text-[20px] font-semibold">Location</h1>
                                            <select
                                                value={locationState}
                                                onChange={(e) => {
                                                    setLocationState(e.target.value)
                                                    updateLocation(e.target.value)
                                                }}
                                                className="bg-[#1C1C1C14] text-black text-[16px] px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            >
                                                <option value="">Select a country</option>
                                                <option value="AF">Afghanistan</option>
                                                <option value="AL">Albania</option>
                                                <option value="DZ">Algeria</option>
                                                <option value="AS">American Samoa</option>
                                                <option value="AD">Andorra</option>
                                                <option value="AO">Angola</option>
                                                <option value="AI">Anguilla</option>
                                                <option value="AG">Antigua and Barbuda</option>
                                                <option value="AR">Argentina</option>
                                                <option value="AM">Armenia</option>
                                                <option value="AU">Australia</option>
                                                <option value="AT">Austria</option>
                                                <option value="AZ">Azerbaijan</option>
                                                <option value="BS">Bahamas</option>
                                                <option value="BH">Bahrain</option>
                                                <option value="BD">Bangladesh</option>
                                                <option value="BB">Barbados</option>
                                                <option value="BY">Belarus</option>
                                                <option value="BE">Belgium</option>
                                                <option value="BZ">Belize</option>
                                                <option value="BJ">Benin</option>
                                                <option value="BM">Bermuda</option>
                                                <option value="BT">Bhutan</option>
                                                <option value="BO">Bolivia</option>
                                                <option value="BA">Bosnia and Herzegovina</option>
                                                <option value="BW">Botswana</option>
                                                <option value="BR">Brazil</option>
                                                <option value="BN">Brunei</option>
                                                <option value="BG">Bulgaria</option>
                                                <option value="BF">Burkina Faso</option>
                                                <option value="BI">Burundi</option>
                                                <option value="KH">Cambodia</option>
                                                <option value="CM">Cameroon</option>
                                                <option value="CA">Canada</option>
                                                <option value="CV">Cape Verde</option>
                                                <option value="KY">Cayman Islands</option>
                                                <option value="CF">Central African Republic</option>
                                                <option value="TD">Chad</option>
                                                <option value="CL">Chile</option>
                                                <option value="CN">China</option>
                                                <option value="CO">Colombia</option>
                                                <option value="KM">Comoros</option>
                                                <option value="CG">Congo</option>
                                                <option value="CD">Congo (DRC)</option>
                                                <option value="CR">Costa Rica</option>
                                                <option value="CI">Côte d’Ivoire</option>
                                                <option value="HR">Croatia</option>
                                                <option value="CU">Cuba</option>
                                                <option value="CY">Cyprus</option>
                                                <option value="CZ">Czech Republic</option>
                                                <option value="DK">Denmark</option>
                                                <option value="DJ">Djibouti</option>
                                                <option value="DM">Dominica</option>
                                                <option value="DO">Dominican Republic</option>
                                                <option value="EC">Ecuador</option>
                                                <option value="EG">Egypt</option>
                                                <option value="SV">El Salvador</option>
                                                <option value="GQ">Equatorial Guinea</option>
                                                <option value="ER">Eritrea</option>
                                                <option value="EE">Estonia</option>
                                                <option value="SZ">Eswatini</option>
                                                <option value="ET">Ethiopia</option>
                                                <option value="FJ">Fiji</option>
                                                <option value="FI">Finland</option>
                                                <option value="FR">France</option>
                                                <option value="GA">Gabon</option>
                                                <option value="GM">Gambia</option>
                                                <option value="GE">Georgia</option>
                                                <option value="DE">Germany</option>
                                                <option value="GH">Ghana</option>
                                                <option value="GR">Greece</option>
                                                <option value="GD">Grenada</option>
                                                <option value="GU">Guam</option>
                                                <option value="GT">Guatemala</option>
                                                <option value="GN">Guinea</option>
                                                <option value="GW">Guinea-Bissau</option>
                                                <option value="GY">Guyana</option>
                                                <option value="HT">Haiti</option>
                                                <option value="HN">Honduras</option>
                                                <option value="HU">Hungary</option>
                                                <option value="IS">Iceland</option>
                                                <option value="IN">India</option>
                                                <option value="ID">Indonesia</option>
                                                <option value="IR">Iran</option>
                                                <option value="IQ">Iraq</option>
                                                <option value="IE">Ireland</option>
                                                <option value="IL">Israel</option>
                                                <option value="IT">Italy</option>
                                                <option value="JM">Jamaica</option>
                                                <option value="JP">Japan</option>
                                                <option value="JO">Jordan</option>
                                                <option value="KZ">Kazakhstan</option>
                                                <option value="KE">Kenya</option>
                                                <option value="KI">Kiribati</option>
                                                <option value="KR">Korea (South)</option>
                                                <option value="KW">Kuwait</option>
                                                <option value="KG">Kyrgyzstan</option>
                                                <option value="LA">Laos</option>
                                                <option value="LV">Latvia</option>
                                                <option value="LB">Lebanon</option>
                                                <option value="LS">Lesotho</option>
                                                <option value="LR">Liberia</option>
                                                <option value="LY">Libya</option>
                                                <option value="LI">Liechtenstein</option>
                                                <option value="LT">Lithuania</option>
                                                <option value="LU">Luxembourg</option>
                                                <option value="MG">Madagascar</option>
                                                <option value="MW">Malawi</option>
                                                <option value="MY">Malaysia</option>
                                                <option value="MV">Maldives</option>
                                                <option value="ML">Mali</option>
                                                <option value="MT">Malta</option>
                                                <option value="MH">Marshall Islands</option>
                                                <option value="MR">Mauritania</option>
                                                <option value="MU">Mauritius</option>
                                                <option value="MX">Mexico</option>
                                                <option value="FM">Micronesia</option>
                                                <option value="MD">Moldova</option>
                                                <option value="MC">Monaco</option>
                                                <option value="MN">Mongolia</option>
                                                <option value="ME">Montenegro</option>
                                                <option value="MA">Morocco</option>
                                                <option value="MZ">Mozambique</option>
                                                <option value="MM">Myanmar</option>
                                                <option value="NA">Namibia</option>
                                                <option value="NR">Nauru</option>
                                                <option value="NP">Nepal</option>
                                                <option value="NL">Netherlands</option>
                                                <option value="NZ">New Zealand</option>
                                                <option value="NI">Nicaragua</option>
                                                <option value="NE">Niger</option>
                                                <option value="NG">Nigeria</option>
                                                <option value="NO">Norway</option>
                                                <option value="OM">Oman</option>
                                                <option value="PK">Pakistan</option>
                                                <option value="PW">Palau</option>
                                                <option value="PA">Panama</option>
                                                <option value="PG">Papua New Guinea</option>
                                                <option value="PY">Paraguay</option>
                                                <option value="PE">Peru</option>
                                                <option value="PH">Philippines</option>
                                                <option value="PL">Poland</option>
                                                <option value="PT">Portugal</option>
                                                <option value="QA">Qatar</option>
                                                <option value="RO">Romania</option>
                                                <option value="RU">Russia</option>
                                                <option value="RW">Rwanda</option>
                                                <option value="WS">Samoa</option>
                                                <option value="SM">San Marino</option>
                                                <option value="SA">Saudi Arabia</option>
                                                <option value="SN">Senegal</option>
                                                <option value="RS">Serbia</option>
                                                <option value="SC">Seychelles</option>
                                                <option value="SL">Sierra Leone</option>
                                                <option value="SG">Singapore</option>
                                                <option value="SK">Slovakia</option>
                                                <option value="SI">Slovenia</option>
                                                <option value="SB">Solomon Islands</option>
                                                <option value="SO">Somalia</option>
                                                <option value="ZA">South Africa</option>
                                                <option value="ES">Spain</option>
                                                <option value="LK">Sri Lanka</option>
                                                <option value="SD">Sudan</option>
                                                <option value="SR">Suriname</option>
                                                <option value="SE">Sweden</option>
                                                <option value="CH">Switzerland</option>
                                                <option value="SY">Syria</option>
                                                <option value="TW">Taiwan</option>
                                                <option value="TJ">Tajikistan</option>
                                                <option value="TZ">Tanzania</option>
                                                <option value="TH">Thailand</option>
                                                <option value="TL">Timor-Leste</option>
                                                <option value="TG">Togo</option>
                                                <option value="TO">Tonga</option>
                                                <option value="TT">Trinidad and Tobago</option>
                                                <option value="TN">Tunisia</option>
                                                <option value="TR">Turkey</option>
                                                <option value="TM">Turkmenistan</option>
                                                <option value="TV">Tuvalu</option>
                                                <option value="UG">Uganda</option>
                                                <option value="UA">Ukraine</option>
                                                <option value="AE">United Arab Emirates</option>
                                                <option value="GB">United Kingdom</option>
                                                <option value="US">United States</option>
                                                <option value="UY">Uruguay</option>
                                                <option value="UZ">Uzbekistan</option>
                                                <option value="VU">Vanuatu</option>
                                                <option value="VE">Venezuela</option>
                                                <option value="VN">Vietnam</option>
                                                <option value="YE">Yemen</option>
                                                <option value="ZM">Zambia</option>
                                                <option value="ZW">Zimbabwe</option>
                                            </select>
                                        </div>
                                        <div className="flex justify-between lg:flex-row flex-col gap-[10px]">
                                            <h1 className="text-[20px] font-semibold">Receive Notification</h1>
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input
                                                    checked={notificationState?.recieve_notifications}
                                                    onChange={(e) => {
                                                        const checked = e.target.checked;
                                                        console.log('Checkbox checked value:', checked);
                                                        setNotificationState({
                                                            ...notificationState,
                                                            recieve_notifications: checked,
                                                        });
                                                        updateRecieveNotificationsData(checked);
                                                    }}
                                                    type="checkbox"
                                                    className="sr-only peer"
                                                />


                                                <div className="w-11 h-6 bg-gray-300 rounded-full peer-focus:ring-2 peer-focus:ring-blue-500 peer-checked:bg-[#34C759]"></div>
                                                <div className="absolute left-0 top-0 w-6 h-6 bg-white rounded-full transform peer-checked:translate-x-full transition-transform"></div>
                                            </label>
                                        </div>
                                        <div className="flex justify-between lg:flex-row flex-col gap-[10px]">
                                            <h1 className="text-[20px] font-semibold">Notification Preferences</h1>
                                            <select
                                                value={notificationState?.notification_type}
                                                onChange={(e) => {
                                                    setNotificationState({
                                                        ...notificationState,
                                                        notification_type: e.target.value
                                                    })
                                                    updateNotificationsData(e.target.value)

                                                }}
                                                className="bg-gray-100 text-black text-[16px] px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            >
                                                <option value="">Select an option</option>
                                                <option value="SMS">SMS</option>
                                                <option value="Email">Email</option>
                                            </select>
                                        </div>

                                    </div>
                                )}
                                <div className="lg:px-[30px] py-[40px]">
                                    <div className="bg-[#1DBF73] flex flex-col lg:flex-row lg:justify-between rounded-[20px] px-[20px] py-[30px]">
                                        <div className="flex flex-col">
                                            <h2 className="text-white text-[1rem] font-bold">Referrals</h2>
                                            <p className="text-white text-[.8rem]">Share the referral code and invite new user, This will also increaser your account level.</p>
                                        </div>
                                        <div className="flex flex-col lg:flex-row gap-[20px] items-center">
                                            <h2 className="text-white text-[1rem] font-bold">Current Level: 2</h2>
                                            <button onClick={() => {
                                                navigate('/referrals')
                                            }} class="bg-black px-[20px] py-[10px] xl:text-[1rem] text-[.8rem] text-white font-bold rounded-[1.4rem]">
                                                Refer New User
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {isPopupOpen && (
                                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                                    <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md">
                                        <h2 className="text-[20px] font-semibold mb-4">Change Password</h2>
                                        <form>
                                            <div className="mb-4">
                                                <label
                                                    htmlFor="oldPassword"
                                                    className="block text-gray-700 text-sm font-medium mb-2"
                                                >
                                                    Old Password
                                                </label>
                                                <input
                                                    value={passwordState.old_password}
                                                    onChange={(e) => {
                                                        setPasswordState({
                                                            ...passwordState,
                                                            old_password: e.target.value
                                                        })
                                                    }}
                                                    type="password"
                                                    id="oldPassword"
                                                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    placeholder="Enter old password"
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <label
                                                    htmlFor="newPassword"
                                                    className="block text-gray-700 text-sm font-medium mb-2"
                                                >
                                                    New Password
                                                </label>
                                                <input
                                                    value={passwordState.password}
                                                    onChange={(e) => {
                                                        setPasswordState({
                                                            ...passwordState,
                                                            password: e.target.value
                                                        })
                                                    }}
                                                    type="password"
                                                    id="newPassword"
                                                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    placeholder="Enter new password"
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <label
                                                    htmlFor="confirmPassword"
                                                    className="block text-gray-700 text-sm font-medium mb-2"
                                                >
                                                    Confirm New Password
                                                </label>
                                                <input
                                                    value={passwordState.confirmPassword}
                                                    onChange={(e) => {
                                                        setPasswordState({
                                                            ...passwordState,
                                                            confirmPassword: e.target.value
                                                        })
                                                    }}
                                                    type="password"
                                                    id="confirmPassword"
                                                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    placeholder="Confirm new password"
                                                />
                                            </div>
                                            <div className="flex justify-end gap-4">
                                                <button
                                                    type="button"
                                                    onClick={togglePopup}
                                                    className="px-4 py-2 text-sm font-medium  bg-white border border-black text-black rounded-[20px]"
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    type="submit"
                                                    onClick={savePassword}
                                                    className="px-4 py-2 text-sm font-medium text-white bg-black rounded-[20px]"
                                                >
                                                    Save
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                </>}
            </div>

        </>
    )
}