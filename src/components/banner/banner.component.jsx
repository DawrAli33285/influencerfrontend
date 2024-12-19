import React from 'react'
import { popular_searches } from "./json-data"
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Dropdown from 'react-dropdown';

export const BannerComponent = () => {
  const base_path_image = "/assets/images"
  const base_path_icon = "/assets/images/icons"
const navigate=useNavigate();
const [state,setState]=useState({
  filter:'bond',
  search:''
})
const options = ['Promise Bond', 'Issuer'];
  return (
    <section className='relative banner'>
      <div className='md:h-[700px]'>
        <img src={`${base_path_image}/slider-img.png`} alt="banner" className='max-h-full w-full lg:block hidden' />
        <img src={`${base_path_image}/sm-slider.png`} alt="banner" className='max-h-full w-full lg:hidden block md:h-auto h-[700px]' />
      </div>
      <div className='container absolute z-10 mx-auto top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 '>
        <div className='max-w-[860px]'>
          <h1 className='lg:text-[45px] text-[41px] lg:text-start font-bold text-white text-center sm:pr-[50px]'>
            Empowering Influencers with Promise Bonds, Get the support you need, when you need it.
          </h1>
          <div className='sm:pr-[70px] sm:pt-4 pt-8'>
            <div className='flex sm:flex-row flex-col items-center bg-white sm:rounded-full rounded-[5px] sm:h-20 sm:px-2 px-4 py-3 gap-x-3 text-base text-primary-dark'>
              <div className='flex items-center min-w-[300px] w-1/2 pl-3 gap-x-3 py-3'>
                <img src={`${base_path_icon}/search.png`} alt="search" />
                <input value={state.search} onChange={(e)=>{
                  setState({
                    ...state,
                    search:e.target.value
                  })
                }} type="text" placeholder='Search here' className='flex-1 focus:outline-0 placeholder:text-primary-dark' />
              </div>
              <div className='flex-1 w-full flex sm:flex-row flex-col items-center sm:justify-between justify-start sm:mt-0 mt-3'>
                <div className='flex-1 flex items-center gap-x-7 w-full sm:flex-row flex-col '>
                  <span className='sm:h-10 sm:w-[1px] w-full h-[1px] block bg-primary-gray-300'></span>
                  <div className="sm:py-0 py-5 w-full">
                  <Dropdown 
  options={options} 
  value={options[0]} 
  onChange={(option) => {
    if (option.label === "Promise Bond") {
      setState({
        ...state,
        filter: "bond"
      });
    } else {
      setState({
        ...state,
        filter: "issuer"
      });
    }
  }} 
  placeholder="Select an option" 
  className="w-full"
/>

    </div>
                </div>
                <button onClick={()=>{
                  navigate(`search?filter=${state.filter}&search=${state?.search}`)
                }} className='bg-primary-dark text-white text-base font-bold block text-center rounded-full sm:w-[122px] w-full py-4'>Search</button>
              </div>
            </div>
          </div>
          <div className='text-base text-white pt-8'>Popular Searches</div>
          <ul className='flex items-center sm:gap-3 gap-2 pt-3 sm:flex-nowrap flex-wrap'>
            {
              popular_searches.map((search) => {
                return (
                  <li key={search.label}>
                    <button className='text-base text-white rounded-full bg-[#ffffff33] sm:px-6 px-3 py-1'>{search.label}</button>
                  </li>
                )
              })
            }
          </ul>
        </div>
      </div>
    </section>
  )
}
