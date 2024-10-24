import { useState } from "react";
import { Link } from "react-router-dom";

export default function HomeHeader() {
    const [showmenu,setShoMenu] = useState(false);
    const menutoggle = ()=>{
        setShoMenu(!showmenu);
    }
  
    return (
        <div className="w-full z-50 relative lg:px-[40px] px-[20px] py-[40px] items-center flex justify-between">
            {/* <div onClick={menutoggle} className="flex lg:hidden items-center hover:cursor-pointer">
                <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M5 12H20" stroke="#000000" stroke-width="2" stroke-linecap="round"></path> <path d="M5 17H20" stroke="#000000" stroke-width="2" stroke-linecap="round"></path> <path d="M5 7H20" stroke="#000000" stroke-width="2" stroke-linecap="round"></path> </g></svg>
            </div> */}
            <div className="lg:w-fit w-[120px]">
                <svg className="lg:w-[196px] w-[100%]" height="34" viewBox="0 0 196 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 17.1H7.81684C9.60044 17.1 11.4482 16.9902 12.9663 16.0452C14.153 15.3066 15.152 14.2974 15.8831 13.0986C16.8186 11.565 16.9273 9.6984 16.9273 7.8966V0H5.34545C3.92775 0 2.56811 0.568927 1.56565 1.58162C0.56318 2.59432 0 3.96783 0 5.4L0 17.1ZM41.3872 1.8C41.3872 2.27739 41.1995 2.73523 40.8653 3.07279C40.5311 3.41036 40.0779 3.6 39.6054 3.6C39.1328 3.6 38.6796 3.41036 38.3454 3.07279C38.0113 2.73523 37.8235 2.27739 37.8235 1.8C37.8235 1.32261 38.0113 0.864773 38.3454 0.527208C38.6796 0.189642 39.1328 0 39.6054 0C40.0779 0 40.5311 0.189642 40.8653 0.527208C41.1995 0.864773 41.3872 1.32261 41.3872 1.8ZM188.615 10.8936C193.596 10.8936 196 14.4081 196 18.4788V26.1243H190.787V19.386C190.787 17.541 190.121 16.0182 188.21 16.0182C186.299 16.0182 185.662 17.541 185.662 19.386V26.1234H180.449V19.386C180.449 17.541 179.812 16.0182 177.9 16.0182C175.989 16.0182 175.323 17.541 175.323 19.386V26.1234H170.111V18.4779C170.111 14.4072 172.514 10.8927 177.495 10.8927C180.218 10.8927 182.186 11.9763 183.084 13.7628C184.04 11.9763 186.125 10.8918 188.615 10.8918V10.8936ZM160.744 21.438C162.423 21.438 163.148 19.8855 163.148 18.0396V11.4786H168.36V18.684C168.36 22.9896 165.869 26.5635 160.744 26.5635C155.618 26.5635 153.128 22.9905 153.128 18.684V11.4786H158.34V18.0396C158.34 19.8846 159.064 21.438 160.744 21.438ZM145.463 26.5923C142.191 26.5923 140.077 25.4502 138.831 23.2245L142.596 21.0861C143.117 22.023 143.899 22.4919 145.202 22.4919C146.274 22.4919 146.766 22.1112 146.766 21.6423C146.766 19.8558 139.121 21.672 139.121 15.9903C139.121 13.2363 141.437 11.0106 145.376 11.0106C148.822 11.0106 150.704 12.7089 151.545 14.3496L147.78 16.5168C147.461 15.6384 146.476 15.111 145.492 15.111C144.739 15.111 144.334 15.4332 144.334 15.8724C144.334 17.6886 151.978 16.0191 151.978 21.5253C151.978 24.6006 148.996 26.5923 145.463 26.5923ZM127.251 32.8608H122.039V18.7722C122.039 14.2902 125.369 11.0394 130.002 11.0394C134.52 11.0394 137.966 14.5251 137.966 18.7722C137.966 23.4585 134.896 26.5635 130.292 26.5635C129.22 26.5635 128.149 26.2413 127.251 25.7427V32.8608ZM130.002 21.6135C131.653 21.6135 132.753 20.3247 132.753 18.801C132.753 17.2494 131.653 15.9894 130.002 15.9894C128.351 15.9894 127.251 17.2494 127.251 18.8019C127.251 20.3247 128.351 21.6135 130.002 21.6135ZM116.817 9.927C115.108 9.927 113.69 8.4915 113.69 6.7635C113.69 5.0355 115.108 3.6 116.817 3.6C118.526 3.6 119.945 5.0355 119.945 6.7635C119.945 8.4915 118.526 9.927 116.817 9.927ZM114.211 11.4786H119.424V26.1243H114.211V11.4786ZM104.21 26.5635C99.6918 26.5635 96.2458 23.049 96.2458 18.7722C96.2458 14.5251 99.6918 11.0106 104.21 11.0106C108.727 11.0106 112.173 14.5251 112.173 18.7722C112.173 23.049 108.727 26.5635 104.21 26.5635ZM104.21 21.6135C105.86 21.6135 106.961 20.3247 106.961 18.801C106.961 17.2494 105.86 15.9606 104.21 15.9606C102.559 15.9606 101.459 17.2494 101.459 18.801C101.459 20.3247 102.559 21.6135 104.21 21.6135ZM86.403 33.3C82.8127 33.3 80.2059 31.689 78.874 28.818L83.1886 26.4753C83.6519 27.4716 84.5205 28.4967 86.3157 28.4967C88.1991 28.4967 89.4437 27.2952 89.5889 25.1865C88.894 25.8021 87.7929 26.2701 86.1429 26.2701C82.1169 26.2701 78.8731 23.1363 78.8731 18.7425C78.8731 14.4963 82.32 11.0394 86.8378 11.0394C91.4714 11.0394 94.8016 14.2911 94.8016 18.7722V24.5718C94.8016 29.844 91.181 33.3 86.403 33.3ZM86.7505 21.321C88.314 21.321 89.5016 20.2365 89.5016 18.6255C89.5016 17.0442 88.3149 15.9894 86.7505 15.9894C85.2155 15.9894 83.9994 17.0442 83.9994 18.6264C83.9994 20.2374 85.2155 21.3201 86.7505 21.3201V21.321ZM70.0317 26.5635C65.5139 26.5635 62.067 23.049 62.067 18.7722C62.067 14.5251 65.5139 11.0106 70.0317 11.0106C74.5486 11.0106 77.9955 14.5251 77.9955 18.7722C77.9955 23.049 74.5495 26.5635 70.0317 26.5635ZM70.0317 21.6135C71.6825 21.6135 72.7828 20.3247 72.7828 18.801C72.7828 17.2494 71.6825 15.9606 70.0317 15.9606C68.3808 15.9606 67.2806 17.2494 67.2806 18.801C67.2806 20.3247 68.3808 21.6135 70.0317 21.6135ZM52.5752 6.354V21.1446H61.2055V26.1243H51.8509C48.5501 26.1243 47.2182 24.3666 47.2182 21.5838V6.354H52.5752Z" fill="#7638F9" />
                </svg>
            </div>
            {/* <nav className="lg:flex items-center gap-[30px] hidden">
                <Link to="/" className="text-[18px] text-[#6B33E3]">Home</Link>
                <Link to="/sponsorbond" className="text-[18px] hover:text-[#6B33E3]">SponsorBond</Link>
                <Link to="/mission" className="text-[18px] hover:text-[#6B33E3]">Mission</Link>
            </nav> */}
            <div className="lg:flex hidden items-center gap-[10px]">
                <Link to="/login" className="text-[#6B33E3] border-[#6B33E3] border-[1px] rounded-[10px] px-[24px] py-[8px] text-[18px]">Login</Link>
                <Link to="/signup" className="text-white bg-[#6B33E3] border-[1px] rounded-[10px] px-[24px] py-[8px] text-[18px]">Signup</Link>

            </div>
            <div className="flex lg:hidden flex-row gap-[10px] px-[20px] mt-[30px]">
                <Link to="/login" className="text-[#6B33E3] border-[#6B33E3] border-[1px] w-fit rounded-[10px] px-[24px] py-[8px] text-[18px]">Login</Link>
                <Link to="/signup" className="text-white bg-[#6B33E3] border-[1px] w-fit rounded-[10px] px-[24px] py-[8px] text-[18px]">Signup</Link>

            </div>
            {/* <div className={`absolute top-0 h-[100vh] ${showmenu ? 'left-0 w-[80%]' : 'left-[-100%] w-0'} bg-white flex flex-col shadow-md`}>
                <div className="flex justify-end px-[20px] py-[40px] hover:cursor-pointer" onClick={menutoggle}>
                    <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Menu / Close_SM"> <path id="Vector" d="M16 16L12 12M12 12L8 8M12 12L16 8M12 12L8 16" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g> </g></svg>
                </div>
                <nav className="flex px-[20px] flex-col gap-[30px] ">
                <Link to="/" className="text-[18px] text-[#6B33E3]">Home</Link>
                <Link to="/sponsorbond" className="text-[18px] hover:text-[#6B33E3]">SponsorBond</Link>
                <Link to="/mission" className="text-[18px] hover:text-[#6B33E3]">Mission</Link>
            </nav>
            <div className="flex flex-col gap-[10px] px-[20px] mt-[30px]">
                <Link to="/login" className="text-[#6B33E3] border-[#6B33E3] border-[1px] w-fit rounded-[10px] px-[24px] py-[8px] text-[18px]">Login</Link>
                <Link to="/signup" className="text-white bg-[#6B33E3] border-[1px] w-fit rounded-[10px] px-[24px] py-[8px] text-[18px]">Signup</Link>

            </div>
            </div> */}
        </div>
    )
}