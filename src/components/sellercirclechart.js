// import React from "react";
// import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";


// const COLORS = ['#0E2C6C3D', '#0E2C6C'];
// const SellerPieChartComponent = ({ state }) => {
//   console.log("STATe")
//   console.log(state)
//   const data = [
//     { name: "Bought Bonds", value: state?.bondList?.filter(u => u.status == "IN PROGRESS")?.length },
//     { name: "Waiting for Exchange", value: state?.bondList?.filter(u => u.status == "WAITING FOR EXCHANGE")?.length },
//   ];


//   return (
//     <div className="w-full p-6 h-[100%]">

//       <div className="border-b pb-3 flex justify-between items-center">
//         <h2 className="text-primary-dark text-[17px] font-medium mb-1">Completed Bonds</h2>
//         <div className="flex">
//           <div>.</div>
//           <div>.</div>
//           <div>.</div>
//         </div>
//       </div>


//       {state?.bondList?.filter(u => u?.status == "IN PROGRESS")?.length > 0 ?
//         <ResponsiveContainer width="100%" height={400}>
//           <PieChart>
//             <Pie
//               data={data}
//               cx="50%"
//               cy="50%"
//               innerRadius={100}
//               outerRadius={120}
//               paddingAngle={5}
//               dataKey="value"
//               startAngle={90}
//               endAngle={-270}
//             >
//               {data.map((entry, index) => (
//                 <Cell key={`cell-${index}`} fill={COLORS[index]} />
//               ))}
//             </Pie>
//             <Tooltip />
//           </PieChart>
//         </ResponsiveContainer>
//         : <div className="w-full h-[73%] flex justify-center items-center">
//           <p>No Data</p>
//         </div>}

//       <div className="flex justify-center mt-4 space-x-4">
//         <div className="flex items-center space-x-2">
//           <div className="w-3 h-3 bg-[#0E2C6C3D] rounded-full"></div>
//           <p className="text-sm text-gray-700">Bought Bonds</p>
//         </div>
//         <div className="flex items-center space-x-2">
//           <div className="w-3 h-3 bg-[#0E2C6C] opacity-48 rounded-full"></div>
//           <p className="text-sm text-gray-700">Bonds for Exchange</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SellerPieChartComponent;



const SellerPieChartComponent = ({state}) => {
  return (
    <div className="bg-white flex items-center justify-center">
      {/* Main Card Container */}
      <div className="w-full p-4 bg-white">
        {/* Title */}
        <div className="flex justify-between items-center mb-4 border-b pb-4">
          <h2 className="text-primary-dark font-medium lg:text-[17px]">Completed Bonds</h2>
          <button className="text-primary-dark focus:outline-none">
            {/* Dots Icon */}
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 15a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm0-5a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm0 10a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path>
            </svg>
          </button>
        </div>
        <div className="flex items-center justify-between pt-20">
          {/* Text Info */}
          <div className="mt-4 space-y-2">
            <div className="text-primary-dark">
              <span className="w-2 h-2 bg-green-500 rounded-full inline-block mr-2"></span>
              <span className="flex-1 text-base">Total</span>
              <div className="text-primary-gray-500 px-3">{state?.bondList?.length}</div>
            </div>
            <div className="text-primary-dark">
              <div className="flex items-center">
                <span className="w-2 h-2 bg-yellow-200 rounded-full inline-block mr-2"></span>
                <span className="flex-1 text-base">Done Missions</span>
              </div>
              <div className="text-primary-gray-500 px-3">{state?.bondList?.filter(u=>u?.status=="COMPLETED")?.length}</div>
            </div>
            <div className="text-primary-dark">
              <span className="w-2 h-2 bg-red-200 rounded-full inline-block mr-2"></span>
              <span className="flex-1 text-base">Pending Missions</span>
              <div className="text-primary-gray-500 px-3">{state?.bondList?.filter(u=>u?.status=="IN PROGRESS")?.length}</div>
            </div>
          </div>
          {/* Chart Container */}
          <div className="relative flex items-center justify-center">
            {/* Circular Chart */}
            <svg className="w-40 h-40" viewBox="0 0 36 36">
              {/* Background Circle */}
              <circle
                className="text-gray-200"
                stroke="currentColor"
                strokeWidth="3.8"
                fill="transparent"
                r="15.9155"
                cx="18"
                cy="18"
              ></circle>
              {/* Pending Missions Circle */}
              <circle
                className="text-red-200"
                stroke="currentColor"
                strokeWidth="3.8"
                strokeDasharray="13.5, 100"
                strokeLinecap="round"
                fill="transparent"
                r="15.9155"
                cx="18"
                cy="18"
              ></circle>
              {/* Completed Missions Circle */}
              <circle
                className="text-green-500"
                stroke="currentColor"
                strokeWidth="3.8"
                strokeDasharray="80, 100"
                strokeLinecap="round"
                fill="transparent"
                r="15.9155"
                cx="18"
                cy="18"
              ></circle>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerPieChartComponent;
