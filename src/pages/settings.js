import { useEffect, useState } from "react";
import avatar from "../avatar.webp"
import { ToastContainer, toast } from "react-toastify";
import { MoonLoader } from "react-spinners";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../baseURL";

export default function Settings() {
    const [isOpen, setIsOpen] = useState(false);
    const [state, setState] = useState()
    const [loading, setLoading] = useState(true)
    const [locationState, setLocationState] = useState("")
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

            let response = await axios.patch(`${BASE_URL}/updateNotificationsData`, { recieve_notifications: type, notification_type: notificationState.notification_type }, headers)
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


    return (
        <>
            <ToastContainer containerId={"settingsPageToast"} />

            <div className="w-full flex flex-col px-[30px] py-[40px]">
                {loading ? <div className="w-full flex justify-center items-center">
                    <MoonLoader color="#6B33E3" size={100} />

                </div> : <>

                    <div className="w-full">
                        <svg className="cursor-pointer" width="35" height="35" onClick={() => {
                            navigate(-1)
                        }} fill="#000000" viewBox="0 0 200 200" data-name="Layer 1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><title></title><path d="M160,89.75H56l53-53a9.67,9.67,0,0,0,0-14,9.67,9.67,0,0,0-14,0l-56,56a30.18,30.18,0,0,0-8.5,18.5c0,1-.5,1.5-.5,2.5a6.34,6.34,0,0,0,.5,3,31.47,31.47,0,0,0,8.5,18.5l56,56a9.9,9.9,0,0,0,14-14l-52.5-53.5H160a10,10,0,0,0,0-20Z"></path></g></svg>
                        <div className="flex items-center justify-center flex-col gap-[20px] mx-auto">
                            <div className="rounded-[100%] w-[80px] h-[80px]">
                                <img src={state?.user_id?.avatar?.length > 0 ? state?.user_id?.avatar : avatar} alt="img" className="w-full h-full object-cover rounded-[100%]" />
                            </div>
                            <div className="flex flex-col">

                                <h1 className="text-[20px] font-semibold">{state?.user_id?.username}</h1>

                            </div>
                        </div>
                        <h2 className="text-[1.3rem] font-bold">Personal Information</h2>
                        <div className="flex items-center gap-[5px] mt-[20px]">
                            <h1 className="text-[20px] text-[#344054] font-semibold">Name:</h1>

                            <h2 className="text-[18px]">{state?.user_id?.username}</h2>
                        </div>
                        <div className="flex items-center gap-[5px] mt-[20px]">
                            <h1 className="text-[20px] text-[#344054] font-semibold">Email:</h1>

                            <h2 className="text-[18px]">{state?.user_id?.email}</h2>
                        </div>
                        <div className="flex items-center gap-[5px] mt-[20px]">
                            <h1 className="text-[20px] text-[#344054] font-semibold">Phone Number:</h1>
                            <h2 className="text-[18px]">{state?.user_id?.country_code_id?.country_code + state?.user_id?.mobile_number}</h2>
                        </div>
                        {state?.user_id?.location ? <div className="flex items-center gap-[5px] mt-[20px]">
                            <h1 className="text-[20px] text-[#344054] font-semibold">Location:</h1>
                            <h2 className="text-[18px]">{state?.user_id?.location}</h2>

                        </div> : ''}
                    </div>
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

                        {/* Tab content */}
                        {isOpen && (
                            <div className="mt-[10px] p-4 bg-[#F2F2F2] flex flex-col gap-[20px] rounded-[8px]">
                                <div className="flex justify-between lg:flex-row flex-col gap-[10px]">
                                    <h1 className="text-[20px] font-semibold">Change Password</h1>
                                    <button onClick={togglePopup} class="bg-[#1DBF73] px-[20px] py-[10px] xl:text-[1rem] text-[.8rem] text-white font-bold rounded-[1.4rem]">
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
                        <div className="px-[30px] py-[40px]">
                            <div className="bg-[#1DBF73] flex flex-col lg:flex-row lg:justify-between rounded-[20px] px-[20px] py-[30px]">
                                <div className="flex flex-col">
                                    <h2 className="text-white text-[1rem] font-bold">Referrals</h2>
                                    <p className="text-white text-[.8rem]">Share the referral code and invite new user, This will also increaser your account level.</p>
                                </div>
                                <div className="flex flex-col lg:flex-row gap-[20px] items-center">
                                    <h2 className="text-white text-[1rem] font-bold">Current Level: 2</h2>
                                    <button onClick={()=>{
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
                                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            onClick={savePassword}
                                            className="px-4 py-2 text-sm font-medium text-white bg-[#1DBF73] rounded-md hover:bg-green-600"
                                        >
                                            Save
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                </>}
            </div>

        </>
    )
}