import { Link } from "react-router-dom";
import img from "../explore4.png";
import scnd from "../imagerst.png"

import 'swiper/css';
import 'swiper/css/navigation';

import { MoonLoader } from 'react-spinners';
import third from "../signuppage.jpeg"
import { BASE_URL } from "../baseURL";
import { Navigation } from 'swiper/modules';
import { useState } from "react";
export default function TopIssuers({ loading, state, setState }) {
    const [selectedIssuer, setSelectedIssuer] = useState("default");

    const issuers = state.issuers.map((val, i) => {
        return val.user_id.username
    })


    const handleIssuerChange = (event) => {
        setSelectedIssuer(event.target.value);
        console.log("Selected Issuer:", event.target.value);
    };
    const [selectedPriceRange, setSelectedPriceRange] = useState("default")
    const priceRanges = [
        { label: "Below $50", value: "0-50" },
        { label: "$50 - $100", value: "50-100" },
        { label: "$100 - $500", value: "100-500" },
        { label: "$500 - $1000", value: "500-1000" },
        { label: "Above $1000", value: "1000+" }
    ];
    const handlePriceRangeChange = (e) => {
        setSelectedPriceRange(e.target.value);

    };
    const filterIssuers = () => {
        return state.issuers.filter((issuer) => {
            // Filter by issuer name
            const matchesIssuer =
                selectedIssuer === "default" ||
                issuer.user_id.username === selectedIssuer;

            // Filter by price range
            const matchesPriceRange =
                selectedPriceRange === "default" ||
                (() => {
                    const [min, max] = selectedPriceRange.split("-").map(Number);
                    const issuerBondAmount = issuer.bonds[0]?.bond_issuerance_amount || 0; // Default to 0 if no bonds
                    return max
                        ? issuerBondAmount >= min && issuerBondAmount <= max
                        : issuerBondAmount >= min;
                })();

            return matchesIssuer && matchesPriceRange;
        });
    };

    const filteredIssuers = filterIssuers();

    return (
        <div className="w-full flex flex-col gap-[45px] px-[20px] py-[40px] xl:px-[40px]">
            <div className="flex justify-between items-center">
                <div className="flex  flex-col">
                    <p className="font-bold xl:text-[2.38rem] text-[1.50rem]">
                        Meet Our  <span className=" text-[#1DBF73]">Top Issuers.</span>
                    </p>
                    <p className="lg:text-[0.94rem] text-[0.75rem] ">Get some Inspirations from 1800+ skills</p>

                </div>
                <div className="lg:block hidden">
                    <Link to="/search?filter=issuer&search=" className="bg-white border border-black px-[20px] py-[10px] xl:py-[11px] lg:text-[0.94rem] text-[0.75rem] flex gap-[12px] items-center text-black font-bold rounded-[3.75rem] w-fit  lg:mx-0 mx-auto">
                        View All Issuers
                        <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15.5553 0.101562H5.77756C5.53189 0.101562 5.3331 0.300354 5.3331 0.546021C5.3331 0.791687 5.53189 0.990479 5.77756 0.990479H14.4824L0.129975 15.3429C-0.0436504 15.5165 -0.0436504 15.7978 0.129975 15.9714C0.216766 16.0581 0.330516 16.1016 0.444225 16.1016C0.557933 16.1016 0.671641 16.0581 0.758475 15.9714L15.1109 1.61894V10.3238C15.1109 10.5695 15.3097 10.7683 15.5553 10.7683C15.801 10.7683 15.9998 10.5695 15.9998 10.3238V0.546021C15.9998 0.300354 15.801 0.101562 15.5553 0.101562Z" fill="black" />
                        </svg>

                    </Link>
                </div>
            </div>
            <div>
                {loading ? (
                    <div className="flex justify-center items-center">
                        <MoonLoader color="#6B33E3" size={100} />
                    </div>
                ) : !filteredIssuers?.length > 0 ? (
                    <div className="flex justify-center items-center">
                        <p>No record found</p>
                    </div>
                ) : (
                    <div className="relative grid xl:grid-cols-4 gap-[10px] lg:grid-cols-3 grid-cols-1">

                        {filteredIssuers?.map((val) => (

                            <div key={val?._id} className="p-2">
                                <div className="bg-[#00D5FF12] flex flex-col gap-[20px] h-[405px]  rounded-[20px] relative">
                         <div className="w-full flex justify-center items-center">
                         <img
                                        src={
                                            val?.user_id?.avatar
                                                ? val.user_id.avatar.replace("http://localhost:5000", BASE_URL)
                                                : img
                                        }
                                        alt="cardimg"
                                        className="rounded-tl-[20px] items-center justify-center rounded-tr-[20px] w-full h-[250px] object-fill"

                                    />
                            </div>
                                    <div className="px-[30px] shadow-lg w-full h-full pb-[20px] flex flex-col gap-[10px] rounded-bl-[20px] rounded-br-[20px] lg:justify-end">
                                        <p className="text-black lg:text-[1.063rem] text-[1.063rem] font-semibold">{val?.user_id?.username}</p>
                                        <p className="lg:text-[0.88rem] text-[0.88rem] font-[400] text-[#74767E] overflow-hidden text-ellipsis whitespace-nowrap lg:whitespace-normal lg:line-clamp-2"
                                        >
                                            {val?.bonds[0]?.missions[0]?.task_type}
                                            Helping small businesses grow with my expertise in design.

                                        </p>
                                        <span className="lg:text-[1.13rem] text-[1.063rem] font-[500] text-base text-black">
                                            {val?.bonds?.length} Bonds Issued | Level 13
                                        </span>
                                    </div>
                                </div>
                            </div>

                        ))}


                    </div>
                )}
            </div>
            <div className="w-full mx-auto lg:hidden block">
                <Link to="/search?filter=issuer&search=" className="bg-white border border-black px-[20px] py-[10px] xl:py-[11px] lg:text-[0.94rem] text-[0.75rem] flex gap-[12px] items-center text-black font-bold rounded-[3.75rem] w-fit  lg:mx-0 mx-auto">
                    View All Issuers
                    <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.5553 0.101562H5.77756C5.53189 0.101562 5.3331 0.300354 5.3331 0.546021C5.3331 0.791687 5.53189 0.990479 5.77756 0.990479H14.4824L0.129975 15.3429C-0.0436504 15.5165 -0.0436504 15.7978 0.129975 15.9714C0.216766 16.0581 0.330516 16.1016 0.444225 16.1016C0.557933 16.1016 0.671641 16.0581 0.758475 15.9714L15.1109 1.61894V10.3238C15.1109 10.5695 15.3097 10.7683 15.5553 10.7683C15.801 10.7683 15.9998 10.5695 15.9998 10.3238V0.546021C15.9998 0.300354 15.801 0.101562 15.5553 0.101562Z" fill="black" />
                    </svg>

                </Link>
            </div>

        </div>
    )
}