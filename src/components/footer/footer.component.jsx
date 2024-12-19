import React from 'react'
import { NavLink } from 'react-router-dom'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
export const FooterComponent = () => {
    const base_path_icon = "/assets/images/icons"
    const options = [
        'one', 'two', 'three'
    ];
    const defaultOption = options[0];
    return (
        <footer className='bg-primary-dark pt-14 pb-6 lg:mt-0 md:mt-5'>
            <div className='container mx-auto text-base pt-1'>
                <div className='flex justify-between lg:flex-row flex-col'>
                    <div className='max-w-[690px] flex-1 lg:pt-0 pt-6'>
                        <div className="flex flex-col gap-3">
                            <p className="text-white font-medium text-[17px] m-0">Subscribe</p>
                            <div className="w-full rounded-full flex justify-between bg-[#ffffff3b] px-5">
                                <input placeholder="Enter Your Email Address" className=" h-[70px] outline-none bg-transparent border-none lg:text-[0.94rem] text-[0.75rem] text-white w-[80%] placeholder:text-white" />
                                <button className="text-[#1dbf73] lg:text-[0.94rem] text-[0.75rem]">Send</button>
                            </div>
                        </div>
                        <div className='lg:pt-[84px] pt-6 flex justify-between lg:flex-none flex-wrap lg:gap-0 gap-y-6'>
                            <ul className=' leading-9 text-white lg:w-1/3 w-1/2'>
                                <li className='text-[17px] font-medium opacity-100'>Careers</li>
                                <li className=' opacity-50'>Press & News</li>
                                <li className=' opacity-50'>Partnerships</li>
                                <li className=' opacity-50'>Privacy Policy</li>
                                <li className=' opacity-50'>Terms of Service</li>
                                <li className=' opacity-50'>Investor Relations</li>
                            </ul>
                            <ul className=' leading-9 text-white'>
                                <li className='text-[17px] font-medium opacity-100'>Home</li>
                                <li className=' opacity-50'>How It Works</li>
                                <li className=' opacity-50'>Market</li>
                                <li className=' opacity-50'>Support</li>
                                <li className=' opacity-50'>Promise Bond</li>
                            </ul>
                            <ul className=' leading-9 text-white'>
                                <li className='text-[17px] font-medium opacity-100'>Help & Support</li>
                                <li className=' opacity-50'>Trust & Safety</li>
                                <li className=' opacity-50'>Selling on Freeio</li>
                                <li className=' opacity-50'>Buying on Freeio</li>
                            </ul>
                        </div>
                    </div>
                    <div className='max-w-[440px] flex-1 lg:order-1 -order-1'>
                        <div>
                            <img src={`${base_path_icon}/footer-logo.svg`} alt="logo" />
                            <div className='lg:pt-11 pt-6 flex justify-between'>
                                <div className='text-white leading-8'>
                                    <div className='opacity-50'>Toll Free Customer Care</div>
                                    <div className='fs-[17px]'>+(1) 123 456 7890</div>
                                </div>
                                <div className='text-white leading-8'>
                                    <div className='opacity-50'>Need live support?</div>
                                    <div className='fs-[17px]'>hi@promisebond.com</div>
                                </div>
                            </div>
                        </div>
                        <div className='lg:pt-[53px] pt-6'>
                            <p className="text-white font-medium text-[17px] m-0 pb-2">Apps</p>
                            <div className='flex gap-2'>
                                <NavLink className='flex justify-center items-center h-[60px] gap-2 rounded-full bg-white bg-opacity-10 w-[210px]'>
                                    <img src={`${base_path_icon}/apple.svg`} alt="" />
                                    <div className='text-white'>
                                        <div className='text-[13px] opacity-80'>Download on the</div>
                                        <div>Apple Store</div>
                                    </div>
                                </NavLink>
                                <NavLink className='flex justify-center items-center h-[60px] gap-2 rounded-full bg-white bg-opacity-10 w-[210px]'>
                                    <img src={`${base_path_icon}/google-play.svg`} alt="" />
                                    <div className='text-white'>
                                        <div className='text-[13px] opacity-80'>Get in on</div>
                                        <div>Google Play</div>
                                    </div>
                                </NavLink>
                            </div>
                        </div>
                        <div className='lg:pt-[60px] pt-6'>
                            <p className="text-white font-medium text-[17px] m-0 pb-2">Follow Us</p>
                            <ul className='flex items-center lg:gap-x-6 gap-x-2 pt-6'>
                                <li className='active active-media min-w-10 min-h-10 rounded-full bg-opacity-10 flex justify-center items-center'>
                                    <NavLink to='/'>
                                        <img src={`${base_path_icon}/facebook.svg`} alt="icon" />
                                    </NavLink>
                                </li>
                                <li className='min-w-10 min-h-10 rounded-full bg-opacity-10 flex justify-center items-center'>
                                    <NavLink to='/'>
                                        <img src={`${base_path_icon}/twitter.svg`} alt="icon" />
                                    </NavLink>
                                </li>
                                <li className='min-w-10 min-h-10 rounded-full bg-opacity-10 flex justify-center items-center'>
                                    <NavLink to='/'>
                                        <img src={`${base_path_icon}/instagram.svg`} alt="icon" />
                                    </NavLink>
                                </li>
                                <li className='min-w-10 min-h-10 rounded-full bg-opacity-10 flex justify-center items-center'>
                                    <NavLink to='/'>
                                        <img src={`${base_path_icon}/linkedin.svg`} alt="icon" />
                                    </NavLink>
                                </li>
                                <li className='min-w-10 min-h-10 rounded-full bg-opacity-10 flex justify-center items-center'>
                                    <NavLink to='/'>
                                        <img src={`${base_path_icon}/whatsapp.svg`} alt="icon" />
                                    </NavLink>
                                </li>
                                <li className='min-w-10 min-h-10 rounded-full bg-opacity-10 flex justify-center items-center'>
                                    <NavLink to='/'>
                                        <img src={`${base_path_icon}/you-tube.svg`} alt="icon" />
                                    </NavLink>
                                </li>
                                <li className='min-w-10 min-h-10 rounded-full bg-opacity-10 flex justify-center items-center'>
                                    <NavLink to='/'>
                                        <img src={`${base_path_icon}/tiktok.svg`} alt="icon" />
                                    </NavLink>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className='flex justify-between items-center border-0 lg:border-t lg:border-t-primary-gray-500 pt-4 lg:mt-[83px] mt-5 lg:flex-row flex-col'>
                    <div className='pt-4'>
                        <div className='text-white opacity-50 lg:text-left text-center'>Copyright © Promise Bond 2024 | All Rights Reserved</div>
                    </div>
                    {/* <div className='flex items-center lg:gap-x-10 gap-x-5 lg:order-1 -order-1 w-full lg:w-auto lg:border-b-0 border-b lg:pb-0 pb-4'>
                        <Dropdown options={options} value={defaultOption} placeholder="Issuer" className='lg:w-[150px] w-1/2' />
                        <Dropdown options={options} value={defaultOption} placeholder="Price Range" className='lg:w-[150px] w-1/2' />
                    </div> */}

                    <div className='flex items-center lg:gap-x-10 gap-x-5 lg:order-1 -order-1 w-full lg:w-auto lg:border-b-0 border-b lg:pb-0 pb-4'>
                        <div className="rounded px-2 flex-1 bg-[#ffffff25]">
                            <select className="min-w-[111px] min-h-[40px] text-white opacity-50 w-full bg-transparent focus:outline-none" name="currency">
                                <option value="US$ USD">US$ USD</option>
                            </select>
                        </div>
                        <div className="rounded px-2 flex-1 bg-[#ffffff25]">
                            <select className="min-w-[111px] min-h-[40px] w-full text-white opacity-50 focus:outline-none bg-transparent" name="language">
                                <option value="english">English</option>
                            </select>
                        </div>
                    </div>
                </div>

            </div>
        </footer>
    )
}
