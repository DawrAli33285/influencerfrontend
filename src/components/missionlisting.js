import React, { useState } from 'react';

const MissionListingTable = () => {
    const [selectedMonth, setSelectedMonth] = useState('default');

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const getStatusClass = (status) => {
        switch (status) {
            case 'pending':
                return 'text-orange-500';
            case 'active':
                return 'text-red-500';
            case 'completed':
                return 'text-green-500';
            default:
                return '';
        }
    };

    return (
        <div className="bg-white p-[20px] rounded-[20px] shadow-md">
            <div className="flex justify-between items-center mb-[20px]">
                <h1 className="text-[#2563EB] text-[24px] font-semibold">Mission Listing</h1>
                <select
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                    className="p-[8px] bg-white font-semibold text-black rounded-[10px] border-[1px] border-black outline-none"
                >
                    <option value="default">Select Month</option>
                    {months.map((month) => (
                        <option key={month} value={month}>
                            {month}
                        </option>
                    ))}
                </select>
            </div>

            <table className="min-w-full table-auto border-gray-300 border-collapse">
                <thead>
                    <tr className="bg-[#FDFBFD]">
                        <th className="p-[10px] text-left border-l border-t border-gray-300">Mission Title</th>
                        <th className="p-[10px] text-left border-l border-t border-gray-300">Bond Name</th>
                        <th className="p-[10px] text-left border-l border-t border-gray-300">Purchaser</th>
                        <th className="p-[10px] text-left border-l border-t border-gray-300">Approval Deadline</th>
                        <th className="p-[10px] text-left border-l border-t border-gray-300">Expiration Date</th>
                        <th className="p-[10px] text-left border-l border-t border-gray-300">Status</th>
                        <th className="p-[10px] text-left border-l border-t border-r border-gray-300">Request</th>
                        <th className="p-[10px] text-left border-l border-t border-r border-gray-300">Evaluation Score</th>
                    </tr>
                </thead>
                <tbody>
                    {[
                        { missionTitle: 'Mission 1', bondName: 'Bond A', purchaser: 'Company X', approvalDeadline: '01/12/2023', expirationDate: '01/12/2024', status: 'active', request: true, evaluationScore: 85 },
                        { missionTitle: 'Mission 2', bondName: 'Bond B', purchaser: 'Company Y', approvalDeadline: '15/01/2024', expirationDate: '15/01/2025', status: 'pending', request: false, evaluationScore: 90 },
                    ].map((mission, index) => (
                        <tr key={index} className="border-b">
                            <td className="p-[10px] border-l border-gray-300">{mission.missionTitle}</td>
                            <td className="p-[10px] border-l border-gray-300">{mission.bondName}</td>
                            <td className="p-[10px] border-l border-gray-300">{mission.purchaser}</td>
                            <td className="p-[10px] border-l border-gray-300">{mission.approvalDeadline}</td>
                            <td className="p-[10px] border-l border-gray-300">{mission.expirationDate}</td>
                            <td className={`border-l  border-gray-300 p-[10px] ${getStatusClass(mission.status)}`}>
                                {mission.status.charAt(0).toUpperCase() + mission.status.slice(1)}
                            </td>
                            <td className="p-[10px] border-l border-r border-gray-300">
                                {mission.request ? (
                                    <a href="#" className="underline text-blue-500">
                                        Request Mission
                                    </a>
                                ) : (
                                    '-'
                                )}
                            </td>
                            <td className="p-[10px] border-l border-r border-gray-300">{mission.evaluationScore}%</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MissionListingTable;
