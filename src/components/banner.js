import banner from "../bannerbg.jpg"
import { useNavigate } from "react-router-dom";
import { useState } from 'react'
export default function Banner() {
    const [state, setState] = useState({
        filter: 'bond',
        search: ''
    })
    const navigate = useNavigate();
    return (
        <div className="w-full  relative h-full min-h-[500px]">
<div className="relative w-full">
    <img src={banner} alt="img" className="w-full h-auto" />
    <div className="absolute inset-0 bg-black/40"></div> 
    <div className="absolute inset-0 flex items-center justify-center text-white">
      
    </div>
</div>

            <div className=" top-0 left-0 flex items-center bg-[#00000052] absolute lg:px-[6rem] px-[20px] py-[20px] w-full h-full">
                <div className="flex flex-col gap-[10px] lg:w-[50%]">
                    <h2 className="font-bold xl:text-[2.2rem] text-[1.6rem] text-white">
                        Empowering Influencers with <span className="font-bold text-[#1DBF73]">Promise Bonds.</span> Get the support you need, when you need it.
                    </h2>
                    <div className="flex gap-[10px] lg:flex-row rounded-[10px] py-[1rem] px-[1rem] bg-[#F6F6F6] flex-col w-full mt-[20px]">
                        <div className="w-full xl:w-[90%] lg:w-[80%]    py-[10px] flex items-center">
                            <input
                                value={state.search}
                                onChange={(e) => {
                                    setState({
                                        ...state,
                                        search: e.target.value
                                    })
                                }}
                                type="text"
                                placeholder="Search here..."
                                className="outline-none border-none bg-transparent w-[70%] lg:w-[60%]"
                            />
                            <span className="mx-[10px] text-[#000]">|</span>
                            <div className="relative w-[30%] lg:w-[40%] flex items-center">
                                <select
                                    value={state.filter}
                                    onChange={(e) => {
                                        setState({
                                            ...state,
                                            filter: e.target.value
                                        })
                                    }}
                                    className="appearance-none outline-none border-none bg-transparent w-full cursor-pointer pr-[30px]">
                                    <option value="bond">Sponsor bond</option>
                                    <option value="issuer">Issuer</option>

                                </select>
                                <svg
                                    className="absolute right-0 pointer-events-none"
                                    width="10"
                                    height="5"
                                    viewBox="0 0 10 5"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M5 5L0 0H10L5 5Z" fill="#404145" />
                                </svg>
                            </div>
                        </div>
                        <button onClick={(e) => {
                            navigate(`/search?filter=${state?.filter}&search=${state?.search}`)
                        }} class="bg-[#1DBF73] xl:px-[20px] xl:py-[10px] xl:text-[1rem] text-[.8rem] text-white font-bold rounded-[1rem] xl:w-fit lg:w-[20%]">
                            Search
                        </button>
                    </div>
                </div>
            </div>

        </div>
    );
}
