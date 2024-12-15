import banner from "../bannerbg.jpeg"
import { useNavigate } from "react-router-dom";
import { useState } from 'react'
export default function Banner() {
    const [state, setState] = useState({
        filter: 'bond',
        search: ''
    })
    const navigate = useNavigate();
    return (
        <div className="w-full  relative h-[860px] min-h-[500px]">
            <div className="relative w-full h-full sm:h-[500px] lg:h-full">
                <img src={banner} alt="img" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40"></div>
                <div className="absolute inset-0 flex lg:items-center justify-center text-white">

                </div>
            </div>


            <div className="top-0 left-0 flex lg:items-center bg-[#00000052] absolute lg:px-[6rem] px-[20px] py-[20px] w-full h-full">
                <div className="flex flex-col gap-[10px] lg:ml-[5rem] lg:w-[50%] lg:mt-0 mt-[5rem]">
                    <h2 className="font-bold xl:text-[2.1rem] lg:px-0 px-[45px]   text-center lg:text-start  text-[2rem] text-white">
                        Empowering Issuers with Promise Bonds. Get the support you need, when you need it.
                    </h2>
                    <div className="flex gap-[10px] lg:flex-row rounded-[6px] lg:rounded-[5rem] lg:py-[.63rem] lg:px-[.2rem] p-[20px] bg-[#F6F6F6] flex-col w-full mt-[20px]">
                        <div className="w-full xl:w-[90%] lg:w-[80%] gap-[10px]  lg:flex-row flex-col   py-[10px] flex items-center">
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
                                className="outline-none lg:ml-[28px] lg:text-[0.94rem] text-[0.63rem] lg:border-none bg-transparent w-full lg:border-b-0 border-b border-solid border-b-[#e5e7eb] lg:w-[60%]"
                            />
                            <span className="mx-[10px] text-[#000] lg:block hidden">|</span>
                            <div className="relative w-full lg:w-[40%] flex items-center">
                                <select
                                    value={state.filter}
                                    onChange={(e) => {
                                        setState({
                                            ...state,
                                            filter: e.target.value
                                        })
                                    }}
                                    className="appearance-none lg:text-[0.94rem] text-[0.63rem] outline-none border-none bg-transparent w-full cursor-pointer pr-[30px]">
                                    <option value="bond">Promise Bond</option>
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
                        }} class="bg-black xl:px-[20px] xl:py-[10px] py-[10px] xl:text-[0.94rem]   text-[0.63rem] text-white font-bold rounded-[3.75rem] xl:w-fit lg:w-[20%]">
                            Search
                        </button>
                    </div>
                </div>
            </div>

        </div>
    );
}
