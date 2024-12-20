import React, { useState, useEffect } from 'react';
import { BASE_URL } from '../../baseURL';
import { MoonLoader } from 'react-spinners';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const OfferListingTable = () => {
    const [selectedMonth, setSelectedMonth] = useState('default');
    const [originalOffersData, setOriginalOffersData] = useState([]);
    const [offersData, setOffersData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentBuyerId, setCurrentBuyerId] = useState("")

    useEffect(() => {
        fetchOffersData();

    }, []);

    const fetchOffersData = async () => {
        try {
            let token = localStorage.getItem('buyerToken');
            let headers = {
                headers: {
                    authorization: `Bearer ${token}`
                }
            };
            let response = await axios.get(`${BASE_URL}/getBids`, headers);
            let filteredResponse = response.data.bids?.filter(u => u?.bond_id?.buyer_id === response.data.buyerId)
            setOffersData(filteredResponse);
            console.log("RESPONSe offers")
            console.log(filteredResponse)
            setOriginalOffersData(filteredResponse);
            setCurrentBuyerId(response.data.buyerId)
            setLoading(false);
        } catch (e) {
            const errorMsg = e?.response?.data?.error || "Client error please try again";
            toast.dismiss();
            toast.error(errorMsg, { containerId: "buyerOfferListing" });
        }
    };

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const fetchAccordingToMonth = (e) => {
        const monthName = e.target.value;
        setSelectedMonth(e.target.value);
        const monthIndex = months.indexOf(monthName);
        if (monthIndex === -1) return;

        setOffersData(originalOffersData.filter((bond) => {
            const bondDate = new Date(bond.createdAt);
            return bondDate.getMonth() === monthIndex;
        }));
    };

    const acceptBuyerOffer = async (offer_id) => {
        try {

            let token = localStorage.getItem('buyerToken');
            let headers = { headers: { authorization: `Bearer ${token}` } };
            await axios.get(`${BASE_URL}/acceptBidOffer/${offer_id}`, headers);
            toast.dismiss();
            window.location.reload(true);
            toast.success("Offer accepted successfully", { containerId: "buyerOfferListing" });
        } catch (e) {
            const errorMsg = e?.response?.data?.error || "Client error please try again";
            toast.error(errorMsg, { containerId: "buyerOfferListing" });
        }
    };

    const rejectBuyerOffer = async (offer_id) => {
        try {
            let token = localStorage.getItem('buyerToken');
            let headers = { headers: { authorization: `Bearer ${token}` } };
            await axios.get(`${BASE_URL}/rejectBidOffer/${offer_id}`, headers);
            setOffersData((prev) => prev.filter((u) => u._id !== offer_id));
            toast.success("Offer rejected successfully", { containerId: "buyerOfferListing" });
        } catch (e) {
            const errorMsg = e?.response?.data?.error || "Client error please try again";
            toast.error(errorMsg, { containerId: "buyerOfferListing" });
        }
    };

    return (
        <>
            <ToastContainer containerId="buyerOfferListing" limit={1} />
            <div className=" p-[20px] min-h-[700px] w-full   bg-[#f2f2f2] rounded-[20px] mt-[20px] px-[20px] lg:py-[40px]">
                <div className="flex justify-between lg:flex-row flex-col gap-[20px] items-center mb-[20px]">
                    <div className='flex flex-col'>
                        <h1 className="lg:text-[2rem] text-[1.5rem] font-bold">Offers</h1>
                        <p className='lg:text-[0.94rem] text-[0.75rem]'>Discover and invest in unique missions by talented individuals.</p>
                    </div>
                    <select
                        value={selectedMonth}
                        onChange={fetchAccordingToMonth}
                        className="p-[8px] lg:max-w-[140px] w-full bg-white font-medium text-[.88rem] text-black rounded-[2rem] shadow-md outline-none"
                    >
                        <option value="default">Select Month</option>
                        {months.map((month) => (
                            <option key={month} value={month}>
                                {month}
                            </option>
                        ))}
                    </select>
                </div>

                {loading ? (
                    <div className='flex justify-center items-center'>
                        <MoonLoader color="#6B33E3" size={100} />
                    </div>
                ) : offersData.length > 0 ? (
                    <div className='lg:p-[30px] lg:bg-white'>
                        <table className="min-w-full table-auto xl:table hidden border-gray-300 border-collapse">
                            <thead>
                                <tr className="bg-[#FDFBFD]">
                                    <th className="p-[10px] bg-[#1DBF7314]  text-[1.07rem] font-medium lg:px-[30px] lg:py-[30px] text-left border-b border-gray-300">Bond Name</th>
                                    <th className="p-[10px] bg-[#1DBF7314] text-[1.07rem] font-medium text-left border-b lg:py-[30px] border-gray-30">Validity Period</th>
                                    <th className="p-[10px] bg-[#1DBF7314] text-[1.07rem] font-medium text-left border-b lg:py-[30px] border-gray-30">Unit Price</th>
                                    <th className="p-[10px] bg-[#1DBF7314] text-[1.07rem] font-medium text-left border-b lg:py-[30px] border-gray-30">Quantity</th>
                                    <th className="p-[10px] bg-[#1DBF7314] text-[1.07rem] font-medium text-left border-b lg:py-[30px] border-gray-30 ">Options</th>
                                </tr>
                            </thead>
                            <tbody>
                                {offersData?.map((offer, index) => (

                                    <tr key={index} className="border-b">
                                        <td className="p-[10px] text-[0.94rem] font-normal  border-b border-b-[#E9E9E9] pt-[30px]">{offer?.bond_id?.title || offer.title}</td>
                                        <td className="p-[10px] text-[0.94rem] font-normal  border-b border-b-[#E9E9E9] pt-[30px]">{(offer?.bond_id?.validity_number || offer.validity_number) + ' months'}</td>
                                        <td className="p-[10px] text-[0.94rem] font-normal border-b border-b-[#E9E9E9]  pt-[30px]  text-[#1DBF73]">{offer?.price}</td>
                                        <td className="p-[10px] text-[0.94rem] font-normal  border-b border-b-[#E9E9E9] pt-[30px]">{offer?.number_of_bonds}</td>
                                        <td className="p-[10px] text-[0.94rem] font-normal  border-b border-b-[#E9E9E9] pt-[30px] flex gap-[6px]">
                                            <div onClick={() => acceptBuyerOffer(offer._id)} className=' bg-[#FFEDE8] flex  p-[20px] items-center gap-[6px] cursor-pointer'>Accept</div>

                                            <div onClick={() => rejectBuyerOffer(offer._id)} className=' bg-[#FFEDE8] flex  p-[20px] items-center gap-[6px] cursor-pointer'>Reject</div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className='w-full xl:hidden block'>
                            <div className="flex bg-[#f2f2f2] flex-col gap-[20px]">
                                {offersData?.map((offer, index) => (
                                    <div key={index} className="p-[20px] bg-white flex flex-col gap-[20px] border-b border-gray-300 py-4">
                                        <div className='flex flex-col gap-[10px]'>
                                            <div className="flex flex-col gap-[10px]">
                                                <p className="text-[0.75rem] font-semibold">{offer?.bond_id?.title || offer.title}</p>
                                            </div>
                                            <div className="flex flex-col gap-[10px]">
                                                <h1 className="text-[0.75rem]">Validity:</h1>
                                                <p className="text-[0.75rem]">{(offer?.bond_id?.validity_number || offer.validity_number) + ' months'}</p>
                                            </div>
                                            <div className="flex flex-col gap-[10px]">
                                                <p className="text-[0.75rem]">{offer?.number_of_bonds} </p>
                                            </div>
                                        </div>
                                        <div className='flex justify-between items-center'>
                                            <div className="flex flex-col gap-[10px]">
                                                
                                                <p className="text-[0.75rem] text-[#1DBF73]">{offer?.price}/bond</p>
                                            </div>
                                            <div className="flex  gap-[10px]">
                                                <div onClick={() => acceptBuyerOffer(offer._id)} className='flex bg-[#FFEDE8] p-[20px] items-center gap-[6px] text-[0.75rem]  font-semibold'>Accept</div>

                                                <div onClick={() => rejectBuyerOffer(offer._id)} className='flex bg-[#FFEDE8] p-[20px] items-center gap-[6px] text-[0.75rem]  font-semibold'>Reject</div>
                                            </div>

                                        </div>
                                    </div>
                                ))}
                            </div>

                        </div>
                    </div>
                ) : (
                    <div className='flex justify-center items-center'>
                        <p>No record found</p>
                    </div>
                )}
            </div>
        </>
    );
};

export default OfferListingTable;
