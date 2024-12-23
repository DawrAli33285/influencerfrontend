import axios from "axios"
import { BASE_URL } from "../baseURL"

const base_path_icon = "/assets/images/icons"

const getCurrentIssuerId=async()=>{
    let token=localStorage.getItem('token')
    if(token){
        let headers={
            headers:{
                authorization:`Bearer ${token}`
            }
        }
    let response=await axios.get(`${BASE_URL}/getHeaderCurrentIssuer`,headers)
    
    if(response?.data?.issuer){
        return response?.data?.issuer?._id
    }else{
        return ''
    }
    }else{
        return ''
    }
}

let issuerId=await Promise.all([getCurrentIssuerId()])

export const menu_itmes = [
    {
        "label": "Dashboard",
        "link": "/dashboard",
        "icon": base_path_icon + "/home.svg"
    },
    {
        "label": "Promise Bond",
        "link": "/promisebond",
        "icon": base_path_icon + "/icon2.svg"
    },
    {
        "label": "Mission",
        "link": "/mission",
        "icon": base_path_icon + "/icon3.svg"
    },
    {
        "label": "Billing & Payments",
        "link": "/billing",
        "icon": base_path_icon + "/icon4.svg"
    },

    {
        "label": "How it Works?",
        "link": "/howitworks",
        "icon": base_path_icon + "/icon6.svg"
    },
    {
        "label": "Home",
        "link": "/",
        "icon": base_path_icon + "/icon6.svg"
    },
    {
        "label": "About Us",
        "link": "/aboutus",
        "icon": base_path_icon + "/icon7.svg"
    },
    {
        "label": "Settings",
        "link": "/settings",
        "icon": base_path_icon + "/icon8.svg"
    },
    {
        "heading": "Help & Support"
    },
    {
        "label": "Terms & Privacy Policy",
        "link": "/terms",
        "icon": base_path_icon + "/icon9.svg"
    },
    {
        "label": "Support",
        "link": "/inbox",
        "icon": base_path_icon + "/icon10.svg"
    },
    {
        "label": "FAQs",
        "link": "/faq",
        "icon": base_path_icon + "/icon11.svg"
    },
    {
        "heading": "Account"
    },
    {
        "label": "My Profile",
        "link": `/profile?id=${issuerId}`,
        "icon": base_path_icon + "/icon12.svg"
    },
    {
        "label": "Sign Off",
        "link": `/logout`,
        "icon": base_path_icon + "/icon13.svg"
    },
]

export const d = [

]
