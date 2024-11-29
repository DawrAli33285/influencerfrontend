import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

let data = [
  { month: "Jan", completed: 10, pending: 5, avgTime: 3, successRate: 80 },
  { month: "Feb", completed: 15, pending: 10, avgTime: 4, successRate: 85 },
  { month: "Mar", completed: 12, pending: 7, avgTime: 3.5, successRate: 88 },
  { month: "Apr", completed: 18, pending: 4, avgTime: 2.8, successRate: 90 },
  { month: "May", completed: 14, pending: 6, avgTime: 3.2, successRate: 87 },
  { month: "Jun", completed: 20, pending: 3, avgTime: 2.5, successRate: 92 },
];

const colors = {
  completed: "#F2CCB3",
  pending: "#B1CADB",
  avgTime: "#C5DFB6",
  successRate: "#EAC3E5",
};

const SellerMissionStatsChart = ({state}) => {
   data = state?.monthlyBonds
  return (
    <div className="w-full p-6 h-[80%]">
      {/* Chart Header */}
      <div className="flex flex-col items-center mb-6">
        <h2 className="text-black text-2xl font-semibold mb-1">Mission Stats</h2>
        <p className="text-[#1C1C1CA3]">Your mission progress and stats</p>
      </div>

    {state?.monthlyBonds?.length>0?<>
      {/* Multiple Line Chart */}
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          
          {/* Line for Completed Missions */}
          <Line
            type="monotone"
            dataKey="completed"
            stroke={colors.completed}
            strokeWidth={2}
            dot={{ fill: colors.completed, r: 4 }}
          />
          
          {/* Line for Pending Missions */}
          <Line
            type="monotone"
            dataKey="pending"
            stroke={colors.pending}
            strokeWidth={2}
            dot={{ fill: colors.pending, r: 4 }}
          />
          
          {/* Line for Average Fulfillment Time */}
          <Line
            type="monotone"
            dataKey="avgTime"
            stroke={colors.avgTime}
            strokeWidth={2}
            dot={{ fill: colors.avgTime, r: 4 }}
          />
          
          {/* Line for Mission Success Rate */}
          <Line
            type="monotone"
            dataKey="successRate"
            stroke={colors.successRate}
            strokeWidth={2}
            dot={{ fill: colors.successRate, r: 4 }}
          />

          {/* Legend */}
          <Legend verticalAlign="top" align="right" />
        </LineChart>
      </ResponsiveContainer>
    </>:<div className="h-full flex justify-center items-center">
    <p>No Record Found</p>
    </div>}

      {/* Color Legend (Dots) */}
      <div className="flex justify-center mt-4 space-x-4">
        {/* Completed Missions */}
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3" style={{ backgroundColor: colors.completed }}></div>
          <p className="text-sm text-gray-700">Completed Missions</p>
        </div>

        {/* Pending Missions */}
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3" style={{ backgroundColor: colors.pending }}></div>
          <p className="text-sm text-gray-700">Pending Missions</p>
        </div>

        {/* Average Fulfillment Time */}
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3" style={{ backgroundColor: colors.avgTime }}></div>
          <p className="text-sm text-gray-700">Avg Fulfillment Time</p>
        </div>

        {/* Mission Success Rate */}
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3" style={{ backgroundColor: colors.successRate }}></div>
          <p className="text-sm text-gray-700">Mission Success Rate</p>
        </div>
      </div>
    </div>
  );
};

export default SellerMissionStatsChart;
