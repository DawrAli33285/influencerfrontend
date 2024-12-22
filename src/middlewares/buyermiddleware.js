import axios from "axios";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { BASE_URL } from "../baseURL";
import { useLocation } from "react-router-dom";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

const BuyerMiddleware = () => {
  const navigate = useNavigate();
  const location=useLocation();
  
 

  useEffect(() => {
    let isMounted = true;

    const checkForAuth = async () => {
     
      try {
        const token = localStorage.getItem("buyerToken");
        if (!token) {
          toast.error("Please login to access the website", {
            containerId: "buyerAuthentication",
          });
          localStorage.setItem('pathName',location.pathname)
          navigate("/signin", { replace: true }); 
          return;
        }

        const headers = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        await axios.get(`${BASE_URL}/allowBuyerAccess`, headers);
      let issuertoken=localStorage.getItem('token')
      const headersissuer= {
        headers: {
          Authorization: `Bearer ${issuertoken}`,
        },
      };
      let response=await axios.get(`${BASE_URL}/allowIssuerAccess`, headersissuer);
      if(response.data.issuer.user_id.status=="ONE WEEK SUSPENSION" || response.data.issuer.user_id.status=="PERMANENT"){
        toast.error("User banned",{containerId:"issuerAuthentication"})
      window.location.href='/'
         }



      } catch (e) {
        
        if (e?.response?.data?.error) {
          toast.error(e.response.data.error, {
            containerId: "buyerAuthentication",
          });
        } else {
          toast.error("An unexpected error occurred. Please try again.", {
            containerId: "buyerAuthentication",
          });
        }
        if (isMounted) {navigate("/signin", { replace: true })
          localStorage.setItem('pathName',location.pathname)
        };
      }
    };

    checkForAuth();

    return () => {
      isMounted = false;
    };
  }, [navigate]);


  return (
    <>
      <ToastContainer containerId={"buyerAuthentication"} />
      <Outlet />
    </>
  );
};

export default BuyerMiddleware;
