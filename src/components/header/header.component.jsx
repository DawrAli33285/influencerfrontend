import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { become_a_seller, categories, links, login, sign_up } from './json-data'


export const HeaderComponent = () => {
  const base_path_icon = "/assets/images/icons"
  const [toggleMenu, setToggleMenu] = useState(false)

  const toggleMenuFun = () => {
    setToggleMenu(!toggleMenu)
  }

  return (
    <header>
      <nav className='lg:px-8 px-4 min-h-[60px] flex items-center lg:pb-0 xl-pt-5'>
        <div className='flex max-width justify-between w-full lg:flex-row flex-d-col'>
          <div className='flex justify-between items-center lg:pt-0 pt-5 lg:pr-5 pr-0'>
            <button className='hidden xl-d-block' onClick={() => toggleMenuFun()}>
              <img src={`${base_path_icon}/toggler.svg`} alt="toggler" />
            </button>
            <div className='flex items-center gap-x-7 header-logo'>
              <NavLink to='/'>
                <img src={`${base_path_icon}/header-log-lg.svg`} alt="" />
              </NavLink>
            </div>
          {localStorage.getItem('token')?<div onClick={()=>{
                localStorage.removeItem('token')
                localStorage.removeItem('buyerToken')
                localStorage.removeItem('email')
                localStorage.removeItem('phoneNumber')
                window.location.reload(true)
          }} className='hidden cursor-pointer xl-d-block text-base font-medium text-center border-transparent hover:text-primary-green'>
           Sign Off
            </div>:<NavLink to={login.url} className='hidden xl-d-block text-base font-medium text-center border-transparent hover:text-primary-green'>
              {login.label}
            </NavLink>}
          </div>
          <div className={`links flex-1 lg:flex items-center lg:flex-row flex-d-col gap-x-8 justify-between xl-w-full ${toggleMenu ? 'open' : ''}`}>
            <div className='lg:flex items-center gap-x-7 lg:w-auto w-full xl-w-full'>
              <span className='h-10 w-[1px] bg-primary-gray-300'></span>
              <NavLink to={categories.url} className='text-base font-medium flex items-center gap-x-3 xl-gap-x lg-py-0 xl-py-2 hover:text-primary-green '>
                <img src={`${base_path_icon}/categories.png`} alt="" />
                <span>{categories.label}</span>
              </NavLink>
            </div>
            <div className='flex items-center justify-end flex-1 lg:flex-row flex-d-col lg:w-auto w-full xl-w-full'>
              <ul className='flex items-center gap-x-8 lg:flex-row flex-d-col lg:w-auto w-full xl-w-full'>
                {
                  links.map((link, index) => {
                    return (
                      <li key={link.label} className='lg:w-auto xl-w-full'>
                        <NavLink to={link.url} className='text-base lg:text-center xl-text-left font-medium block lg:py-9 xl-py-2 border-t-[4px] border-transparent hover:text-primary-green'>
                          {link.label}
                        </NavLink>
                      </li>
                    )
                  })
                }
              </ul>
              <ul className='flex items-center gap-x-8 lg:w-auto w-full xl-w-full lg:pl-8 pl-0'>
                <li>
                  <NavLink to={become_a_seller.url} className='text-base font-medium block text-center lg:py-9 xl-py-2 border-t-[4px] border-transparent hover:text-primary-green'>
                    {become_a_seller.label}
                  </NavLink>
                </li>
                <li className='xl-d-none'>
                  {localStorage.getItem('token')?null:<NavLink to={login.url} className='text-base font-medium block text-center py-9 lg:block border-t-[4px] border-transparent hover:text-primary-green'>
                    {login.label}
                  </NavLink>}
                </li>
                <li className='xl-d-none'>
                {localStorage.getItem('token')?<div onClick={()=>{
                  localStorage.removeItem('token')
                  localStorage.removeItem('buyerToken')
                  localStorage.removeItem('email')
                  localStorage.removeItem('phoneNumber')
                  window.location.reload(true)
                }} className='bg-primary-dark cursor-pointer text-white rounded text-base font-medium text-center py-2 w-[114px] lg:block hidden'>
                 Sign Off
                  </div>:  <NavLink to={sign_up.url} className='bg-primary-dark text-white rounded text-base font-medium text-center py-2 w-[114px] lg:block hidden'>
                    {sign_up.label}
                  </NavLink>}
                </li>
              </ul>
            </div>
          </div>
        </div>

      </nav>
    </header>
  )
}
