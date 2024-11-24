import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MoonLoader } from 'react-spinners';
import { BASE_URL } from '../baseURL';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BondListContext } from "../contextAPI/bondListing";
import { useContext } from 'react';
import { Link } from "react-router-dom"
import howto from "../howtocreatebond.png"
const BondListingTable = () => {
    const [selectedMonth, setSelectedMonth] = useState('default');
    const [loading, setLoading] = useState(true)
    const { state: bondData, setState: setBondData } = useContext(BondListContext)
    // const [bondData,setBondData]=useState([

    // ])
    const [originalBondData, setOriginalBondData] = useState([])
    useEffect(() => {
        fetchBondList()
    }, [])
    const fetchBondList = async () => {
        try {
            let token = localStorage.getItem('token')
            let headers = {
                headers: {
                    authorization: `Bearer ${token}`
                }
            }
            let response = await axios.get(`${BASE_URL}/bond-listing`, headers)

            setBondData(response.data.bondsList)
            setOriginalBondData(response.data.bondsList)
            setLoading(false)

        } catch (e) {
            if (e?.response?.data?.error) {
                toast.dismiss()
                toast.error(e?.response?.data?.error, { containerId: "containerB" })
                return;
            } else {
                toast.dismiss()
                toast.error("Client error please try again", { containerId: "containerB" })
                return;
            }
        }
    }
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const fetchAccordingToMonth = (e) => {
        const monthName = e.target.value;
        setSelectedMonth(e.target.value)
        const monthIndex = months.indexOf(monthName);
        if (monthIndex === -1) return;
        setBondData((prevBondData) => {
            return originalBondData.filter((bond) => {
                const bondDate = new Date(bond.createdAt);
                return bondDate.getMonth() === monthIndex;
            });
        });
    };

    const getStatusClass = (status) => {
        switch (status) {
            case 'PENDING':
                return 'text-orange-500';
            case 'LIVE':
                return 'text-red-500';
            case 'COMPLETED':
                return 'text-green-500';
            default:
                return '';
        }
    };
    useEffect(() => {
        if (originalBondData?.length <= bondData?.length) {
            setOriginalBondData(bondData)
        }
    }, [bondData])

    return (
        <>
            <ToastContainer containerId="containerB" limit={1} />
            <div className="bg-white max-h-[700px]  overflow-y-auto">
                <div className="flex justify-between lg:flex-row flex-col items-center mb-[20px]">
                    <div className='flex flex-col'>
                        <h1 className="text-[24px] font-semibold">Explore Exciting Opportunities</h1>
                        <p className='text-[18px]'>Discover and invest in unique missions by talented individuals.</p>
                    </div>
                    <div className="grid lg:grid-cols-12 gap-[20px] grid-cols-1 lg:mt-0 mt-[40px]">
                        <select
                            value={selectedMonth}
                            onChange={fetchAccordingToMonth}
                            className="p-[8px] bg-white font-semibold text-black rounded-[10px] border-[1px] border-black outline-none lg:col-span-2"
                        >
                            <option value="default">Issuer</option>
                            {months.map((month) => (
                                <option key={month} value={month}>
                                    {month}
                                </option>
                            ))}
                        </select>
                        <select
                            value={selectedMonth}
                            onChange={fetchAccordingToMonth}
                            className="p-[8px] bg-white font-semibold text-black rounded-[10px] border-[1px] border-black outline-none lg:col-span-2"
                        >
                            <option value="default">Price Range</option>
                            {months.map((month) => (
                                <option key={month} value={month}>
                                    {month}
                                </option>
                            ))}
                        </select>


                        <div className="flex gap-[10px] xl:flex-row flex-col w-full lg:col-span-4">
                            <div className="w-full bg-[#F6F6F6] rounded-[20px] px-[10px] py-[10px] flex items-center">
                                <input
                                    type="text"
                                    placeholder="Search here..."
                                    className="outline-none border-none bg-transparent w-[90%]"
                                />
                            </div>
                        </div>


                        <button className="p-[10px] bg-[#1DBF73] text-white font-semibold rounded-[10px] lg:col-span-4">
                            Create Bond
                        </button>

                    </div>
                </div>
                <div className="w-full my-[40px]">
                    <img src={howto} className="w-full" alt="img" />
                </div>
                {!loading ? bondData?.length > 0 ?
                    <div>
                        <table className="min-w-full xl:table hidden table-auto border-gray-300 border-collapse">
                            <thead>
                                <tr className="bg-[#FDFBFD]">
                                    <th className="p-[10px] text-left border-b border-gray-300">Issuer</th>
                                    <th className="p-[10px] text-left border-b border-gray-300">Mission</th>
                                    <th className="p-[10px] text-left border-b border-gray-300">Price</th>
                                    <th className="p-[10px] text-left border-b border-gray-300">Validity</th>
                                    <th className="p-[10px] text-left border-b border-gray-300"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {bondData?.map((bond, index) => (
                                    <tr key={index}>
                                        <td className="p-[10px] font-bold">{bond?.title}</td>
                                        <td className="p-[10px]">{'$' + bond?.bond_issuerance_amount}</td>
                                        <td className="p-[10px] text-[#1DBF73]">{bond?.total_bonds
                                        }</td>
                                        <td className="p-[10px] font-bold">{bond?.validity_number + ' months'}</td>


                                        <td className={`text-[#1DBF73] underline`}>
                                            <Link to="/">View</Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className='w-full xl:hidden block'>
                            <div className="xl:grid-cols-4 grid-cols-2 gap-[20px] border-b border-gray-300 py-4">
                                {bondData?.map((bond, index) => (
                                    <div key={index} className="grid xl:grid-cols-4 grid-cols-2 gap-[20px] border-b border-gray-300 py-4">
                                        <div className="flex flex-col gap-[10px]">
                                            <h1 className="text-[18px] font-semibold text-[#7E8183]">Issuer</h1>
                                            <p className="text-[16px] font-semibold">{bond?.title}</p>
                                        </div>

                                        <div className="flex flex-col gap-[10px]">
                                            <h1 className="text-[18px] font-semibold text-[#7E8183]">Mission</h1>
                                            <p className="text-[16px] font-semibold">{'$' + bond?.bond_issuerance_amount}</p>
                                        </div>

                                        <div className="flex flex-col gap-[10px]">
                                            <h1 className="text-[18px] font-semibold text-[#7E8183]">Price</h1>
                                            <p className="text-[16px] font-semibold">{bond?.total_bonds}</p>
                                        </div>

                                        <div className="flex flex-col gap-[10px]">

                                            <p className="text-[16px] text-[#1DBF73] underline font-semibold">
                                                <Link to="/">View</Link>
                                            </p>
                                        </div>





                                    </div>
                                ))}
                            </div>

                        </div>
                    </div> : <div className='flex justify-center items-center'>
                        <p>No record found</p>
                    </div> : <div className='flex justify-center items-center'>
                    <MoonLoader color="#6B33E3" size={100} />
                </div>
                }
            </div>
        </>
    );
};

export default BondListingTable;
