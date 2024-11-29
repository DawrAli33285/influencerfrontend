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
            <div className="bg-white p-[20px] max-h-[700px] overflow-y-auto rounded-[20px] shadow-md">
                <div className="flex justify-between items-center mb-[20px]">
                    <h1 className="text-[#1DBF73] text-[24px] font-semibold">Offers</h1>
                    <select
                        value={selectedMonth}
                        onChange={fetchAccordingToMonth}
                        className="p-[8px] bg-white font-semibold text-black rounded-[10px] border-[1px] border-black outline-none"
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
                    <div>
                        <table className="min-w-full table-auto xl:table hidden border-gray-300 border-collapse">
                            <thead>
                                <tr className="bg-[#FDFBFD]">
                                    <th className="p-[10px] text-left border-l border-t border-b border-gray-300">Bond Name</th>
                                    <th className="p-[10px] text-left border-l border-t border-b border-gray-300">Validity Period</th>
                                    <th className="p-[10px] text-left border-l border-t border-b border-gray-300">Unit Price</th>
                                    <th className="p-[10px] text-left border-l border-t border-b border-gray-300">Quantity</th>
                                    <th className="p-[10px] text-left border-l border-t border-b border-r border-gray-300">Options</th>
                                </tr>
                            </thead>
                            <tbody>
                                {offersData?.map((offer, index) => (

                                    <tr key={index} className="border-b">
                                        <td className="p-[10px] border-l border-gray-300">{offer?.bond_id?.title || offer.title}</td>
                                        <td className="p-[10px] border-l border-gray-300">{(offer?.bond_id?.validity_number || offer.validity_number) + ' months'}</td>
                                        <td className="p-[10px] border-l border-gray-300">{offer?.price}</td>
                                        <td className="p-[10px] border-l border-r border-gray-300">{offer?.number_of_bonds}</td>
                                        <td className="border-l border-r border-gray-300 p-[10px] grid gap-[10px] grid-cols-2">
                                            <div onClick={() => acceptBuyerOffer(offer._id)} className='text-[16px] text-center cursor-pointer px-[20px] py-[10px] text-[#1DBF73] border rounded-[20px] border-[#D0D5DD]'>Accept</div>

                                            <div onClick={() => rejectBuyerOffer(offer._id)} className='text-[16px] text-center cursor-pointer px-[20px] py-[10px] text-[#1DBF73] border rounded-[20px] border-[#D0D5DD]'>Reject</div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className='w-full xl:hidden block'>
                            <div className="xl:grid-cols-4 grid-cols-2 gap-[20px] border-b border-gray-300 py-4">
                                {offersData?.map((offer, index) => (
                                    <div key={index} className="grid xl:grid-cols-4 grid-cols-2 gap-[20px] border-b border-gray-300 py-4">
                                        <div className="flex flex-col gap-[10px]">
                                            <h1 className="text-[18px] font-semibold text-[#7E8183]">Bond Name</h1>
                                            <p className="text-[16px] font-semibold">{offer?.bond_id?.title || offer.title}</p>
                                        </div>
                                        <div className="flex flex-col gap-[10px]">
                                            <h1 className="text-[18px] font-semibold text-[#7E8183]">Validity Period</h1>
                                            <p className="text-[16px] font-semibold">{(offer?.bond_id?.validity_number || offer.validity_number) + ' months'}</p>
                                        </div>

                                        <div className="flex flex-col gap-[10px]">
                                            <h1 className="text-[18px] font-semibold text-[#7E8183]">Unit Price</h1>
                                            <p className="text-[16px] font-semibold">{offer?.price}</p>
                                        </div>

                                        <div className="flex flex-col gap-[10px]">
                                            <h1 className="text-[18px] font-semibold text-[#7E8183]">Quantity</h1>
                                            <p className="text-[16px] font-semibold">{offer?.number_of_bonds} </p>
                                        </div>

                                        <div className="flex flex-col gap-[10px]">
                                            <h1 className="text-[18px] font-semibold text-[#7E8183]">Options</h1>
                                            <div onClick={() => acceptBuyerOffer(offer._id)} className='text-[16px] text-center cursor-pointer px-[20px] py-[10px] text-[#1DBF73] border rounded-[20px] border-[#D0D5DD]'>Accept</div>

                                            <div onClick={() => rejectBuyerOffer(offer._id)} className='text-[16px] text-center cursor-pointer px-[20px] py-[10px] text-[#1DBF73] border rounded-[20px] border-[#D0D5DD]'>Reject</div>
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
