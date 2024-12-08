import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import avatar from "../avatar.webp"
import { useDropzone } from 'react-dropzone';
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import { BASE_URL } from "../baseURL";

export default function AdminHeader({ children }) {
    const location = useLocation();
    const navigate = useNavigate();
    const [bondpopup, setBondPopup] = useState(false)
    const [bonddata, setBondData] = useState([])
    const [menupopup, setMenuPopup] = useState(false)
    const [uploadedImages, setUploadedImages] = useState([]);

    const handleSwitchChange = async () => {
        try {
            const token = localStorage.getItem('token')
            let headers = {
                headers: {
                    authorization: `Bearer ${token}`
                }
            }

            let response = await axios.get(`${BASE_URL}/create-buyer`, headers)
            console.log(response.data)

            localStorage.setItem('influencer', response.data.influencer)
            localStorage.setItem("buyerToken", response.data.
                buyerToken
            )
            navigate('/buyerdashboard');
        } catch (e) {
            if (e?.respose?.data?.error) {
                toast.error(e?.response?.data?.error, { containerId: "containerA" })
            } else {
                toast.error("Client error please try again", { containerId: "containerA" })
            }
        }


    };
    const [bondstate, setBondState] = useState({
        quantity: 0,
        bond_price: 0,
        validity_number: '',

        title: ''
    })
    const [links, setLinks] = useState(['']);
    const handleAddLink = () => {
        setLinks([...links, '']);
    };
    const handleLinkChange = (index, value) => {
        const newLinks = [...links];
        newLinks[index] = value;
        setLinks(newLinks);
    };
    const onDrop = (acceptedFiles) => {
        setUploadedImages((prevImages) => [...prevImages, ...acceptedFiles]);
    };

    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/*',
        multiple: true,
        onDrop,
    });

    const createBond = async () => {
        if (uploadedImages?.length === 0) {
            toast.dismiss()
            toast.error("Please select images for verification", { containerId: "containerA" })
            return;
        } else if (links?.length === 0) {
            toast.dismiss()
            toast.error("Please enter social media links", { containerId: "containerA" })
            return;
        } else if (bondstate.validity_number.length === 0) {
            toast.dismiss()
            toast.error("Please select validty number", { containerId: "containerA" })
            return;
        } else if (bondstate.title.length === 0) {
            toast.dismiss()
            toast.error("Please enter title of bond", { containerId: "containerA" })
            return;
        } else if (bondstate.quantity === 0 || bondstate.quantity.length === 0) {
            toast.dismiss()
            toast.error("Please enter valid quantity", { containerId: "containerA" })
            return;
        } else if (bondstate.bond_price === 0 || bondstate.bond_price.length === 0) {
            toast.dismiss()
            toast.error("Please enter valid price", { containerId: "containerA" })
            return;
        }
        try {


            let formData = new FormData();
            formData.append('quantity', bondstate.quantity)
            formData.append('bond_price', bondstate.bond_price)
            formData.append('title', bondstate.title)
            formData.append('validity_number', bondstate.validity_number)

            uploadedImages.forEach((image) => {
                formData.append('photos', image);
            });
            const token = localStorage.getItem('token')
            let headers = {
                headers: {
                    authorization: `Bearer ${token}`
                }
            }
            formData.append('social_media_links', links)
            let response = await axios.post(`${BASE_URL}/createBond`, formData, headers)
            toast.success(response?.data?.message)
            setBondPopup(!bondpopup)
            setBondState({
                quantity: 0,
                bond_price: 0
            })
            setUploadedImages([])
            setLinks([])

        } catch (e) {
            if (e?.response?.data?.error) {
                toast.error(e?.response?.data?.error)

                return;
            }
        }
    }
    useEffect(() => {
        fetchBondList();
    }, [])

    const fetchBondList = async () => {
        try {
            let token = localStorage.getItem('token')
            let headers = {
                headers: {
                    authorization: `Bearer ${token}`
                }
            }
            let response = await axios.get(`${BASE_URL}/bond-listing`, headers)

            setBondData(response.data.bondsList)



        } catch (e) {
            if (e?.response?.data?.error) {
                toast.error(e?.response?.data?.error, { containerId: "containerA" })
            } else {
                toast.error("Client error please try again", { containerId: "containerA" })
            }
        }
    }


    return (
        <>
            <ToastContainer containerId="containerA" limit={1} />
            <div className="w-full h-full  relative  flex">
                <div className="xl:w-[20%]  border-r hidden xl:flex flex-col px-[20px]  py-[40px] justify-between">
                    <div className="flex flex-col gap-[10px]">
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
                        <Link
                            to="/dashboard"
                            className={`flex gap-[10px] rounded-[10px] items-center py-[10px] px-[20px] text-[18px] ${location.pathname === '/dashboard' ? 'bg-[#f6f6f6] text-[#1DBF73]' : 'text-[#74767E]'}`}
                        >
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6 13V15M10 9V15M14 5V15M5.8 19H14.2C15.8802 19 16.7202 19 17.362 18.673C17.9265 18.3854 18.3854 17.9265 18.673 17.362C19 16.7202 19 15.8802 19 14.2V5.8C19 4.11984 19 3.27976 18.673 2.63803C18.3854 2.07354 17.9265 1.6146 17.362 1.32698C16.7202 1 15.8802 1 14.2 1H5.8C4.11984 1 3.27976 1 2.63803 1.32698C2.07354 1.6146 1.6146 2.07354 1.32698 2.63803C1 3.27976 1 4.11984 1 5.8V14.2C1 15.8802 1 16.7202 1.32698 17.362C1.6146 17.9265 2.07354 18.3854 2.63803 18.673C3.27976 19 4.11984 19 5.8 19Z" stroke={`${location.pathname === '/dashboard' ? '#1DBF73' : '#74767E'}`} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>

                            Dashboard
                        </Link>
                        <Link
                            to="/sponsorbond"
                            className={`flex gap-[10px] rounded-[10px] items-center py-[10px] px-[20px] text-[18px] ${location.pathname === '/sponsorbond' ? 'bg-[#f6f6f6] text-[#1DBF73]' : 'text-[#74767E]'}`}
                        >
                            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.10102 3C10.3636 1.76281 12.0927 1 14 1C17.866 1 21 4.13401 21 8C21 9.90734 20.2372 11.6365 18.9999 12.899M6.5 12L8 11V16.5M6.5 16.5H9.5M15 14C15 17.866 11.866 21 8 21C4.13401 21 1 17.866 1 14C1 10.134 4.13401 7 8 7C11.866 7 15 10.134 15 14Z" stroke={`${location.pathname === '/sponsorbond' ? '#1DBF73' : '#74767E'}`} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>

                            Promise Bond
                        </Link>
                        <Link
                            to="/mission"
                            className={`flex gap-[10px] rounded-[10px] items-center py-[10px] px-[20px] text-[18px] ${location.pathname === '/mission' ? 'bg-[#f6f6f6] text-[#1DBF73]' : 'text-[#74767E]'}`}
                        >
                            <svg width="18" height="22" viewBox="0 0 18 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13 3C13.93 3 14.395 3 14.7765 3.10222C15.8117 3.37962 16.6204 4.18827 16.8978 5.22354C17 5.60504 17 6.07003 17 7V16.2C17 17.8802 17 18.7202 16.673 19.362C16.3854 19.9265 15.9265 20.3854 15.362 20.673C14.7202 21 13.8802 21 12.2 21H5.8C4.11984 21 3.27976 21 2.63803 20.673C2.07354 20.3854 1.6146 19.9265 1.32698 19.362C1 18.7202 1 17.8802 1 16.2V7C1 6.07003 1 5.60504 1.10222 5.22354C1.37962 4.18827 2.18827 3.37962 3.22354 3.10222C3.60504 3 4.07003 3 5 3M6 14L8 16L12.5 11.5M6.6 5H11.4C11.9601 5 12.2401 5 12.454 4.89101C12.6422 4.79513 12.7951 4.64215 12.891 4.45399C13 4.24008 13 3.96005 13 3.4V2.6C13 2.03995 13 1.75992 12.891 1.54601C12.7951 1.35785 12.6422 1.20487 12.454 1.10899C12.2401 1 11.9601 1 11.4 1H6.6C6.03995 1 5.75992 1 5.54601 1.10899C5.35785 1.20487 5.20487 1.35785 5.10899 1.54601C5 1.75992 5 2.03995 5 2.6V3.4C5 3.96005 5 4.24008 5.10899 4.45399C5.20487 4.64215 5.35785 4.79513 5.54601 4.89101C5.75992 5 6.03995 5 6.6 5Z" stroke={`${location.pathname === '/mission' ? '#1DBF73' : '#74767E'}`} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>

                            Mission
                        </Link>



                    </div>
                    <div className="flex flex-col gap-[10px]">
                        <Link
                            to="/settings"
                            className={`flex gap-[10px] rounded-[10px] items-center py-[10px] px-[20px] text-[18px] ${location.pathname === '/settings' ? 'bg-white text-[#1DBF73]' : 'text-[#74767E]'}`}
                        >
                            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11 14C12.6569 14 14 12.6569 14 11C14 9.34315 12.6569 8 11 8C9.34315 8 8 9.34315 8 11C8 12.6569 9.34315 14 11 14Z" stroke={`${location.pathname === '/settings' ? '#1DBF73' : '#74767E'}`} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M17.7273 13.7273C17.6063 14.0015 17.5702 14.3056 17.6236 14.6005C17.6771 14.8954 17.8177 15.1676 18.0273 15.3818L18.0818 15.4364C18.2509 15.6052 18.385 15.8057 18.4765 16.0265C18.568 16.2472 18.6151 16.4838 18.6151 16.7227C18.6151 16.9617 18.568 17.1983 18.4765 17.419C18.385 17.6397 18.2509 17.8402 18.0818 18.0091C17.913 18.1781 17.7124 18.3122 17.4917 18.4037C17.271 18.4952 17.0344 18.5423 16.7955 18.5423C16.5565 18.5423 16.3199 18.4952 16.0992 18.4037C15.8785 18.3122 15.678 18.1781 15.5091 18.0091L15.4545 17.9545C15.2403 17.745 14.9682 17.6044 14.6733 17.5509C14.3784 17.4974 14.0742 17.5335 13.8 17.6545C13.5311 17.7698 13.3018 17.9611 13.1403 18.205C12.9788 18.4489 12.8921 18.7347 12.8909 19.0273V19.1818C12.8909 19.664 12.6994 20.1265 12.3584 20.4675C12.0174 20.8084 11.5549 21 11.0727 21C10.5905 21 10.1281 20.8084 9.78708 20.4675C9.4461 20.1265 9.25455 19.664 9.25455 19.1818V19.1C9.24751 18.7991 9.15011 18.5073 8.97501 18.2625C8.79991 18.0176 8.55521 17.8312 8.27273 17.7273C7.99853 17.6063 7.69437 17.5702 7.39947 17.6236C7.10456 17.6771 6.83244 17.8177 6.61818 18.0273L6.56364 18.0818C6.39478 18.2509 6.19425 18.385 5.97353 18.4765C5.7528 18.568 5.51621 18.6151 5.27727 18.6151C5.03834 18.6151 4.80174 18.568 4.58102 18.4765C4.36029 18.385 4.15977 18.2509 3.99091 18.0818C3.82186 17.913 3.68775 17.7124 3.59626 17.4917C3.50476 17.271 3.45766 17.0344 3.45766 16.7955C3.45766 16.5565 3.50476 16.3199 3.59626 16.0992C3.68775 15.8785 3.82186 15.678 3.99091 15.5091L4.04545 15.4545C4.25503 15.2403 4.39562 14.9682 4.4491 14.6733C4.50257 14.3784 4.46647 14.0742 4.34545 13.8C4.23022 13.5311 4.03887 13.3018 3.79497 13.1403C3.55107 12.9788 3.26526 12.8921 2.97273 12.8909H2.81818C2.33597 12.8909 1.87351 12.6994 1.53253 12.3584C1.19156 12.0174 1 11.5549 1 11.0727C1 10.5905 1.19156 10.1281 1.53253 9.78708C1.87351 9.4461 2.33597 9.25455 2.81818 9.25455H2.9C3.2009 9.24751 3.49273 9.15011 3.73754 8.97501C3.98236 8.79991 4.16883 8.55521 4.27273 8.27273C4.39374 7.99853 4.42984 7.69437 4.37637 7.39947C4.3229 7.10456 4.18231 6.83244 3.97273 6.61818L3.91818 6.56364C3.74913 6.39478 3.61503 6.19425 3.52353 5.97353C3.43203 5.7528 3.38493 5.51621 3.38493 5.27727C3.38493 5.03834 3.43203 4.80174 3.52353 4.58102C3.61503 4.36029 3.74913 4.15977 3.91818 3.99091C4.08704 3.82186 4.28757 3.68775 4.50829 3.59626C4.72901 3.50476 4.96561 3.45766 5.20455 3.45766C5.44348 3.45766 5.68008 3.50476 5.9008 3.59626C6.12152 3.68775 6.32205 3.82186 6.49091 3.99091L6.54545 4.04545C6.75971 4.25503 7.03183 4.39562 7.32674 4.4491C7.62164 4.50257 7.9258 4.46647 8.2 4.34545H8.27273C8.54161 4.23022 8.77093 4.03887 8.93245 3.79497C9.09397 3.55107 9.18065 3.26526 9.18182 2.97273V2.81818C9.18182 2.33597 9.37338 1.87351 9.71435 1.53253C10.0553 1.19156 10.5178 1 11 1C11.4822 1 11.9447 1.19156 12.2856 1.53253C12.6266 1.87351 12.8182 2.33597 12.8182 2.81818V2.9C12.8193 3.19253 12.906 3.47834 13.0676 3.72224C13.2291 3.96614 13.4584 4.15749 13.7273 4.27273C14.0015 4.39374 14.3056 4.42984 14.6005 4.37637C14.8954 4.3229 15.1676 4.18231 15.3818 3.97273L15.4364 3.91818C15.6052 3.74913 15.8057 3.61503 16.0265 3.52353C16.2472 3.43203 16.4838 3.38493 16.7227 3.38493C16.9617 3.38493 17.1983 3.43203 17.419 3.52353C17.6397 3.61503 17.8402 3.74913 18.0091 3.91818C18.1781 4.08704 18.3122 4.28757 18.4037 4.50829C18.4952 4.72901 18.5423 4.96561 18.5423 5.20455C18.5423 5.44348 18.4952 5.68008 18.4037 5.9008C18.3122 6.12152 18.1781 6.32205 18.0091 6.49091L17.9545 6.54545C17.745 6.75971 17.6044 7.03183 17.5509 7.32674C17.4974 7.62164 17.5335 7.9258 17.6545 8.2V8.27273C17.7698 8.54161 17.9611 8.77093 18.205 8.93245C18.4489 9.09397 18.7347 9.18065 19.0273 9.18182H19.1818C19.664 9.18182 20.1265 9.37338 20.4675 9.71435C20.8084 10.0553 21 10.5178 21 11C21 11.4822 20.8084 11.9447 20.4675 12.2856C20.1265 12.6266 19.664 12.8182 19.1818 12.8182H19.1C18.8075 12.8193 18.5217 12.906 18.2778 13.0676C18.0339 13.2291 17.8425 13.4584 17.7273 13.7273Z" stroke={`${location.pathname === '/settings' ? '#1DBF73' : '#74767E'}`} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>


                            Settings
                        </Link>
                        <Link
                            onClick={(e) => {
                                localStorage.removeItem('token')
                                localStorage.removeItem("buyerToken")
                                navigate('/')
                            }}
                            className={`flex gap-[10px] rounded-[10px] items-center py-[10px] px-[20px] text-[18px] ${location.pathname === '/logout' ? 'bg-white text-[#1DBF73]' : 'text-[#74767E]'}`}
                        >
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M14 15L19 10M19 10L14 5M19 10H7M10 15C10 15.93 10 16.395 9.89778 16.7765C9.62038 17.8117 8.81173 18.6204 7.77646 18.8978C7.39496 19 6.92997 19 6 19H5.5C4.10218 19 3.40326 19 2.85195 18.7716C2.11687 18.4672 1.53284 17.8831 1.22836 17.1481C1 16.5967 1 15.8978 1 14.5V5.5C1 4.10217 1 3.40326 1.22836 2.85195C1.53284 2.11687 2.11687 1.53284 2.85195 1.22836C3.40326 1 4.10218 1 5.5 1H6C6.92997 1 7.39496 1 7.77646 1.10222C8.81173 1.37962 9.62038 2.18827 9.89778 3.22354C10 3.60504 10 4.07003 10 5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>


                            Logout
                        </Link>
                    </div>
                </div>
                <div className="xl:w-[80%] w-full gap-[20px] px-[20px]  flex flex-col">
                    <div className="w-full  border-b px-[20px] py-[20px] flex justify-between items-center">
                        <div className="xl:hidden block hover:cursor-pointer" onClick={() => setMenuPopup(!menupopup)}>
                            <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M5 12H20" stroke="#1DBF73" stroke-width="2" stroke-linecap="round"></path> <path d="M5 17H20" stroke="#1DBF73" stroke-width="2" stroke-linecap="round"></path> <path d="M5 7H20" stroke="#1DBF73" stroke-width="2" stroke-linecap="round"></path> </g></svg>
                        </div>
                        <h1 className="text-[#1DBF73] text-[24px] font-semibold">
                            {location.pathname
                                .replace('/', '')
                                .split('/')[0]
                                .charAt(0).toUpperCase() +
                                location.pathname.slice(2)}
                        </h1>
                        <div className="flex items-center gap-[10px]">

                            <div className="flex items-center" onClick={handleSwitchChange}>
                                <label htmlFor="account-switch" className="mr-2 text-sm font-medium">
                                    Switch to buyer
                                </label>
                                <div className="relative">
                                    <input
                                        id="account-switch"
                                        type="checkbox"
                                        defaultChecked

                                        className="sr-only"
                                    />
                                    <div className="toggle-switch cursor-pointer w-12 h-6 bg-red-500 rounded-full flex items-center">
                                        <div className="bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-200 translate-x-0"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="rounded-[100%] w-[40px] h-[40px] xl:mr-[40px]">
                                <img src={avatar} alt="img" className="w-full h-full object-cover rounded-[100%]" />
                            </div>
                        </div>
                    </div>
                    {children}
                </div>
                {
                    bondpopup && (
                        <div className="absolute w-full h-full flex justify-center items-center px-[20px] bg-[#00000085]">
                            <div className="bg-white flex flex-col gap-[10px] rounded-[20px] p-[20px] max-w-[800px] w-full">

                                <h1 className="text-[18px]">Upload Image</h1>
                                <div
                                    {...getRootProps()}
                                    className="border-2 border-dashed border-gray-300 p-[20px] text-center rounded-[10px] cursor-pointer"
                                >
                                    <div className="flex justify-center w-full">
                                        <svg width="80" height="66" viewBox="0 0 80 66" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M41.1612 28.0748C41.0947 27.9859 41.0096 27.9141 40.9125 27.8647C40.8154 27.8152 40.7089 27.7896 40.6009 27.7896C40.4929 27.7896 40.3863 27.8152 40.2892 27.8647C40.1921 27.9141 40.1071 27.9859 40.0405 28.0748L30.0787 41.2433C29.9966 41.3529 29.9456 41.4844 29.9316 41.6228C29.9177 41.7612 29.9413 41.9009 29.9997 42.026C30.0582 42.1511 30.1491 42.2564 30.2622 42.33C30.3752 42.4036 30.5058 42.4425 30.639 42.4422H37.2121V64.969C37.2121 65.3779 37.5323 65.7124 37.9236 65.7124H43.2603C43.6517 65.7124 43.9719 65.3779 43.9719 64.969V42.4514H50.5627C51.1586 42.4514 51.4877 41.7359 51.1231 41.2526L41.1612 28.0748Z" fill="#667085" />
                                            <path d="M66.497 19.497C62.4233 8.27074 52.0434 0.287842 39.8847 0.287842C27.7259 0.287842 17.346 8.26144 13.2723 19.4877C5.64975 21.5787 0.0195312 28.8367 0.0195312 37.4608C0.0195312 47.7298 7.9801 56.0473 17.7996 56.0473H21.3663C21.7577 56.0473 22.0779 55.7127 22.0779 55.3038V49.7279C22.0779 49.319 21.7577 48.9844 21.3663 48.9844H17.7996C14.8022 48.9844 11.9826 47.7391 9.88353 45.4809C7.79332 43.2319 6.68151 40.2023 6.77935 37.0612C6.8594 34.6078 7.6599 32.3031 9.10971 30.3608C10.5951 28.3813 12.6764 26.9409 14.989 26.2996L18.36 25.3796L19.5963 21.9783C20.3612 19.8594 21.4286 17.8799 22.7717 16.0864C24.0976 14.3086 25.6682 12.7459 27.4324 11.449C31.088 8.76328 35.3929 7.34141 39.8847 7.34141C44.3764 7.34141 48.6813 8.76328 52.337 11.449C54.107 12.7501 55.6724 14.3113 56.9977 16.0864C58.3407 17.8799 59.4081 19.8687 60.173 21.9783L61.4004 25.3703L64.7626 26.2996C69.5834 27.6564 72.9544 32.238 72.9544 37.4608C72.9544 40.5369 71.807 43.4364 69.7257 45.611C68.705 46.6837 67.4908 47.5342 66.1534 48.1132C64.8159 48.6923 63.3818 48.9884 61.9341 48.9844H58.3674C57.9761 48.9844 57.6559 49.319 57.6559 49.7279V55.3038C57.6559 55.7127 57.9761 56.0473 58.3674 56.0473H61.9341C71.7536 56.0473 79.7142 47.7298 79.7142 37.4608C79.7142 28.846 74.1018 21.5972 66.497 19.497Z" fill="#667085" />
                                        </svg>
                                    </div>
                                    <input {...getInputProps()} />
                                    <p className="text-[16px] text-[#667085] my-[10px]">Drag and Drop Here</p>
                                    <p className="text-[16px] text-[#667085] my-[10px]">or</p>
                                    <div className="bg-[#F1EBFE] text-[#7638F9] text-[16px] font-semibold px-[20px] py-[10px] w-fit rounded-[20px] mx-auto">Browse Images</div>
                                </div>
                                <div className="flex flex-wrap gap-[10px] my-[10px]">
                                    {uploadedImages.length > 0 &&
                                        uploadedImages.map((file, index) => (
                                            <div key={index} className="w-[100px] h-[100px] bg-gray-200 p-[5px] rounded-[10px]">
                                                <img
                                                    src={URL.createObjectURL(file)}
                                                    alt="uploaded"
                                                    className="w-full h-full object-cover rounded-[10px]"
                                                />
                                            </div>
                                        ))}
                                </div>
                                <div>
                                    <label htmlFor="socialLink" className="block text-xl  font-semibold text-[#272226]">Social Media Link</label>
                                    {links.map((link, index) => (
                                        <div key={index} className="mt-4">
                                            <input
                                                type="text"
                                                name={`socialLink-${index}`}
                                                value={link}
                                                onChange={(e) => handleLinkChange(index, e.target.value)}
                                                className="mt-1 block w-full px-3 py-4 border rounded-[20px] border-gray-300 focus:outline-none focus:ring focus:border-blue-500"
                                                placeholder={`Link ${index + 1}`}
                                            />
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        onClick={handleAddLink}
                                        className="mt-4 px-6 py-2 bg-[#7638F9] text-white font-semibold rounded-[20px] hover:bg-blue-600"
                                    >
                                        Add More Links
                                    </button>

                                </div>
                                <div>
                                    <label htmlFor="validitynumber" className="block text-xl font-semibold text-[#272226]">Validity Number</label>
                                    <div className="mt-4">
                                        <select
                                            value={bondstate.validity_number}
                                            onChange={(e) => {
                                                setBondState({
                                                    ...bondstate,
                                                    validity_number: e.target.value
                                                })
                                            }}
                                            name="validitynumber"
                                            className="mt-1 block w-full px-3 py-4 border rounded-[20px] border-gray-300 focus:outline-none focus:ring focus:border-blue-500"
                                        >
                                            <option value="">Select validity</option>
                                            {Array.from({ length: 16 }, (_, index) => {
                                                const months = (index + 3) * 2;
                                                return (
                                                    months <= 36 && (
                                                        <option key={months} value={months}>
                                                            {months} months
                                                        </option>
                                                    )
                                                );
                                            })}
                                        </select>
                                    </div>
                                </div>



                                <div className="mt-[10px]">
                                    <label htmlFor="title" className="block text-xl  font-semibold text-[#272226]">Title</label>
                                    <input
                                        value={bondstate.title}
                                        type="text"
                                        name="title"
                                        placeholder="Enter Title"
                                        className="mt-4 block w-full px-3 py-4 border rounded-[20px] border-gray-300 focus:outline-none focus:ring focus:border-blue-500"
                                        onChange={(e) => {
                                            setBondState({
                                                ...bondstate,
                                                title: e.target.value
                                            })
                                        }}
                                    />

                                </div>
                                <div className="mt-[10px]">
                                    <label htmlFor="quantity" className="block text-xl  font-semibold text-[#272226]">Quantity</label>
                                    <input
                                        value={bondstate.quantity}
                                        type="text"
                                        name="quantity"
                                        placeholder="Enter Quantity"
                                        className="mt-4 block w-full px-3 py-4 border rounded-[20px] border-gray-300 focus:outline-none focus:ring focus:border-blue-500"
                                        onChange={(e) => {
                                            setBondState({
                                                ...bondstate,
                                                quantity: e.target.value
                                            })
                                        }}
                                    />

                                </div>
                                <div className="mt-[10px]">
                                    <label htmlFor="price" className="block text-xl  font-semibold text-[#272226]">Bond Price</label>
                                    <input
                                        value={bondstate.bond_price}
                                        type="text"
                                        name="price"
                                        className="mt-4 block w-full px-3 py-4 border rounded-[20px] border-gray-300 focus:outline-none focus:ring focus:border-blue-500"
                                        placeholder="Enter Bond Price"
                                        onChange={(e) => {
                                            setBondState({
                                                ...bondstate,
                                                bond_price: e.target.value
                                            })
                                        }}
                                    />

                                </div>
                                <div className="hover:cursor-pointer flex flex-col justify-between mt-4 gap-[10px] xl:flex-row">
                                    <div onClick={() => setBondPopup(!bondpopup)} className="border-[1px] rounded-[10px] w-full xl:w-1/2 text-center text-[20px] border-[#7638F9] px-[20px] py-[10px] text-[#7638F9] font-semibold">
                                        Cancel
                                    </div>
                                    <div onClick={createBond} className="hover:cursor-pointer border-[1px] rounded-[10px] w-full xl:w-1/2 text-center text-[20px] bg-[#7638F9] px-[20px] py-[10px] text-white font-semibold">
                                        Create Bond
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }

                {
                    menupopup && (
                        <div className="w-[80%] h-[100vh] flex flex-col fixed left-0 top-0 px-[20px] rounded-tr-[20px] rounded-br-[20px] py-[40px] justify-between bg-white">
                            <div className="flex flex-col gap-[10px]">
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
                                <div className="absolute top-[4%] right-[5%]" onClick={() => setMenuPopup(!menupopup)}>
                                    <svg width="64px" height="64px" viewBox="0 -0.5 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M6.96967 16.4697C6.67678 16.7626 6.67678 17.2374 6.96967 17.5303C7.26256 17.8232 7.73744 17.8232 8.03033 17.5303L6.96967 16.4697ZM13.0303 12.5303C13.3232 12.2374 13.3232 11.7626 13.0303 11.4697C12.7374 11.1768 12.2626 11.1768 11.9697 11.4697L13.0303 12.5303ZM11.9697 11.4697C11.6768 11.7626 11.6768 12.2374 11.9697 12.5303C12.2626 12.8232 12.7374 12.8232 13.0303 12.5303L11.9697 11.4697ZM18.0303 7.53033C18.3232 7.23744 18.3232 6.76256 18.0303 6.46967C17.7374 6.17678 17.2626 6.17678 16.9697 6.46967L18.0303 7.53033ZM13.0303 11.4697C12.7374 11.1768 12.2626 11.1768 11.9697 11.4697C11.6768 11.7626 11.6768 12.2374 11.9697 12.5303L13.0303 11.4697ZM16.9697 17.5303C17.2626 17.8232 17.7374 17.8232 18.0303 17.5303C18.3232 17.2374 18.3232 16.7626 18.0303 16.4697L16.9697 17.5303ZM11.9697 12.5303C12.2626 12.8232 12.7374 12.8232 13.0303 12.5303C13.3232 12.2374 13.3232 11.7626 13.0303 11.4697L11.9697 12.5303ZM8.03033 6.46967C7.73744 6.17678 7.26256 6.17678 6.96967 6.46967C6.67678 6.76256 6.67678 7.23744 6.96967 7.53033L8.03033 6.46967ZM8.03033 17.5303L13.0303 12.5303L11.9697 11.4697L6.96967 16.4697L8.03033 17.5303ZM13.0303 12.5303L18.0303 7.53033L16.9697 6.46967L11.9697 11.4697L13.0303 12.5303ZM11.9697 12.5303L16.9697 17.5303L18.0303 16.4697L13.0303 11.4697L11.9697 12.5303ZM13.0303 11.4697L8.03033 6.46967L6.96967 7.53033L11.9697 12.5303L13.0303 11.4697Z" fill="#000000"></path> </g></svg>
                                </div>
                                <Link
                                    to="/dashboard"
                                    onClick={() => setMenuPopup(!menupopup)}
                                    className={`flex gap-[10px] rounded-[10px] items-center py-[10px] px-[20px] text-[18px] ${location.pathname === '/dashboard' ? 'bg-[#f6f6f6] text-[#1DBF73]' : 'text-[#74767E]'}`}
                                >
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6 13V15M10 9V15M14 5V15M5.8 19H14.2C15.8802 19 16.7202 19 17.362 18.673C17.9265 18.3854 18.3854 17.9265 18.673 17.362C19 16.7202 19 15.8802 19 14.2V5.8C19 4.11984 19 3.27976 18.673 2.63803C18.3854 2.07354 17.9265 1.6146 17.362 1.32698C16.7202 1 15.8802 1 14.2 1H5.8C4.11984 1 3.27976 1 2.63803 1.32698C2.07354 1.6146 1.6146 2.07354 1.32698 2.63803C1 3.27976 1 4.11984 1 5.8V14.2C1 15.8802 1 16.7202 1.32698 17.362C1.6146 17.9265 2.07354 18.3854 2.63803 18.673C3.27976 19 4.11984 19 5.8 19Z" stroke={`${location.pathname === '/dashboard' ? '#1DBF73' : '#74767E'}`} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>

                                    Dashboard
                                </Link>
                                <Link
                                    to="/sponsorbond"
                                    onClick={() => setMenuPopup(!menupopup)}
                                    className={`flex gap-[10px] rounded-[10px] items-center py-[10px] px-[20px] text-[18px] ${location.pathname === '/sponsorbond' ? 'bg-[#f6f6f6] text-[#1DBF73]' : 'text-[#74767E]'}`}
                                >
                                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9.10102 3C10.3636 1.76281 12.0927 1 14 1C17.866 1 21 4.13401 21 8C21 9.90734 20.2372 11.6365 18.9999 12.899M6.5 12L8 11V16.5M6.5 16.5H9.5M15 14C15 17.866 11.866 21 8 21C4.13401 21 1 17.866 1 14C1 10.134 4.13401 7 8 7C11.866 7 15 10.134 15 14Z" stroke={`${location.pathname === '/sponsorbond' ? '#1DBF73' : '#74767E'}`} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>

                                   Promise Bond
                                </Link>
                                <Link
                                    to="/mission"
                                    onClick={() => setMenuPopup(!menupopup)}
                                    className={`flex gap-[10px] rounded-[10px] items-center py-[10px] px-[20px] text-[18px] ${location.pathname === '/mission' ? 'bg-[#f6f6f6] text-[#1DBF73]' : 'text-[#74767E]'}`}
                                >
                                    <svg width="18" height="22" viewBox="0 0 18 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M13 3C13.93 3 14.395 3 14.7765 3.10222C15.8117 3.37962 16.6204 4.18827 16.8978 5.22354C17 5.60504 17 6.07003 17 7V16.2C17 17.8802 17 18.7202 16.673 19.362C16.3854 19.9265 15.9265 20.3854 15.362 20.673C14.7202 21 13.8802 21 12.2 21H5.8C4.11984 21 3.27976 21 2.63803 20.673C2.07354 20.3854 1.6146 19.9265 1.32698 19.362C1 18.7202 1 17.8802 1 16.2V7C1 6.07003 1 5.60504 1.10222 5.22354C1.37962 4.18827 2.18827 3.37962 3.22354 3.10222C3.60504 3 4.07003 3 5 3M6 14L8 16L12.5 11.5M6.6 5H11.4C11.9601 5 12.2401 5 12.454 4.89101C12.6422 4.79513 12.7951 4.64215 12.891 4.45399C13 4.24008 13 3.96005 13 3.4V2.6C13 2.03995 13 1.75992 12.891 1.54601C12.7951 1.35785 12.6422 1.20487 12.454 1.10899C12.2401 1 11.9601 1 11.4 1H6.6C6.03995 1 5.75992 1 5.54601 1.10899C5.35785 1.20487 5.20487 1.35785 5.10899 1.54601C5 1.75992 5 2.03995 5 2.6V3.4C5 3.96005 5 4.24008 5.10899 4.45399C5.20487 4.64215 5.35785 4.79513 5.54601 4.89101C5.75992 5 6.03995 5 6.6 5Z" stroke={`${location.pathname === '/mission' ? '#1DBF73' : '#74767E'}`} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>

                                    Mission
                                </Link>

                            </div>
                            <div className="flex flex-col gap-[10px]">
                                <Link
                                    to="/settings"
                                    onClick={() => setMenuPopup(!menupopup)}
                                    className={`flex gap-[10px] rounded-[10px] items-center py-[10px] px-[20px] text-[18px] ${location.pathname === '/settings' ? 'bg-white text-[#1DBF73]' : 'text-[#74767E]'}`}
                                >
                                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M11 14C12.6569 14 14 12.6569 14 11C14 9.34315 12.6569 8 11 8C9.34315 8 8 9.34315 8 11C8 12.6569 9.34315 14 11 14Z" stroke={`${location.pathname === '/settings' ? '#1DBF73' : '#74767E'}`} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M17.7273 13.7273C17.6063 14.0015 17.5702 14.3056 17.6236 14.6005C17.6771 14.8954 17.8177 15.1676 18.0273 15.3818L18.0818 15.4364C18.2509 15.6052 18.385 15.8057 18.4765 16.0265C18.568 16.2472 18.6151 16.4838 18.6151 16.7227C18.6151 16.9617 18.568 17.1983 18.4765 17.419C18.385 17.6397 18.2509 17.8402 18.0818 18.0091C17.913 18.1781 17.7124 18.3122 17.4917 18.4037C17.271 18.4952 17.0344 18.5423 16.7955 18.5423C16.5565 18.5423 16.3199 18.4952 16.0992 18.4037C15.8785 18.3122 15.678 18.1781 15.5091 18.0091L15.4545 17.9545C15.2403 17.745 14.9682 17.6044 14.6733 17.5509C14.3784 17.4974 14.0742 17.5335 13.8 17.6545C13.5311 17.7698 13.3018 17.9611 13.1403 18.205C12.9788 18.4489 12.8921 18.7347 12.8909 19.0273V19.1818C12.8909 19.664 12.6994 20.1265 12.3584 20.4675C12.0174 20.8084 11.5549 21 11.0727 21C10.5905 21 10.1281 20.8084 9.78708 20.4675C9.4461 20.1265 9.25455 19.664 9.25455 19.1818V19.1C9.24751 18.7991 9.15011 18.5073 8.97501 18.2625C8.79991 18.0176 8.55521 17.8312 8.27273 17.7273C7.99853 17.6063 7.69437 17.5702 7.39947 17.6236C7.10456 17.6771 6.83244 17.8177 6.61818 18.0273L6.56364 18.0818C6.39478 18.2509 6.19425 18.385 5.97353 18.4765C5.7528 18.568 5.51621 18.6151 5.27727 18.6151C5.03834 18.6151 4.80174 18.568 4.58102 18.4765C4.36029 18.385 4.15977 18.2509 3.99091 18.0818C3.82186 17.913 3.68775 17.7124 3.59626 17.4917C3.50476 17.271 3.45766 17.0344 3.45766 16.7955C3.45766 16.5565 3.50476 16.3199 3.59626 16.0992C3.68775 15.8785 3.82186 15.678 3.99091 15.5091L4.04545 15.4545C4.25503 15.2403 4.39562 14.9682 4.4491 14.6733C4.50257 14.3784 4.46647 14.0742 4.34545 13.8C4.23022 13.5311 4.03887 13.3018 3.79497 13.1403C3.55107 12.9788 3.26526 12.8921 2.97273 12.8909H2.81818C2.33597 12.8909 1.87351 12.6994 1.53253 12.3584C1.19156 12.0174 1 11.5549 1 11.0727C1 10.5905 1.19156 10.1281 1.53253 9.78708C1.87351 9.4461 2.33597 9.25455 2.81818 9.25455H2.9C3.2009 9.24751 3.49273 9.15011 3.73754 8.97501C3.98236 8.79991 4.16883 8.55521 4.27273 8.27273C4.39374 7.99853 4.42984 7.69437 4.37637 7.39947C4.3229 7.10456 4.18231 6.83244 3.97273 6.61818L3.91818 6.56364C3.74913 6.39478 3.61503 6.19425 3.52353 5.97353C3.43203 5.7528 3.38493 5.51621 3.38493 5.27727C3.38493 5.03834 3.43203 4.80174 3.52353 4.58102C3.61503 4.36029 3.74913 4.15977 3.91818 3.99091C4.08704 3.82186 4.28757 3.68775 4.50829 3.59626C4.72901 3.50476 4.96561 3.45766 5.20455 3.45766C5.44348 3.45766 5.68008 3.50476 5.9008 3.59626C6.12152 3.68775 6.32205 3.82186 6.49091 3.99091L6.54545 4.04545C6.75971 4.25503 7.03183 4.39562 7.32674 4.4491C7.62164 4.50257 7.9258 4.46647 8.2 4.34545H8.27273C8.54161 4.23022 8.77093 4.03887 8.93245 3.79497C9.09397 3.55107 9.18065 3.26526 9.18182 2.97273V2.81818C9.18182 2.33597 9.37338 1.87351 9.71435 1.53253C10.0553 1.19156 10.5178 1 11 1C11.4822 1 11.9447 1.19156 12.2856 1.53253C12.6266 1.87351 12.8182 2.33597 12.8182 2.81818V2.9C12.8193 3.19253 12.906 3.47834 13.0676 3.72224C13.2291 3.96614 13.4584 4.15749 13.7273 4.27273C14.0015 4.39374 14.3056 4.42984 14.6005 4.37637C14.8954 4.3229 15.1676 4.18231 15.3818 3.97273L15.4364 3.91818C15.6052 3.74913 15.8057 3.61503 16.0265 3.52353C16.2472 3.43203 16.4838 3.38493 16.7227 3.38493C16.9617 3.38493 17.1983 3.43203 17.419 3.52353C17.6397 3.61503 17.8402 3.74913 18.0091 3.91818C18.1781 4.08704 18.3122 4.28757 18.4037 4.50829C18.4952 4.72901 18.5423 4.96561 18.5423 5.20455C18.5423 5.44348 18.4952 5.68008 18.4037 5.9008C18.3122 6.12152 18.1781 6.32205 18.0091 6.49091L17.9545 6.54545C17.745 6.75971 17.6044 7.03183 17.5509 7.32674C17.4974 7.62164 17.5335 7.9258 17.6545 8.2V8.27273C17.7698 8.54161 17.9611 8.77093 18.205 8.93245C18.4489 9.09397 18.7347 9.18065 19.0273 9.18182H19.1818C19.664 9.18182 20.1265 9.37338 20.4675 9.71435C20.8084 10.0553 21 10.5178 21 11C21 11.4822 20.8084 11.9447 20.4675 12.2856C20.1265 12.6266 19.664 12.8182 19.1818 12.8182H19.1C18.8075 12.8193 18.5217 12.906 18.2778 13.0676C18.0339 13.2291 17.8425 13.4584 17.7273 13.7273Z" stroke={`${location.pathname === '/settings' ? '#1DBF73' : '#74767E'}`} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>


                                    Settings
                                </Link>
                                <Link
                                    onClick={(e) => {
                                        localStorage.removeItem('token')
                                        localStorage.removeItem("buyerToken")
                                        navigate('/')
                                    }}
                                    className={`flex gap-[10px] rounded-[10px] items-center py-[10px] px-[20px] text-[18px] ${location.pathname === '/logout' ? 'bg-white text-[#1DBF73]' : 'text-[#74767E]'}`}
                                >
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M14 15L19 10M19 10L14 5M19 10H7M10 15C10 15.93 10 16.395 9.89778 16.7765C9.62038 17.8117 8.81173 18.6204 7.77646 18.8978C7.39496 19 6.92997 19 6 19H5.5C4.10218 19 3.40326 19 2.85195 18.7716C2.11687 18.4672 1.53284 17.8831 1.22836 17.1481C1 16.5967 1 15.8978 1 14.5V5.5C1 4.10217 1 3.40326 1.22836 2.85195C1.53284 2.11687 2.11687 1.53284 2.85195 1.22836C3.40326 1 4.10218 1 5.5 1H6C6.92997 1 7.39496 1 7.77646 1.10222C8.81173 1.37962 9.62038 2.18827 9.89778 3.22354C10 3.60504 10 4.07003 10 5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>


                                    Logout
                                </Link>
                            </div>
                        </div>
                    )
                }
            </div>
        </>
    );
}
