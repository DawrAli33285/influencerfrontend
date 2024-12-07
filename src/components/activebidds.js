import { Link } from "react-router-dom";
import img from "../girl.png";
import scnd from "../girl2.png"
import third from "../boy.png"
import { BASE_URL } from "../baseURL";
import { MoonLoader } from "react-spinners";
export default function ActiveBids({ state, loading }) {
    return (
        <div className="w-full flex flex-col gap-[40px] px-[20px] py-[40px] xl:px-[40px]">
            {loading ? <div className='flex flex-col'>
                <p className="font-bold xl:text-[2.38rem] text-[1.50rem]">
                    <span className="text-[32px] text-[#1DBF73]">Active Bids </span>
                    in the Marketplace.
                </p>
                <div className="flex justify-between">
                    <p className="font-bold xl:text-[1.5rem] text-[1.3rem]">


                    </p>
                    <Link to="/search?filter=bond&search=" className="text-[#1DBF73] font-bold lg:text-[0.94rem] text-[0.75rem]">Explore The Market</Link>
                </div>
                <MoonLoader color="#6B33E3" size={100} />
            </div> : <>
                <div className="flex items-center gap-[10px] flex-col">
                    <p className="font-bold xl:text-[32px] text-[32px]">
                        <span className="font-normal text-[#1DBF73]">Active Bids </span>
                        in the Marketplace.
                    </p>
                    <p className="lg:text-[0.94rem] text-[0.75rem] text-center lg:w-[70%] mx-auto">Discover the trusted issuers that power our platform, offering unmatched reliability and experties.Explore their unique features and benefits to find the perfect fit for your need</p>

                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[40px]">
                    {state?.market?.length > 0 ? state?.market?.map((val, i) => {
                        return <div className="bg-white  w-[342px]  flex flex-col gap-[20px] rounded-[20px] relative">
                            <img src={val?.photos[0]
                                ? val.photos[0].replace('http://localhost:5000', BASE_URL)
                                : img} alt="cardimg"  className="rounded-[10px] w-[342px] h-[489px] object-cover" />
                            <div className="absolute bg-[#0000003d] p-[20px] w-full h-full flex flex-col gap-[5px] rounded-[20px] justify-end">
                                <p className="text-white lg:text-[1.25rem] text-[1rem] font-bold">{val?.issuer_id?.user_id?.username}</p>
                                <p className="lg:text-[0.94rem] text-[0.75rem]  text-[#FFFFFFBF]">{val?.missions?.length > 0 ? val?.missions[0]?.description?.slice(0,50)+'...' : `No mission`}</p>
                                <span className="lg:text-[1.25rem] text-[1rem] font-bold  text-white">${val?.bond_issuerance_amount}</span>
                            </div>
                        </div>
                    }) : <div className="flex w-full justify-center items-center text-center">
                        <p>No Record Found</p>
                    </div>}

                </div>
                <Link to="/search?filter=bond&search=" className="text-[#1DBF73] border-[#1DBF73] bg-[#1dbf7327] border rounded-[8px] w-fit px-[20px] py-[10px] mx-auto font-bold lg:text-[0.94rem] text-[0.75rem]">Explore The Market</Link>

            </>}

        </div>
    )
}