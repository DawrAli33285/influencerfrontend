import axios from "axios";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { BASE_URL } from "../baseURL";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

const IssuerMiddleware = () => {
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    const checkForAuth = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          toast.error("Please login to access the website", {
            containerId: "issuerAuthentication",
          });
          navigate("/signin", { replace: true }); 
          return;
        }

        const headers = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

      let response=await axios.get(`${BASE_URL}/allowIssuerAccess`, headers);
console.log("RESPONSE ISSUER MIDDLEWARE")

      if(response.data.mobile==false){
      navigate('/phoneverification')
        }
        if(response.data.issuer.user_id.status=="ONE WEEK SUSPENSION" || response.data.issuer.user_id.status=="PERMANENT"){
       toast.error("User banned",{containerId:"issuerAuthentication"})
       navigate('/')
        }
      } catch (e) {
        
        if (e?.response?.data?.error) {
          alert(e.response.data.error, {
            containerId: "issuerAuthentication",
          });
        } else {
          toast.error("An unexpected error occurred. Please try again.", {
            containerId: "issuerAuthentication",
          });
        }
        if (isMounted) navigate("/signin", { replace: true });
      }
    };

    checkForAuth();

    return () => {
      isMounted = false;
    };
  }, [navigate]);


  return (
    <>
      <ToastContainer containerId={"issuerAuthentication"} />
      <Outlet />
    </>
  );
};

export default IssuerMiddleware;
