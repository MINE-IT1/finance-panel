import React, { useState } from 'react';
import Filters from './Filters'; // Import your existing Filters component
import GraphsSection from './Graphs';
import { Line } from 'react-chartjs-2';
import TablesSection from './Tables';
import 'chart.js/auto';

const ReportsPage = () => {
  const [filters, setFilters] = useState({
    dateFrom: '',
    dateTo: '',
    department: '',
    project: '',
  });

  const clearFilters = () => {
    setFilters({
      dateFrom: '',
      dateTo: '',
      department: '',
      project: '',
    });
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const profitLossData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr'],
    datasets: [
      {
        label: 'Profit',
        data: [5000, 6000, 5500, 8000],
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
      },
      {
        label: 'Loss',
        data: [2000, 1000, 3000, 1500],
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      },
    ],
  };

  const cashFlowData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr'],
    datasets: [
      {
        label: 'Cash Inflow',
        data: [7000, 8000, 7500, 9000],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
      {
        label: 'Cash Outflow',
        data: [4000, 3000, 3500, 4500],
        backgroundColor: 'rgba(255, 206, 86, 0.6)',
      },
    ],
  };

  const balanceSheetData = {
    labels: ['Assets', 'Liabilities', 'Equity'],
    datasets: [
      {
        label: 'Balance Sheet',
        data: [30000, 15000, 5000],
        backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56'],
      },
    ],
  };

  const forecastData = {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [
      {
        label: 'Projected Growth',
        data: [5000, 10000, 15000, 20000],
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
      },
    ],
  };

  // Dummy data for tables
  const profitLossTableData = [
    { id: 1, date: '2024-01-01', income: 5000, expenses: 2000, netProfit: 3000 },
    { id: 2, date: '2024-02-01', income: 6000, expenses: 1000, netProfit: 5000 },
  ];

  const cashFlowTableData = [
    { id: 1, date: '2024-01-01', inflows: 7000, outflows: 4000, netCashFlow: 3000 },
    { id: 2, date: '2024-02-01', inflows: 8000, outflows: 3000, netCashFlow: 5000 },
  ];

  const balanceSheetTableData = [
    { id: 1, date: '2024-01-01', assets: 30000, liabilities: 15000, equity: 5000 },
  ];

  return (
    <div className="container mx-auto p-4">
      {/* Filters Section */}
      <Filters filters={filters} handleFilterChange={handleFilterChange} clearFilters={clearFilters} />

      {/* Graphs Section */}
      <GraphsSection 
        profitLossData={profitLossData} 
        cashFlowData={cashFlowData} 
        balanceSheetData={balanceSheetData} 
      />

      {/* Tables Section */}
      <TablesSection 
        profitLossTableData={profitLossTableData} 
        cashFlowTableData={cashFlowTableData} 
        balanceSheetTableData={balanceSheetTableData} 
      />

      {/* Forecast Section */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <h4 className="text-lg font-semibold mb-2">Financial Forecast</h4>
        <Line data={forecastData} />
      </div>
    </div>
  );
};

export default ReportsPage;
