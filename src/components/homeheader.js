import { useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function HomeHeader() {
    const location = useLocation();
    const isHomePage = location.pathname === "/";
    const [showmenu, setShoMenu] = useState(false);
    const menutoggle = () => {
        setShoMenu(!showmenu);
    }

    return (
        <div
            className={`w-full z-50 ${isHomePage ? "absolute" : "relative"
                } top-0 left-0 lg:px-[40px] px-[20px] py-[40px] items-center flex justify-between`}
        >
            <div onClick={menutoggle} className="flex lg:hidden items-center hover:cursor-pointer">
            <svg width={25} height={25} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M19 12.75H5C4.80109 12.75 4.61032 12.671 4.46967 12.5303C4.32902 12.3897 4.25 12.1989 4.25 12C4.25 11.8011 4.32902 11.6103 4.46967 11.4697C4.61032 11.329 4.80109 11.25 5 11.25H19C19.1989 11.25 19.3897 11.329 19.5303 11.4697C19.671 11.6103 19.75 11.8011 19.75 12C19.75 12.1989 19.671 12.3897 19.5303 12.5303C19.3897 12.671 19.1989 12.75 19 12.75Z" fill="#ffffff"></path> <path d="M19 8.25H5C4.80109 8.25 4.61032 8.17098 4.46967 8.03033C4.32902 7.88968 4.25 7.69891 4.25 7.5C4.25 7.30109 4.32902 7.11032 4.46967 6.96967C4.61032 6.82902 4.80109 6.75 5 6.75H19C19.1989 6.75 19.3897 6.82902 19.5303 6.96967C19.671 7.11032 19.75 7.30109 19.75 7.5C19.75 7.69891 19.671 7.88968 19.5303 8.03033C19.3897 8.17098 19.1989 8.25 19 8.25Z" fill="#ffffff"></path> <path d="M19 17.25H5C4.80109 17.25 4.61032 17.171 4.46967 17.0303C4.32902 16.8897 4.25 16.6989 4.25 16.5C4.25 16.3011 4.32902 16.1103 4.46967 15.9697C4.61032 15.829 4.80109 15.75 5 15.75H19C19.1989 15.75 19.3897 15.829 19.5303 15.9697C19.671 16.1103 19.75 16.3011 19.75 16.5C19.75 16.6989 19.671 16.8897 19.5303 17.0303C19.3897 17.171 19.1989 17.25 19 17.25Z" fill="#ffffff"></path> </g></svg>
            </div>
            <div className="lg:w-fit">
                <svg width="200" height="40" viewBox="0 0 258 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.56817 24.541V20.7178H12.6541C14.086 20.7178 15.186 20.3849 15.9538 19.7191C16.732 19.0533 17.1212 18.1014 17.1212 16.8635V16.8322C17.1212 15.6047 16.732 14.658 15.9538 13.9922C15.186 13.3264 14.086 12.9935 12.6541 12.9935H2.56817V9.09233H13.4946C15.3105 9.09233 16.8773 9.41482 18.1951 10.0598C19.5129 10.6944 20.5298 11.5891 21.2458 12.7438C21.9618 13.8882 22.3198 15.2302 22.3198 16.7698V16.801C22.3198 18.3303 21.9618 19.6775 21.2458 20.8427C20.5298 22.0078 19.5129 22.9181 18.1951 23.5735C16.8773 24.2185 15.3105 24.541 13.4946 24.541H2.56817ZM0 31.6099V9.09233H5.12078V31.6099H0Z" fill="#1DBF73" />
                    <path d="M24.779 31.6099V14.9909L29.7441 15.0065V18.3615H29.8375C30.1799 17.186 30.8077 16.2757 31.7208 15.6307C32.634 14.9753 33.7598 14.6476 35.0984 14.6476C35.4097 14.6476 35.7054 14.6684 35.9856 14.71C36.2761 14.7412 36.5303 14.7828 36.7482 14.8349V18.8609C36.4785 18.7984 36.1672 18.7516 35.8144 18.7204C35.4719 18.6892 35.1191 18.6736 34.756 18.6736C33.7391 18.6736 32.8519 18.8609 32.0944 19.2354C31.3473 19.6099 30.7662 20.1717 30.3512 20.9207C29.9465 21.6593 29.7441 22.58 29.7441 23.6827V31.6099H24.779Z" fill="#1DBF73" />
                    <path d="M47.7992 32C45.6824 32 43.8354 31.6463 42.2581 30.9389C40.6809 30.2315 39.4565 29.2276 38.5849 27.9272C37.7133 26.6268 37.2774 25.0871 37.2774 23.3082V23.277C37.2774 21.498 37.7133 19.9584 38.5849 18.658C39.4669 17.3576 40.6965 16.3537 42.2737 15.6463C43.8509 14.9389 45.6928 14.5852 47.7992 14.5852C49.916 14.5852 51.763 14.9389 53.3402 15.6463C54.9174 16.3537 56.1419 17.3576 57.0135 18.658C57.8955 19.9584 58.3365 21.498 58.3365 23.277V23.3082C58.3365 25.0975 57.8955 26.6424 57.0135 27.9428C56.1419 29.2328 54.9174 30.2315 53.3402 30.9389C51.763 31.6463 49.916 32 47.7992 32ZM47.8147 28.3953C48.8939 28.3953 49.8433 28.1977 50.6631 27.8023C51.4932 27.3966 52.1365 26.8192 52.5931 26.0702C53.0497 25.3108 53.278 24.3901 53.278 23.3082V23.277C53.278 22.2055 53.0497 21.29 52.5931 20.5306C52.1365 19.7711 51.4932 19.1938 50.6631 18.7984C49.8433 18.4031 48.8887 18.2055 47.7992 18.2055C46.72 18.2055 45.7654 18.4083 44.9353 18.814C44.1155 19.2094 43.4722 19.7867 43.0053 20.5462C42.5487 21.2952 42.3204 22.2055 42.3204 23.277V23.3082C42.3204 24.3901 42.5487 25.3108 43.0053 26.0702C43.4722 26.8192 44.1155 27.3966 44.9353 27.8023C45.7654 28.1977 46.7252 28.3953 47.8147 28.3953Z" fill="#1DBF73" />
                    <path d="M60.749 31.6099V14.9753H65.6986V18.143H65.792C66.3212 16.9987 67.1253 16.1196 68.2045 15.5059C69.294 14.8921 70.56 14.5852 72.0023 14.5852C73.0295 14.5852 73.9479 14.7412 74.7572 15.0533C75.577 15.3654 76.2722 15.8127 76.8429 16.3953C77.4136 16.9675 77.8494 17.6645 78.1503 18.4863H78.2437C78.6276 17.6437 79.1465 16.9363 79.8002 16.3641C80.4643 15.7815 81.2321 15.3394 82.1038 15.0377C82.9858 14.736 83.9352 14.5852 84.9521 14.5852C86.4567 14.5852 87.733 14.8765 88.781 15.459C89.8394 16.0416 90.6384 16.8687 91.178 17.9402C91.7279 19.0117 92.0029 20.2861 92.0029 21.7633V31.6099H87.0533V22.7932C87.0533 21.8466 86.9081 21.0455 86.6175 20.3901C86.327 19.7243 85.8912 19.2198 85.3101 18.8765C84.7394 18.5332 84.013 18.3615 83.131 18.3615C82.2179 18.3615 81.4345 18.554 80.7808 18.9389C80.1271 19.3238 79.629 19.87 79.2866 20.5774C78.9441 21.2744 78.7729 22.0962 78.7729 23.0429V31.6099H73.979V22.7464C73.979 21.8101 73.8337 21.0195 73.5432 20.3745C73.263 19.7191 72.8324 19.2198 72.2513 18.8765C71.6702 18.5332 70.9439 18.3615 70.0723 18.3615C69.1695 18.3615 68.3861 18.554 67.722 18.9389C67.0683 19.3238 66.565 19.87 66.2122 20.5774C65.8698 21.2848 65.6986 22.117 65.6986 23.0741V31.6099H60.749Z" fill="#1DBF73" />
                    <path d="M95.1159 31.6099V14.9909H100.081V31.6099H95.1159ZM97.6062 12.8531C96.8176 12.8531 96.1639 12.619 95.6451 12.1508C95.1366 11.6827 94.8824 11.1053 94.8824 10.4187C94.8824 9.74252 95.1366 9.17035 95.6451 8.70221C96.1639 8.23407 96.8176 8 97.6062 8C98.3948 8 99.0433 8.23407 99.5518 8.70221C100.06 9.17035 100.314 9.74252 100.314 10.4187C100.314 11.1053 100.06 11.6827 99.5518 12.1508C99.0433 12.619 98.3948 12.8531 97.6062 12.8531Z" fill="#1DBF73" />
                    <path d="M112.408 32C110.406 32 108.693 31.7919 107.272 31.3758C105.85 30.9597 104.745 30.3615 103.957 29.5813C103.168 28.7906 102.706 27.844 102.571 26.7412L102.556 26.6164H107.412L107.428 26.7256C107.604 27.4434 108.112 27.9792 108.953 28.3329C109.793 28.6762 110.966 28.8479 112.47 28.8479C113.352 28.8479 114.094 28.775 114.696 28.6294C115.308 28.4733 115.77 28.2497 116.081 27.9584C116.403 27.6671 116.564 27.3186 116.564 26.9129V26.8973C116.564 26.3875 116.351 26.0078 115.926 25.7581C115.5 25.498 114.748 25.3056 113.669 25.1808L109.124 24.7282C107.775 24.5722 106.649 24.2913 105.747 23.8856C104.844 23.4694 104.169 22.9337 103.723 22.2783C103.277 21.6229 103.054 20.8427 103.054 19.9376V19.922C103.054 18.8088 103.401 17.857 104.097 17.0663C104.792 16.2653 105.793 15.6515 107.101 15.225C108.408 14.7984 109.97 14.5852 111.786 14.5852C113.695 14.5852 115.319 14.7984 116.657 15.225C117.996 15.6515 119.028 16.2549 119.755 17.0351C120.491 17.8153 120.901 18.736 120.984 19.7971V19.9688H116.408L116.393 19.8752C116.289 19.2094 115.838 18.6892 115.039 18.3147C114.25 17.9402 113.181 17.7529 111.832 17.7529C110.981 17.7529 110.265 17.8309 109.684 17.987C109.103 18.1326 108.662 18.3511 108.361 18.6424C108.06 18.9233 107.91 19.2666 107.91 19.6723V19.6879C107.91 20.0104 108.003 20.2861 108.19 20.515C108.387 20.7438 108.693 20.9311 109.109 21.0767C109.534 21.212 110.094 21.3212 110.789 21.4044L115.412 21.857C117.591 22.0858 119.153 22.58 120.097 23.3394C121.052 24.0884 121.529 25.1391 121.529 26.4915V26.5072C121.529 27.6411 121.166 28.619 120.44 29.4408C119.713 30.2627 118.67 30.8973 117.311 31.3446C115.952 31.7815 114.317 32 112.408 32Z" fill="#1DBF73" />
                    <path d="M133.732 32C131.553 32 129.68 31.6619 128.113 30.9857C126.546 30.2991 125.337 29.3108 124.486 28.0208C123.646 26.7308 123.226 25.1756 123.226 23.355V23.3394C123.226 21.5501 123.656 20 124.518 18.6892C125.379 17.3784 126.577 16.3693 128.113 15.6619C129.659 14.9441 131.454 14.5904 133.498 14.6008C135.594 14.6112 137.395 14.9805 138.899 15.7087C140.414 16.4369 141.576 17.4616 142.386 18.7828C143.206 20.104 143.615 21.6489 143.615 23.4174V24.4005H125.763V21.6385H140.456L138.93 23.7139V22.7152C138.93 21.7373 138.718 20.8947 138.292 20.1873C137.867 19.4798 137.255 18.9337 136.456 18.5488C135.657 18.1638 134.702 17.9714 133.592 17.9714C132.43 17.9714 131.433 18.1586 130.603 18.5332C129.773 18.9077 129.135 19.4642 128.689 20.2029C128.253 20.9311 128.035 21.8309 128.035 22.9025V23.6671C128.035 24.8635 128.289 25.8257 128.798 26.554C129.317 27.2822 130.012 27.8127 130.884 28.1456C131.766 28.4785 132.762 28.645 133.872 28.645C134.619 28.645 135.309 28.5618 135.942 28.3953C136.585 28.2289 137.141 27.9948 137.607 27.6931C138.074 27.381 138.422 27.0117 138.65 26.5852L138.713 26.4915H143.366L143.32 26.6476C143.071 27.4902 142.661 28.2445 142.09 28.9103C141.53 29.5657 140.829 30.1274 139.989 30.5956C139.159 31.0533 138.214 31.4018 137.156 31.6411C136.098 31.8804 134.956 32 133.732 32Z" fill="#1DBF73" />
                    <path d="M156.986 31.6099V27.9272H168.394C169.712 27.9272 170.724 27.6671 171.43 27.1469C172.146 26.6268 172.504 25.8674 172.504 24.8687V24.8531C172.504 24.1769 172.332 23.6151 171.99 23.1678C171.658 22.71 171.165 22.3719 170.511 22.1534C169.868 21.9246 169.074 21.8101 168.13 21.8101H156.986V18.502H167.429C168.737 18.502 169.749 18.2471 170.465 17.7373C171.181 17.2276 171.538 16.5098 171.538 15.5839V15.5527C171.538 14.6476 171.227 13.961 170.605 13.4928C169.992 13.0143 169.142 12.775 168.052 12.775H156.986V9.09233H169.437C170.911 9.09233 172.182 9.3212 173.251 9.77893C174.33 10.2263 175.16 10.8713 175.741 11.7139C176.332 12.5462 176.628 13.5345 176.628 14.6788V14.71C176.628 15.5631 176.441 16.3381 176.068 17.0351C175.705 17.7217 175.186 18.2991 174.511 18.7672C173.837 19.2354 173.048 19.5527 172.146 19.7191V19.7971C173.287 19.922 174.273 20.2289 175.103 20.7178C175.943 21.1964 176.587 21.8257 177.033 22.606C177.489 23.3862 177.718 24.2757 177.718 25.2744V25.3056C177.718 26.6268 177.391 27.7607 176.737 28.7074C176.083 29.6437 175.144 30.3615 173.92 30.8609C172.706 31.3602 171.248 31.6099 169.546 31.6099H156.986ZM154.402 31.6099V9.09233H159.491V31.6099H154.402Z" fill="#1DBF73" />
                    <path d="M189.998 32C187.881 32 186.034 31.6463 184.457 30.9389C182.88 30.2315 181.656 29.2276 180.784 27.9272C179.912 26.6268 179.477 25.0871 179.477 23.3082V23.277C179.477 21.498 179.912 19.9584 180.784 18.658C181.666 17.3576 182.896 16.3537 184.473 15.6463C186.05 14.9389 187.892 14.5852 189.998 14.5852C192.115 14.5852 193.962 14.9389 195.539 15.6463C197.116 16.3537 198.341 17.3576 199.213 18.658C200.095 19.9584 200.536 21.498 200.536 23.277V23.3082C200.536 25.0975 200.095 26.6424 199.213 27.9428C198.341 29.2328 197.116 30.2315 195.539 30.9389C193.962 31.6463 192.115 32 189.998 32ZM190.014 28.3953C191.093 28.3953 192.042 28.1977 192.862 27.8023C193.692 27.3966 194.336 26.8192 194.792 26.0702C195.249 25.3108 195.477 24.3901 195.477 23.3082V23.277C195.477 22.2055 195.249 21.29 194.792 20.5306C194.336 19.7711 193.692 19.1938 192.862 18.7984C192.042 18.4031 191.088 18.2055 189.998 18.2055C188.919 18.2055 187.964 18.4083 187.134 18.814C186.315 19.2094 185.671 19.7867 185.204 20.5462C184.748 21.2952 184.519 22.2055 184.519 23.277V23.3082C184.519 24.3901 184.748 25.3108 185.204 26.0702C185.671 26.8192 186.315 27.3966 187.134 27.8023C187.964 28.1977 188.924 28.3953 190.014 28.3953Z" fill="#1DBF73" />
                    <path d="M202.948 31.6099V14.9909H207.898V18.2367H207.991C208.593 17.1027 209.485 16.2133 210.668 15.5683C211.851 14.9129 213.273 14.5852 214.933 14.5852C217.319 14.5852 219.172 15.2458 220.489 16.567C221.818 17.8778 222.482 19.7243 222.482 22.1066V31.6099H217.517V23.0897C217.517 21.5397 217.138 20.3641 216.38 19.5631C215.623 18.762 214.502 18.3615 213.018 18.3615C211.991 18.3615 211.088 18.5696 210.31 18.9857C209.542 19.3914 208.946 19.9688 208.52 20.7178C208.105 21.4564 207.898 22.3355 207.898 23.355V31.6099H202.948Z" fill="#1DBF73" />
                    <path d="M233.719 32C231.914 32 230.342 31.6359 229.003 30.9077C227.675 30.1795 226.648 29.1651 225.922 27.8648C225.195 26.554 224.832 25.0351 224.832 23.3082V23.277C224.832 21.5501 225.195 20.0364 225.922 18.736C226.648 17.4252 227.675 16.4057 229.003 15.6775C230.342 14.9493 231.909 14.5852 233.704 14.5852C234.866 14.5852 235.914 14.7308 236.848 15.0221C237.782 15.3134 238.591 15.7243 239.276 16.2549C239.971 16.775 240.532 17.3784 240.957 18.065H241.05V9.09233H246V31.6099H241.05V28.5358H240.957C240.532 29.2224 239.976 29.8257 239.292 30.3459C238.607 30.8661 237.797 31.2718 236.864 31.5631C235.93 31.8544 234.882 32 233.719 32ZM235.416 28.3329C236.557 28.3329 237.548 28.13 238.389 27.7243C239.24 27.3082 239.893 26.7256 240.35 25.9766C240.817 25.2172 241.05 24.3277 241.05 23.3082V23.277C241.05 22.2679 240.817 21.3888 240.35 20.6398C239.883 19.8804 239.229 19.2978 238.389 18.8921C237.548 18.4759 236.557 18.2679 235.416 18.2679C234.264 18.2679 233.273 18.4707 232.443 18.8765C231.623 19.2718 230.99 19.844 230.544 20.593C230.098 21.342 229.875 22.2367 229.875 23.277V23.3082C229.875 24.3485 230.098 25.2432 230.544 25.9922C230.99 26.7412 231.623 27.3186 232.443 27.7243C233.273 28.13 234.264 28.3329 235.416 28.3329Z" fill="#1DBF73" />
                    <circle cx="254" cy="28" r="4" fill="#404145" />
                </svg>

            </div>
            <Link to="/signin" className={` lg:hidden block rounded-[10px] px-[10px] ${isHomePage ? 'text-white' : 'text-black'} py-[8px] text-[18px]`}>Login</Link>

            <nav className="lg:flex items-center gap-[30px] hidden">
                <Link to="/" className="text-[18px]  text-[#1dbf73]">Home</Link>
                <Link to="/aboutus" className={`text-[18px] ${isHomePage ? 'text-white' : 'text-black'}  hover:text-[#1dbf73]`}>About Us</Link>
                <Link to="/howitworks" className={`text-[18px] ${isHomePage ? 'text-white' : 'text-black'}  hover:text-[#1dbf73]`}>How It Works</Link>
                <Link to="/mission" className={`text-[18px] ${isHomePage ? 'text-white' : 'text-black'}  hover:text-[#1dbf73]`}>Market</Link>
                <Link to="/support" className={`text-[18px] ${isHomePage ? 'text-white' : 'text-black'}  hover:text-[#1dbf73]`}>Support</Link>
                <Link to="/mission" className={`text-[18px] ${isHomePage ? 'text-white' : 'text-black'}  hover:text-[#1dbf73]`}>PromiseBond</Link>
            </nav>
            <div className="lg:flex hidden items-center gap-[10px]">
                <Link to="/signin" className={`rounded-[10px] px-[24px] ${isHomePage ? 'text-white' : 'text-black'} py-[8px] text-[18px]`}>Login</Link>
                <Link to="/signup" className="text-black bg-white border-[1px] rounded-[10px] px-[24px] py-[8px] text-[18px]">Signup</Link>

            </div>
            <div className={`absolute top-0 h-[100vh] ${showmenu ? 'left-0 w-[80%]' : 'left-[-100%] w-0'} bg-white flex flex-col shadow-md`}>
                <div className="flex justify-end px-[20px] py-[40px] hover:cursor-pointer" onClick={menutoggle}>
                    <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Menu / Close_SM"> <path id="Vector" d="M16 16L12 12M12 12L8 8M12 12L16 8M12 12L8 16" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g> </g></svg>
                </div>
                <nav className="flex px-[20px] flex-col gap-[30px] ">
                    <Link to="/" className="text-[18px] text-[#1dbf73]">Home</Link>
                    <Link to="/aboutus" className="text-[18px] hover:text-[#1dbf73]">About Us</Link>

                    <Link to="/sponsorbond" className="text-[18px] hover:text-[#1dbf73]">How It Works</Link>
                    <Link to="/mission" className="text-[18px] hover:text-[#1dbf73]">Market</Link>
                    <Link to="/support" className="text-[18px] hover:text-[#1dbf73]">Support</Link>
                    <Link to="/mission" className="text-[18px] hover:text-[#1dbf73]">PromiseBond</Link>
                </nav>
                <div className="flex flex-col gap-[10px] px-[20px] mt-[30px]">
                    <Link to="/signin" className="rounded-[10px] px-[24px] py-[8px] text-[18px]">Login</Link>
                    <Link to="/signup" className="text-white bg-[#1dbf73] border-[1px] rounded-[10px] px-[24px] py-[8px] text-[18px]">Signup</Link>

                </div>
            </div>
        </div>
    )
}