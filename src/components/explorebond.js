import { Link } from "react-router-dom";
import exploreone from "../explore1.png";
import exploretwo from "../explore2.png";
import explorethree from "../explore3.png";
import { MoonLoader } from 'react-spinners';
import explorefour from "../explore4.png";
import { BASE_URL } from "../baseURL";
import { useState } from "react";
export default function ExploreBond({ state, setState, loading }) {
    const [selectedIssuer, setSelectedIssuer] = useState("default");

    const issuers = state.bonds.map((val,i)=>{
        return val.title
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


    const filterBonds = () => {
        return state.bonds.filter((bond) => {
            const matchesIssuer =
                selectedIssuer === "default" || bond.title === selectedIssuer;
    
            const matchesPriceRange = selectedPriceRange === "default" || (() => {
                const bondAmount = bond.bond_issuerance_amount;
                const [min, max] = selectedPriceRange.split("-").map(Number);
                if (!max) return bondAmount >= min; // For ranges like "1000+"
                return bondAmount >= min && bondAmount <= max;
            })();
    
            return matchesIssuer && matchesPriceRange;
        });
    };
    
    const filteredBonds = filterBonds();


    return (
        <div className="w-full flex flex-col gap-[40px] px-[20px] py-[40px] xl:px-[40px]">
            <div className="flex lg:flex-row flex-col justify-between">
              <div className="flex flex-col gap-3">
              <p className="font-bold xl:text-[1.5rem] text-[1.3rem]">
                    Explore Trending <span className="font-normal text-[#1DBF73] italic">Promise Bonds.</span>
                </p>
                <p>Most viewed and all-time top-selling services</p>
              </div>
                
            </div>
            
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[10px]">
                {loading ? <div className='flex'>
                    <MoonLoader color="#6B33E3" size={100} />
                </div> : filteredBonds?.length == 0 ? <div className='flex justify-center items-center'>
                    <p>No result found</p>
                </div> : filteredBonds?.map((bond, i) => {
                    const hasYouTube = bond?.social_media_links?.some((link) =>
                        link.includes("youtube")
                    );
                    const hasTikTok = bond?.social_media_links?.some((link) =>
                        link.includes("tiktok")
                    );

                    return <>
                        <div key={bond?._id} className="bg-white relative h-[400px] border-[#E9E9E9] border rounded-[20px]  flex flex-col gap-[20px] rounded-tl-[20px] rounded-tr-[20px]">
                            <img
                                src={bond?.photos[0]?.replace('http://localhost:5000', BASE_URL) || `${BASE_URL}/defaultImage.webp`}
                                alt="cardimg"
                                className="rounded-tl-[20px] rounded-tr-[20px] h-[250px] w-full object-cover"
                            />
                            <div className="w-[40px] bg-white flex justify-center items-center cursor-pointer rounded-full absolute top-[10px] right-[10px] h-[40px]">
                                <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5.73302 10.388C5.80352 10.46 5.89952 10.5 6.00002 10.5C6.10052 10.5 6.19652 10.46 6.26702 10.388L11.064 5.5275C12.3095 4.266 12.3095 2.2125 11.064 0.9505C10.459 0.3375 9.65452 0 8.79802 0C7.94152 0 7.13752 0.3375 6.53252 0.95L6.00002 1.49L5.46752 0.9505C4.86252 0.3375 4.05802 0 3.20202 0C2.34552 0 1.54102 0.3375 0.936017 0.9505C-0.309483 2.2125 -0.309483 4.266 0.936017 5.527L5.73302 10.388ZM1.46952 1.477C1.93252 1.0085 2.54802 0.75 3.20152 0.75C3.85552 0.75 4.47052 1.0085 4.93302 1.4775L5.73252 2.2875C5.87302 2.43 6.12552 2.43 6.26602 2.2875L7.06552 1.477C7.52952 1.0085 8.14452 0.75 8.79802 0.75C9.45202 0.75 10.067 1.0085 10.53 1.477C11.4885 2.4485 11.4885 4.029 10.53 5.001L6.00002 9.5915L1.46952 5.0005C0.511017 4.0295 0.511017 2.4485 1.46952 1.477Z" fill="#051036" />
                                </svg>

                            </div>
                            <p className="text-[1rem] px-[20px] text-[#74767E]">{bond?.title}</p>
                            <p className="text-[1rem] px-[20px] font-bold">{bond?.missions[0]?.description?.length>40?bond?.missions[0]?.description.slice(0,37)+'...':bond?.missions[0]?.description}</p>
                            <div className="w-full px-[20px] h-[1px] bg-[#E9E9E9]"></div>

                            <div className="flex px-[20px] pb-[20px] justify-between">
                                <div className="flex gap-[10px] font-bold">
                                    <img src="https://png.pngitem.com/pimgs/s/22-223925_female-avatar-female-avatar-no-face-hd-png.png" alt="avatar" className="w-[24px] h-[24px] rounded-full" />
                                    {bond?.issuer_id?.user_id?.username}
                                </div>
                                <span className="text-[1rem] font-bold"><span className="text-[#74767E] font-normal text-[.8rem] pr-[2px]">Starting at:</span>${bond?.bond_issuerance_amount}</span>
                            </div>


                        </div>




                    </>
                })}

            </div>
            <Link to={`/search?filter=bond&search=`} className="text-[#1DBF73] border-[#1DBF73] bg-[#1dbf7327] border rounded-[8px] w-fit px-[20px] py-[10px] mx-auto font-bold xl:text-[1rem] text-[.9rem]">View All Promise Bond</Link>

        </div>
    )
}