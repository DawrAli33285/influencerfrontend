import React, { useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const colors = {
  completed: "#F2CCB3",
  pending: "#B1CADB",
  avgTime: "#C5DFB6",
  successRate: "#EAC3E5",
};

const MissionStatsChart = ({ state }) => {
  
  const chartData = useMemo(() => {
    return state?.missionGraph?.map((entry) => {
      const stats = entry.stats.reduce(
        (acc, stat) => {
          acc[stat.status.toLowerCase().replace(" ", "_")] = stat.count;
          return acc;
        },
        {}
      );

      return {
        month: entry.name,
        year: entry.year,
        successRate: entry.successRate,
        ...stats,
      };
    });
  }, [state?.missionGraph]);

  return (
    <div className="w-full h-full p-6">
    
      <div className="flex flex-col items-center mb-6">
        <h2 className="text-black text-2xl font-semibold mb-1">Mission Stats</h2>
        <p className="text-[#1C1C1CA3]">Your mission progress and stats</p>
      </div>

      
      {state?.missionGraph?.length>0?<ResponsiveContainer width="100%" height={400}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />

         
          <Line
            type="monotone"
            dataKey="completed"
            stroke={colors.completed}
            strokeWidth={2}
            dot={{ fill: colors.completed, r: 4 }}
          />
          <Line
            type="monotone"
            dataKey="not_started"
            stroke={colors.pending}
            strokeWidth={2}
            dot={{ fill: colors.pending, r: 4 }}
          />
          <Line
            type="monotone"
            dataKey="successRate"
            stroke={colors.successRate}
            strokeWidth={2}
            dot={{ fill: colors.successRate, r: 4 }}
          />

          <Legend verticalAlign="top" align="right" />
        </LineChart>
      </ResponsiveContainer>:<div className="w-full flex h-[77%] justify-center items-center">
        <p>No record found</p>
        </div>}

     
      <div className="flex justify-center mt-4 space-x-4">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3" style={{ backgroundColor: colors.completed }}></div>
          <p className="text-sm text-gray-700">Completed Missions</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3" style={{ backgroundColor: colors.pending }}></div>
          <p className="text-sm text-gray-700">Not Started Missions</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3" style={{ backgroundColor: colors.successRate }}></div>
          <p className="text-sm text-gray-700">Mission Success Rate</p>
        </div>
      </div>
    </div>
  );
};

export default MissionStatsChart;
