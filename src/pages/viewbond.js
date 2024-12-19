import { ToastContainer, toast } from "react-toastify"
import { MoonLoader } from 'react-spinners';
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../baseURL";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export default function ViewBond() {
    let { id } = useParams();
    const [loading, setLoading] = useState(true)
    const [state, setState] = useState({
        bond: '',
        mission: '',
        offer: ''
    })
    useEffect(() => {
        getSingleBond();
    }, [])

    const navigate = useNavigate();

    const getSingleBond = async () => {
        try {
            let token = localStorage.getItem('token')
            let headers = {
                headers: {
                    authorization: `Bearer ${token}`
                }
            }
            let response = await axios.get(`${BASE_URL}/getSingleBond/${id}`, headers)
            setState({
                bond: response.data.bond,
                offer: response.data.offer,
                currentIssuer: response.data.
                    currentIssuer,
                mission: response.data.mission
            })
            setLoading(false)
            console.log("SINGLE BOND RESPONSe")
            console.log(response.data)
        } catch (e) {
            if (e?.response?.data?.error) {
                toast.error(e?.response?.data?.error, { containerId: "viewBondIssuer" })
            } else {
                toast.error("Client error please try again", { containerId: "viewBondIssuer" })
            }
        }
    }
    useEffect(() => {
        console.log("UPDATED STATAE")
        console.log(state)
    }, [state])


    return (
        <>
            <ToastContainer containerId={"viewBondIssuer"} />


            <div className="w-full lg:px-[30px] py-[40px]">
                <div className="flex lg:flex-row flex-col gap-[30px] justify-between lg:mb-[60px] lg:items-center">
                    <div className='flex flex-col'>
                        <h1 className="lg:text-[2rem] text-[1.5rem] font-bold">Promise Bond Details</h1>
                        <p className='lg:text-[0.94rem] text-[0.75rem]'>This section provides key details about the bond.</p>
                    </div>
                    {state?.offer || state?.currentIssuer?._id == state?.bond?.issuer_id ? '' : <button
                        onClick={() => {
                            navigate(`/buyersponsorbond?id=${id}&total_bonds=${state?.bond?.total_bonds}&key=${state?.bond?.bond_issuerance_amount}`);
                        }}
                        className="px-[20px] py-[10px] bg-black text-white font-medium text-[.88rem] rounded-[60px]"
                    >
                        Purchase Bond
                    </button>}


                </div>
                {loading ? <div className="flex justify-center items-center">

                    <MoonLoader color="#6B33E3" size={100} />
                </div> : <>

                    <div className="mt-6">
                        {state?.bond?.photos?.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {state.bond.photos.map((val, i) => (
                                    <div
                                        key={i}
                                        className="relative group overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow"
                                    >
                                        <img
                                            src={val}
                                            alt={`Bond Photo ${i + 1}`}
                                            className="w-full h-[200px] md:h-[250px] lg:h-[300px] object-cover"
                                        />
                                        <div
                                            className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-semibold"
                                        >
                                            Photo {i + 1}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-center text-gray-500">No photos available.</p>
                        )}
                    </div>
                    <div className="flex flex-col gap-[30px] mt-[40px]">
                        <div className='flex flex-col'>
                            <h1 className="lg:text-[2rem] text-[1.5rem] font-bold">{state?.bond?.title} </h1>

                        </div>
                        <div className='flex flex-col gap-[10px]'>
                            <h1 className="lg:text-[28px] text-[20px] font-semibold">Mission</h1>
                            <p className="lg:text-[0.94rem] text-[0.75rem] line-clamp-3">  {state?.mission?.description?.length > 0 ? state?.mission?.description : `No Mission Found`}
                            </p>
                        </div>

                        <div className='flex flex-col gap-[10px]'>
                            <h1 className="lg:text-[28px] text-[20px] font-semibold">Validity</h1>
                            <p className='lg:text-[0.94rem] text-[0.75rem]'>{state?.bond?.validity_number} months</p>
                        </div>


                        
                            <div className='flex flex-col gap-[10px]'>
                                <h1 className="lg:text-[28px] text-[20px] font-semibold">Price</h1>
                                <p className='lg:text-[0.94rem] text-[0.75rem]'>${state?.bond?.bond_issuerance_amount}</p>
                            </div>
                            <div className='flex flex-col gap-[10px]'>
                                <h1 className="lg:text-[28px] text-[20px] font-semibold">Total Bonds</h1>
                                <p className='lg:text-[0.94rem] text-[0.75rem]'>${state?.bond?.total_bonds}</p>
                            </div>
                       
                    </div>
                </>}
            </div>

        </>
    )
}