// import React from "react";
// import { NavLink } from "react-router-dom";
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

// let data = [
//   { month: "Jan", completed: 10, pending: 5, avgTime: 3, successRate: 80 },
//   { month: "Feb", completed: 15, pending: 10, avgTime: 4, successRate: 85 },
//   { month: "Mar", completed: 12, pending: 7, avgTime: 3.5, successRate: 88 },
//   { month: "Apr", completed: 18, pending: 4, avgTime: 2.8, successRate: 90 },
//   { month: "May", completed: 14, pending: 6, avgTime: 3.2, successRate: 87 },
//   { month: "Jun", completed: 20, pending: 3, avgTime: 2.5, successRate: 92 },
// ];

// const colors = {
//   completed: "#F2CCB3",
//   pending: "#B1CADB",
//   avgTime: "#C5DFB6",
//   successRate: "#EAC3E5",
// };

// const SellerMissionStatsChart = ({ state }) => {
//   data = state?.monthlyBonds
//   return (
//     <div className="w-full p-6 h-[80%]">

// <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-4 lg:gap-0">
//   {/* Title */}
//   <h2 className="text-primary-dark text-[17px] font-medium mb-1 lg:mb-0">Mission Stats</h2>

//   {/* Stats Container */}
//   <div className="flex flex-wrap items-start lg:items-center gap-4 lg:gap-6">
//     {/* Completed Missions */}
//     <div className="flex items-center gap-2">
//       <div className="w-3 h-3 bg-[#FFEDE8] opacity-48 rounded-full"></div>
//       <span className="text-[10px] lg:text-[12px]">Completed Missions</span>
//     </div>

//     {/* Pending Missions */}
//     <div className="flex items-center gap-2">
//       <div className="w-3 h-3 bg-[#FFEDE8] opacity-48 rounded-full"></div>
//       <span className="text-[10px] lg:text-[12px]">Pending Missions</span>
//     </div>

//     {/* Average Fulfillment Time */}
//     <div className="flex items-center gap-2">
//       <div className="w-3 h-3 bg-[#FFEDE8] opacity-48 rounded-full"></div>
//       <span className="text-[10px] lg:text-[12px]">Average Fulfillment Time</span>
//     </div>

//     {/* Mission Success Rate */}
//     <div className="flex items-center gap-2">
//       <div className="w-3 h-3 bg-[#FFEDE8] opacity-48 rounded-full"></div>
//       <span className="text-[10px] lg:text-[12px]">Mission Success Rate</span>
//     </div>

//     {/* View All Link */}
//     <NavLink
//       className="underline text-[12px] lg:text-[14px] text-[#6440FB]"
//       to="/sdfd"
//     >
//       View all
//     </NavLink>
//   </div>
// </div>


//       {state?.monthlyBonds?.length > 0 ? <>

//         <ResponsiveContainer width="100%" height={400}>
//           <LineChart data={data}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="month" />
//             <YAxis />
//             <Tooltip />


//             <Line
//               type="monotone"
//               dataKey="completed"
//               stroke={colors.completed}
//               strokeWidth={2}
//               dot={{ fill: colors.completed, r: 4 }}
//             />

//             <Line
//               type="monotone"
//               dataKey="pending"
//               stroke={colors.pending}
//               strokeWidth={2}
//               dot={{ fill: colors.pending, r: 4 }}
//             />


//             <Line
//               type="monotone"
//               dataKey="avgTime"
//               stroke={colors.avgTime}
//               strokeWidth={2}
//               dot={{ fill: colors.avgTime, r: 4 }}
//             />


//             <Line
//               type="monotone"
//               dataKey="successRate"
//               stroke={colors.successRate}
//               strokeWidth={2}
//               dot={{ fill: colors.successRate, r: 4 }}
//             />


//             <Legend verticalAlign="top" align="right" />
//           </LineChart>
//         </ResponsiveContainer>
//       </> : <div className="h-full flex justify-center items-center">
//         <p>No Record Found</p>
//       </div>}


//       {/* <div className="flex justify-center mt-4 space-x-4">

//         <div className="flex items-center space-x-2">
//           <div className="w-3 h-3" style={{ backgroundColor: colors.completed }}></div>
//           <p className="text-sm text-gray-700">Completed Missions</p>
//         </div>


