import { useEffect, useRef, useState } from "react"
import paypal from "../paypal.png"
import credit from "../credit.png"
import { BASE_URL } from "../baseURL"
import { useLocation,useNavigate } from "react-router-dom"
import axios from "axios"
import {
    PaymentElement,
    Elements,
    CardElement,
    useStripe,
    useElements,
  } from '@stripe/react-stripe-js';
  import { PayPalButtons } from "@paypal/react-paypal-js"
  import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  


export default function Paymet() {
    const [paymethod, setPaymethod] = useState("paypal")
    const [state,setState]=useState()
    const [cardError, setCardError] = useState(null);
    const [cardComplete, setCardComplete] = useState(false);
    const navigate=useNavigate();
    const [paymentInfo,setPaymentInfo]=useState({
        no_of_bonds:0,
        amount:0,
        card:'',
        paypal:''
    })
    const cardRef=useRef();
const location=useLocation();
useEffect(()=>{
fetchBond();
},[])
  const stripe = useStripe();
  const elements = useElements();

 

const fetchBond=async()=>{
    try{
        let params=new URLSearchParams(location.search)
        let bond_id=params.get("bond_id")
        let token=localStorage.getItem('buyerToken')
        let headers={
            headers:{
                authorization:`Bearer ${token}`
            }
        }
        if(!token){
            toast.error("Please login first")
            return;
        }
let response=await axios.get(`${BASE_URL}/getSingleBond/${bond_id}`,headers)
console.log(response.data)
console.log("RESPONSES")
setState(response.data)
    }catch(e){
if(e?.response?.data?.error){
    toast.error(e?.respose?.data?.error,{containerId:"transaction"})
}else{
    toast.error("Client error please try again",{containerId:"transaction"})
}
    }
}

const handleStripeCard=(event)=>{
    try{
        setCardError(event.error ? event.error.message : null);
        setCardComplete(event.complete); 
    }catch(e){
if(e?.respose?.data?.error){
toast.error(e?.response?.data?.error,{containerId:"transaction"})
}else{
toast.error("Client error please try again",{containerId:"transaction"})
}
    }
}

const payNow = async () => {
    try {
        let params=new URLSearchParams(location.search)
        let bond_id=params.get("bond_id")
       
      const card = elements.getElement(CardElement); 
      console.log("CARD", card);
  
      if (!card) {
        toast.error("Card element not found",{containerId:"transaction"})
       
        return;
      }
  
      
      const { paymentMethod, error } = await stripe.createPaymentMethod({
        type: 'card',
        card: card,
      });
  
      if (error) {
        console.error("Payment method creation error:", error);
        toast.error("Payment method creation error",{containerId:"transaction"})
        return;
      }
  
      let token=localStorage.getItem("buyerToken")
      let headers={
         headers:{
             authorization:`Bearer ${token}`
         }
      }
  if(state?.bond?.buyer_id){
   
    const data = {
        ...paymentInfo,
        amount:state?.bond?.bond_price,
        no_of_bonds:state?.bond?.total_bonds,
        bond_id:bond_id,
        offer_id:state?.offer?._id,
        card: paymentMethod.id,
        buyer_id:state?.bond?.buyer_id
      };

      const response = await axios.post(`${BASE_URL}/payForExchangeCard`, data,headers);
  }else{

    const data = {
        ...paymentInfo,
        amount:state.offer.price,
        no_of_bonds:state.offer.number_of_bonds,
        bond_id,
        offer_id:state?.offer?._id,
        card: paymentMethod.id,
      };
   
   
      const response = await axios.post(`${BASE_URL}/buyBondCard`, data,headers);
  }
     
      navigate('/buyerdashboard')
    } catch (e) {
        if(e?.response?.data?.error){
toast.error(e?.response?.data?.error,{containerId:"transaction"})
        }else{
toast.error("Client error please try again",{containerId:"transaction"})
        }
      
    }
  };
  
 


    return (
        <>
        
        <ToastContainer limit={1} containerId={"transaction"}/>
        <svg className="cursor-pointer" onClick={()=>{
            navigate(-1)
        }} width={45} height={45} fill="#000000" viewBox="0 0 200 200" data-name="Layer 1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><title></title><path d="M160,89.75H56l53-53a9.67,9.67,0,0,0,0-14,9.67,9.67,0,0,0-14,0l-56,56a30.18,30.18,0,0,0-8.5,18.5c0,1-.5,1.5-.5,2.5a6.34,6.34,0,0,0,.5,3,31.47,31.47,0,0,0,8.5,18.5l56,56a9.9,9.9,0,0,0,14-14l-52.5-53.5H160a10,10,0,0,0,0-20Z"></path></g></svg>
        <div className="h-[100vh]">
        
            <div className="w-full ] overflow-x-auto grid xl:grid-cols-2 grid-cols-1 bg-white rounded-[20px] mt-[20px] px-[20px] py-[40px]">
              
                <div className="flex gap-5 flex-col p-[20px] border-r border-r-[#EAECF0]">
                    <h1 className="text-[16px] font-semibold">Summary</h1>
                    <div className="flex items-center gap-[2px]"><p className="text-[#828282]">Bond:</p><p className="font-semibold">{state?.bond?.title}</p></div>
                    <div className="flex items-center gap-[2px]"><p className="text-[#828282]">validty Period:</p><p className="font-semibold">{state?.bond?.validity_number}months</p></div>
                    <div className="w-full h-[1px] bg-[#EAECF0]"></div>
                    <div className="flex items-center justify-between"><p className="text-[#828282]">Quantity:</p><p className="font-semibold">{state?.offer?.number_of_bonds}</p></div>
                    <div className="flex items-center justify-between"><p className="text-[#828282]">Status:</p><p className="font-semibold">InProcess</p></div>
                    <div className="flex items-center justify-end"><p className="text-[28px] font-semibold">${state?.offer?.price?state?.offer?.price:state?.bond?.bond_issuerance_amount}</p></div>
                    <div className="w-full h-[1px] bg-[#EAECF0]"></div>
                </div>
                <div className="flex gap-[20px] p-[20px] flex-col">
                    <h1 className="text-[16px] font-semibold">Choose Your Payment Method</h1>
                    <div onClick={() => { setPaymethod("paypal") }} className={`cursor-pointer flex flex-col gap-[20px] p-[20px] ${paymethod == 'paypal' ? 'bg-white' : 'bg-[#F6F6F6]'} rounded-[20px] w-full`}>
                        <div className={`flex justify-between w-full items-center`}>
                            <div className="flex items-center gap-[6px]">
                                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10.9697 21C16.4926 21 20.9697 16.5228 20.9697 11C20.9697 5.47715 16.4926 1 10.9697 1C5.44688 1 0.969727 5.47715 0.969727 11C0.969727 16.5228 5.44688 21 10.9697 21Z" stroke={`${paymethod == "paypal" ? '#6B33E3' : '#292D32'}`} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M10.9995 15.23C13.3357 15.23 15.2295 13.3362 15.2295 11C15.2295 8.66386 13.3357 6.77002 10.9995 6.77002C8.66337 6.77002 6.76953 8.66386 6.76953 11C6.76953 13.3362 8.66337 15.23 10.9995 15.23Z" stroke={`${paymethod == "paypal" ? '#6B33E3' : '#292D32'}`} stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                                <p className="text-[18px]">PayPal</p>
                            </div>
                            <div>
                                <img src={paypal} alt="img" />
                            </div>
                        </div>
                        <p className="text-[#828282] px-[25px]">Safe payment online. Credit card needs. PayPal account is not necessary.</p>

                    </div>
                    <div onClick={() => { setPaymethod("card") }} className={`cursor-pointer flex flex-col gap-[20px] p-[20px] ${paymethod == 'credit' ? 'bg-white' : 'bg-[#F6F6F6]'} rounded-[20px] w-full`}>
                        <div className={`flex justify-between w-full items-center`}>
                            <div className="flex items-center gap-[6px]">
                                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10.9697 21C16.4926 21 20.9697 16.5228 20.9697 11C20.9697 5.47715 16.4926 1 10.9697 1C5.44688 1 0.969727 5.47715 0.969727 11C0.969727 16.5228 5.44688 21 10.9697 21Z" stroke={`${paymethod == "credit" ? '#6B33E3' : '#292D32'}`} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M10.9995 15.23C13.3357 15.23 15.2295 13.3362 15.2295 11C15.2295 8.66386 13.3357 6.77002 10.9995 6.77002C8.66337 6.77002 6.76953 8.66386 6.76953 11C6.76953 13.3362 8.66337 15.23 10.9995 15.23Z" stroke={`${paymethod == "credit" ? '#6B33E3' : '#292D32'}`} stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                                <p className="text-[18px]">CreditCard</p>
                            </div>
                            <div>
                                <img src={credit} alt="img" />
                            </div>
                        </div>
                        <p className="text-[#828282] px-[25px]">Safe payment online. Credit card needs. PayPal account is not necessary.</p>

                    </div>
                    <div className="w-full h-[1px] bg-[#EAECF0]"></div>
                    <div>
                        <label htmlFor="bondname" className="block text-xl  font-semibold text-[#272226]">Sponsor Bond Name</label>
                        <div className="mt-4">
                            <input type="text" value={state?.bond?.name} disabled name="bondname" className="mt-1 block w-full px-3 py-4 border rounded-[20px] border-gray-300 focus:outline-none focus:ring focus:border-blue-500" placeholder={state?.bond?.title} />
                        </div>

                    </div>
                    <div className="grid gap-[20px] grid-cols-1 xl:grid-cols-2 mt-[20px]">
                        <div>
                            <label htmlFor="price" className="block text-xl  font-semibold text-[#272226]">Purchase Price</label>
                            <div className="mt-4">
                                <input  type="text" name="price" className="mt-1 block w-full px-3 py-4 border rounded-[20px] border-gray-300 focus:outline-none focus:ring focus:border-blue-500" disabled placeholder={state?.offer?.price?state?.offer?.price:state?.bond?.bond_issuerance_amount} />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="date" className="block text-xl  font-semibold text-[#272226]">Date</label>
                            <div className="mt-4">
                            <input
  type="date"
  name="date"
  value={new Date().toISOString().split('T')[0]} 
  disabled
  className="mt-1 block w-full px-3 py-4 border rounded-[20px] border-gray-300 focus:outline-none focus:ring focus:border-blue-500"
  placeholder={new Date().toISOString().split('T')[0]} 
/>

                            </div>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="transid" className="block text-xl  font-semibold text-[#272226]">Transaction ID</label>
                        {paymethod==="card"?  <div className="mt-4">
              <CardElement onChange={handleStripeCard} options={{ hidePostalCode: true }} />
            </div>:<>
            {state?.bond&&(
                <PayPalButtons
                createOrder={(data, actions) => {
            
                return actions.order.create({
                    purchase_units: [
                        {
                            amount: {
                                currency_code: "USD",
                                value:state?.offer?.price?state?.offer?.price?.toFixed(2)?.toString():state?.bond?.bond_issuerance_amount
                            },
                        },
                    ],
                });
            
                }}
                onApprove={async (data, actions) => {
                    return actions.order.capture().then(async (details) => {
                       try{
                        console.log("Transaction details:", details);
                        let params=new URLSearchParams(location.search)
                        let bond_id=params.get("bond_id")
                       
                    let data={
                        amount:details.purchase_units[0].amount.value,
                        number_of_bonds:state?.offer?.number_of_bonds,
                        paypal:details?.payer?.email_address,
                        bond_id,
                        offer_id:state?.offer?._id
                     }
                     let token=localStorage.getItem("buyerToken")
                     let headers={
                        headers:{
                            authorization:`Bearer ${token}`
                        }
                     }
                     
                        if(state?.bond?.buyer_id){
                            await axios.post(`${BASE_URL}/exchangePaypal`,data,headers);
                        }else{
                            await axios.post(`${BASE_URL}/buyBondPaypal`,data,headers);
                        }
            navigate('/buyerdashboard')
                
                       }catch(e){
            console.log("ERROR")
            console.log(e.message)
                       }
                    });
                }}
                onError={(err) => {
                    alert("ERROR");
                    console.error("PayPal Checkout onError", err);
                }}
                fundingSource="paypal"
                style={{
                    locale: "en_US",
                }}
            />
            )}
            </>

}

                    </div>
                   {paymethod==="card"?<>
                    <div onClick={payNow}  className={`hover:cursor-pointer border-[1px] rounded-[10px] w-full  text-center text-[20px] bg-[#7638F9] px-[20px] py-[10px] text-white font-semibold ${
        cardError ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
    }`}>
                        Submit
                    </div>
                      {cardError && <p>{cardError}</p>}
                   </>:``}
                </div>
            </div>
        </div>
        </>
      
    )
}
