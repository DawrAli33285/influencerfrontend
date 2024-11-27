import banner from "../banner.png"
import { useNavigate } from "react-router-dom";
import {useState} from 'react'
export default function Banner() {
    const [state,setState]=useState({
        filter:'bond',
        search:''
    })
    const navigate=useNavigate();
    return (
        <div className="w-full flex justify-between xl:flex-row py-[40px] px-[20px] flex-col-reverse">
            <div className="flex flex-col gap-[10px] xl:w-[50%] xl:px-[20px] w-full justify-center">
                <h2 className="font-bold xl:text-[2.2rem] text-[1.6rem]">
                    Empowering Influencers with <span className="font-normal text-[#1DBF73]">Promise Bonds.</span> Get the support you need, when you need it.
                </h2>
                <div className="flex gap-[10px] xl:flex-row flex-col w-full mt-[20px]">
                    <div className="w-full xl:w-[70%] bg-[#F6F6F6] rounded-[20px] px-[20px] py-[20px] flex items-center">
                        <input 
                        value={state.search}
                        onChange={(e)=>{
                            setState({
                                ...state,
                                search:e.target.value
                            })
                        }}
                            type="text" 
                            placeholder="Search here..." 
                            className="outline-none border-none bg-transparent w-[70%]" 
                        />
                        <span className="mx-[10px] text-[#000]">|</span>
                        <div className="relative w-[30%] flex items-center">
                            <select 
                            value={state.filter}
                            onChange={(e)=>{
                                setState({
                                    ...state,
                                    filter:e.target.value
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
                    <button onClick={(e)=>{
                        navigate(`/search?filter=${state?.filter}&search=${state?.search}`)
                    }} class="bg-[#1DBF73] px-[20px] py-[10px] xl:text-[1.4rem] text-[1.2rem] text-white font-bold rounded-[1.4rem] xl:w-[30%]">
                        Search
                    </button>
                </div>
            </div>
            <div className="xl:w-[50%] w-full ">
                <img src={banner} alt="img" className="w-full h-full"/>
            </div>
        </div>
    );
}
