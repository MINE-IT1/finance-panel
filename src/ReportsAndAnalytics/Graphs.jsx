import React from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';

const Graphs = ({ profitLossData, cashFlowData, balanceSheetData }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h4 className="text-lg font-semibold mb-2">Profit & Loss</h4>
        <Bar data={profitLossData} />
      </div>
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h4 className="text-lg font-semibold mb-2">Cash Flow</h4>
        <Line data={cashFlowData} />
      </div>
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h4 className="text-lg font-semibold mb-2">Balance Sheet</h4>
        <Pie data={balanceSheetData} />
      </div>
    </div>
  );
};

export default Graphs;
