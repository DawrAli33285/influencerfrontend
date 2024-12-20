// import React from "react";
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// const data = [
//   { month: "Jan", earnings1: 5000, earnings2: 7000 },
//   { month: "Feb", earnings1: 10000, earnings2: 11000 },
//   { month: "Mar", earnings1: 15000, earnings2: 20000 },
//   { month: "Apr", earnings1: 20000, earnings2: 23000 },
//   { month: "May", earnings1: 25000, earnings2: 27000 },
//   { month: "Jun", earnings1: 30000, earnings2: 32000 },
//   { month: "Jul", earnings1: 35000, earnings2: 37000 },
// ];

// const SellerLineChartComponent = () => {
//   return (
//     <div className="w-full p-6">

//       <div className="flex justify-between items-center mb-6">
//         <div>
//           <h2 className="text-black text-2xl font-semibold mb-1">Total Earnings to Date12</h2>
//           <p className="text-[#1C1C1CA3]">All time payment</p>
//         </div>

//       </div>


//       <ResponsiveContainer width="100%" height={400}>
//         <LineChart data={data}>
//           <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
//           <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#6B7280" }} />
//           <YAxis
//             tick={{ fontSize: 12, fill: "#6B7280" }}
//             domain={[0, 35000]}
//             ticks={[0, 5000, 10000, 15000, 20000, 25000, 30000, 35000]}
//           />
//           <Tooltip contentStyle={{ backgroundColor: "#fff", borderColor: "#ddd" }} />
//           <Line
//             type="monotone"
//             dataKey="earnings1"
//             stroke="#0E2C6C"
//             strokeWidth={2}
//             dot={false}
//           />
//           <Line
//             type="monotone"
//             dataKey="earnings2"
//             stroke="#0E2C6C7A"
//             strokeWidth={2}
//             strokeDasharray="5 5"
//             dot={false}
//           />
//         </LineChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default SellerLineChartComponent;


import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import "tailwindcss/tailwind.css";

const SellerLineChartComponent = ({ lineGraphData }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    // Default data in case lineGraphData is empty
    const defaultData = {
      labels: ["Jan"], // Default label
      datasets: [
        {
          label: "Total Earnings",
          data: [0], // Default earnings value
          backgroundColor: "rgba(34, 197, 94, 0.1)", // Light green
          borderColor: "#22c55e", // Tailwind green-500
          borderWidth: 2,
          pointRadius: 4,
          pointBackgroundColor: "#22c55e",
          tension: 0.4, // Smooth curve
          fill: true,
        },
      ],
    };

    // Check if lineGraphData is empty and set default data if so
    const data = lineGraphData && lineGraphData.labels.length > 0 && lineGraphData.data.length > 0
      ? {
          labels: lineGraphData.labels,
          datasets: [
            {
              label: "Total Earnings",
              data: lineGraphData.data,
              backgroundColor: "rgba(34, 197, 94, 0.1)", // Light green
              borderColor: "#22c55e", // Tailwind green-500
              borderWidth: 2,
              pointRadius: 4,
              pointBackgroundColor: "#22c55e",
              tension: 0.4, // Smooth curve
              fill: true,
            },
          ],
        }
      : defaultData; // Use default data if empty

    // Chart configuration
    const config = {
      type: "line",
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            grid: { display: false },
            ticks: { font: { size: 12 } },
          },
          y: {
            grid: { color: "#E5E7EB" }, // Tailwind gray-300
            ticks: { beginAtZero: true, font: { size: 12 } },
          },
        },
        plugins: {
          legend: { display: false }, // Hide legend
          tooltip: {
            callbacks: {
              label: function (context) {
                return ` ${context.dataset.label}: ${context.parsed.y}k`;
              },
            },
            backgroundColor: "#333",
            titleColor: "#fff",
            bodyColor: "#fff",
            displayColors: false,
          },
        },
      },
    };

    // Initialize Chart
    chartInstance.current = new Chart(ctx, config);

    // Cleanup chart instance on unmount
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [lineGraphData]); // Re-render when lineGraphData changes

  return (
    <div className="flex items-center justify-center">
      <div className="w-full p-4">
        <div className="bg-white">
          {/* Title */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg md:text-[17px] font-medium text-primary-dark">
              Total Earnings till Date
            </h2>
            <p className="text-sm text-primary-dark">This Month</p>
          </div>

          {/* Chart */}
          <div className="relative w-full">
            <canvas ref={chartRef} className="h-[400px]"></canvas>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerLineChartComponent;
