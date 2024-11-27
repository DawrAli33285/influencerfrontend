import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";


const COLORS = ['#0E2C6C3D', '#0E2C6C']; 
const SellerPieChartComponent = ({state}) => {
  console.log("STATe")
  console.log(state)
const data = [
  { name: "Bought Bonds", value: state?.bondList?.filter(u=>u.status=="IN PROGRESS")?.length},
  { name: "Waiting for Exchange", value: state?.bondList?.filter(u=>u.status=="WAITING FOR EXCHANGE")?.length},
];


  return (
    <div className="w-full p-6 h-[100%]">
      
      <div className="flex flex-col items-center mb-6">
        <h2 className="text-black text-2xl font-semibold mb-1">Bonds</h2>
        <p className="text-[#1C1C1CA3]">Your all time bought bonds total</p>
      </div>

     {state?.bondList?.filter(u=>u?.status=="IN PROGRESS")?.length>0?
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={100}
            outerRadius={120}
            paddingAngle={5}
            dataKey="value"
            startAngle={90}
            endAngle={-270}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
:<div className="w-full h-[73%] flex justify-center items-center">
  <p>No Data</p>
</div>}
  
      <div className="flex justify-center mt-4 space-x-4">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-[#0E2C6C3D] rounded-full"></div>
          <p className="text-sm text-gray-700">Bought Bonds</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-[#0E2C6C] opacity-48 rounded-full"></div>
          <p className="text-sm text-gray-700">Bonds for Exchange</p>
        </div>
      </div>
    </div>
  );
};

export default SellerPieChartComponent;
