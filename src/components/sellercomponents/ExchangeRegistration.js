import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { BASE_URL } from "../../baseURL";
import { formatDistanceToNowStrict, addMonths, parseISO } from "date-fns";
import { useNavigate } from 'react-router-dom'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ExchangeRegistration = () => {
    const [bondInfo] = useState({
        name: "Sponsor Bond",
        image: "/path/to/image.jpg",
        validityPeriod: "Jan 2024 - Dec 2028",
        initialPrice: 100,
        recentPrice: 120,
        finalPrice: 150,
        currentPrice: 130,
    });

    const [desiredSalePrice, setDesiredSalePrice] = useState(0);
    const [isForSale, setIsForSale] = useState(false);
    const [bids, setBids] = useState([]);
    const [status, setStatus] = useState("Not for Sale");
    const location = useLocation();
    const [state, setState] = useState({
        bond: '',
        offer: '',
        mission: ''
    })

    const navigate = useNavigate()
    const handleSubmitForSale = async () => {
        if (desiredSalePrice) {
            try {
                setIsForSale(true);
                setStatus("Seller");
                alert("Bond submitted for sale!");
                let token = localStorage.getItem("buyerToken")
                let headers = {
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                }
                let data = {
                    bond_id: state?.bond?._id,
                    quantity: state?.offer?.number_of_bonds ? state?.offer?.number_of_bonds : state?.bond?.total_bonds,
                    bond_price: desiredSalePrice,
                    total_bonds: state?.offer?.number_of_bonds ? state?.offer?.number_of_bonds : state?.bond?.total_bonds,
                    status: "PENDING",
                    bond_issuerance_amount: state?.offer?.number_of_bonds ? state?.offer?.price * state?.offer?.number_of_bonds : state?.bond?.bond_issuerance_amount,
                    validity_number: calculateTimeLeft()
                };



                let response = await axios.post(`${BASE_URL}/registerForExchange`, data, headers)
                navigate('/buyerDashboard')
            } catch (e) {
                if (e?.response?.data?.error) {
                    toast.error(e?.response?.data?.error, { containerId: "exchangeBond" })
                } else {
                    toast.error("Client error please try again", { containerId: "exchangeBond" })
                }
            }
        } else {
            alert("Please set a desired sale price.");
        }
    };

    const handleAcceptOffer = (bidPrice) => {
        if (bidPrice >= desiredSalePrice) {
            setStatus("Sale in Progress");
            alert(`Offer accepted at $${bidPrice}. Waiting for buyer payment...`);
        } else {
            alert("The offer is below the desired sale price.");
        }
    };

    const handlePayment = () => {
        setStatus("Sale Complete");
        alert("Payment received! Ownership transferred to buyer.");
    };

    useEffect(() => {
        fetchSingleBond();
    }, [])

    const fetchSingleBond = async () => {
        try {
            let params = new URLSearchParams(location.search)
            let bond_id = params.get('id')
            let token = localStorage.getItem('buyerToken')
            let headers = {
                headers: {
                    authorization: `Bearer ${token}`
                }
            }
            let response = await axios.get(`${BASE_URL}/getSingleBond/${bond_id}`, headers)
            console.log(response.data)
            console.log("EXCHANGE")
            setState({
                bond: response.data.bond,
                offer: response.data.offer,
                mission: response.data.mission
            })

        } catch (e) {
            if (e?.response?.data?.error) {
                toast.error(e?.response?.data?.error, { containerId: "exchangeBond" })
            } else {
                toast.error("Client error please try again", { containerId: "exchangeBond" })
            }
        }
    }

    const calculateTimeLeft = () => {

        if (!state?.bond?.createdAt || !state?.bond?.validity_number) {
            return "Data not available";
        }

        const createdAt = parseISO(state.bond.createdAt);
        const validityMonths = state.bond.validity_number;

        const expirationDate = addMonths(createdAt, validityMonths);


        return formatDistanceToNowStrict(expirationDate, { addSuffix: true });
    };

    return (
        <>

            <ToastContainer limit={1} containerId={"exchangeBond"} />
            <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
                <h1 className="text-3xl font-semibold text-gray-800 mb-8">Exchange Registration</h1>

                <div className="bg-white shadow-lg rounded-lg p-6 max-w-lg w-full">

                    <div className="border-t border-gray-200 pt-4 mb-4">
                        <p className="text-gray-600">
                            <span className="font-semibold">Title:</span>{' ' + state?.bond?.title}
                        </p>
                    </div>
                    <div className="border-t border-gray-200 pt-4 mb-4">
                        <p className="text-gray-600">
                            <span className="font-semibold">Initial Price:</span> ${state?.bond?.bond_price}
                        </p>
                        <p className="text-gray-600">
                            <span className="font-semibold">Recent Purchase Price:</span> ${state?.offer?.price ? state?.offer?.price : state?.bond?.bond_issuerance_amount}
                        </p>
                        <p className="text-gray-600">
                            <span className="font-semibold">Validity Period:</span> {state?.bond?.validity_number + ' months'}
                        </p>
                        <p className="text-gray-600">
                            <span className="font-semibold">Time Left:</span> {calculateTimeLeft()}
                        </p>
                        <p className="text-gray-600">
                            <span className="font-semibold">Bond Quantity:</span> {state?.offer?.number_of_bonds ? state?.offer?.number_of_bonds : state?.bond?.total_bonds}
                        </p>
                        <p
                            className={`text-lg font-semibold ${bondInfo.currentPrice >= bondInfo.finalPrice ? "text-blue-500" : "text-red-500"
                                }`}
                        >
                            Mission Task: {state?.mission?.task_type}
                        </p>
                        <p className="text-gray-600">
                            <span className="font-semibold">Task description:</span> {state?.mission?.description}
                        </p>
                    </div>

                    <div className="mt-6">
                        {status !== "Sale Complete" ? (
                            <>
                           
                                <label className="block text-gray-700 font-semibold mb-2">
                                    <p className="text-[#1DBF73] font-semibold">${desiredSalePrice}</p>
                                    <div className="flex items-center mt-1">
                                        {/* Decrease button */}
                                        <button
                                            type="button"
                                            onClick={() => setDesiredSalePrice((prev) => Math.max(0, prev - 100))}
                                            className="px-4 py-2 bg-[#1C1C1C14] text-gray-700 font-bold rounded-l-md border border-gray-300 focus:outline-none"
                                        >
                                            -
                                        </button>

                                        {/* Input field */}
                                        <input
                                            type="number"
                                            value={desiredSalePrice}
                                            onChange={(e) => {

                                                let value = e.target.value;


                                                if (value.startsWith("0") && value.length > 1) {
                                                    value = value.replace(/^0+/, "");
                                                }


                                                const numericValue = Number(value);
                                                setDesiredSalePrice(numericValue >= 0 ? numericValue : 0);
                                            }}
                                            min="0"
                                            className="w-full px-4 py-2 border-t border-b border-gray-300 focus:outline-none text-center"
                                        />


                                        {/* Increase button */}
                                        <button
                                            type="button"
                                            onClick={() => setDesiredSalePrice((prev) => prev + 100)}
                                            className="px-4 py-2 bg-black text-white font-bold rounded-r-md border border-gray-300 focus:outline-none"
                                        >
                                            +
                                        </button>
                                    </div>
                                </label>
                                <button
                                    onClick={handleSubmitForSale}
                                    className="w-full mt-4 bg-[#1DBF73] text-white font-semibold py-2 rounded-md  transition duration-200"
                                >
                                    Submit for Sale
                                </button>
                            </>
                        ) : (
                            <p className="text-center text-green-500 font-semibold mt-4">Sale Completed</p>
                        )}
                    </div>

                    {status === "Seller" && (
                        <div className="mt-6 border-t border-gray-200 pt-4">
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Bids</h3>
                            {bids.length === 0 ? (
                                <p className="text-gray-500">No bids yet.</p>
                            ) : (
                                <ul className="space-y-2">
                                    {bids.map((bid, index) => (
                                        <li key={index} className="flex justify-between items-center">
                                            <span className="text-gray-600">Bid: ${bid}</span>
                                            <button
                                                onClick={() => handleAcceptOffer(bid)}
                                                className="text-blue-500 hover:underline"
                                            >
                                                Accept Offer
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    )}

                    {status === "Sale in Progress" && (
                        <div className="mt-6 border-t border-gray-200 pt-4 text-center">
                            <h3 className="text-lg font-semibold text-gray-800">Waiting for Buyer Payment</h3>
                            <button
                                onClick={handlePayment}
                                className="mt-4 bg-green-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-green-700 transition duration-200"
                            >
                                Pay
                            </button>
                        </div>
                    )}

                    {status === "Sale Complete" && (
                        <div className="mt-6 text-center">
                            <h3 className="text-lg font-semibold text-green-600">Sale Completed</h3>
                            <p className="text-gray-600">Proceeds will be disbursed after 7 days.</p>
                        </div>
                    )}
                </div>
            </div>

        </>
    );
};

export default ExchangeRegistration;
