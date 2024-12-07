import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { BASE_URL } from "../baseURL";
const InfluencerOffer = () => {
  const [bondData, setBondData] = useState()
  const [offerData, setOfferData] = useState()
  const navigate = useNavigate();
  const [missionData,setMissionData]=useState()
  const [desiredSalePrice, setDesiredSalePrice] = useState(0);

  let location = useLocation();
  useEffect(() => {
    fetchBondInfo();
  }, [])
  const fetchBondInfo = async () => {
    try {
      let params = new URLSearchParams(location.search)
      let bond_id = params.get('bond_id')
      let token = localStorage.getItem('token')
      let headers = {
        headers: {
          authorization: `Bearer ${token}`
        }
      }
      if (!token) {
        toast.error("Please login first", { containerId: "influenceroffer" })
        return;
      }
      let response = await axios.get(`${BASE_URL}/getSingleBond/${bond_id}`,headers)
      console.log("RESPONSE offers")
      console.log(response.data)
      setBondData(response.data.bond)
      setOfferData(response.data.offer)
      setMissionData(response.data.mission)
    } catch (e) {
      console.log(e)
      if (e?.response?.data?.error) {
        toast.error(e?.respose?.data?.error, { containerId: "influenceroffer" })
      } else {
        toast.error("Client error please try again", { containerId: "influenceroffer" })
      }
    }
  }

  const rejectOffer = async () => {
    try {
      let token = localStorage.getItem('token')
      if (!token) {
        toast.error("Please login first", { containerId: "influenceroffer" })
        return
      }
      let headers = {
        headers: {
          authorization: `Bearer ${token}`
        }
      }
      let response = await axios.delete(`${BASE_URL}/rejectOffergetSingleBond/${bondData?._id}/${bondData?.issuer_id}/${offerData?._id}`, headers)
      navigate('/dashboard')
      toast.success(response?.data?.message, { containerId: "influenceroffer" })
    } catch (e) {
      console.log(e)
      if (e?.response?.data?.error) {
        toast.error(e?.response?.data?.error, { containerId: "influenceroffer" })
      } else {
        toast.error("Client error please try again", { containerId: "influenceroffer" })
      }
    }
  }

  const acceptOffer = async () => {
    try {
      let token = localStorage.getItem('token')
      if (!token) {
        toast.error("Please login first", { containerId: "influenceroffer" })
        return
      }
      let headers = {
        headers: {
          authorization: `Bearer ${token}`
        }
      }
      let response = await axios.get(`${BASE_URL}/acceptOffer/${bondData?._id}/${bondData?.issuer_id}/${offerData?._id}`, headers)
      navigate('/dashboard')
      toast.success(response?.data?.message, { containerId: "influenceroffer" })
    } catch (e) {

      if (e?.response?.data) {

        toast.error(e?.response?.data?.error, { containerId: "influenceroffer" })
      } else {
        toast.error("Client error please try again", { containerId: "influenceroffer" })
      }
    }
  }

  return (
    <>
      <ToastContainer containerId="influenceroffer"></ToastContainer>

      <div className="flex items-center justify-center rounded-[20px] min-h-screen bg-gray-100">
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-[800px]">
          <h2 className="text-[2rem] font-bold text-gray-800 mb-4  py-[20px] border-b border-b-[#1C1C1C3D]">Promise Bond Details</h2>
          <div className="flex justify-between lg:flex-row flex-col gap-[10px] ">
            <h2 className="text-[1.6rem] font-bold">{bondData?.title}</h2>
            <div className="w-fit rounded-[20px] bg-[#F2121214] px-[10px] py-[6px] text-red-500">{bondData?.validity_number
            } Month</div>
          </div>
          <h2 className="mt-[10px] font-bold text-[1.4rem]">Mission</h2>
          <p className="text-[1rem] my-[10px] text-[#74767E] max-h-[150px] overflow-y-auto break-words">
  {missionData?.description}
</p>

          {/* Bond Title */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-600">Bond Title</h3>
            <p className="text-xl text-gray-900 font-medium">{bondData?.title}</p>
          </div>

          {/* Offer Details */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <h4 className="text-lg font-semibold text-gray-600">Quantity Offered</h4>
              <p className="text-gray-900 text-lg font-medium">{offerData?.number_of_bonds} Bonds</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-600">Offer Amount</h4>
              <p className="text-gray-900 text-lg font-medium">{offerData?.price}</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-600">Total Bonds Value</h4>
              <p className="text-gray-900 text-lg font-medium">{bondData?.
                bond_price * offerData?.number_of_bonds
              }</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex  lg:flex-row flex-col gap-[10px] justify-between mt-6">
            
            <div className="flex lg:w-1/2 w-full px-[20px]">
              <button onClick={rejectOffer} className="w-1/2 mr-2 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition duration-200">
                Reject
              </button>
              <button onClick={acceptOffer} className="w-1/2 ml-2 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition duration-200">
                Accept
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InfluencerOffer;
