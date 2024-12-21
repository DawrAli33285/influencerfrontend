import avatar from "../avatar.webp";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { MoonLoader } from "react-spinners";
import { useEffect, useRef, useState } from "react";
import { BASE_URL } from "../baseURL";
import io from 'socket.io-client'
export default function Inbox() {
    const [inputMessage, setInputMessage] = useState("")
    const [messages, setMessage] = useState([])
    const [currentBuyerId, setCurrentBuyerId] = useState()
    const [loading, setLoading] = useState(true)
    const socketRef = useRef();

    const sendMessage = async () => {
        try {
            let token = localStorage.getItem('buyerToken')
            let headers = {
                headers: {
                    authorization: `Bearer ${token}`
                }
            }
            let response = await axios.post(`${BASE_URL}/create-messages`, { message: inputMessage, sendBy: 'Buyer' }, headers)
            setInputMessage("")
            socketRef.current.emit("message", { currentBuyerId, inputMessage })
            setLoading(false)
            setMessage((prev) => {
                let old;
                if (prev.length > 0) {
                    old = [...prev, { sendBy: 'Buyer', message: inputMessage }]
                } else {
                    old = [{ sendBy: 'Buyer', message: inputMessage }]
                }
                return old
            })
        } catch (e) {
            if (e?.response?.data?.error) {
                toast.error(e?.response?.data?.error, { containerId: "inboxToast" })
            } else {
                toast.error("Client error please try again", { containerId: "inboxToast" })
            }
        }
    }

    useEffect(() => {
        getMessages();
    }, [])

    useEffect(() => {
        let socket = new io(`${BASE_URL}`)
        console.log("SOCKET")
        console.log(socket)
        socketRef.current = socket
        if (currentBuyerId) {
            socket.emit("userconnected", { currentBuyerId, role: "buyer" })
        }
        socket.on("message", (data) => {
            console.log(data)
            setMessage((prev) => {
                let old;
                if (prev.length > 0) {
                    old = [...prev, { sendBy: 'Admin', message: data.inputMessage }]
                } else {
                    old = [{ sendBy: 'Admin', message: data.inputMessage }]
                }
                return old
            })
            console.log("ADMIN SENT MESSAGE")
        })
    }, [currentBuyerId])

    const getMessages = async () => {
        try {
            let token = localStorage.getItem('buyerToken')
            let headers = {
                headers: {
                    authorization: `Bearer ${token}`
                }
            }

            let response = await axios.get(`${BASE_URL}/get-messages`, headers)
            console.log("RESPONSE")
            console.log(response.data)
            setMessage(response.data.messages)
            setCurrentBuyerId(response.data.currentBuyer)
            setLoading(false)

        } catch (e) {
            if (e?.response?.data?.error) {
                toast.error(e?.response?.data?.error, { containerId: "inboxToast" })
            } else {
                toast.error("Client error please try again", { containerId: "inboxToast" })
            }
        }
    }



    return (
        <>
            <ToastContainer containerId={"inboxToast"} />
            <div className="w-full bg-[#f2f2f2] flex flex-col h-screen">
                {loading ? <div className='flex justify-center items-center'>
                    <MoonLoader color="#6B33E3" size={100} />
                </div> : <>

                    <div className="flex bg-[#f2f2f2] items-center gap-[5px] border-b border-[#1C1C1C3D] px-[30px] py-[20px]">
                        <div className='flex flex-col'>
                            <h1 className="lg:text-[2rem] text-black  text-[1.50rem] font-medium  lg:text-left text-center lg:font-bold">Support</h1>
                            <p className='lg:text-[0.94rem] text-black text-[0.75rem] lg:text-left text-center lg:mb-0 mb-[25px]'>View and manage all your support queries in one place.</p>
                        </div>
                    </div>
                    <div className="grid lg:grid-cols-5 grid-cols-1 bg-[#f2f2f2] gap-[20px] lg:gap-[30px] lg:p-[40px]">
                        <div className="flex flex-col relative bg-white gap-[20px] p-[20px] lg:gap-[30px] lg:p-[40px] rounded-[20px] w-full lg:col-span-2">
                            <div className="flex items-center bg-[#0000000D] h-[50px] px-4 rounded-[6px]">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clip-path="url(#clip0_230_1686)">
                                        <path d="M7.04606 0C3.16097 0 0 3.16097 0 7.04606C0 10.9314 3.16097 14.0921 7.04606 14.0921C10.9314 14.0921 14.0921 10.9314 14.0921 7.04606C14.0921 3.16097 10.9314 0 7.04606 0ZM7.04606 12.7913C3.87816 12.7913 1.30081 10.214 1.30081 7.04609C1.30081 3.87819 3.87816 1.30081 7.04606 1.30081C10.214 1.30081 12.7913 3.87816 12.7913 7.04606C12.7913 10.214 10.214 12.7913 7.04606 12.7913Z" fill="#222222" />
                                        <path d="M15.808 14.8883L12.079 11.1593C11.8249 10.9052 11.4134 10.9052 11.1593 11.1593C10.9052 11.4132 10.9052 11.8251 11.1593 12.079L14.8883 15.808C15.0154 15.935 15.1817 15.9986 15.3482 15.9986C15.5144 15.9986 15.6809 15.935 15.808 15.808C16.0621 15.5541 16.0621 15.1422 15.808 14.8883Z" fill="#222222" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_230_1686">
                                            <rect width="16" height="16" fill="white" />
                                        </clipPath>
                                    </defs>
                                </svg>

                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="flex-1 bg-transparent outline-none text-[14px] font-normal text-[#222222]"
                                />
                            </div>
                            <div className="flex flex-col gap-6">
                                {[...Array(1)].map((_, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between bg-transparent"
                                    >

                                        <div className="flex items-center gap-4">
                                            <div className="rounded-full w-[50px] h-[50px] bg-gray-200 overflow-hidden">
                                                <img
                                                    src={avatar}
                                                    alt="User Avatar"
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div>
                                                <p className="lg:text-[0.94rem]  text-[0.75rem] font-medium text-[#222222]">
                                                 Support
                                                </p>
                                                <p className="lg:text-[0.94rem]  text-[0.75rem] font-normal text-[#6B7177]">
                                                    Support Chat
                                                </p>
                                            </div>
                                        </div>

                                        {/* <p className="text-[0.75rem] font-normal text-[#6B7177]">36 mins</p> */}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="flex flex-col relative bg-white rounded-[20px] w-full lg:col-span-3">
                            <div className="w-full px-6 py-4 flex items-center justify-between">
                                <div className="flex gap-[6px] items-center">
                                    <div className="rounded-[100%] w-[40px] h-[40px]">
                                        <img src={avatar} alt="img" className="w-full h-full object-cover rounded-[100%]" />
                                    </div>
                                    <div className="flex flex-col">
                                        <h2 className="lg:text-[0.94rem]  text-[0.75rem] font-medium">Support</h2>
                                        <p className="text-[0.75rem] font-normal text-[#6B7177]">Active</p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-[#E9E9E9] w-[90%] mx-auto  h-[1px]"></div>
                            <div className="flex-1 overflow-y-auto max-h-[500px] px-6 py-4">
                                {messages?.length > 0 ? messages?.map((message, i) => {
                                    return <div key={message?._id} className="my-[20px]">
                                        {message?.sendBy == "Buyer" ? <div className="flex justify-end flex-col gap-[10px] items-end">
                                            <div className="flex items-center gap-[6px]">
                                                {/* <p className="text-[0.75rem] font-normal text-[#6B7177]">36 mins</p> */}
                                                <p className="lg:text-[0.94rem]  text-[0.75rem] font-medium text-[#222222]">
                                                    Me
                                                </p>

                                                <div className="rounded-[100%] w-[40px] h-[40px]">
                                                    <img src={avatar} alt="Support Avatar" className="w-full h-full object-cover rounded-[100%]" />
                                                </div>


                                            </div>
                                            <div className="bg-[#1dbf7326]  p-3 rounded-[10px]   max-w-[75%]">
                                                <p className="lg:text-[0.94rem] text-black  text-[0.75rem]">{message?.message}</p>
                                            </div>
                                        </div> : <div className="flex items-start flex-col gap-[10px]">
                                            <div className="flex items-center gap-[6px]">

                                                <div className="rounded-[100%] w-[40px] h-[40px]">
                                                    <img src={avatar} alt="Support Avatar" className="w-full h-full object-cover rounded-[100%]" />
                                                </div>
                                                <p className="lg:text-[0.94rem]  text-[0.75rem] font-medium text-[#222222]">
                                                  Support
                                                </p>
                                                {/* <p className="text-[0.75rem] font-normal text-[#6B7177]">36 mins</p> */}

                                            </div>
                                            <div className="bg-[#0000000D]  p-3 rounded-[10px] max-w-[75%] flex items-start">
                                                <p className="lg:text-[0.94rem] text-black  text-[0.75rem]">{message?.message}</p>
                                            </div>
                                        </div>}


                                    </div>
                                }) : <div className="w-full flex justify-center items-center">
                                    <p>No messages</p>
                                </div>}
                            </div>


                            <div className="flex items-center border-t border-t-[#E9E9E9] p-4 rounded-[20px] mx-[30px] mb-[20px]">
                                <input
                                    value={inputMessage}
                                    onChange={(e) => {
                                        setInputMessage(e.target.value)
                                    }}
                                    type="text"
                                    placeholder="Type a message..."
                                    className="flex-1 bg-transparent lg:text-[0.94rem]  text-[0.75rem] text-black px-4 py-2 rounded-[20px] outline-none"
                                />
                                <button onClick={sendMessage} className="bg-black rounded-[60px] lg:px-[40px] px-[29px] py-[4px] lg:py-[16px] text-white p-2 lg:text-[0.94rem]  text-[0.75rem] flex gap-[10px] items-center lg:ml-2">
                                    <p className="lg:block hidden"> Send message</p>
                                    <p className="block lg:hidden"> Send </p>
                                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clip-path="url(#clip0_230_1587)">
                                            <path d="M15.5556 0H5.7778C5.53214 0 5.33334 0.198792 5.33334 0.444458C5.33334 0.690125 5.53214 0.888917 5.7778 0.888917H14.4827L0.130219 15.2413C-0.0434062 15.415 -0.0434062 15.6962 0.130219 15.8698C0.21701 15.9566 0.33076 16 0.444469 16C0.558177 16 0.671885 15.9566 0.758719 15.8698L15.1111 1.51737V10.2222C15.1111 10.4679 15.3099 10.6667 15.5556 10.6667C15.8013 10.6667 16.0001 10.4679 16.0001 10.2222V0.444458C16 0.198792 15.8012 0 15.5556 0Z" fill="white" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_230_1587">
                                                <rect width="16" height="16" fill="white" />
                                            </clipPath>
                                        </defs>
                                    </svg>

                                </button>
                            </div>
                        </div>
                    </div>

                </>}
            </div>
        </>
    );
}
