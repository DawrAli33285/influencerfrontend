import React, { useEffect, useState } from 'react'
import { how_work, why_choose } from './json-data'
import { NavLink } from 'react-router-dom'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import axios from 'axios'
import { BASE_URL } from '../../baseURL';
import { ToastContainer, toast } from 'react-toastify'
import { MoonLoader } from 'react-spinners';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export const HomeComponent = () => {
  const base_path_icon = "/assets/images/icons"
  const base_path_image = "/assets/images"
  const options = [
    'one', 'two', 'three'
  ];
  const defaultOption = options[0];

  const [loading, setLoading] = useState(true)
  const [state, setState] = useState({
    bonds: [],
    issuers: []
  })
  useEffect(() => {
    getMainPageData();
  }, [])

  const getMainPageData = async () => {
    try {
      let response = await axios.get(`${BASE_URL}/getMainPageData`)
      console.log(response)
      setState({
        bonds: response.data.bonds,
        issuers: response.data.issuers,
        market: response.data.market
      })
      setLoading(false)
      console.log("RESPONSE")
      console.log(response.data)
    } catch (e) {
      if (e?.response?.data?.error) {
        toast.error(e?.response?.data?.error, { containerId: "mainPage" })
      } else {
        toast.error("Client error please try again", { containerId: "mainPage" })
      }
    }
  }
  useEffect(() => {
    console.log(state
      , 'state')
  }, [state])



    return (
      <>
        <ToastContainer containerId={"mainPage"} />
        <section className='lg:py-20 py-10'>
          <div className='container mx-auto'>
            <div className='flex flex-wrap items-center justify-between'>
              <div>
                <p className="font-bold xl:text-[2.38rem] text-2xl">
                  How Does It <span className="text-primary-green">Work</span>?</p>
                <p className='text-primary-dark sm:leading-10'>With just a few simple steps, you can issue, sell, and fulfill Promise Bonds. Here’s the journey</p>
              </div>
              <NavLink to='/howitworks' className='text-base font-bold items-center gap-x-2 lg:flex hidden'>See More
                <img src={`${base_path_icon}/arrow-right.png`} alt="" />
              </NavLink>
            </div>

            <div className='lg:pt-[90px] pt-6 flex flex-wrap lg:flex-nowrap gap-7'>
              {
                how_work.map((work, index) => {
                  return (
                    <div className='text-primary-gray-500 sm:w-1/3 w-full bg-white shadow-custom p-5 ' key={work.label}>
                      <div className='max-w-[280px]'>
                        <img src={`${base_path_icon}/bell.png`} alt="" />
                        <div className='text-xl font-semibold pt-4 leading-10'>{work.label}</div>
                        <div className='text-base'>
                          {work.text}
                        </div>
                      </div>
                    </div>
                  )
                })
              }
            </div>
            <NavLink to='/' className='text-base font-bold flex items-center justify-center gap-x-2 mt-6 lg:hidden'>See More
              <img src={`${base_path_icon}/arrow-right.png`} alt="" />
            </NavLink>

          </div>
        </section>
        <section>
          <div className='container mx-auto'>
            <div className='flex md:flex-row flex-col justify-between items-center'>
              <div className='flex-1 relative bg-primary-sea-green-300 lg:px-[70px] px-5 lg:py-[85px] py-10 before:block before:w-[250px] before:h-full before:bg-primary-sea-green-300 before:absolute before:-right-[250px] before:top-0
            '>
                <h2 className="font-bold xl:text-[2.38rem] text-2xl text-primary-dark pb-10">Why Choose <span className="font-normal text-primary-green ">Us</span>?</h2>
                <div className='flex flex-col gap-y-7'>
                  {
                    why_choose.map((choose, index) => {
                      return (
                        <div className='flex items-start gap-x-4 text-primary-dark' key={choose.label}>
                          <img src={`${base_path_icon}${choose.icon}`} alt={choose.icon} />
                          <div className="flex flex-col justify-between">
                            <div className="font-medium  lg:text-[1.25rem] text-[1rem]">{choose.label}</div>
                            <p className="lg:text-[0.94rem] text-[0.75rem]">{choose.text}</p>
                          </div>
                        </div>
                      )
                    })
                  }
                </div>
                <a className="mt-[56px] bg-primary-dark flex justify-center gap-x-3 items-center text-white rounded-full text-base font-medium text-center py-[19px] w-[250px]" href="/">
                  Discover All Features
                  <img src={`${base_path_icon}/right-up.svg`} alt="" />
                </a>
              </div>
              <div className=' relative'>
                <img src={`${base_path_image}/bigball.png`} alt="bigball" className='max-w-[600px] w-full' />
              </div>
            </div>
          </div>
        </section>

        <section className='lg:lg:pt-[120px] pt-10'>
          <div className='container mx-auto'>
            <div className='sm:flex items-center justify-between'>
              <div>
                <h2 className="font-bold xl:text-[2.38rem] text-2xl text-primary-dark pb-1">Meet Our
                  <span className="text-primary-green "> Top Issuers</span></h2>
                <div className='text-base text-primary-dark'>Get some Inspirations from 1800+ skills</div>
              </div>
              <div className='flex items-center gap-x-10 lg:justify-start justify-center lg:py-0 py-5'>
                {/* <Dropdown options={options} value={defaultOption} placeholder="Issuer" className='w-[150px]' />
                <Dropdown options={options} value={defaultOption} placeholder="Price Range" className='w-[150px]' /> */}
                <NavLink to='/search?filter=issuer&search=' className=' border border-primary-dark lg:flex hidden justify-center gap-x-3 items-center text-primary-dark rounded-full text-base font-bold text-center py-[14px] w-[208px]'>
                  View all Issuers
                  <img src={`${base_path_icon}/right-up-black.svg`} alt="icon"></img>
                </NavLink>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7 lg:pt-11">
              
              {
               loading?<div className="flex justify-center items-center">
               <MoonLoader color="#6B33E3" size={100} />
             </div>:!state?.issuers?.length ? <div className='text-center col-span-12 text-lg font-medium'>Data not found</div> :

                  state?.issuers?.map((val, index) => (
                    <div key={index} className="flex justify-center">
                      <div className="bg-primary-sea-green-500 shadow-custom rounded-xl w-full max-w-sm">
                        <img
                          src={
                            val?.user_id?.avatar
                              ? val.user_id.avatar.replace("http://localhost:5000", BASE_URL)
                              : `${base_path_image}/imag1.png`
                          }
                          alt="User Avatar"
                          className="h-[247px] w-full object-cover rounded-t-xl"
                        />
                        <div className="flex flex-col px-5 py-4">
                          <div className="font-semibold text-lg text-center lg:text-left">
                            {val?.user_id?.username}
                          </div>
                          <p className="py-3 text-center lg:text-left text-sm lg:text-base">
                            {val?.bonds[0]?.missions[0]?.mission_title.slice(0, 20)}
                          </p>
                          <div className="flex items-center justify-center lg:justify-start gap-x-3 font-medium text-lg">
                            <span>{val?.bonds?.length} Bonds Issued</span>
                            <span className="h-5 w-[1px] bg-primary-dark"></span>
                            <span>Level {val.level ? val.level : 0}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
            </div>

            <NavLink to='/' className='mt-6 border border-primary-dark lg:hidden flex justify-center mx-auto gap-x-3 items-center text-primary-dark rounded-full text-base font-bold text-center py-[14px] w-[208px]'>
              View all Issuers
              <img src={`${base_path_icon}/right-up-black.svg`} alt="icon"></img>
            </NavLink>
          </div>
        </section>


        <section className='lg:pt-[120px] pt-[50px]'>
          <div className='container mx-auto'>
            <div className='flex lg:flex-row flex-col items-center justify-between'>
              <div>
                <h2 className="font-bold xl:text-[2.38rem] text-2xl text-primary-dark lg:pb-3 pb-1"> Explore Trending
                  <span className="text-primary-green"> Promise Bonds.</span></h2>
                <div className='text-base text-primary-dark'>Most viewed and all-time top-selling services</div>
              </div>
              <div className='flex items-center gap-x-10 lg:justify-start justify-center py-5 lg:py-0'>
              
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7 lg:pt-11">
              {
               loading?<div className="flex justify-center items-center">
               <MoonLoader color="#6B33E3" size={100} />
             </div>:!state?.bonds?.length ? <div className='text-center col-span-12 text-lg font-medium'>Data not found</div> :
                  state?.bonds?.map((_, index) => (
                    <div key={index} className="border rounded-xl shadow-md">
                      <img
                        src={`${base_path_image}/img2.png`}
                        alt="image6"
                        className="h-[247px] w-full object-cover rounded-t-xl"
                      />
                      <div className="flex flex-col px-5 py-4">
                        <div className="text-sm text-[#6B7177]">Design & Creative</div>
                        <div className="font-medium text-lg py-2 leading-6">
                          I'll create a personalized marketing strategy.
                        </div>
                        <div className="text-base font-medium flex items-center gap-x-2">
                          <span>*</span>
                          <span>4.82</span>
                          <span className="text-[#6B7177]">
                            <span className="pr-1">94</span>
                            reviews
                          </span>
                        </div>
                        <div className="flex items-center justify-between border-t pt-3 mt-3">
                          <div className="flex items-center gap-x-2">
                            <img
                              src={`${base_path_image}/imag1.png`}
                              alt="image11"
                              className="rounded-full w-[30px] h-[30px]"
                            />
                            <span className="text-sm text-primary-dark">Anne Smith</span>
                          </div>
                          <div className="flex items-center gap-x-2">
                            <span className="text-[#6B7177]">Starting at</span>
                            <span className="font-semibold">$200</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
            </div>

            <div className='pt-[60px]'>
              <a className="border border-primary-dark flex justify-center gap-x-3 mx-auto items-center text-primary-dark rounded-full text-base font-bold text-center py-[14px] w-[265px]" href="/search?filter=bond&search=">View all Promise Bonds<img src={`${base_path_icon}/right-up-black.svg`} alt="icon" /></a>
            </div>
          </div>
        </section>


        <section className='lg:pt-[120px] pt-[50px]'>
          <div className='container mx-auto'>
            <div className='flex justify-between items-center bg-primary-sea-green-200 rounded-lg md:px-[80px] lg:flex-row flex-col'>
              <div className='max-w-[650px]'>
                <h3 className='font-bold lg:text-[32px] text-2xl lg:leading-9 lg:text-start text-center lg:px-0 px-12 lg:pt-0 pt-10'>Fulfill your promises, share your progress, and level up.</h3>
                <div className='flex items-center gap-x-3 pt-7 lg:justify-start justify-center'>
                  <a className="px-5 py-2 border border-primary-dark flex justify-center gap-x-3 items-center bg-primary-dark text-white rounded-full text-base font-bold text-center lg:py-[17px] lg:px-8" href="/search?filter=bond&search=">Find Bonds<img src={`${base_path_icon}/right-up.svg`} alt="icon" /></a>
                  <a className="px-5 py-2 border border-primary-dark flex justify-center gap-x-3 items-center text-primary-dark rounded-full text-base font-bold text-center lg:py-[18px] lg:px-8" href="/search?filter=issuer&search=">Find Talent<img src={`${base_path_icon}/right-up-black.svg`} alt="icon" /></a>
                </div>
              </div>
              <div className=' relative overflow-hidden min-w-[380px] lg:pt-0 pt-9'>
                <div className='absolute bg-primary-green h-full w-[100%] -bottom-[50%] rounded-full'></div>
                <img src={`${base_path_image}/img3.png`} alt="image12" className=' relative mx-auto' />
              </div>
            </div>
          </div>
        </section>

        <section className={`lg:pt-[120px] pt-16 ${state?.market?.length > 4 ? 'pb-[100px]' : ''}`}>
          <div className='container mx-auto'>
            <div className='flex lg:items-center lg:justify-between lg:flex-row flex-col'>
              <div className='max-w-[690px]'>
                <h2 className="font-bold xl:text-[2.38rem] text-2xl text-primary-green pb-2">Active Bids
                  <span className="text-primary-dark"> In The Marketplace</span></h2>
                <div className='text-base text-primary-dark'>Browse and manage your active bids in the marketplace, keeping track of ongoing opportunities. Stay updated on your potential projects and their status in real time.</div>
              </div>
              <NavLink to='/search?filter=bond&search=' className='border lg:mt-0 mt-4 border-primary-dark flex justify-center gap-x-3 items-center text-primary-dark rounded-full text-base font-bold text-center py-[13px] w-[235px]'>
                Explore the Market
                <img src={`${base_path_icon}/right-up-black.svg`} alt="icon"></img>
              </NavLink>
            </div>
            <div className='flex gap-7 lg:pt-11 pt-6 lg:flex-row flex-col relative'>
              {
                loading? <div className="flex justify-center items-center">
                <MoonLoader color="#6B33E3" size={100} />
              </div>:!state?.market?.length ? <div className='text-center w-full text-lg font-medium'>Data not found</div> :

                  <Swiper
                    navigation={{
                      nextEl: '.custom-next',
                      prevEl: '.custom-prev',
                    }}
                    pagination={{
                      clickable: true,
                    }}
                    modules={[Navigation, Pagination]}
                    className="mySwiper w-full"

                    spaceBetween={20}
                    breakpoints={{
                      1024: {
                        slidesPerView: 4,
                      },

                      640: {
                        slidesPerView: 1,
                      },
                    }}
                  >
                    {
                      state?.market?.map((val, index) => {
                        return (
                          <SwiperSlide>
                            <div className='w-full overflow-hidden rounded-xl' key={val.issuer_id.user_id.username}>
                              <div className='bg-primary-pink-400 shadow-custom rounded-xl'>
                                <img src={val.photos[0]} alt="user" className='max-h-[247px] min-h-[247px] object-cover w-full' />
                                <div className='flex flex-col px-7 py-5'>
                                  <div className=' font-semibold text-lg'>{val.issuer_id.user_id.username}</div>
                                  <p className='py-1'>{val.missions[0].description.slice(0, 30)}...</p>
                                  <div className='text-lg font-medium pt-2'>
                                    ${val.total_bonds}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </SwiperSlide>
                        )
                      })
                    }
                  </Swiper>

              }
            </div>
          </div>
        </section>


        <section className='bg-primary-sea-green-200 lg:mt-[120px] mt-[50px] lg:py-[120px] py-[50px] text-base'>
          <div className='container mx-auto'>
            <div className='flex lg:flex-row flex-col justify-between items-center text-primary-dark gap-4'>
              <div className='max-w-[850px]'>
                <div className='lg:pr-[150px]'>
                  <h3 className='font-bold lg:text-[38px] text-2xl lg:leading-9'>Real <span className='text-primary-green '>Stories</span>, Real <span className='text-primary-green '>Impact</span>!</h3>
                  <p className='pt-3'>Our issuers' success stories highlight the impact of our innovative solutions and dedicated service. Read what they have to say about partnering with others.</p>
                </div>
                <div className='flex lg:flex-row flex-col'>
                  <div className='lg:w-1/3 w-full'>
                    <div className=' text-primary-dark lg:pt-7 pt-5 lg:max-w-[250px]'>
                      <div className='text-[32px] font-bold'>4.9/5</div>
                      <div>Clients rate professionals on Promise Bond</div>
                    </div>
                  </div>
                  <div className='lg:w-1/3 w-full'>
                    <div className=' text-primary-dark lg:pt-7 pt-5 lg:max-w-[250px]'>
                      <div className='text-[32px] font-bold'>4.9/5</div>
                      <div>95% of customers are satisfied through to see their freelancers</div>
                    </div>
                  </div>
                  <div className='lg:w-1/3 w-full'>
                    <div className=' text-primary-dark lg:pt-7 pt-5 lg:max-w-[250px]'>
                      <div className='text-[32px] font-bold'>Award winner</div>
                      <div>G2’s 2023 Best Software Awards</div>
                    </div>
                  </div>
                </div>
              </div>
              <Swiper
                navigation={{
                  nextEl: '.custom-next',
                  prevEl: '.custom-prev',
                }}
                pagination={{
                  clickable: true,
                }}
                modules={[Navigation, Pagination]}
                className="work w-full"

                spaceBetween={20}
                breakpoints={{
                  1024: {
                    slidesPerView: 1,
                  },

                  640: {
                    slidesPerView: 1,
                  },
                }}
              >
                {
                  [1, 2, 3, 4, 5].map((val, index) => {
                    return (
                      <SwiperSlide>
                        <div className='max-w-[430px] bg-white p-10 lg:mt-0 mt-3 rounded-lg shadow-custom text-xl work'>
                          <div className='text-primary-green'>Great Work</div>
                          <p className='text-primary-dark pt-4 pb-10 lg:text-base text-[13px] lg:leading-5 leading-5'>“I found the course material to be highly engaging, and the instructors to be helpful and communicative.”</p>
                          <div className='border-t flex items-center gap-x-3 pt-4'>
                            <div className='h-16 w-16 rounded-full overflow-hidden'>
                              <img src={`${base_path_image}/img2.png`} alt="profile" className='!h-full w-full' />
                            </div>
                            <div>
                              <div className='text-base text-primary-dark'>Courtney Henry</div>
                              <div className='text-[14px] text-primary-gray-500'>Web Designer</div>
                            </div>
                          </div>
                        </div>
                      </SwiperSlide>
                    )
                  })
                }
              </Swiper>

            </div>
          </div>
        </section>

        <section className='lg:py-[120px] pt-[50px] pb-4'>
          <div className='container mx-auto text-base text-primary-dark'>
            <div>
              <div className='flex items-center justify-between max-w-[900px] pb-1 lg:flex-nowrap flex-wrap lg:gap-y-0 gap-y-2'>
                <div className='lg:text-[28px] lg:w-1/4 w-[20%] text-[16px] font-bold'>Top skills</div>
                <div className='lg:text-[28px] lg:w-1/4 w-[70%] text-[16px] font-bold opacity-30'>Trending skills</div>
                <div className='lg:text-[28px] lg:w-1/4 w-[41%] text-[16px] font-bold opacity-30'>TTop skills in US</div>
                <div className='lg:text-[28px] lg:w-1/4 w-[58%] text-[16px] font-bold opacity-30'>Project Catalog</div>
              </div>
              <div className='pt-14 flex justify-between lg:flex-nowrap flex-wrap'>
                <div className='lg:max-w-[170px] lg:w-1/4 w-1/2  text-base'>
                  <ul className=' leading-10'>
                    <li>Data Entry Specialists</li>
                    <li className='text-primary-green underline'>Video Editors</li>
                    <li>Data Analyst</li>
                    <li>Shopify Developer</li>
                    <li>Ruby on Rails Developer</li>
                    <li>Social Media Manager</li>
                  </ul>
                </div>
                <div className='lg:max-w-[170px] lg:w-1/4 w-1/2  text-base'>
                  <ul className=' leading-10'>
                    <li>Android Developer</li>
                    <li>Bookkeeper</li>
                    <li>Content Writer</li>
                    <li>Copywriter</li>
                    <li>Database Administrator</li>
                    <li>Software Developer</li>
                  </ul>
                </div>
                <div className='lg:max-w-[170px] lg:w-1/4 w-1/2  text-base'>
                  <ul className=' leading-10'>
                    <li>Data Scientist</li>
                    <li>Front-End Developer</li>
                    <li>Game Developer</li>
                    <li>Graphic Designer</li>
                    <li>iOS Developer</li>
                    <li>Java Developer</li>
                  </ul>
                </div>
                <div className='lg:max-w-[170px] lg:w-1/4 w-1/2  text-base'>
                  <ul className=' leading-10'>
                    <li>JavaScript Developer</li>
                    <li>Logo Designer</li>
                    <li>Mobile App Developer</li>
                    <li>PHP Developer</li>
                    <li>Python Developer</li>
                    <li>Resume Writer</li>
                  </ul>
                </div>
                <div className='lg:max-w-[170px] lg:w-1/4 w-1/2  text-base'>
                  <ul className=' leading-10'>
                    <li>Technical Writer</li>
                    <li>UI Designer</li>
                    <li>UX Designer</li>
                    <li>Virtual Assistant</li>
                    <li>Web Designer</li>
                    <li>WordPress Developer</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

      </>
    )
  }