//         <div className="flex items-center space-x-2">
//           <div className="w-3 h-3" style={{ backgroundColor: colors.pending }}></div>
//           <p className="text-sm text-gray-700">Pending Missions</p>
//         </div>


//         <div className="flex items-center space-x-2">
//           <div className="w-3 h-3" style={{ backgroundColor: colors.avgTime }}></div>
//           <p className="text-sm text-gray-700">Avg Fulfillment Time</p>
//         </div>


//         <div className="flex items-center space-x-2">
//           <div className="w-3 h-3" style={{ backgroundColor: colors.successRate }}></div>
//           <p className="text-sm text-gray-700">Mission Success Rate</p>
//         </div>
//       </div> */}
//     </div>
//   );
// };

// export default SellerMissionStatsChart;





// import React, { useEffect, useRef } from "react";
// import { Chart, registerables } from "chart.js";
// import { NavLink } from "react-router-dom";

// Chart.register(...registerables);

// const SellerMissionStatsChart = () => {
//   const chartRef = useRef(null);

//   useEffect(() => {
//     const ctx = chartRef.current.getContext("2d");
//     const missionChart = new Chart(ctx, {
//       type: "line",
//       data: {
//         labels: ["Jan", "Feb", "Mar", "Apr", "May"],
//         datasets: [
//           {
//             label: "Completed Missions",
//             data: [12, 14, 10, 11, 9],
//             borderColor: "#FDBA74",
//             backgroundColor: "transparent",
//             borderWidth: 2,
//             tension: 0.4,
//             pointRadius: 4,
//           },
//           {
//             label: "Pending Missions",
//             data: [15, 13, 14, 12, 11],
//             borderColor: "#3B82F6",
//             backgroundColor: "transparent",
//             borderWidth: 2,
//             tension: 0.4,
//             pointRadius: 4,
//           },
//           {
//             label: "Average Fulfillment Time",
//             data: [10, 10, 12, 14, 13],
//             borderColor: "#4ADE80",
//             backgroundColor: "transparent",
//             borderWidth: 2,
//             tension: 0.4,
//             pointRadius: 4,
//           },
//           {
//             label: "Mission Success Rate",
//             data: [16, 11, 15, 16, 9],
//             borderColor: "#E879F9",
//             backgroundColor: "transparent",
//             borderWidth: 2,
//             tension: 0.4,
//             pointRadius: 4,
//           },
//         ],
//       },
//       options: {
//         responsive: true,
//         plugins: {
//           legend: {
//             display: true,
//             position: "top",
//           },
//           tooltip: {
//             mode: "index",
//             intersect: false,
//           },
//         },
//         scales: {
//           x: {
//             display: true,
//           },
//           y: {
//             display: true,
//             beginAtZero: true,
//             ticks: {
//               stepSize: 5,
//             },
//           },
//         },
//       },
//     });

//     return () => {
//       missionChart.destroy();
//     };
//   }, []);

//   return (
//     <div className="p-6 bg-white mission-chart lg:max-h-[480px]">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-6 border-b pb-4">
//         <h1 className="text-2xl font-semibold text-gray-800">Mission Stats</h1>
//         <NavLink to='/' className="text-blue-600 hover:underline font-medium">
//           View All
//         </NavLink>
//       </div>

//       {/* Chart */}
//       <div className="w-full">
//         <canvas ref={chartRef}></canvas>
//       </div>
//     </div>
//   );
// };

// export default SellerMissionStatsChart;





// import React from 'react';
// import {
//   Chart as ChartJS,
//   LineElement,
//   PointElement,
//   LinearScale,
//   Title,
//   Tooltip,
//   Legend,
//   CategoryScale,
// } from 'chart.js';
// import { Line } from 'react-chartjs-2';


// ChartJS.register(LineElement, PointElement, LinearScale, Title, Tooltip, Legend, CategoryScale);

