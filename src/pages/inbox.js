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
            <div className="w-full flex flex-col h-screen">
                {loading ? <div className='flex justify-center items-center'>
                    <MoonLoader color="#6B33E3" size={100} />
                </div> : <>

                    <div className="flex items-center gap-[5px] border-b border-[#1C1C1C3D] px-[30px] py-[20px]">
                        <div className="rounded-[100%] w-[40px] h-[40px]">
                            <img src={avatar} alt="img" className="w-full h-full object-cover rounded-[100%]" />
                        </div>
                        <h2 className="text-[1rem] font-bold">Support</h2>
                    </div>

                    <div className="flex-1 overflow-y-auto px-6 py-4">
                        {messages?.length > 0 ? messages?.map((message, i) => {
                            return <div key={message?._id} className="space-y-4">
                                {message?.sendBy == "Buyer" ? <div className="flex justify-end">
                                    <div className="bg-[#1DBF73] text-white p-3 rounded-[10px] max-w-[75%]">
                                        <p>{message?.message}</p>
                                    </div>
                                </div> : <div className="flex justify-start">
                                    <div className="bg-[#1C1C1C14] text-[#1C1C1C] p-3 rounded-[10px] max-w-[75%] flex items-start space-x-3">
                                        <div className="rounded-[100%] w-[30px] h-[30px]">
                                            <img src={avatar} alt="Support Avatar" className="w-full h-full object-cover rounded-[100%]" />
                                        </div>
                                        <p>{message?.message}</p>
                                    </div>
                                </div>}


                            </div>
                        }) : <div className="w-full flex justify-center items-center">
                            <p>No messages</p>
                        </div>}
                    </div>


                    <div className="flex items-center bg-[#1C1C1C29] p-4 rounded-[20px] mx-[30px] mb-[20px]">
                        <input
                            value={inputMessage}
                            onChange={(e) => {
                                setInputMessage(e.target.value)
                            }}
                            type="text"
                            placeholder="Type a message..."
                            className="flex-1 bg-transparent text-white px-4 py-2 rounded-[20px] outline-none"
                        />
                        <button onClick={sendMessage} className="bg-[#1DBF73] p-2 rounded-[20px] ml-2">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7.33637 7.98787L2.0125 6.65691V3.66667C2.0125 3.42633 2.11045 3.24427 2.30673 3.11887C2.50327 2.9933 2.7101 2.97421 2.92858 3.06156C2.92862 3.06158 2.92865 3.06159 2.92869 3.06161L13.195 7.39478C13.195 7.39479 13.195 7.3948 13.1951 7.39481C13.3322 7.45518 13.4343 7.53576 13.5021 7.63617C13.57 7.73655 13.6042 7.85763 13.6042 8C13.6042 8.14237 13.57 8.26345 13.5021 8.36384C13.4343 8.46424 13.3322 8.54482 13.1951 8.60519C13.195 8.6052 13.195 8.60521 13.195 8.60523L2.92869 12.9384C2.92865 12.9384 2.92861 12.9384 2.92858 12.9384C2.7101 13.0258 2.50327 13.0067 2.30673 12.8811C2.11045 12.7557 2.0125 12.5737 2.0125 12.3333V9.34309L7.33637 8.01213V7.98787Z" fill="white" stroke="white" stroke-width="0.025" />
                            </svg>
                        </button>
                    </div>
                </>}
            </div>
        </>
    );
}
