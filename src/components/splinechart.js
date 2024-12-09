import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { MoonLoader } from 'react-spinners';
// const data = [
//   { month: 'Jan', bonds: 500 },
//   { month: 'Feb', bonds: 300 },
//   { month: 'Mar', bonds: 700 },
//   { month: 'Apr', bonds: 400 },
//   { month: 'May', bonds: 1200 },
//   { month: 'Jun', bonds: 600 },
//   { month: 'Jul', bonds: 900 },
//   { month: 'Aug', bonds: 1100 },
//   { month: 'Sep', bonds: 1300 },
//   { month: 'Oct', bonds: 1000 },
//   { month: 'Nov', bonds: 1400 },
//   { month: 'Dec', bonds: 1500 },
// ];


const BondAnalyticsChart = ({state,loading}) => {
  function groupBondsByMonth(bondList) {
    const groupedData = {};
  
    bondList?.forEach(bond => {

      const date = new Date(bond.createdAt);
      const month = date.toLocaleString('default', { month: 'short' });
  
     
      if (!groupedData[month]) {
        groupedData[month] = { month: month, bonds: 0 };
      }
  
  
      groupedData[month].bonds += bond.total_bonds
      ;
    });
  
    
    return Object.values(groupedData);
  }
  const data = groupBondsByMonth(state?.bondList);
  return (
    <div className="bg-white p-[20px] rounded-[20px] shadow-[inset -10px 0px 15px -5px #C0A3FC]">
     
      <h1 className="text-[#2563EB] text-[24px] font-semibold mb-[20px]">Bond Analytics</h1>
    {loading?<div className='flex justify-center items-center'>
            <MoonLoader color="#6B33E3" size={100} />
                </div>:<ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis domain={[0, 1500]} ticks={[0, 500, 1000, 1500]} />
          <Tooltip />
          <Line type="monotone" dataKey="bonds" stroke="#22c55e" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>}
    </div>
  );
};

export default BondAnalyticsChart;
