import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import HomeFooter from "../components/homefooter";
import HomeHeader from "../components/homeheader";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { MoonLoader } from "react-spinners";
import { useLocation, useNavigate } from "react-router-dom";
import { BASE_URL } from "../baseURL";

export default function Search() {
    const [loading, setLoading] = useState(true)
    const [filter, setFilter] = useState("")
    const [originalState, setOriginalState] = useState([])
    const bondData = [
        {
            _id: '1',
            title: 'Influencer A',
            bond_issuerance_amount: 1000,
            total_bonds: 5000,
            validity_number: 12
        },
        {
            _id: '2',
            title: 'Influencer B',
            bond_issuerance_amount: 1500,
            total_bonds: 3000,
            validity_number: 6
        },
        {
            _id: '3',
            title: 'Influencer C',
            bond_issuerance_amount: 2000,
            total_bonds: 4500,
            validity_number: 24
        },
        {
            _id: '4',
            title: 'Influencer D',
            bond_issuerance_amount: 800,
            total_bonds: 12000,
            validity_number: 18
        }
    ];

    const [searchQuery, setSearchQuery] = useState("");
    const [state, setState] = useState([])
    const location = useLocation();

    const filteredBonds = bondData.filter(bond =>
        bond.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        bond.bond_issuerance_amount.toString().includes(searchQuery) ||
        bond.total_bonds.toString().includes(searchQuery) ||
        bond.validity_number.toString().includes(searchQuery)
    );
    useEffect(() => {
        getSearchItems();
    }, [])

    const getSearchItems = async () => {
        try {
            let params = new URLSearchParams(location.search)
            let filter = params.get("filter")
            setFilter(filter)
            let search = params.get("search")
            let response = await axios.post(`${BASE_URL}/searchItems`, { filter, search });
            console.log("searchItems")
            console.log(response.data)
            setState(response.data.data)
            setOriginalState(response.data.data)
            setLoading(false)

        } catch (e) {
            if (e?.response?.data?.error) {
                toast.error(e?.response?.data?.error, { containerId: "searchToast" })
            } else {
                toast.error("Client error please try again", { containerId: "searchToast" })
            }
        }
    }

    const filterSearch = () => {
        if (!filter || !searchQuery) {
            setState(originalState);
            return;
        }

        const newdata = originalState.filter((item) => {
            if (filter === "issuer") {
                return (
                    item?.user_id?.username?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    item?.user_id?.email?.toLowerCase().includes(searchQuery.toLowerCase())
                );
            } else if (filter === "bond") {
                return (
                    item?.bond_issuerance_amount?.toString().includes(searchQuery) ||
                    item?.total_bonds?.toString().includes(searchQuery) ||
                    item?.validity_number?.toString().includes(searchQuery) ||
                    item?.title?.toString().includes(searchQuery)
                );
            }
            return false;
        });

        setState(newdata);
    };

    useEffect(() => {
        filterSearch();
    }, [searchQuery, filter]);


    const navigate = useNavigate();


    return (
        <>
            <ToastContainer containerId={"searchToast"} />

            <div className="w-full h-[500px]">
                <HomeHeader />
                {loading ? <div className="w-full h-full flex justify-center items-center">

                    <MoonLoader color="#6B33E3" size={100} />
                </div> : <>


                    <div className="flex flex-col gap-[20px] lg:px-[3rem] lg:py-[40px] px-[2rem] py-[40px]">
                        <svg onClick={() => {
                            navigate(-1)
                        }} width={35} height={35} className="cursor-pointer" fill="#000000" viewBox="0 0 200 200" data-name="Layer 1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><title></title><path d="M160,89.75H56l53-53a9.67,9.67,0,0,0,0-14,9.67,9.67,0,0,0-14,0l-56,56a30.18,30.18,0,0,0-8.5,18.5c0,1-.5,1.5-.5,2.5a6.34,6.34,0,0,0,.5,3,31.47,31.47,0,0,0,8.5,18.5l56,56a9.9,9.9,0,0,0,14-14l-52.5-53.5H160a10,10,0,0,0,0-20Z"></path></g></svg>
                        <div className="w-full xl:w-[500px] bg-[#1C1C1C14] rounded-[20px] px-[20px] py-[20px] flex items-center">

                            <input
                                type="text"
                                placeholder="Search here..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="outline-none border-none bg-transparent w-[90%]"
                            />

                            <button className="w-[10%] flex justify-center items-center">
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clipPath="url(#clip0_366_191)">
                                        <circle cx="6.70768" cy="6.70829" r="5.54167" stroke="#1C1C1C" strokeOpacity="0.64" />
                                        <path d="M10.791 10.7916L12.8327 12.8333" stroke="#1C1C1C" strokeOpacity="0.64" strokeLinecap="round" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_366_191">
                                            <rect width="14" height="14" fill="white" />
                                        </clipPath>
                                    </defs>
                                </svg>
                            </button>
                        </div>
                        {state?.length > 0 ? <>
                            {filter === "bond" ? <>
                                <div>
                                    <table className="min-w-full xl:table hidden table-auto border-gray-300 border-collapse">
                                        <thead>
                                            <tr className="bg-[#FDFBFD]">
                                                <th className="p-[10px] text-left border-b border-gray-300">Issuer</th>
                                                <th className="p-[10px] text-left border-b border-gray-300">Bond Title</th>
                                                <th className="p-[10px] text-left border-b border-gray-300">Mission</th>
                                                <th className="p-[10px] text-left border-b border-gray-300">Price</th>
                                                <th className="p-[10px] text-left border-b border-gray-300">Validity</th>
                                                <th className="p-[10px] text-left border-b border-gray-300"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {state?.map((bond, index) => (
                                                <tr key={index}>
                                                    <td className="p-[10px] font-bold">{bond?.issuer_id?.user_id?.username}</td>
                                                    <td className="p-[10px] font-bold">{bond?.title}</td>
                                                    <td className="p-[10px]">{'$' + bond.bond_issuerance_amount}</td>
                                                    <td className="p-[10px] text-[#1DBF73]">{bond.total_bonds}</td>
                                                    <td className="p-[10px] font-bold">{bond.validity_number + ' months'}</td>
                                                    <td className={`text-[#1DBF73] underline`}>
                                                        <Link to={`/promisebonddetail/${bond._id}`}>View</Link>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    <div className='w-full xl:hidden block'>
                                        <div className="xl:grid-cols-4 grid-cols-2 gap-[20px] border-b border-gray-300 py-4">
                                            {state?.map((bond, index) => (
                                                <div key={index} className="grid xl:grid-cols-4 grid-cols-2 gap-[20px] border-b border-gray-300 py-4">
                                                    <div className="flex flex-col gap-[10px]">
                                                        <h1 className="text-[18px] font-semibold text-[#7E8183]">Issuer</h1>
                                                        <p className="text-[16px] font-semibold">{bond?.issuer_id?.user_id?.username}</p>
                                                    </div>
                                                    <div className="flex flex-col gap-[10px]">
                                                        <h1 className="text-[18px] font-semibold text-[#7E8183]">Bond Title</h1>
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
                                                        <h1 className="text-[18px] font-semibold text-[#7E8183]">Validity</h1>
                                                        <p className="text-[16px] font-semibold">{bond.validity_number + ' months'}</p>
                                                    </div>
                                                    <div className="flex flex-col gap-[10px]">
                                                        <p className="text-[16px] text-[#1DBF73] underline font-semibold">
                                                            <Link to={`/promisebonddetail/${bond?._id}`}>View</Link>
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </> : <>

                                <div>
                                    <table className="min-w-full xl:table hidden table-auto border-gray-300 border-collapse">
                                        <thead>
                                            <tr className="bg-[#FDFBFD]">
                                                <th className="p-[10px] text-left border-b border-gray-300">Name</th>
                                                <th className="p-[10px] text-left border-b border-gray-300">Email</th>
                                                <th className="p-[10px] text-left border-b border-gray-300">Location</th>
                                                <th className="p-[10px] text-left border-b border-gray-300">Joined On</th>
                                                <th className="p-[10px] text-left border-b border-gray-300"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {state?.map((bond, index) => (
                                                <tr key={index}>
                                                    <td className="p-[10px] font-bold">{bond?.user_id?.username}</td>
                                                    <td className="p-[10px]">{bond?.user_id?.email}</td>
                                                    <td className="p-[10px] text-[#1DBF73]">{bond?.user_id?.location ? bond?.user_id?.location : 'Location not registered'}</td>
                                                    <td className="p-[10px] font-bold">
                                                        {bond?.user_id?.createdAt
                                                            ? new Date(bond.user_id.createdAt).toLocaleDateString('en-US', {
                                                                month: 'long',
                                                                day: 'numeric',
                                                                year: 'numeric',
                                                            })
                                                            : 'N/A'}
                                                    </td>

                                                    <td className={`text-[#1DBF73] underline`}>
                                                        <Link to={`/profile?id=${bond?._id}`}>View</Link>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    <div className='w-full xl:hidden block'>
                                        <div className="xl:grid-cols-4 grid-cols-2 gap-[20px] border-b border-gray-300 py-4">
                                            {state?.map((bond, index) => (
                                                <div key={index} className="grid xl:grid-cols-4 grid-cols-2 gap-[20px] border-b border-gray-300 py-4">
                                                    <div className="flex flex-col gap-[10px]">
                                                        <h1 className="text-[18px] font-semibold text-[#7E8183]">Name</h1>
                                                        <p className="text-[16px] font-semibold">{bond?.user_id?.username}</p>
                                                    </div>
                                                    <div className="flex flex-col gap-[10px]">
                                                        <h1 className="text-[18px] font-semibold text-[#7E8183]">Email</h1>
                                                        <p className="text-[16px] font-semibold">{bond?.user_id?.email}</p>
                                                    </div>
                                                    <div className="flex flex-col gap-[10px]">
                                                        <h1 className="text-[18px] font-semibold text-[#7E8183]">Location</h1>
                                                        <p className="text-[16px] font-semibold">{bond?.user_id?.location ? bond?.user_id?.location : 'Location not registered'}</p>
                                                    </div>
                                                    <div className="flex flex-col gap-[10px]">
                                                        <h1 className="text-[18px] font-semibold text-[#7E8183]">Joined On</h1>
                                                        <p className="text-[16px] font-semibold"> {bond?.user_id?.createdAt
                                                            ? new Date(bond.user_id.createdAt).toLocaleDateString('en-US', {
                                                                month: 'long',
                                                                day: 'numeric',
                                                                year: 'numeric',
                                                            })
                                                            : 'N/A'}</p>
                                                    </div>
                                                    <div className="flex flex-col gap-[10px]">
                                                        <p className="text-[16px] text-[#1DBF73] underline font-semibold">
                                                            <Link to={`/profile?id=${bond?._id}`}>View</Link>
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </>}
                        </> : <div className="flex justify-center items-center text-center">
                            <p>No Record Found</p>
                        </div>}

                    </div>

                </>}
                <HomeFooter />
            </div>
        </>
    );
}
