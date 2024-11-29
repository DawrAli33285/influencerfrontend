import axios from "axios";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { BASE_URL } from "../baseURL";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

const BuyerMiddleware = () => {
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    const checkForAuth = async () => {
      try {
        const token = localStorage.getItem("buyerToken");
        if (!token) {
          toast.error("Please login to access the website", {
            containerId: "buyerAuthentication",
          });
          navigate("/dashboard", { replace: true }); 
          return;
        }

        const headers = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        await axios.get(`${BASE_URL}/allowBuyerAccess`, headers);
        
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
        if (isMounted) navigate("/dashboard", { replace: true });
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
