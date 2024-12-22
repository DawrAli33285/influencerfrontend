import { ToastContainer, toast } from "react-toastify"
import { MoonLoader } from 'react-spinners';
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../baseURL";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export default function VerifyBond() {
    let { id } = useParams();
    const [loading, setLoading] = useState(true)
    const [verificationCodeSent,setVerificationSent]=useState(false)
    const [state, setState] = useState({
        bond: '',
        mission: '',
        offer: ''
    })
    const [codeVerificationData,setCodeVerificationData]=useState({
        bond_id:id,
        otp:''
    })

    useEffect(() => {
        getSingleBond();
    }, [])

    const navigate = useNavigate();

    const getSingleBond = async () => {
        try {
            let token=localStorage.getItem('token')
            let headers={
                headers:{
                    authorization:`Bearer ${token}`
                }
            }
            let response = await axios.get(`${BASE_URL}/getSingleBond/${id}`,headers)
            if(response?.data?.bond?.verify===true){
navigate(-1)
            }
            setState({
                bond: response.data.bond,
                mission: response.data.mission
            })
            setLoading(false)
            console.log("SINGLE BOND RESPONSe")
            console.log(response.data)
        } catch (e) {
            if (e?.response?.data?.error) {
                toast.error(e?.response?.data?.error, { containerId: "bondVerificationPage" })
            } else {
                toast.error("Client error please try again", { containerId: "bondVerificationPage" })
            }
        }
    }

    const verifyOTP=async()=>{
        try{
            if(codeVerificationData.otp.length==0){
                toast.error("Please enter code to verify", { containerId: "bondVerificationPage" })
                return
            }
            let token=localStorage.getItem('token')
            let headers={
                headers:{
                    authorization:`Bearer ${token}`
                }
            }
            let response=await axios.post(`${BASE_URL}/verifyBond`,codeVerificationData,headers)
            toast.success("Bond verified sucessfully",{containerId:"bondVerificationPage"})
            setTimeout(()=>{
                navigate('/promisebond')
            },500)

        }catch(e){
            if (e?.response?.data?.error) {
                toast.error(e?.response?.data?.error, { containerId: "bondVerificationPage" })
            } else {
                toast.error("Client error please try again", { containerId: "bondVerificationPage" })
            }
        }
    }

    return (
        <>
            <ToastContainer containerId={"bondVerificationPage"} />


            <div className="w-full px-[30px] py-[40px]">
               
                {loading ? <div className="flex justify-center items-center">

                    <MoonLoader color="#6B33E3" size={100} />
                </div> : <>

                    <div className="flex justify-between lg:flex-row flex-col items-center mb-[20px]">
                        <div className='flex flex-col'>
                            <h1 className="text-[24px] font-semibold">Verify Promise Bond</h1>
                            <p className='text-[18px] text-[#74767E]'>This section provides key details about the bond.</p>
                        </div>




                    </div>
                    <div className="grid grid-cols-2 gap-[10px]">
                        <div className='flex flex-col'>
                            <h1 className="text-[18px] font-semibold">Title</h1>
                            <p className='text-[16px] text-[#74767E]'>{state?.bond?.title}</p>
                        </div>
                        <div className='flex flex-col'>
                            <h1 className="text-[18px] font-semibold">Mission</h1>
                            <p className='text-[16px] text-[#74767E]'>{state?.mission?.description?.length > 0 ? state?.mission?.description.slice(0,50)+'...' : `No Mission Found`}</p>
                        </div>
                        <div className='flex flex-col'>
                            <h1 className="text-[18px] font-semibold">Validity</h1>
                            <p className='text-[16px] text-[#74767E]'>{state?.bond?.validity_number} months</p>
                        </div>
                        <div className='flex flex-col'>
                            <h1 className="text-[18px] font-semibold">Price</h1>
                            <p className='text-[16px] text-[#74767E]'>${state?.bond?.bond_issuerance_amount}</p>
                        </div>
                        <div className=" col-span-2 max-w-[400px]">
                            <div className="mt-[10px]">
                                <label htmlFor="VerificationCode" className="block text-xl  font-semibold text-[#272226]">Verification Code</label>
                                <input
 value={codeVerificationData.otp}
  onChange={(e) => {
    const inputValue = e.target.value.replace(/\s+/g, ''); 
    setCodeVerificationData({
      ...codeVerificationData,
      otp: inputValue,
    });
  }}
                                    type="text"
                                    name="VerificationCode"
                                    placeholder="Enter Verification Code"
                                    className="mt-4 bg-[#1C1C1C14] block w-full px-3 py-4 border rounded-[20px] border-gray-300 focus:outline-none focus:ring focus:border-blue-500"
                                />
                                <div onClick={verifyOTP} className="hover:cursor-pointer border-[1px] mt-[20px] rounded-[10px] w-full xl:w-1/2 text-center text-[15px] bg-[#1DBF73] px-[20px] py-[10px] text-white font-semibold">
                                    Verify
                                </div>
                            </div>
                        </div>
                    </div>
                </>}
            </div>

        </>
    )
}