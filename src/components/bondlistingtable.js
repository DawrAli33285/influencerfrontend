import React, { useState } from 'react';

const BondListingTable = () => {
    const [selectedMonth, setSelectedMonth] = useState('default');

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const bondData = [
        { bondName: 'Bond A', issuanceValue: '$1,000,000', quantity: '500', validity: '2 months', status: 'pending' },
        { bondName: 'Bond B', issuanceValue: '$500,000', quantity: '300', validity: '1 month', status: 'completed' },
        { bondName: 'Bond C', issuanceValue: '$750,000', quantity: '200', validity: '3 months', status: 'live' },
        { bondName: 'Bond D', issuanceValue: '$1,200,000', quantity: '1000', validity: '1 month', status: 'pending' },
    ];

    const getStatusClass = (status) => {
        switch (status) {
            case 'pending':
                return 'text-orange-500';
            case 'live':
                return 'text-red-500';
            case 'completed':
                return 'text-green-500';
            default:
                return '';
        }
    };

    return (
        <div className="bg-white">
            <div className="flex justify-between items-center mb-[20px]">
                <h1 className="text-[#2563EB] text-[24px] font-semibold">BondListing</h1>
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
                        <th className="p-[10px] text-left border-l border-t border-gray-300">Bond Name</th>
                        <th className="p-[10px] text-left border-l border-t border-gray-300">Total Issuance Value</th>
                        <th className="p-[10px] text-left border-l border-t border-gray-300">Quantity</th>
                        <th className="p-[10px] text-left border-l border-t border-gray-300">Validity Period</th>
                        <th className="p-[10px] text-left border-l border-t border-r border-gray-300">Last Status</th>
                    </tr>
                </thead>
                <tbody>
                    {bondData.map((bond, index) => (
                        <tr key={index} className="border-b">
                            <td className="p-[10px] border-l border-gray-300">{bond.bondName}</td>
                            <td className="p-[10px] border-l border-gray-300">{bond.issuanceValue}</td>
                            <td className="p-[10px] border-l border-gray-300">{bond.quantity}</td>
                            <td className="p-[10px] border-l  border-gray-300">{bond.validity}</td>
                            <td className={`border-l border-r border-gray-300 p-[10px] ${getStatusClass(bond.status)}`}>
                                {bond.status.charAt(0).toUpperCase() + bond.status.slice(1)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BondListingTable;
