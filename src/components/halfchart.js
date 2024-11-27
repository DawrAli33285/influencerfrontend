import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const data = [
  { name: "Withdrawable", value: 60 },
  { name: "Pending", value: 40 },
];

const COLORS = ['#0E2C6C','#0E2C6C3D']; 

const HalfPieChartComponent = () => {
  return (
    <div className="w-full p-6">
      {/* Chart Header */}
      <div className="flex flex-col items-center mb-6">
        <h2 className="text-black text-2xl font-semibold mb-1">Withdrawable vs Pending</h2>
        <p className="text-[#1C1C1CA3]">All time payment withdrawal vs pending</p>
      </div>

      {/* Half Pie Chart */}
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            startAngle={180}  // Half pie chart, starting from 180 degrees
            endAngle={0}     // Ending at 0 degrees, creating half the circle
            innerRadius={60}  // Inner radius to create a donut effect
            outerRadius={80}  // Outer radius to control the thickness
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>

      {/* Color Legend (Dots) */}
      <div className="flex justify-center mt-4 space-x-4">
        {/* Withdrawable */}
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-[#0E2C6C] rounded-full"></div>
          <p className="text-sm text-gray-700">Withdrawable</p>
        </div>

        {/* Pending */}
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-[#0E2C6C3D] opacity-48 rounded-full"></div>
          <p className="text-sm text-gray-700">Pending Payment</p>
        </div>
      </div>
    </div>
  );
};

export default HalfPieChartComponent;
