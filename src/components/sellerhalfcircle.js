import React from "react";
import { NavLink } from "react-router-dom";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

// const data = [
//   { name: "Withdrawable", value: 60 },
//   { name: "Pending", value: 40 },
// ];

// const COLORS = ['#0E2C6C', '#0E2C6C3D'];

// const SellerHalfPieChartComponent = () => {
//   return (
//     <div className="w-full p-6">

//       <div className="flex items-center justify-between border-b pb-4">
//         <h2 className="text-primary-dark text-[17px] font-medium">Withdraw-able vs Pending</h2>
//         <NavLink to='/dfsds' className=" underline text-[14px] text-[#6440FB]">View all</NavLink>
//       </div>


//       <ResponsiveContainer width="100%" height={478}>
//         <PieChart>
//           <Pie
//             data={data}
//             cx="50%"
//             cy="50%"
//             startAngle={180}
//             endAngle={0}
//             innerRadius={60}
//             outerRadius={80}
//             paddingAngle={5}
//             dataKey="value"
//           >
//             {data.map((entry, index) => (
//               <Cell key={`cell-${index}`} fill={COLORS[index]} />
//             ))}
//           </Pie>
//           <Tooltip />
//         </PieChart>
//       </ResponsiveContainer>


//       <div className="flex items-center justify-between">

//         <div>
//           <div className="flex items-center gap-2">
//             <div className="w-3 h-3 bg-primary-green rounded-full"></div>
//             <span>Withdrawable</span>
//           </div>
//           <div className="text-[#6B7177]">40%</div>
//         </div>


//         <div>
//           <div className="flex items-center gap-2">
//             <div className="w-3 h-3 bg-[#FFEDE8] opacity-48 rounded-full"></div>
//             <span>Pending Payment</span>
//           </div>
//           <div className="text-[#6B7177]">60%</div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SellerHalfPieChartComponent;





const SellerHalfPieChartComponent = () => {
  return (
    <div className="p-6 flex flex-col h-full bg-white">
      {/* Card Container */}
      {/* Header */}
      <div className="flex justify-between items-center mb-4 border-b pb-4">
        <h2 className="text-lg md:text-[17px] font-medium text-primary-dark">Withdraw-able vs Pending</h2>
        <NavLink to='/' className="text-purple-600 text-sm font-medium hover:underline">
          View All
        </NavLink>
      </div>
      <div className="w-full h-full py-6 flex flex-col justify-between">


        {/* Semi-Circle Chart */}
        <div className="relative flex items-center justify-center my-6">
          <svg className="w-44 h-44 transform -rotate-90" viewBox="0 0 36 36">
            {/* Background Circle */}
            <circle
              className="text-red-100"
              stroke="currentColor"
              strokeWidth="3.8"
              fill="transparent"
              r="15.9155"
              cx="18"
              cy="18"
              strokeDasharray="75, 100"
            ></circle>
            {/* Withdrawable Section (Green) */}
            <circle
              className="text-green-500"
              stroke="currentColor"
              strokeWidth="3.8"
              fill="transparent"
              r="15.9155"
              cx="18"
              cy="18"
              strokeDasharray="40, 100"
              strokeLinecap="round"
            ></circle>
          </svg>
        </div>

        {/* Labels */}
        <div className="flex justify-between items-center">
          {/* Withdrawable */}
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 bg-green-500 rounded-full"></span>
            <div>
              <p className="text-gray-700 text-sm font-medium">Withdrawable</p>
              <p className="text-gray-500 text-xs">40%</p>
            </div>
          </div>
          {/* Pending Payments */}
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 bg-red-100 rounded-full"></span>
            <div>
              <p className="text-gray-700 text-sm font-medium">Pending Payments</p>
              <p className="text-gray-500 text-xs">60%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerHalfPieChartComponent;