// const SellerMissionStatsChart = () => {
//   // Chart Data
//   const data = {
//     labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
//     datasets: [
//       {
//         label: 'Completed Missions',
//         data: [12, 14, 11, 10, 8],
//         borderColor: '#FFC3A0',
//         backgroundColor: '#FFC3A0',
//         tension: 0.4,
//         pointRadius: 5,
//         pointHoverRadius: 7,
//       },
//       {
//         label: 'Pending Missions',
//         data: [10, 12, 14, 9, 11],
//         borderColor: '#5CE1E6',
//         backgroundColor: '#5CE1E6',
//         tension: 0.4,
//         pointRadius: 5,
//         pointHoverRadius: 7,
//       },
//       {
//         label: 'Average Fulfillment Time',
//         data: [15, 10, 16, 14, 13],
//         borderColor: '#84DE74',
//         backgroundColor: '#84DE74',
//         tension: 0.4,
//         pointRadius: 5,
//         pointHoverRadius: 7,
//       },
//       {
//         label: 'Mission Success Rate',
//         data: [13, 11, 12, 15, 16],
//         borderColor: '#E8B3F2',
//         backgroundColor: '#E8B3F2',
//         tension: 0.4,
//         pointRadius: 5,
//         pointHoverRadius: 7,
//       },
//     ],
//   };

//   // Chart Options
//   const options = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: {
//         display: true,
//         position: 'top',

//         labels: {
//           boxWidth: 10,
//           usePointStyle: true,
//           padding: 30,
//           color: '#6E6E6E',
//         },
//       },
//       tooltip: {
//         mode: 'index',
//         intersect: false,
//         bodySpacing: 5,
//         titleMarginBottom: 10,
//         footerMarginTop: 10,
//         padding: 10,
//         backgroundColor: '#fff',
//         titleColor: '#000',
//         bodyColor: '#000',
//         borderColor: '#E5E5E5',
//         borderWidth: 1,
//       },
//     },
//     scales: {
//       x: {
//         grid: {
//           display: false,
//         },
//         ticks: {
//           color: '#8E8E8E',
//         },
//       },
//       y: {
//         beginAtZero: true,
//         grid: {
//           color: '#F0F0F0',
//         },
//         ticks: {
//           color: '#8E8E8E',
//         },
//       },
//     },
//     elements: {
//       point: {
//         borderWidth: 2,
//         hoverBorderWidth: 3,
//       },
//     },
//   };

//   return (
//     <div className="w-full h-[360px] mission-chart bg-white">
//       <h2 className="text-primary-dark text-[17px] font-medium mb-2  pt-6 px-6">Mission Stats</h2>
//       <Line data={data} options={options} />
//     </div>
//   );
// };

// export default SellerMissionStatsChart;
import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const SellerMissionStatsChart = ({ state }) => {
  // Preprocess the data to flatten the nested structure
  const data = (state?.missionGraph || []).map((item) => ({
    ...item,
    completedMissions: item.stats?.[0]?.count || 0, // Add completed missions count
    pendingMissions: item.stats?.[1]?.count || 0,   // Add pending missions count
  }));

  return (
    <div className={`${data?.length>0?'bg-white':''} p-6 w-full max-w-5xl mx-auto`}>
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-4 lg:gap-0">
        <h2 className="text-primary-dark text-[17px] font-medium mb-1 lg:mb-0">Mission Stats</h2>

        <div className="flex flex-wrap items-start lg:items-center gap-4 lg:gap-6">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-[#F2CCB3] rounded-full"></div>
            <span className="text-[10px] lg:text-[12px]">Completed Missions</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-[#B1CADB] rounded-full"></div>
            <span className="text-[10px] lg:text-[12px]">Pending Missions</span>
          </div>
        </div>
      </div>

      {data.length > 0 ? (
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend verticalAlign="top" align="right" />

            {/* Use the preprocessed keys */}
            <Line type="monotone" dataKey="completedMissions" stroke="#F2CCB3" strokeWidth={2} dot={{ fill: "#F2CCB3", r: 4 }} />
            <Line type="monotone" dataKey="pendingMissions" stroke="#B1CADB" strokeWidth={2} dot={{ fill: "#B1CADB", r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <div className="h-[300px] flex justify-center items-center">
          <p>No Record Found</p>
        </div>
      )}
    </div>
  );
};

export default SellerMissionStatsChart;
