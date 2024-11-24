import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { BASE_URL } from "../../baseURL";
import { formatDistanceToNowStrict, addMonths, parseISO } from "date-fns"; 
import {useNavigate} from 'react-router-dom'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Bid = () => {
    const [bondInfo] = useState({
        name: "Sponsor Bond",
        image: "/path/to/image.jpg", 
        validityPeriod: "Jan 2024 - Dec 2028",
        initialPrice: 100,
        recentPrice: 120,
        finalPrice: 150,
        currentPrice: 130,
    });

    const [desiredSalePrice, setDesiredSalePrice] = useState("");
    const [isForSale, setIsForSale] = useState(false);
    const [bids, setBids] = useState([]);
    const [status, setStatus] = useState("Not for Sale");
const location=useLocation();
const [state,setState]=useState({
    bond:'',
    offer:'',
    mission:''
})

const navigate=useNavigate()
    const handleSubmitForSale = async() => {
        if (desiredSalePrice) {
            try{
                setIsForSale(true);
                setStatus("Seller");
                alert("Bond submitted for sale!");
                let token=localStorage.getItem("buyerToken")
                let headers={
                    headers:{
                        authorization:`Bearer ${token}`
                    }
                }
                let data = {
                    bond_id: state?.bond?._id,
                    quantity: state?.offer?.number_of_bonds?state?.offer?.number_of_bonds:state?.bond?.total_bonds,
                    bond_price: desiredSalePrice,
                    total_bonds: state?.offer?.number_of_bonds?state?.offer?.number_of_bonds:state?.bond?.total_bonds,
                    status: "PENDING",
                    bond_issuerance_amount: state?.offer?.number_of_bonds?state?.offer?.price * state?.offer?.number_of_bonds:state?.bond?.bond_issuerance_amount,
                    validity_number: calculateTimeLeft()
                };
    
        
             
                let response=await axios.post(`${BASE_URL}/setBid`,data,headers)
           navigate('/buyerDashboard')
            }catch(e){
    if(e?.response?.data?.error){
        toast.error(e?.response?.data?.error,{containerId:"exchangeBond"})
    }else{
        toast.error("Client error please try again",{containerId:"exchangeBond"})
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

    useEffect(()=>{
   fetchSingleBond();
    },[])

const fetchSingleBond=async()=>{
try{
    let params=new URLSearchParams(location.search)
    let bond_id=params.get('id')
    let token=localStorage.getItem('buyerToken')
    let headers={
        headers:{
            authorization:`Bearer ${token}`
        }
    }
    let response=await axios.get(`${BASE_URL}/getBuyerOffers/${bond_id}`,headers)
    console.log(response.data)
    console.log("EXCHANGE")
    setState({
        bond:response.data.buyerOffers.bond_id,
        offer:response.data.offer,
        mission:response.data.mission
    })
 
}catch(e){
 if(e?.response?.data?.error){
    toast.error(e?.response?.data?.error,{containerId:"exchangeBond"})
 }else{
    toast.error("Client error please try again",{containerId:"exchangeBond"})
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
        
    <ToastContainer limit={1} containerId={"exchangeBond"}/>
        <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
            <h1 className="text-3xl font-semibold text-gray-800 mb-8">Bid</h1>

            <div className="bg-white shadow-lg rounded-lg p-6 max-w-lg w-full">
               
            <div className="border-t border-gray-200 pt-4 mb-4">
                    <p className="text-gray-600">
                        <span className="font-semibold">Title:</span>{' '+state?.bond?.title}
                    </p>
                    </div>
                <div className="border-t border-gray-200 pt-4 mb-4">
                    <p className="text-gray-600">
                        <span className="font-semibold">Initial Price:</span> ${state?.bond?.bond_price}
                    </p>
                    <p className="text-gray-600">
                        <span className="font-semibold">Recent Purchase Price:</span> ${state?.offer?.price?state?.offer?.price:state?.bond?.bond_issuerance_amount}
                    </p>
                    <p className="text-gray-600">
                        <span className="font-semibold">Validity Period:</span> {state?.bond?.validity_number+' months'}
                    </p>
                    <p className="text-gray-600">
                    <span className="font-semibold">Time Left:</span> {calculateTimeLeft()}
                    </p>
                    <p className="text-gray-600">
                        <span className="font-semibold">Bond Quantity:</span> {state?.offer?.number_of_bonds?state?.offer?.number_of_bonds:state?.bond?.total_bonds             }
                    </p>
                    <p
                        className={`text-lg font-semibold ${
                            bondInfo.currentPrice >= bondInfo.finalPrice ? "text-blue-500" : "text-red-500"
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
                                Set Desired Bid Price:
                               <input
    type="number"
    value={desiredSalePrice}
    onChange={(e) => {
        const value = Number(e.target.value);
        setDesiredSalePrice(value >= 0 ? value : 0);
    }}
    min="0"
    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
/>

                            </label>
                            <button
                                onClick={handleSubmitForSale}
                                className="w-full mt-4 bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition duration-200"
                            >
                                Submit for Sale
                            </button>
                        </>
                    ) : (
                        <p className="text-center text-green-500 font-semibold mt-4">Sale Completed</p>
                    )}
                </div>

               

           

                
            </div>
        </div>

        </>
    );
};

export default Bid;
