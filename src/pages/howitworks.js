import HomeFooter from "../components/homefooter";
import HomeHeader from "../components/homeheader";
import img from "../Vector.png";
import img2 from "../Vector2.png";
import img3 from "../vector3.png";
import bsns from "../bussinessmen.png";
import banner from "../faqbanner.png"
import mblbanner from "../faqbannermbl.png"
import overlay from "../overlayimg.png"

import { Link } from "react-router-dom";
export default function HowItWorks() {
    return (
        <div className="w-full">
            <HomeHeader />
            <div className="relative w-full mb-[2.5rem]  lg:mb-[7.5rem] h-[400px]">
            <div className="relative flex items-center justify-center w-full h-[300px]">
  <img src={banner} className="lg:block hidden w-full h-full object-cover" alt="img" />
  <img src={mblbanner} className="block lg:hidden w-full h-full object-cover" alt="img" />
  <div className="absolute lg:px-0 px-[1rem] gap-[10px] left-0 lg:pl-[5rem] top-0 w-full h-full flex flex-col lg:items-start items-center justify-center">
                    <h1 className="lg:text-[2.38rem] text-[1.9rem]  text-white font-bold">Learn how our platform simplifies your journey in just a few easy steps.</h1>
                    <p className="lg:text-[0.94rem] text-[.75rem] text-white">Fostering growth, forging relationships, and unlocking potential.</p>
                </div>
</div>

               
            </div>
            <div className="max-w-[1440px] mx-auto my-[-2rem]">
                <div className="w-full flex flex-col gap-[40px] px-[20px] py-[40px] xl:px-[30px]">
                    <div className="w-full lg:w-[70%]">
                        <h2 className="xl:text-[2.38rem]  text-[1.50rem]  font-semibold">
                            Your Talent, Your Promise, Our Platform.
                        </h2>

                        <p className="lg:text-[0.94rem] py-3 text-[0.75rem] text-gray-600">
                            Turning your skills into opportunities has never been easier. Promise Bond connects you with an audience ready to support your talent while holding you accountable to deliver on your promises. Here’s a step-by-step guide to how it all works
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[40px]">
                        <div
                            className="relative flex flex-col xl:p-[40px] p-[20px] rounded-[20px] border-[#E9E9E9] border-[1px] w-full h-full group overflow-hidden"

                        >
                            <div className="absolute hidden z-[1] top-0 left-0 w-full h-full group-hover:block">
                                <img src={overlay} className="w-full h-full" />
                            </div>
                            <div className="relative flex justify-between items-center z-10">
                            <svg className="md:w-[58px] md:h-[52px] w-[40.15px] h-[36px]" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_214_2440)">
<path d="M28 40H12C8.81842 39.9967 5.76809 38.7313 3.51837 36.4816C1.26865 34.2319 0.00330898 31.1816 0 28V12C0.00330898 8.81842 1.26865 5.76809 3.51837 3.51837C5.76809 1.26865 8.81842 0.00330898 12 0L28 0C31.1816 0.00330898 34.2319 1.26865 36.4816 3.51837C38.7313 5.76809 39.9967 8.81842 40 12V28C39.9967 31.1816 38.7313 34.2319 36.4816 36.4816C34.2319 38.7313 31.1816 39.9967 28 40ZM12 2.6625C9.52456 2.66581 7.15145 3.65064 5.40104 5.40104C3.65064 7.15145 2.66581 9.52456 2.6625 12V28C2.66581 30.4754 3.65064 32.8486 5.40104 34.599C7.15145 36.3494 9.52456 37.3342 12 37.3375H28C30.4754 37.3342 32.8486 36.3494 34.599 34.599C36.3494 32.8486 37.3342 30.4754 37.3375 28V12C37.3342 9.52456 36.3494 7.15145 34.599 5.40104C32.8486 3.65064 30.4754 2.66581 28 2.6625H12Z" fill="#1F4B3F"/>
<path d="M20 22.6621C18.4178 22.6621 16.871 22.1929 15.5554 21.3139C14.2398 20.4348 13.2145 19.1854 12.609 17.7236C12.0035 16.2618 11.845 14.6532 12.1537 13.1014C12.4624 11.5495 13.2243 10.1241 14.3432 9.00526C15.462 7.88644 16.8874 7.12451 18.4393 6.81583C19.9911 6.50715 21.5997 6.66558 23.0615 7.27108C24.5233 7.87658 25.7727 8.90196 26.6518 10.2176C27.5308 11.5331 28 13.0799 28 14.6621C27.9967 16.7828 27.1528 18.8157 25.6532 20.3153C24.1536 21.8149 22.1207 22.6588 20 22.6621ZM20 9.33711C18.9443 9.33711 17.9124 9.65015 17.0346 10.2366C16.1569 10.8231 15.4728 11.6567 15.0688 12.632C14.6648 13.6073 14.5591 14.6805 14.7651 15.7159C14.971 16.7513 15.4794 17.7023 16.2258 18.4488C16.9723 19.1953 17.9233 19.7036 18.9587 19.9096C19.9941 20.1155 21.0673 20.0098 22.0426 19.6058C23.0179 19.2018 23.8515 18.5177 24.438 17.64C25.0245 16.7622 25.3375 15.7303 25.3375 14.6746C25.3375 13.259 24.7752 11.9014 23.7742 10.9004C22.7732 9.89946 21.4156 9.33711 20 9.33711Z" fill="#1F4B3F"/>
<path d="M29.3496 30.8254C29.0162 30.8261 28.6948 30.7011 28.4496 30.4754C26.7318 28.8745 24.4727 27.9815 22.1246 27.9754H17.8871C15.5389 27.9815 13.2798 28.8745 11.5621 30.4754C11.4341 30.6032 11.2817 30.7037 11.1138 30.7709C10.946 30.8381 10.7662 30.8705 10.5855 30.8663C10.4047 30.8621 10.2267 30.8212 10.0622 30.7462C9.89766 30.6713 9.75005 30.5637 9.62826 30.4301C9.50647 30.2965 9.41304 30.1395 9.35361 29.9688C9.29419 29.798 9.26999 29.617 9.2825 29.4366C9.29501 29.2563 9.34395 29.0803 9.42637 28.9194C9.5088 28.7585 9.62299 28.6159 9.76206 28.5004C11.9768 26.4627 14.8776 25.3336 17.8871 25.3379H22.1121C25.1293 25.3373 28.0355 26.4757 30.2496 28.5254C30.4441 28.708 30.5795 28.9446 30.6385 29.2048C30.6975 29.4651 30.6773 29.737 30.5805 29.9856C30.4837 30.2342 30.3148 30.4482 30.0955 30.6001C29.8761 30.752 29.6163 30.8348 29.3496 30.8379V30.8254Z" fill="#1F4B3F"/>
</g>
<defs>
<clipPath id="clip0_214_2440">
<rect width="40" height="40" fill="white"/>
</clipPath>
</defs>
</svg>

                                <p className="xl:text-[2.38rem] z-10 text-[1.50rem] font-semibold text-[#0000004a] group-hover:text-white transition-colors">
                                    01
                                </p>
                            </div>
                            <p className="lg:text-[1.25rem] text-[1rem] mt-[20px] z-10 group-hover:text-white">
                                Sign Up
                            </p>
                            <ul className="mt-[20px] list-disc group-hover:text-white z-10 ">
                                <li className="lg:text-[0.94rem] group-hover:text-white text-[0.75rem]">Get started by creating an account in minutes.</li>
                                <li className="lg:text-[0.94rem] group-hover:text-white text-[0.75rem]">Issuers need to verify their email and mobile phone for security. Buyers only need email verification.</li>
                            </ul>
                        </div>
                        <div
                            className="relative flex flex-col xl:p-[40px] p-[20px] rounded-[20px] border-[#E9E9E9] border-[1px] w-full h-full group overflow-hidden"

                        >
                            <div className="absolute hidden z-[1] top-0 left-0 w-full h-full group-hover:block">
                                <img src={overlay} className="w-full h-full" />
                            </div>
                            <div className="relative flex justify-between items-center z-10">
                            <svg className="md:w-[58px] md:h-[52px] w-[40.15px] h-[36px]"viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_214_2440)">
