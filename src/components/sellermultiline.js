import React, { useState, useEffect } from "react";
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

const processDataForGraph = (missionList) => {
  const result = [];

  missionList.forEach((mission) => {
    const month = new Date(mission.createdAt).toLocaleString("default", { month: "short" });
    let monthData = result.find((entry) => entry.month === month);

    if (!monthData) {
      monthData = { month, completed: 0, pending: 0, avgTime: 0, totalTime: 0, totalMissions: 0 };
      result.push(monthData);
    }

    monthData.totalMissions++;
    if (mission.status === "COMPLETED") {
      monthData.completed++;
      monthData.totalTime += 3; // Replace 3 with actual time from mission data if available
    } else {
      monthData.pending++;
    }
  });

  result.forEach((entry) => {
    entry.avgTime = entry.completed ? (entry.totalTime / entry.completed).toFixed(2) : 0;
    entry.successRate = ((entry.completed / entry.totalMissions) * 100).toFixed(2);
    delete entry.totalTime;
    delete entry.totalMissions;
  });

  return result;
};

const SellerMissionStatsChart = () => {
  const [missionList, setMissionList] = useState([
    {
      _id: "6754668651f43ab6353f67b7",
      bond_id: "675c33145305a71d9dfb1b45",
      description: "mission title",
      mission_title: "mission title",
      nsfw: false,
      status: "NOT STARTED",
      createdAt: "2024-12-07T15:10:04.165Z",
      updatedAt: "2024-12-13T13:13:57.267Z",
    },
    {
      _id: "67551c4e362daa2759c6a41e",
      bond_id: "67551c4e362daa2759c6a41a",
      description: "mission page description",
      mission_title: "mission title",
      status: "COMPLETED",
      createdAt: "2024-12-01T10:00:00.000Z",
      updatedAt: "2024-12-13T13:13:57.267Z",
    },
    // Add more missions as needed
  ]);

  const [graphData, setGraphData] = useState([]);

  useEffect(() => {
    const processedData = processDataForGraph(missionList);
    setGraphData(processedData);
  }, [missionList]);

  return (
    <div className="bg-white p-6 w-full max-w-5xl mx-auto">
      {/* Chart Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-4 lg:gap-0">
        <h2 className="text-primary-dark text-[17px] font-medium mb-1 lg:mb-0">
          Mission Stats
        </h2>
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-[#F2CCB3] rounded-full"></div>
            <span className="text-[12px]">Completed Missions</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-[#B1CADB] rounded-full"></div>
            <span className="text-[12px]">Pending Missions</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-[#C5DFB6] rounded-full"></div>
            <span className="text-[12px]">Average Fulfillment Time</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-[#EAC3E5] rounded-full"></div>
            <span className="text-[12px]">Mission Success Rate</span>
          </div>
        </div>
      </div>
      {/* Line Chart */}
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={graphData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="completed"
            stroke={colors.completed}
            strokeWidth={2}
            dot={{ fill: colors.completed, r: 4 }}
          />
          <Line
            type="monotone"
            dataKey="pending"
            stroke={colors.pending}
            strokeWidth={2}
            dot={{ fill: colors.pending, r: 4 }}
          />
          <Line
            type="monotone"
            dataKey="avgTime"
            stroke={colors.avgTime}
            strokeWidth={2}
            dot={{ fill: colors.avgTime, r: 4 }}
          />
          <Line
            type="monotone"
            dataKey="successRate"
            stroke={colors.successRate}
            strokeWidth={2}
            dot={{ fill: colors.successRate, r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SellerMissionStatsChart;
