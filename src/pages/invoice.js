import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../baseURL";
import { MoonLoader } from "react-spinners";

export default function Invoice() {
    const [loading,setLoading]=useState(true)
  const [transaction, setTransaction] = useState(null);
  const [bond, setBond] = useState(null);
  const [data,setData]=useState("")
  const navigate = useNavigate();
  let { id } = useParams();

  useEffect(() => {
    getTransaction();
  }, []);

  const getTransaction = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        headers: {
          authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get(`${BASE_URL}/getInvoice/${id}`, headers);
      setTransaction(response.data.transaction);
      console.log(response)
      setData(response.data.data)
      setBond(response.data.transaction?.bond_id);
      setLoading(false)
    } catch (e) {
      console.error("Error fetching transaction:", e.message);
    }
  };

  return (
    <div className="w-full p-4 h-[700px] flex flex-col items-center">
      <div className="w-full h-full max-w-4xl p-4 bg-white rounded-lg shadow-md">
  {loading?<div className="flex justify-center items-center">
    <MoonLoader color="#6B33E3" size={100} />
    
    </div>:<>
        {/* Back Button */}
        <svg
          onClick={() => navigate(-1)}
          className="cursor-pointer mb-4"
          width={35}
          height={35}
          viewBox="0 0 1024 1024"
          xmlns="http://www.w3.org/2000/svg"
          fill="#000000"
        >
          <path d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z" />
          <path d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z" />
        </svg>

        {/* Invoice Header */}
        <div className="flex flex-col text-center">
          <h1 className="text-2xl font-semibold">Invoice</h1>
          <p className="text-gray-600 text-sm">Review your transaction details</p>
        </div>

        {/* Transaction and Bond Details */}
        <div className="mt-6 flex flex-col gap-6">
          {/* Transaction Details */}
          <div className="p-4 border rounded-lg shadow-sm">
            <h2 className="text-lg font-bold text-gray-800">Transaction Details</h2>
            <div className="mt-4 text-sm text-gray-700">
              <p>
                <strong>Transaction ID:</strong> {transaction?._id || "N/A"}
              </p>
              <p>
                <strong>Payment Method:</strong>{" "}
                {transaction?.payment_method_id?.method_name?'CARD':transaction?.payment_method_id?.method_name || "N/A"}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                <span
                  className={`font-bold ${
                    transaction?.status === "SUCCESS"
                      ? "text-green-500"
                      : transaction?.status === "FAILED"
                      ? "text-red-500"
                      : "text-yellow-500"
                  }`}
                >
                  {transaction?.status || "N/A"}
                </span>
              </p>
              <p>
                <strong>Amount:</strong> ${transaction?.amount || 0}
              </p>
              <p>
                <strong>Number of Bonds:</strong> {transaction?.no_of_bonds || 0}
              </p>
              <p>
  <strong>Transaction Date:</strong> {transaction?.createdAt ? 
    (() => {
      try {
        return new Date(transaction.createdAt).toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        });
      } catch {
        return "Invalid Date";
      }
    })() : "N/A"}
</p>
              {/* <p>
                <strong>Last Updated:</strong> {transaction?.updatedAt || "N/A"}
              </p> */}
              {/* <p>
                <strong>Description:</strong>{" "}
                {transaction?.description || "No description available"}
              </p> */}
            </div>
          </div>

          {/* Bond Details */}
          {bond && (
            <div className="p-4 border rounded-lg shadow-sm">
              <h2 className="text-lg font-bold text-gray-800">Bond Details</h2>
              <div className="mt-4 text-sm text-gray-700">
                <p>
                  <strong>Bond Title:</strong> {bond.title || "N/A"}
                </p>
                <p>
                  <strong>Issuer:</strong> {bond.issuer_id?.user_id?.username || "N/A"}
                </p>
                <p>
                  <strong>Price:</strong> ${bond.bond_price|| 0}
                </p>
                <p>
                  <strong>Total Bonds:</strong> {bond.total_bonds || 0}
                </p>
                <p>
                  <strong>Status:</strong> {bond.status || "N/A"}
                </p>
                {/* <p>
                  <strong>Bond Category:</strong> {bond.category || "N/A"}
                </p> */}
                {/* <p>
                  <strong>Interest Rate:</strong>{" "}
                  {bond.interest_rate ? `${bond.interest_rate}%` : "N/A"}
                </p> */}
                {/* <p>
                  <strong>Maturity Date:</strong> {bond.maturity_date || "N/A"}
                </p> */}
              </div>
            </div>
          )}
        </div>
  </>}
      </div>
    </div>
  );
}