<path d="M28 40H12C8.81842 39.9967 5.76809 38.7313 3.51837 36.4816C1.26865 34.2319 0.00330898 31.1816 0 28V12C0.00330898 8.81842 1.26865 5.76809 3.51837 3.51837C5.76809 1.26865 8.81842 0.00330898 12 0L28 0C31.1816 0.00330898 34.2319 1.26865 36.4816 3.51837C38.7313 5.76809 39.9967 8.81842 40 12V28C39.9967 31.1816 38.7313 34.2319 36.4816 36.4816C34.2319 38.7313 31.1816 39.9967 28 40ZM12 2.6625C9.52456 2.66581 7.15145 3.65064 5.40104 5.40104C3.65064 7.15145 2.66581 9.52456 2.6625 12V28C2.66581 30.4754 3.65064 32.8486 5.40104 34.599C7.15145 36.3494 9.52456 37.3342 12 37.3375H28C30.4754 37.3342 32.8486 36.3494 34.599 34.599C36.3494 32.8486 37.3342 30.4754 37.3375 28V12C37.3342 9.52456 36.3494 7.15145 34.599 5.40104C32.8486 3.65064 30.4754 2.66581 28 2.6625H12Z" fill="#1F4B3F"/>
<path d="M20 22.6621C18.4178 22.6621 16.871 22.1929 15.5554 21.3139C14.2398 20.4348 13.2145 19.1854 12.609 17.7236C12.0035 16.2618 11.845 14.6532 12.1537 13.1014C12.4624 11.5495 13.2243 10.1241 14.3432 9.00526C15.462 7.88644 16.8874 7.12451 18.4393 6.81583C19.9911 6.50715 21.5997 6.66558 23.0615 7.27108C24.5233 7.87658 25.7727 8.90196 26.6518 10.2176C27.5308 11.5331 28 13.0799 28 14.6621C27.9967 16.7828 27.1528 18.8157 25.6532 20.3153C24.1536 21.8149 22.1207 22.6588 20 22.6621ZM20 9.33711C18.9443 9.33711 17.9124 9.65015 17.0346 10.2366C16.1569 10.8231 15.4728 11.6567 15.0688 12.632C14.6648 13.6073 14.5591 14.6805 14.7651 15.7159C14.971 16.7513 15.4794 17.7023 16.2258 18.4488C16.9723 19.1953 17.9233 19.7036 18.9587 19.9096C19.9941 20.1155 21.0673 20.0098 22.0426 19.6058C23.0179 19.2018 23.8515 18.5177 24.438 17.64C25.0245 16.7622 25.3375 15.7303 25.3375 14.6746C25.3375 13.259 24.7752 11.9014 23.7742 10.9004C22.7732 9.89946 21.4156 9.33711 20 9.33711Z" fill="#1F4B3F"/>
<path d="M29.3496 30.8254C29.0162 30.8261 28.6948 30.7011 28.4496 30.4754C26.7318 28.8745 24.4727 27.9815 22.1246 27.9754H17.8871C15.5389 27.9815 13.2798 28.8745 11.5621 30.4754C11.4341 30.6032 11.2817 30.7037 11.1138 30.7709C10.946 30.8381 10.7662 30.8705 10.5855 30.8663C10.4047 30.8621 10.2267 30.8212 10.0622 30.7462C9.89766 30.6713 9.75005 30.5637 9.62826 30.4301C9.50647 30.2965 9.41304 30.1395 9.35361 29.9688C9.29419 29.798 9.26999 29.617 9.2825 29.4366C9.29501 29.2563 9.34395 29.0803 9.42637 28.9194C9.5088 28.7585 9.62299 28.6159 9.76206 28.5004C11.9768 26.4627 14.8776 25.3336 17.8871 25.3379H22.1121C25.1293 25.3373 28.0355 26.4757 30.2496 28.5254C30.4441 28.708 30.5795 28.9446 30.6385 29.2048C30.6975 29.4651 30.6773 29.737 30.5805 29.9856C30.4837 30.2342 30.3148 30.4482 30.0955 30.6001C29.8761 30.752 29.6163 30.8348 29.3496 30.8379V30.8254Z" fill="#1F4B3F"/>
</g>
<defs>
<clipPath id="clip0_214_2440">
<rect width="40" height="40" fill="white"/>
</clipPath>
</defs>
</svg>

                                <p className="xl:text-[2.38rem] z-10 text-[1.50rem] font-semibold text-[#0000004a] group-hover:text-white transition-colors">
                                    02
                                </p>
                            </div>
                            <p className="lg:text-[1.25rem] text-[1rem] mt-[20px] z-10 group-hover:text-white">
                                Issue a Promise Bond
                            </p>
                            <ul className="mt-[20px] list-disc group-hover:text-white z-10 ">
                                <li className="lg:text-[0.94rem] group-hover:text-white text-[0.75rem]">Describe your mission, set a price, and submit for operator approval.</li>
                                <li className="lg:text-[0.94rem] group-hover:text-white text-[0.75rem]">Once approved, your Promise Bond is live and ready for sale.</li>
                            </ul>
                        </div>
                        <div
                            className="relative flex flex-col xl:p-[40px] p-[20px] rounded-[20px] border-[#E9E9E9] border-[1px] w-full h-full group overflow-hidden"

                        >
                            <div className="absolute hidden z-[1] top-0 left-0 w-full h-full group-hover:block">
                                <img src={overlay} className="w-full h-full" />
                            </div>
                            <div className="relative flex justify-between items-center z-10">
                                <svg className="md:w-[58px] md:h-[52px] w-[40.15px] h-[36px]" viewBox="0 0 58 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="38" cy="32" r="20" fill="#1DBF73" fill-opacity="0.08" />
                                    <g clip-path="url(#clip0_135_220)">
                                        <path d="M5.2744 28.9248C5.13301 28.7852 4.96229 28.6788 4.77465 28.6135C4.58702 28.5481 4.38718 28.5254 4.18966 28.547C3.99214 28.5685 3.8019 28.6338 3.63277 28.7381C3.46364 28.8423 3.31986 28.983 3.2119 29.1498L1.6744 31.5373C0.296953 33.6727 -0.258282 36.2357 0.111898 38.7498C0.154253 39.033 0.286416 39.2952 0.488937 39.4977C0.691458 39.7003 0.95364 39.8324 1.2369 39.8748C3.75352 40.2518 6.32137 39.7009 8.4619 38.3248L10.8619 36.7873C11.0287 36.6793 11.1693 36.5355 11.2736 36.3664C11.3779 36.1973 11.4432 36.007 11.4647 35.8095C11.4863 35.612 11.4635 35.4122 11.3982 35.2245C11.3328 35.0369 11.2265 34.8662 11.0869 34.7248L5.2744 28.9248ZM7.0119 36.0873C5.71424 36.9179 4.20258 37.3523 2.6619 37.3373C2.64022 35.7957 3.07514 34.2822 3.9119 32.9873L4.5619 31.9873L8.0244 35.4498L7.0119 36.0873Z" fill="#1F4B3F" />
                                        <path d="M38.0492 1.96253C37.2865 1.1884 36.3438 0.615369 35.3055 0.294708C34.2672 -0.0259539 33.1656 -0.0842507 32.0992 0.125032C29.776 0.601059 27.5437 1.44502 25.4867 2.62503C25.2046 2.81201 24.9998 3.09483 24.9102 3.42115C24.8206 3.74747 24.8522 4.09522 24.9992 4.40003C25.9704 6.79044 27.4162 8.95912 29.2492 10.775C30.7456 12.2748 32.4766 13.5203 34.3742 14.4625C33.6955 15.6004 32.8531 16.6323 31.8742 17.525C30.6242 18.625 28.3617 20.4125 25.2242 22.8125C24.946 23.0277 24.7638 23.3439 24.717 23.6925C24.6702 24.0411 24.7626 24.3941 24.9742 24.675C25.1932 24.9478 25.5087 25.126 25.8554 25.1725C26.2022 25.219 26.5535 25.1304 26.8367 24.925C30.0242 22.425 32.3117 20.675 33.6242 19.525C35.0621 18.1858 36.2699 16.619 37.1992 14.8875C37.2867 14.7625 37.3492 14.6125 37.4117 14.5125C38.5804 12.4591 39.4237 10.2369 39.9117 7.92503C40.1189 6.85467 40.0572 5.74962 39.7321 4.70898C39.407 3.66834 38.8288 2.72465 38.0492 1.96253ZM27.8742 4.33753C29.3829 3.604 30.9791 3.06631 32.6242 2.73753C33.2588 2.61548 33.9138 2.65203 34.5309 2.84392C35.148 3.03582 35.7082 3.37712 36.1617 3.83753C36.6278 4.28969 36.9728 4.85174 37.165 5.47205C37.3573 6.09236 37.3905 6.75103 37.2617 7.38753C36.9241 9.0262 36.3868 10.6173 35.6617 12.125C33.9788 11.3071 32.4451 10.2127 31.1242 8.88753C29.7939 7.56337 28.6953 6.02534 27.8742 4.33753Z" fill="#1F4B3F" />
                                        <path d="M22.6616 26.1624C22.4287 25.9483 22.1302 25.8194 21.8147 25.7967C21.4992 25.774 21.1853 25.8588 20.9241 26.0374L17.6741 28.4499L15.3491 30.1624L13.5366 28.3499L17.2866 24.5999C17.5107 24.3446 17.6292 24.0136 17.6181 23.6741C17.607 23.3346 17.4672 23.0121 17.2271 22.7719C16.9869 22.5317 16.6643 22.3919 16.3249 22.3809C15.9854 22.3698 15.6544 22.4883 15.3991 22.7124L11.6491 26.4624L9.82412 24.6624C12.0866 21.5874 19.4616 11.5749 22.4116 8.19985L22.5866 8.01235C22.7957 7.7562 22.9025 7.43168 22.8864 7.10142C22.8703 6.77116 22.7324 6.45858 22.4994 6.22399C22.2663 5.98941 21.9547 5.84946 21.6245 5.83115C21.2944 5.81285 20.9692 5.91748 20.7116 6.12485L20.4741 6.38735C18.7491 8.39985 15.5491 12.4999 12.7491 16.2499L12.5991 16.0999C11.3479 14.8526 9.6533 14.1522 7.88662 14.1522C6.11994 14.1522 4.42531 14.8526 3.17412 16.0999L1.24912 17.9874C0.999513 18.238 0.859375 18.5774 0.859375 18.9311C0.859375 19.2849 0.999513 19.6242 1.24912 19.8749L9.73662 28.3624L9.41162 28.7499C9.16201 29.0005 9.02187 29.3399 9.02187 29.6936C9.02187 30.0473 9.16201 30.3867 9.41162 30.6374C9.66386 30.884 10.0026 31.022 10.3554 31.022C10.7081 31.022 11.0469 30.884 11.2991 30.6374L11.6491 30.2874L20.1241 38.7499C20.3748 38.9995 20.7141 39.1396 21.0679 39.1396C21.4216 39.1396 21.761 38.9995 22.0116 38.7499L23.9116 36.8499C24.5307 36.2311 25.0218 35.4965 25.3569 34.6879C25.692 33.8793 25.8644 33.0126 25.8644 32.1374C25.8644 31.2621 25.692 30.3954 25.3569 29.5868C25.0218 28.7782 24.5307 28.0436 23.9116 27.4249L22.6616 26.1624ZM4.99912 17.9749C5.74898 17.2268 6.76493 16.8067 7.82412 16.8067C8.88331 16.8067 9.89925 17.2268 10.6491 17.9749L11.0741 18.3999L7.92412 22.7499L4.09912 18.9374L4.99912 17.9749ZM22.0116 34.9999L21.0616 35.9499L17.2491 32.0749L19.2616 30.5874L21.5866 28.8499L22.0116 29.2749C22.7597 30.0247 23.1798 31.0407 23.1798 32.0999C23.1798 33.159 22.7597 34.175 22.0116 34.9249V34.9999Z" fill="#1F4B3F" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_135_220">
                                            <rect width="40" height="40" fill="white" />
                                        </clipPath>
                                    </defs>
                                </svg>

                                <p className="xl:text-[2.38rem] z-10 text-[1.50rem] font-semibold text-[#0000004a] group-hover:text-white transition-colors">
                                    03
                                </p>
                            </div>
                            <p className="lg:text-[1.25rem] text-[1rem] mt-[20px] z-10 group-hover:text-white">
                                Promote Your Bond
                            </p>
                            <ul className="mt-[20px] list-disc group-hover:text-white z-10 ">
                                <li className="lg:text-[0.94rem] group-hover:text-white text-[0.75rem]">Share your Promise Bond link on your social media channels.</li>
                                <li className="lg:text-[0.94rem] group-hover:text-white text-[0.75rem]">Engage your audience and attract buyers who believe in your talent.</li>
                            </ul>
                        </div>
                        <div
                            className="relative flex flex-col xl:p-[40px] p-[20px] rounded-[20px] border-[#E9E9E9] border-[1px] w-full h-full group overflow-hidden"

                        >
                            <div className="absolute hidden z-[1] top-0 left-0 w-full h-full group-hover:block">
                                <img src={overlay} className="w-full h-full" />
                            </div>
                            <div className="relative flex justify-between items-center z-10">
                                <svg width="58" height="52" viewBox="0 0 58 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="38" cy="32" r="20" fill="#1DBF73" fill-opacity="0.08" />
                                    <path d="M31.856 36.5889H8.14488C6.57421 36.5889 5.06787 35.965 3.95723 34.8543C2.8466 33.7437 2.22266 32.2374 2.22266 30.6667V9.33336C2.22559 7.76359 2.85048 6.25895 3.96048 5.14896C5.07048 4.03896 6.57511 3.41407 8.14488 3.41113H33.0338V5.7778H8.14488C7.20189 5.7778 6.29752 6.1524 5.63072 6.8192C4.96393 7.48599 4.58932 8.39036 4.58932 9.33336V30.6667C4.58932 31.6097 4.96393 32.5141 5.63072 33.1808C6.29752 33.8476 7.20189 34.2222 8.14488 34.2222H31.856C32.799 34.2222 33.7034 33.8476 34.3701 33.1808C35.0369 32.5141 35.4115 31.6097 35.4115 30.6667V14.0778C35.4115 13.1348 35.0369 12.2304 34.3701 11.5636C33.7034 10.8968 32.799 10.5222 31.856 10.5222H9.33377V8.14447H31.856C32.6346 8.14447 33.4057 8.29802 34.1249 8.59633C34.8441 8.89464 35.4975 9.33186 36.0476 9.88297C36.5976 10.4341 37.0336 11.0883 37.3306 11.8081C37.6276 12.5279 37.7797 13.2991 37.7782 14.0778V30.6667C37.7782 32.2374 37.1543 33.7437 36.0436 34.8543C34.933 35.965 33.4267 36.5889 31.856 36.5889Z" fill="#1F4B3F" />
                                    <path d="M27.1113 21.1885H31.8558V23.5551H27.1113V21.1885Z" fill="#1F4B3F" />
                                </svg>


                                <p className="xl:text-[2.38rem] z-10 text-[1.50rem] font-semibold text-[#0000004a] group-hover:text-white transition-colors">
                                    04
                                </p>
                            </div>
                            <p className="lg:text-[1.25rem] text-[1rem] mt-[20px] z-10 group-hover:text-white">
                                Sell And Earn
                            </p>
                            <ul className="mt-[20px] list-disc group-hover:text-white z-10 ">
                                <li className="lg:text-[0.94rem] group-hover:text-white text-[0.75rem]">Buyers purchase your Promise Bond, and the funds (minus a small service fee) are credited to your account.</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="w-full flex flex-col gap-[40px] px-[20px] py-[40px] xl:px-[30px]">
                    <div className="grid grid-cols-1 max-w-[1200px] mx-auto md:grid-cols-2 lg:grid-cols-3 gap-[40px]">

                        <div
                            className="relative flex flex-col xl:p-[40px] lg:min-h-[344px] p-[20px] rounded-[20px] border-[#E9E9E9] border-[1px] w-full h-full group overflow-hidden"

                        >
                            <div className="absolute hidden z-[1] top-0 left-0 w-full h-full group-hover:block">
                                <img src={overlay} className="w-full h-full" />
                            </div>
                            <div className="relative flex justify-between items-center z-10">
                                <svg width="58" height="52" viewBox="0 0 58 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="38" cy="32" r="20" fill="#1DBF73" fill-opacity="0.08" />
                                    <path d="M19.9996 39.9999C18.8176 40 17.6569 39.685 16.6371 39.0874L13.9121 37.4999C10.4937 35.4972 7.65756 32.6365 5.68438 29.201C3.7112 25.7655 2.66941 21.8742 2.66211 17.9124V10.0749C2.66167 8.67496 3.10221 7.31045 3.92121 6.17507C4.7402 5.0397 5.89603 4.19115 7.22461 3.7499L17.0496 0.474895C18.9653 -0.158298 21.0339 -0.158298 22.9496 0.474895L32.7746 3.7499C34.1032 4.19115 35.259 5.0397 36.078 6.17507C36.897 7.31045 37.3376 8.67496 37.3371 10.0749V17.9249C37.3298 21.8867 36.288 25.778 34.3148 29.2135C32.3417 32.649 29.5055 35.5097 26.0871 37.5124L23.3621 39.0999C22.3411 39.6931 21.1805 40.0038 19.9996 39.9999ZM19.9996 2.6624C19.2819 2.66059 18.5686 2.77455 17.8871 2.9999L8.06211 6.2499C7.27241 6.51251 6.58429 7.0149 6.0936 7.68707C5.60292 8.35925 5.3341 9.16773 5.32461 9.9999V17.8499C5.31938 21.3568 6.23291 24.8039 7.97424 27.848C9.71558 30.892 12.224 33.4268 15.2496 35.1999L17.9746 36.7874C18.5856 37.1431 19.2801 37.3305 19.9871 37.3305C20.6942 37.3305 21.3886 37.1431 21.9996 36.7874L24.7246 35.1999C27.7393 33.4332 30.2407 30.9103 31.9813 27.8805C33.722 24.8507 34.6418 21.4191 34.6496 17.9249V10.0749C34.6401 9.24273 34.3713 8.43425 33.8806 7.76207C33.3899 7.0899 32.7018 6.58751 31.9121 6.32489L22.1121 3.01239C21.4314 2.78281 20.718 2.66462 19.9996 2.6624Z" fill="#1F4B3F" />
                                    <path d="M28.0002 12.9005C27.8554 12.8987 27.7118 12.8733 27.5752 12.8255L22.1127 11.013C20.7449 10.561 19.2679 10.561 17.9002 11.013L12.4252 12.838C12.1119 12.8908 11.7902 12.8304 11.5174 12.6677C11.2446 12.5049 11.0387 12.2504 10.9364 11.9496C10.8342 11.6489 10.8423 11.3216 10.9593 11.0263C11.0764 10.731 11.2947 10.487 11.5752 10.338L17.0502 8.51298C18.9659 7.87979 21.0345 7.87979 22.9502 8.51298L28.4252 10.338C28.7221 10.4418 28.9729 10.6468 29.1336 10.9172C29.2943 11.1876 29.3546 11.5059 29.3038 11.8163C29.2531 12.1267 29.0946 12.4093 28.8562 12.6145C28.6177 12.8196 28.3147 12.9341 28.0002 12.938V12.9005Z" fill="#1F4B3F" />
                                </svg>


                                <p className="xl:text-[2.38rem] z-10 text-[1.50rem] font-semibold text-[#0000004a] group-hover:text-white transition-colors">
                                    05
                                </p>
                            </div>
                            <p className="lg:text-[1.25rem] text-[1rem] mt-[20px] z-10 group-hover:text-white">
                                Deliver on Your Promise
                            </p>
                            <ul className="mt-[20px] list-disc group-hover:text-white z-10 ">
                                <li className="lg:text-[0.94rem] group-hover:text-white text-[0.75rem]">Complete buyer requests before the bond expires.</li>
                                <li className="lg:text-[0.94rem] group-hover:text-white text-[0.75rem]">Upload a video to show progress and ensure accountability.</li>
                            </ul>
                        </div>
                        <div
                            className="relative flex flex-col xl:p-[40px] lg:min-h-[344px] p-[20px] rounded-[20px] border-[#E9E9E9] border-[1px] w-full h-full group overflow-hidden"

                        >
                            <div className="absolute hidden z-[1] top-0 left-0 w-full h-full group-hover:block">
                                <img src={overlay} className="w-full h-full" />
                            </div>
                            <div className="relative flex justify-between items-center z-10">
                                <svg className="md:w-[58px] md:h-[52px] w-[40.15px] h-[36px]"    viewBox="0 0 58 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="38" cy="32" r="20" fill="#1DBF73" fill-opacity="0.08" />
                                    <g clip-path="url(#clip0_135_259)">
                                        <path d="M1.33763 30.8498C0.982907 30.8498 0.642708 30.7089 0.391878 30.4581C0.141049 30.2072 0.000133746 29.867 0.000133746 29.5123V12.0123C-0.00645036 10.7813 0.230121 9.5611 0.696272 8.42175C1.16242 7.28239 1.84898 6.2463 2.71654 5.37294C3.58409 4.49957 4.61558 3.80612 5.7518 3.33238C6.88802 2.85864 8.10661 2.61393 9.33763 2.6123H30.6626C33.1381 2.61561 35.5112 3.60044 37.2616 5.35085C39.012 7.10125 39.9968 9.47436 40.0001 11.9498C40.0181 12.1355 39.9971 12.3228 39.9384 12.4999C39.8797 12.677 39.7846 12.8398 39.6592 12.9779C39.5339 13.116 39.381 13.2264 39.2104 13.3019C39.0399 13.3774 38.8554 13.4165 38.6689 13.4165C38.4823 13.4165 38.2979 13.3774 38.1273 13.3019C37.9568 13.2264 37.8039 13.116 37.6785 12.9779C37.5532 12.8398 37.4581 12.677 37.3994 12.4999C37.3406 12.3228 37.3196 12.1355 37.3376 11.9498C37.3343 10.1838 36.6313 8.4911 35.3826 7.24236C34.1338 5.99361 32.4411 5.29061 30.6751 5.2873H9.33763C7.56948 5.2873 5.87356 5.98884 4.62211 7.23795C3.37066 8.48705 2.66595 10.1817 2.66263 11.9498V29.4498C2.67105 29.6296 2.6431 29.8092 2.58044 29.9779C2.51779 30.1467 2.42173 30.301 2.29801 30.4317C2.1743 30.5624 2.02547 30.6668 1.86045 30.7387C1.69543 30.8105 1.51761 30.8483 1.33763 30.8498Z" fill="#1F4B3F" />
                                        <path d="M4.0259 38.8629C3.50214 38.8584 2.98424 38.7522 2.5009 38.5504C1.75048 38.2564 1.10838 37.7391 0.661302 37.0685C0.214227 36.3979 -0.0162848 35.6062 0.000894987 34.8004C0.0329887 34.4696 0.187105 34.1626 0.43321 33.9392C0.679315 33.7158 0.999777 33.5921 1.33214 33.5921C1.66451 33.5921 1.98497 33.7158 2.23108 33.9392C2.47719 34.1626 2.6313 34.4696 2.6634 34.8004C2.65702 35.0681 2.73264 35.3312 2.8801 35.5547C3.02756 35.7781 3.23981 35.9511 3.48839 36.0504C3.73248 36.1826 4.01361 36.2298 4.28747 36.1845C4.56133 36.1393 4.81233 36.0041 5.0009 35.8004L8.22589 32.5754C9.47901 31.3308 11.1722 30.6301 12.9384 30.6254H30.6634C32.4294 30.6221 34.1221 29.9191 35.3708 28.6704C36.6196 27.4216 37.3226 25.7289 37.3259 23.9629V17.2879C37.3079 17.1023 37.3289 16.9149 37.3876 16.7378C37.4463 16.5608 37.5414 16.398 37.6668 16.2599C37.7921 16.1217 37.945 16.0114 38.1156 15.9358C38.2861 15.8603 38.4706 15.8213 38.6571 15.8213C38.8437 15.8213 39.0281 15.8603 39.1987 15.9358C39.3693 16.0114 39.5221 16.1217 39.6475 16.2599C39.7729 16.398 39.868 16.5608 39.9267 16.7378C39.9854 16.9149 40.0064 17.1023 39.9884 17.2879V23.9504C39.9851 26.4259 39.0003 28.799 37.2499 30.5494C35.4994 32.2998 33.1263 33.2846 30.6509 33.2879H12.8759C12.3436 33.282 11.8154 33.3816 11.3219 33.5812C10.8284 33.7807 10.3794 34.0762 10.0009 34.4504L6.8259 37.6754C6.46123 38.0491 6.02588 38.3466 5.54518 38.5504C5.06448 38.7543 4.54803 38.8605 4.0259 38.8629Z" fill="#1F4B3F" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_135_259">
                                            <rect width="40" height="40" fill="white" />
                                        </clipPath>
                                    </defs>
                                </svg>



                                <p className="xl:text-[2.38rem] z-10 text-[1.50rem] font-semibold text-[#0000004a] group-hover:text-white transition-colors">
                                    06
                                </p>
                            </div>
                            <p className="lg:text-[1.25rem] text-[1rem] mt-[20px] z-10 group-hover:text-white">
                                Get Feedback and Level Up
                            </p>
                            <ul className="mt-[20px] list-disc group-hover:text-white z-10 ">
                                <li className="lg:text-[0.94rem] group-hover:text-white text-[0.75rem]">Buyers evaluate your performance on a scale of 1 to 10.</li>
                                <li className="lg:text-[0.94rem] group-hover:text-white text-[0.75rem]">Complete missions and earn positive feedback to level up and unlock more bonds.</li>
                            </ul>
                        </div>
                        <div
                            className="relative flex flex-col xl:p-[40px] lg:min-h-[344px] p-[20px] rounded-[20px] border-[#E9E9E9] border-[1px] w-full h-full group overflow-hidden"

                        >
                            <div className="absolute hidden z-[1] top-0 left-0 w-full h-full group-hover:block">
                                <img src={overlay} className="w-full h-full" />
                            </div>
                            <div className="relative flex justify-between items-center z-10">
                                <svg className="md:w-[58px] md:h-[52px] w-[40.15px] h-[36px]" viewBox="0 0 58 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="38" cy="32" r="20" fill="#1DBF73" fill-opacity="0.08" />
                                    <path d="M27.7501 3H35.9473L36.1273 3.0252L36.3055 3.0756L36.4135 3.1224C36.5575 3.1848 36.6889 3.2748 36.8077 3.3924L36.8797 3.4716L36.9589 3.5742L37.0561 3.7362L37.1263 3.8982L37.1605 4.0134L37.1857 4.1286L37.2019 4.2996V12.4572C37.2018 12.7992 37.0719 13.1285 36.8384 13.3784C36.6048 13.6284 36.2852 13.7803 35.9439 13.8036C35.6027 13.827 35.2653 13.7199 35 13.504C34.7346 13.2882 34.5611 12.9796 34.5145 12.6408L34.5019 12.4572V7.6062L22.9099 19.1982C22.6813 19.4268 22.3783 19.5658 22.0559 19.59C21.7335 19.6141 21.4132 19.5217 21.1531 19.3296L21.0019 19.2L15.5479 13.962L5.30591 24.2022C5.06502 24.4437 4.74162 24.5851 4.40073 24.598C4.05984 24.6108 3.72674 24.4941 3.46839 24.2713C3.21005 24.0485 3.04562 23.7362 3.00816 23.3971C2.97071 23.0581 3.06301 22.7174 3.26651 22.4436L3.39791 22.2924L14.5939 11.0964C14.8227 10.868 15.1259 10.7294 15.4483 10.7056C15.7706 10.6818 16.0909 10.7745 16.3507 10.9668L16.5019 11.0964L21.9559 16.3344L32.5903 5.7H27.7483C27.4224 5.69955 27.1076 5.58121 26.8622 5.36683C26.6167 5.15244 26.457 4.85649 26.4127 4.5336L26.4001 4.35C26.4001 4.02377 26.5183 3.70858 26.7327 3.46272C26.9471 3.21687 27.2433 3.05697 27.5665 3.0126L27.7501 3ZM4.35191 30C4.70995 30 5.05333 30.1422 5.3065 30.3954C5.55968 30.6486 5.70191 30.992 5.70191 31.35V37.65C5.70191 38.008 5.55968 38.3514 5.3065 38.6046C5.05333 38.8578 4.70995 39 4.35191 39C3.99386 39 3.65049 38.8578 3.39731 38.6046C3.14414 38.3514 3.00191 38.008 3.00191 37.65V31.35C3.00191 30.992 3.14414 30.6486 3.39731 30.3954C3.65049 30.1422 3.99386 30 4.35191 30ZM14.7019 24.15C14.7019 23.792 14.5597 23.4486 14.3065 23.1954C14.0533 22.9422 13.7099 22.8 13.3519 22.8C12.9939 22.8 12.6505 22.9422 12.3973 23.1954C12.1441 23.4486 12.0019 23.792 12.0019 24.15V37.65C12.0019 38.008 12.1441 38.3514 12.3973 38.6046C12.6505 38.8578 12.9939 39 13.3519 39C13.7099 39 14.0533 38.8578 14.3065 38.6046C14.5597 38.3514 14.7019 38.008 14.7019 37.65V24.15ZM22.3519 26.4C22.7099 26.4 23.0533 26.5422 23.3065 26.7954C23.5597 27.0486 23.7019 27.392 23.7019 27.75V37.65C23.7019 38.008 23.5597 38.3514 23.3065 38.6046C23.0533 38.8578 22.7099 39 22.3519 39C21.9939 39 21.6505 38.8578 21.3973 38.6046C21.1441 38.3514 21.0019 38.008 21.0019 37.65V27.75C21.0019 27.392 21.1441 27.0486 21.3973 26.7954C21.6505 26.5422 21.9939 26.4 22.3519 26.4ZM32.7019 18.75C32.7019 18.392 32.5597 18.0486 32.3065 17.7954C32.0533 17.5422 31.7099 17.4 31.3519 17.4C30.9939 17.4 30.6505 17.5422 30.3973 17.7954C30.1441 18.0486 30.0019 18.392 30.0019 18.75V37.65C30.0019 38.008 30.1441 38.3514 30.3973 38.6046C30.6505 38.8578 30.9939 39 31.3519 39C31.7099 39 32.0533 38.8578 32.3065 38.6046C32.5597 38.3514 32.7019 38.008 32.7019 37.65V18.75Z" fill="#1F4B3F" />
                                </svg>



                                <p className="xl:text-[2.38rem] z-10 text-[1.50rem] font-semibold text-[#0000004a] group-hover:text-white transition-colors">
                                    07
                                </p>
                            </div>
                            <p className="lg:text-[1.25rem] text-[1rem] mt-[20px] z-10 group-hover:text-white">
                                Repeat And Grow
                            </p>
                            <ul className="mt-[20px] list-disc group-hover:text-white z-10 ">
                                <li className="lg:text-[0.94rem] group-hover:text-white text-[0.75rem]">With each level-up, you can issue additional bonds and expand your reach.</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className={`flex flex-col  px-[20px] lg:gap-[40px] my-[40px] lg:px-[3rem] lg:flex-row  py-[2rem]`}>
                    <div className="w-full lg:w-1/2 max-h-[550px]">
                        <h2 className="font-bold xl:text-[2rem] text-[1.50rem] mb-[10px] text-black">
                            Join World's Best Marketplace for Workers
                        </h2>
                    </div>
                    <div className="w-full lg:w-1/2">

                        <p className="lg:text-[0.94rem] text-[0.75rem] text-[#222222]">
                            It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.                              </p>
                        <div className="flex flex-col mt-[20px] mb-[40px] gap-[20px]">
                            <div className="gap-[10px] flex items-center">
                                <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15.7657 0.359328C15.4533 0.0468906 14.9468 0.0468906 14.6343 0.359328L5.04983 9.94392L1.3657 6.2598C1.0533 5.94736 0.546797 5.94739 0.234328 6.2598C-0.0781094 6.5722 -0.0781094 7.0787 0.234328 7.39114L4.48414 11.6409C4.79645 11.9533 5.30333 11.9531 5.61552 11.6409L15.7657 1.4907C16.0781 1.1783 16.0781 0.671766 15.7657 0.359328Z" fill="#222222" />
                                </svg>
                                <p className="lg:text-[0.94rem] text-[0.75rem] text-[#222222]">
                                    Connect to freelancers with proven business experience
                                </p>
                            </div>
                            <div className="gap-[10px] flex items-center">
                                <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15.7657 0.359328C15.4533 0.0468906 14.9468 0.0468906 14.6343 0.359328L5.04983 9.94392L1.3657 6.2598C1.0533 5.94736 0.546797 5.94739 0.234328 6.2598C-0.0781094 6.5722 -0.0781094 7.0787 0.234328 7.39114L4.48414 11.6409C4.79645 11.9533 5.30333 11.9531 5.61552 11.6409L15.7657 1.4907C16.0781 1.1783 16.0781 0.671766 15.7657 0.359328Z" fill="#222222" />
                                </svg>
                                <p className="lg:text-[0.94rem] text-[0.75rem] text-[#222222]">
                                    Get matched with the perfect talent by a customer success manager
                                </p>
                            </div>
                            <div className="gap-[10px] flex items-center">
                                <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15.7657 0.359328C15.4533 0.0468906 14.9468 0.0468906 14.6343 0.359328L5.04983 9.94392L1.3657 6.2598C1.0533 5.94736 0.546797 5.94739 0.234328 6.2598C-0.0781094 6.5722 -0.0781094 7.0787 0.234328 7.39114L4.48414 11.6409C4.79645 11.9533 5.30333 11.9531 5.61552 11.6409L15.7657 1.4907C16.0781 1.1783 16.0781 0.671766 15.7657 0.359328Z" fill="#222222" />
                                </svg>
                                <p className="lg:text-[0.94rem] text-[0.75rem] text-[#222222]">
                                    Unmatched quality of remote, hybrid, and flexible jobs
                                </p>
                            </div>
                        </div>
                       <div className="flex justify-center md:justify-start items-center w-full md:w-auto">
                       <Link to="/signup" class="bg-white text-center justify-center  w-[164px] h-[37px] md:h-auto   rounded-[3.8rem] flex gap-[12px] items-center xl:px-[20px] p-[10px] xl:py-[10px] lg:text-[0.94rem] text-[0.75rem] text-black border border-black font-bold  md:w-fit ">
                            Get Started
                            <svg className="md:w-[16px] md:h-[17px] w-[9px] h-[9px]" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15.5553 0.101562H5.77756C5.53189 0.101562 5.3331 0.300354 5.3331 0.546021C5.3331 0.791687 5.53189 0.990479 5.77756 0.990479H14.4824L0.129975 15.3429C-0.0436504 15.5165 -0.0436504 15.7978 0.129975 15.9714C0.216766 16.0581 0.330516 16.1016 0.444225 16.1016C0.557933 16.1016 0.671641 16.0581 0.758475 15.9714L15.1109 1.61894V10.3238C15.1109 10.5695 15.3097 10.7683 15.5553 10.7683C15.801 10.7683 15.9998 10.5695 15.9998 10.3238V0.546021C15.9998 0.300354 15.801 0.101562 15.5553 0.101562Z" fill="black" />
                            </svg>
                        </Link>
                       </div>
                    </div>

                </div>
                <div className="w-full lg:mb-[20rem] lg:min-h-[700px] bg-[#1dbf732f] relative overflow-hidden">
                    <div className="absolute hidden lg:block left-0 top-0">
                        <img src={img} alt="vector" />
                    </div>
                    <div className="absolute right-0 hidden lg:block bottom-0">
                        <img src={img2} alt="vector" />
                    </div>
                    <div className="flex gap-[20px] flex-col lg:flex-row px-[20px] py-[40px] lg:px[30px] max-w-[1200px] lg:min-h-[700px] justify-center items-center mx-auto">
                        <div className="flex flex-col lg:w-1/2 w-full h-full gap-[10px]">
                            <h2 className="xl:text-[2.38rem] text-[1.50rem]  font-semibold">
                                How It Works For Buyers?
                            </h2>
                            <p className="lg:text-[0.94rem] text-[0.75rem] text-[#1F4B3F]">
                                Invest in talent you trust and benefit from their commitment <br /> to deliver exceptional value.
                            </p>
                            <div className="flex justify-center md:justify-start items-center w-full md:w-auto">
                            <Link to="/signup" class="bg-black justify-center mt-[40px] rounded-[3.8rem] flex gap-[12px] items-center xl:px-[20px] p-[10px] xl:py-[10px] lg:text-[0.94rem] text-[0.75rem] text-white border border-black font-bold  md:w-fit md:h-fit w-[286px] h-[37px]">
                                Explore Promise Bonds
                                <svg className="md:w-[16px] md:h-[17px] w-[9px] h-[9px]" width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15.5553 0.101562H5.77756C5.53189 0.101562 5.3331 0.300354 5.3331 0.546021C5.3331 0.791687 5.53189 0.990479 5.77756 0.990479H14.4824L0.129975 15.3429C-0.0436504 15.5165 -0.0436504 15.7978 0.129975 15.9714C0.216766 16.0581 0.330516 16.1016 0.444225 16.1016C0.557933 16.1016 0.671641 16.0581 0.758475 15.9714L15.1109 1.61894V10.3238C15.1109 10.5695 15.3097 10.7683 15.5553 10.7683C15.801 10.7683 15.9998 10.5695 15.9998 10.3238V0.546021C15.9998 0.300354 15.801 0.101562 15.5553 0.101562Z" fill="white" />
                                </svg>
                            </Link>
                                </div>
                            
                        </div>
                        <div className="flex lg:flex-row flex-col lg:w-1/2 w-full relative">
                            <div className="absolute hidden lg:block top-[50%] w-[400px] z-[1] translate-y-[-50%]">
                                <img src={img3} alt="vector" className="w-full" />
                            </div>
                            <div className="flex flex-col gap-[40px] z-10 lg:w-1/2 w-full">
                                <div className="flex bg-white flex-col gap-[10px] p-[20px] rounded-[20px]">
                                    <h2 className="xl:text-[2.38rem] text-center text-[1.50rem]  font-semibold">
                                        4.9/5
                                    </h2>
                                    <p className="lg:text-[0.94rem] text-center text-[0.75rem] text-gray-600">
                                        Customers rate professionals on <br /> Promise Bond                                    </p>
                                </div>
                                <div className="flex bg-white flex-col gap-[10px] p-[20px] rounded-[20px]">
                                    <h2 className="xl:text-[2.38rem] text-center text-[1.50rem]  font-semibold">
                                        96%
                                    </h2>
                                    <p className="lg:text-[0.94rem] text-center text-[0.75rem] text-gray-600">
                                        96% of customers are satisfied <br /> through to see their <br /> freelancers                                    </p>
                                </div>
                            </div>
                            <div className="flex  items-center z-10 gap-[10px] lg:mt-0 mt-[40px] lg:w-1/2 w-full">
                                <div className="flex bg-white flex-col gap-[10px] p-[20px] w-full rounded-[20px]">
                                    <h2 className="xl:text-[2.38rem] text-center text-[1.50rem]  font-semibold">
                                        Award
                                    </h2>
                                    <p className="lg:text-[0.94rem] text-center text-[0.75rem] text-gray-600">
                                        G2’s 2023 Best <br /> Software Awards <br />                                     </p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full bg-[#1dbf735e] lg:p-[40px]  mx-auto lg:mt-[9rem] px-[20px] pt-[20px]">
                <div className="flex lg:flex-row flex-col lg:gap-[40px] gap-[20px] max-w-[980px] mx-auto">
                    <div className="flex lg:w-[50%] justify-center w-full flex-col gap-[20px]">
                        <div>
                            <h2 className="xl:text-[2.38rem] text-[1.50rem]  font-bold">Ready To Take The First </h2>
                            <h2 className="xl:text-[2.38rem] text-[1.50rem]  font-bold">Step?</h2>
                            <p className="lg:text-[0.94rem]  text-[0.75rem]">Start your journey with Promise Bonds today.</p>
                        </div>
                        <div className="flex gap-[10px] justify-center md:flex hidden mt-[20px] flex-row">
                            <Link to="/search?filter=bond&search=" className="bg-black border border-black px-[20px] py-[10px] xl:py-[11px] lg:text-[0.94rem] text-[0.75rem] flex gap-[12px] items-center text-white font-bold rounded-[3.75rem] w-fit">
                                Find Bonds
                                <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15.5553 0.101562H5.77756C5.53189 0.101562 5.3331 0.300354 5.3331 0.546021C5.3331 0.791687 5.53189 0.990479 5.77756 0.990479H14.4824L0.129975 15.3429C-0.0436504 15.5165 -0.0436504 15.7978 0.129975 15.9714C0.216766 16.0581 0.330516 16.1016 0.444225 16.1016C0.557933 16.1016 0.671641 16.0581 0.758475 15.9714L15.1109 1.61894V10.3238C15.1109 10.5695 15.3097 10.7683 15.5553 10.7683C15.801 10.7683 15.9998 10.5695 15.9998 10.3238V0.546021C15.9998 0.300354 15.801 0.101562 15.5553 0.101562Z" fill="white" />
                                </svg>
                            </Link>
                            <Link to="/signup" className="bg-white border border-black px-[20px] py-[10px] xl:py-[11px] lg:text-[0.94rem] text-[0.75rem] flex gap-[12px] items-center text-black font-bold rounded-[3.75rem] w-fit">
                                Find Talent
                                <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15.5553 0.101562H5.77756C5.53189 0.101562 5.3331 0.300354 5.3331 0.546021C5.3331 0.791687 5.53189 0.990479 5.77756 0.990479H14.4824L0.129975 15.3429C-0.0436504 15.5165 -0.0436504 15.7978 0.129975 15.9714C0.216766 16.0581 0.330516 16.1016 0.444225 16.1016C0.557933 16.1016 0.671641 16.0581 0.758475 15.9714L15.1109 1.61894V10.3238C15.1109 10.5695 15.3097 10.7683 15.5553 10.7683C15.801 10.7683 15.9998 10.5695 15.9998 10.3238V0.546021C15.9998 0.300354 15.801 0.101562 15.5553 0.101562Z" fill="black" />
                                </svg>
                            </Link>
                        </div>
                        <div className="flex gap-[10px] md:hidden justify-center mt-[20px] flex-row">
                            <Link to="/search?filter=bond&search=" className="bg-black border border-black px-[20px] py-[10px] xl:py-[11px] lg:text-[0.94rem] text-[0.75rem] flex gap-[12px] items-center text-white font-bold rounded-[3.75rem] w-fit">
                               Get Started
                                <svg width="9" height="9" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15.5553 0.101562H5.77756C5.53189 0.101562 5.3331 0.300354 5.3331 0.546021C5.3331 0.791687 5.53189 0.990479 5.77756 0.990479H14.4824L0.129975 15.3429C-0.0436504 15.5165 -0.0436504 15.7978 0.129975 15.9714C0.216766 16.0581 0.330516 16.1016 0.444225 16.1016C0.557933 16.1016 0.671641 16.0581 0.758475 15.9714L15.1109 1.61894V10.3238C15.1109 10.5695 15.3097 10.7683 15.5553 10.7683C15.801 10.7683 15.9998 10.5695 15.9998 10.3238V0.546021C15.9998 0.300354 15.801 0.101562 15.5553 0.101562Z" fill="white" />
                                </svg>
                            </Link>
                           
                        </div>
                    </div>
                    <div className="lg:w-[50%] w-full lg:mt-[-11rem]">
                        <img src={bsns} className="w-full" />
                    </div>
                </div>
            </div>
            <HomeFooter />
        </div>
    )
}