import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { month: "Jan", earnings1: 5000, earnings2: 7000 },
  { month: "Feb", earnings1: 10000, earnings2: 11000 },
  { month: "Mar", earnings1: 15000, earnings2: 20000 },
  { month: "Apr", earnings1: 20000, earnings2: 23000 },
  { month: "May", earnings1: 25000, earnings2: 27000 },
  { month: "Jun", earnings1: 30000, earnings2: 32000 },
  { month: "Jul", earnings1: 35000, earnings2: 37000 },
];

const SellerLineChartComponent = () => {
  return (
    <div className="w-full p-6">
      
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-black text-2xl font-semibold mb-1">Total Earnings to Date</h2>
          <p className="text-[#1C1C1CA3]">All time payment</p>
        </div>
       
      </div>

    
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#6B7280" }} />
          <YAxis
            tick={{ fontSize: 12, fill: "#6B7280" }}
            domain={[0, 35000]}
            ticks={[0, 5000, 10000, 15000, 20000, 25000, 30000, 35000]}
          />
          <Tooltip contentStyle={{ backgroundColor: "#fff", borderColor: "#ddd" }} />
          <Line
            type="monotone"
            dataKey="earnings1"
            stroke="#0E2C6C"
            strokeWidth={2}
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="earnings2"
            stroke="#0E2C6C7A"
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SellerLineChartComponent;
