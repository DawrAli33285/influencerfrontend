import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import HomeFooter from "../components/homefooter";
import HomeHeader from "../components/homeheader";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { MoonLoader } from "react-spinners";
import { useLocation, useNavigate } from "react-router-dom";
import { BASE_URL } from "../baseURL";
import { HeaderComponent } from "../components/header/header.component";
import { FooterComponent } from "../components/footer/footer.component";

export default function Search() {
    const [loading, setLoading] = useState(true)
    const [filter, setFilter] = useState("")
    const [search,setSearch]=useState("")
    const [originalState, setOriginalState] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 7;
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
            setSearch(search)
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
    const totalPages = Math.ceil(state?.length / rowsPerPage);
    const currentRows = state?.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );


    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrev = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <>
            <ToastContainer containerId={"searchToast"} />

            <div className="w-full h-[700px] ">
                <HeaderComponent/>
                {loading ? <div className="w-full h-full flex justify-center items-center">

                    <MoonLoader color="#6B33E3" size={100} />
                </div> : <>


                    <div className="flex flex-col bg-[#0000000D] lg:gap-[60px] lg:px-[3rem] lg:py-[40px] px-[2rem] py-[40px]">
                        <div >
                            <h2 className="lg:text-[2rem] text-[1.5rem] font-bold">“{search?.length>0?search:"All "+filter+'s'}” Searched</h2>
                            <p className="lg:text-[0.94rem] text-[0.75rem] lg:mb-0 mb-[25px]">Total {state?.length} Results</p>
                        </div>
                        {/* <svg onClick={() => {
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
                        </div> */}
                        {state?.length > 0 ? <>
                            {filter === "bond" ? <>
                                <div className="lg:p-[30px] lg:bg-white">
                                    <table className="min-w-full xl:table hidden table-auto bg-white pb-[30px]  rounded-[20px]  border-collapse">

                                        <thead>
                                            <tr className="bg-[#FDFBFD]">
                                                <th className="p-[10px] bg-[#1DBF7314]  text-[1.07rem] font-medium lg:px-[30px] lg:py-[30px] text-left border-b border-gray-300">Issuer</th>
                                                <th className="p-[10px] bg-[#1DBF7314] text-[1.07rem] font-medium text-left border-b lg:py-[30px] border-gray-30">Bond Title</th>
                                                <th className="p-[10px] bg-[#1DBF7314] text-[1.07rem] font-medium text-left border-b lg:py-[30px] border-gray-300">Mission</th>
                                                <th className="p-[10px] bg-[#1DBF7314] text-[1.07rem] font-medium text-left border-b lg:py-[30px] border-gray-300">Price</th>
                                                <th className="p-[10px] bg-[#1DBF7314] text-[1.07rem] font-medium text-left border-b lg:py-[30px] border-gray-300">Validity</th>
                                                <th className="p-[10px] bg-[#1DBF7314] text-[1.07rem] font-medium lg:pr-[30px] text-left lg:py-[30px] border-b border-gray-300">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {currentRows?.map((bond, index) => (
                                                <tr key={index}>
                                                    <td className="p-[10px] lg:pl-[30px] text-[0.94rem] border-b border-b-[#E9E9E9]  font-normal pt-[30px]  ">{bond?.issuer_id?.user_id?.username}</td>
                                                    <td className="p-[10px] text-[0.94rem] font-normal  border-b border-b-[#E9E9E9] pt-[30px]  ">{bond?.title}</td>
                                                    <td className="p-[10px] text-[0.94rem] font-normal border-b border-b-[#E9E9E9]  pt-[30px] ">{bond?.missions[0]?.mission_title
                                                    }</td>
                                                    <td className="p-[10px] text-[0.94rem] font-normal border-b border-b-[#E9E9E9]  pt-[30px]  text-[#1DBF73]">{'$' + bond?.bond_issuerance_amount}</td>
                                                    <td className="p-[10px] text-[0.94rem] font-normal border-b border-b-[#E9E9E9]  pt-[30px]  ">{bond.validity_number + ' months'}</td>
                                                    <td className={` text-[0.94rem] font-normal border-b border-b-[#E9E9E9] flex items-center  justify-center  py-[10px]  lg:pr-[30px]`}>
                                                        <Link to={`/promisebonddetail/${bond._id}`} className="flex bg-[#FFEDE8] p-[20px] items-center gap-[6px]"> <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <g clip-path="url(#clip0_220_908)">
                                                                <path d="M3.0503 15.3332H4.8658C5.15097 15.3332 5.3823 15.1183 5.3823 14.8332C5.3823 14.548 5.15114 14.3332 4.8658 14.3332H3.0503C2.28597 14.3332 1.66797 13.6548 1.66797 12.8613V5.49984H14.168V7.38017C14.168 7.66534 14.4661 7.89667 14.7513 7.89667C15.0365 7.89667 15.3346 7.6655 15.3346 7.38017V3.14884C15.3346 1.80334 14.0701 0.666504 12.739 0.666504H3.0503C1.71647 0.666504 0.667969 1.78 0.667969 3.14884V12.8613C0.667969 14.2243 1.71647 15.3332 3.0503 15.3332ZM1.66797 3.14884C1.66797 2.36317 2.29897 1.6665 3.0503 1.6665H12.739C13.5101 1.6665 14.168 2.36317 14.168 3.14884V4.49984H1.66797V3.14884Z" fill="#1F4B3F" />
                                                                <path d="M12.4066 2.6665H12.2001C11.9149 2.6665 11.6836 2.96467 11.6836 3.24984C11.6836 3.535 11.9148 3.83317 12.2001 3.83317H12.4066C12.6918 3.83317 12.9231 3.535 12.9231 3.24984C12.9231 2.96467 12.6918 2.6665 12.4066 2.6665Z" fill="#1F4B3F" />
                                                                <path d="M10.6488 2.6665H10.4423C10.1571 2.6665 9.92578 2.96467 9.92578 3.24984C9.92578 3.535 10.1569 3.83317 10.4423 3.83317H10.6488C10.9339 3.83317 11.1653 3.535 11.1653 3.24984C11.1653 2.96467 10.9339 2.6665 10.6488 2.6665Z" fill="#1F4B3F" />
                                                                <path d="M8.78941 2.6665H8.58291C8.29774 2.6665 8.06641 2.96467 8.06641 3.24984C8.06641 3.535 8.29757 3.83317 8.58291 3.83317H8.78941C9.07457 3.83317 9.30591 3.535 9.30591 3.24984C9.30591 2.96467 9.07457 2.6665 8.78941 2.6665Z" fill="#1F4B3F" />
                                                                <path d="M10.1662 7.85547C7.9015 7.85547 5.83333 9.27764 5 11.3945C5 11.3945 6.08417 15.3868 10.1662 15.2998C14.4792 15.208 15.3333 11.3945 15.3333 11.3945C14.5 9.27764 12.4315 7.85547 10.1662 7.85547ZM10.203 14.267C8.43067 14.267 6.812 13.1941 6.11367 11.5776C6.81183 9.96114 8.43067 8.8883 10.203 8.8883C11.9758 8.8883 13.5948 9.96114 14.2932 11.5776C13.595 13.1941 11.9758 14.267 10.203 14.267Z" fill="#1F4B3F" />
                                                                <path d="M10.2032 9.57422C9.09822 9.57422 8.19922 10.4731 8.19922 11.5781C8.19922 12.6831 9.09822 13.5819 10.2032 13.5819C11.3082 13.5819 12.2071 12.6831 12.2071 11.5781C12.2071 10.4731 11.3082 9.57422 10.2032 9.57422ZM10.2032 12.5491C9.66772 12.5491 9.23205 12.1134 9.23205 11.5781C9.23205 11.0427 9.66772 10.6071 10.2032 10.6071C10.7387 10.6071 11.1742 11.0427 11.1742 11.5781C11.1742 12.1134 10.7387 12.5491 10.2032 12.5491Z" fill="#1F4B3F" />
                                                            </g>
                                                            <defs>
                                                                <clipPath id="clip0_220_908">
                                                                    <rect width="16" height="16" fill="white" />
                                                                </clipPath>
                                                            </defs>
                                                        </svg>
                                                            View
                                                        </Link>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    <div className='w-full  xl:hidden block'>
                                        <div className="flex bg-[#f2f2f2] flex-col gap-[20px]">
                                            {currentRows?.map((bond, index) => (
                                                <div key={index} className="p-[20px] bg-white flex flex-col gap-[20px] border-b border-gray-300 py-4">

                                                    <div className="flex flex-col gap-[10px]">
                                                        <div className="flex flex-col gap-[10px]">
                                                            <p className="text-[14px] font-semibold">{bond?.title}</p>
                                                        </div>
                                                        <div className="flex flex-col gap-[10px]">
                                                            <p className="text-[0.75rem] ">{bond?.missions[0]?.mission_title}</p>
                                                        </div>

                                                        <div className="flex items-center  gap-[10px]">
                                                            <h1 className="text-[0.75rem] ">Validity:</h1>
                                                            <p className="text-[0.75rem] ">{bond.validity_number + ' months'}</p>
                                                        </div>
                                                        <div className="w-full h-[1px] bg-[#00000014]"></div>
                                                    </div>
                                                    <div className="flex justify-between items-center">
                                                        <div className="flex gap-[10px]">

                                                            <p className="text-[0.75rem] text-[#1DBF73] ">{'$' + bond?.bond_issuerance_amount}/bond</p>
                                                        </div>
                                                        <div className="flex flex-col gap-[10px]">
                                                            <p className="text-[0.75rem]  font-semibold">
                                                                <Link to={`/promisebonddetail/${bond._id}`} className="flex bg-[#FFEDE8] p-[20px] items-center gap-[6px]"> <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <g clip-path="url(#clip0_220_908)">
                                                                        <path d="M3.0503 15.3332H4.8658C5.15097 15.3332 5.3823 15.1183 5.3823 14.8332C5.3823 14.548 5.15114 14.3332 4.8658 14.3332H3.0503C2.28597 14.3332 1.66797 13.6548 1.66797 12.8613V5.49984H14.168V7.38017C14.168 7.66534 14.4661 7.89667 14.7513 7.89667C15.0365 7.89667 15.3346 7.6655 15.3346 7.38017V3.14884C15.3346 1.80334 14.0701 0.666504 12.739 0.666504H3.0503C1.71647 0.666504 0.667969 1.78 0.667969 3.14884V12.8613C0.667969 14.2243 1.71647 15.3332 3.0503 15.3332ZM1.66797 3.14884C1.66797 2.36317 2.29897 1.6665 3.0503 1.6665H12.739C13.5101 1.6665 14.168 2.36317 14.168 3.14884V4.49984H1.66797V3.14884Z" fill="#1F4B3F" />
                                                                        <path d="M12.4066 2.6665H12.2001C11.9149 2.6665 11.6836 2.96467 11.6836 3.24984C11.6836 3.535 11.9148 3.83317 12.2001 3.83317H12.4066C12.6918 3.83317 12.9231 3.535 12.9231 3.24984C12.9231 2.96467 12.6918 2.6665 12.4066 2.6665Z" fill="#1F4B3F" />
                                                                        <path d="M10.6488 2.6665H10.4423C10.1571 2.6665 9.92578 2.96467 9.92578 3.24984C9.92578 3.535 10.1569 3.83317 10.4423 3.83317H10.6488C10.9339 3.83317 11.1653 3.535 11.1653 3.24984C11.1653 2.96467 10.9339 2.6665 10.6488 2.6665Z" fill="#1F4B3F" />
                                                                        <path d="M8.78941 2.6665H8.58291C8.29774 2.6665 8.06641 2.96467 8.06641 3.24984C8.06641 3.535 8.29757 3.83317 8.58291 3.83317H8.78941C9.07457 3.83317 9.30591 3.535 9.30591 3.24984C9.30591 2.96467 9.07457 2.6665 8.78941 2.6665Z" fill="#1F4B3F" />
                                                                        <path d="M10.1662 7.85547C7.9015 7.85547 5.83333 9.27764 5 11.3945C5 11.3945 6.08417 15.3868 10.1662 15.2998C14.4792 15.208 15.3333 11.3945 15.3333 11.3945C14.5 9.27764 12.4315 7.85547 10.1662 7.85547ZM10.203 14.267C8.43067 14.267 6.812 13.1941 6.11367 11.5776C6.81183 9.96114 8.43067 8.8883 10.203 8.8883C11.9758 8.8883 13.5948 9.96114 14.2932 11.5776C13.595 13.1941 11.9758 14.267 10.203 14.267Z" fill="#1F4B3F" />
                                                                        <path d="M10.2032 9.57422C9.09822 9.57422 8.19922 10.4731 8.19922 11.5781C8.19922 12.6831 9.09822 13.5819 10.2032 13.5819C11.3082 13.5819 12.2071 12.6831 12.2071 11.5781C12.2071 10.4731 11.3082 9.57422 10.2032 9.57422ZM10.2032 12.5491C9.66772 12.5491 9.23205 12.1134 9.23205 11.5781C9.23205 11.0427 9.66772 10.6071 10.2032 10.6071C10.7387 10.6071 11.1742 11.0427 11.1742 11.5781C11.1742 12.1134 10.7387 12.5491 10.2032 12.5491Z" fill="#1F4B3F" />
                                                                    </g>
                                                                    <defs>
                                                                        <clipPath id="clip0_220_908">
                                                                            <rect width="16" height="16" fill="white" />
                                                                        </clipPath>
                                                                    </defs>
                                                                </svg>
                                                                    View
                                                                </Link>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="flex justify-center items-center mt-5 gap-2">

                                        <button
                                            onClick={handlePrev}
                                            disabled={currentPage === 1}
                                            className={`p-2 border border-[#E9E9E9] rounded-full ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
                                                }`}
                                        >
                                            <svg
                                                width="9"
                                                height="15"
                                                viewBox="0 0 9 15"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M0.820556 8.00232L7.18034 14.3445C7.38871 14.5522 7.72607 14.5518 7.93409 14.3434C8.14195 14.1351 8.14141 13.7975 7.93301 13.5897L1.95178 7.62498L7.93323 1.6603C8.1416 1.45244 8.14214 1.11511 7.9343 0.906712C7.83003 0.802244 7.69341 0.75001 7.5568 0.75001C7.42053 0.75001 7.28446 0.801895 7.18037 0.905638L0.820556 7.24766C0.720197 7.34751 0.663881 7.4834 0.663881 7.62498C0.663881 7.76656 0.720358 7.90229 0.820556 8.00232Z"
                                                    fill="#222222"
                                                />
                                            </svg>
                                        </button>


                                        {Array.from({ length: totalPages }, (_, i) => (
                                            <button
                                                key={i}
                                                onClick={() => setCurrentPage(i + 1)}
                                                className={`px-3 py-1 rounded-full ${currentPage === i + 1
                                                    ? "bg-[#1DBF73] text-white"
                                                    : "border border-[#E9E9E9] bg-white"
                                                    }`}
                                            >
                                                {i + 1}
                                            </button>
                                        ))}


                                        <button
                                            onClick={handleNext}
                                            disabled={currentPage === totalPages}
                                            className={`p-2 border border-[#E9E9E9] rounded-full ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
                                                }`}
                                        >
                                            <svg
                                                width="9"
                                                height="15"
                                                viewBox="0 0 9 15"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M8.17944 7.24768L1.81966 0.90549C1.61129 0.697817 1.27393 0.698166 1.06591 0.906564C0.858051 1.11493 0.858588 1.45248 1.06699 1.66031L7.04822 7.62502L1.06677 13.5897C0.8584 13.7976 0.857863 14.1349 1.0657 14.3433C1.16998 14.4478 1.30659 14.5 1.4432 14.5C1.57947 14.5 1.71554 14.4481 1.81963 14.3444L8.17944 8.00234C8.2798 7.90249 8.33612 7.7666 8.33612 7.62502C8.33612 7.48344 8.27964 7.34771 8.17944 7.24768Z"
                                                    fill="#222222"
                                                />
                                            </svg>
                                        </button>
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
                        </> : <div  className="flex justify-center items-center text-center w-full h-[300px] ">
                            <p>No Record Found</p>
                        </div>}

                    </div>

                </>}
                <FooterComponent/>
            </div>
        </>
    );
}
