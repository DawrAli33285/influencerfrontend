import { useCallback, useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import avatar from "../../avatar.webp"
import { useDropzone } from 'react-dropzone';
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import { BASE_URL } from "../../baseURL";
import { menu_itmes } from "./json-data";

export default function SellerAdminHeader({ children }) {
    const base_path_icon = "/assets/images/icons"
    const location = useLocation();
    const navigate = useNavigate();
    const [bondpopup, setBondPopup] = useState(false)
    const [missionpopup, setMissionPopup] = useState(false)
    const [sponsorData, setBondData] = useState([])
    const [menupopup, setMenuPopup] = useState(false)
    const [toggleSidebar, setToggleSidebar] = useState(false)
    const [uploadedImages, setUploadedImages] = useState([]);
    const [missionState, setMissionState] = useState({
        bond_id: '',
        description: '',
        task_type: ''
    })
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
    const handleSwitchChange = useCallback(async () => {
        try {
            let token = localStorage.getItem('buyerToken')
            let headers = {
                headers: {
                    authorization: `Bearer ${token}`
                }
            }

            let response = await axios.get(`${BASE_URL}/switch-influencer`, headers)

            localStorage.setItem("token", response.data.token)
            localStorage.setItem("influencer", response.data.influencer)

            navigate('/dashboard');

        } catch (e) {
            if (e?.response?.data?.error) {
                toast.error(e?.response?.data?.error, { containerId: "buyeradmin" })
            } else {
                toast.error("Client error please try again", { containerId: "buyeradmin" })
            }
        }
    }, [])

    const createBond = async () => {
        if (uploadedImages?.length === 0) {
            toast.dismiss()
            toast.error("Please select images for verification", { containerId: "buyeradmin" })
            return;
        } else if (links?.length === 0) {
            toast.dismiss()
            toast.error("Please enter social media links", { containerId: "buyeradmin" })
            return;
        } else if (bondstate.validity_number.length === 0) {
            toast.dismiss()
            toast.error("Please select validty number", { containerId: "buyeradmin" })
            return;
        } else if (bondstate.title.length === 0) {
            toast.dismiss()
            toast.error("Please enter title of bond", { containerId: "buyeradmin" })
            return;
        } else if (bondstate.quantity === 0 || bondstate.quantity.length === 0) {
            toast.dismiss()
            toast.error("Please enter valid quantity", { containerId: "buyeradmin" })
            return;
        } else if (bondstate.bond_price === 0 || bondstate.bond_price.length === 0) {
            toast.dismiss()
            toast.error("Please enter valid price", { containerId: "buyeradmin" })
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
    useEffect(() => {
        setToggleSidebar(false);
       
    }, [location]);
    

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

        }
    }


    const createMission = async () => {
        try {
            if (missionState.bond_id.length === 0) {
                toast.dismiss()
                toast.error("Please select bond", { containerId: "buyeradmin" })
                return;
            } else if (missionState.task_type.length === 0) {
                toast.dismiss()
                toast.error("Please select mission", { containerId: "buyeradmin" })
                return;
            } else if (missionState.description.length === 0) {
                toast.dismiss()
                toast.error("Please enter mission description", { containerId: "buyeradmin" })
                return;
            }
            let response = await axios.post(`${BASE_URL}/create-mission`, missionState)
            toast.dismiss();
            toast.success(response.data.message, { containerId: "buyeradmin" })
            setMissionState({
                bond_id: '',
                description: '',
                task_type: ''
            })
            setMissionPopup(!missionpopup)

        } catch (e) {
            if (e?.response?.data?.error) {
                toast.dismiss()
                toast.error(e?.response?.data?.error, { containerId: "buyeradmin" })
            } else {
                toast.dismiss()
                toast.error("Client error please try again", { containerId: "buyeradmin" })
            }
        }
    }


    return (
        <>
            <ToastContainer containerId="buyeradmin" limit={1} />
            <div className="w-full rounded-[10px] p-[20px] z-10 flex justify-between items-center bg-white">
                <div className={`lg:hidden block hover:cursor-pointer lg:pr-10`} onClick={() => setToggleSidebar(!toggleSidebar)}>
                    <img src={`${base_path_icon}/sidebar-control.svg`} alt="icon" />
                </div>
                <div className={`flex items-center`}>
                <div className="flex items-center " onClick={handleSwitchChange}>
                                    <div className="bg-primary-green cursor-pointer text-white rounded text-base font-medium text-center h-10 leading-10 w-[131px] lg:hidden block">
                                        Switch to Issuer
                                    </div>
                                </div>
                    {/* <NavLink to='/' aria-current="page" className="active">
                        <img src="/assets/images/icons/logo-lg.svg" alt="logo" />
                    </NavLink> */}
                </div>
                <div className="lg:flex-1 flex items-center lg:pl-[116px] lg:justify-between lg:gap-x-[30px]">
                    <div className="flex-1 lg:flex items-center justify-between hidden">
                        <div className={`block hover:cursor-pointer lg:pr-10`} onClick={() => setToggleSidebar(!toggleSidebar)}>
                            <img src={`${base_path_icon}/sidebar-control.svg`} alt="icon" />
                        </div>
                        <div className="flex justify-between items-center flex-1">
                            <div className="max-w-[600px] border rounded-lg px-4 flex-1 w-full flex items-center justify-between">
                                <input type="text" placeholder="What service are you looking for today?" className="text-[14px] text-primary-dark py-4 focus:outline-none w-[90%]" />
                                <img src={`${base_path_icon}/search.svg`} alt="icon" />
                            </div>

                            <div className="flex items-center gap-x-[30px]">
                                <div className="flex items-center " onClick={handleSwitchChange}>
                                    <div className="bg-primary-green cursor-pointer text-white rounded text-base font-medium text-center h-10 leading-10 w-[131px] lg:block hidden">
                                        Switch to Issuer
                                    </div>
                                </div>

                                <div className="flex gap-x-[30px]">
                                    <NavLink to="/">
                                        <img src={`${base_path_icon}/notification.svg`} alt="icon" />
                                    </NavLink>
                                    <NavLink to="/">
                                        <img src={`${base_path_icon}/mail.svg`} alt="icon" />
                                    </NavLink>
                                    <NavLink to="/">
                                        <img src={`${base_path_icon}/heart.svg`} alt="icon" />
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-full w-[50px] h-[50px]">
                        <img src={avatar} alt="img" className="w-full h-full object-cover rounded-[100%]" />
                    </div>
                </div>
            </div>
            <div className="flex z-10 bg-[#0000000D]">
                <aside
                    className={`absolute lg:relative bg-white flex flex-col lg:w-auto w-full justify-between transition-transform duration-500 ease-in-out ${toggleSidebar ? 'lg:-translate-x-full -translate-x-0' : 'lg:translate-x-0 -translate-x-full'
                        }`}
                >
                    <div
                        className={`lg:relative absolute bg-white flex flex-col justify-between lg:w-auto w-full
                            }`}
                    >
                        <div className="flex flex-col">

                            <div className="pr-7">
                                <nav className="seller-menus">
                                    <ul>
                                       
                                        {
                                            menu_itmes.map((menu) => {
                                                return (
                                                    menu?.heading ? <li key={menu?.heading} className={`${menu.heading} h-[55px] text-primary-gray-500 mt-4 mb-1 flex items-center gap-x-4 pl-[30px] text-base font-medium rounded-e`}>{menu?.heading}</li> :
                                                        <li key={menu?.label}>
                                                            <NavLink to={menu.link} className={`h-[55px] mb-1 flex items-center gap-x-4 pl-[30px] text-[17px] font-medium rounded-e`}>
                                                                <img src={menu.icon} alt="icon" />
                                                                {menu.label}</NavLink>
                                                        </li>
                                                )
                                            })
                                        }
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </aside>
                <div
                    className={`flex-1 transition-all duration-500 ease-in-out ${toggleSidebar ? 'lg:ml-[-270px]' : 'lg:ml-[0px]'
                        }`}
                >
                    {children}
                </div>
            </div>
        </>
    );
}
