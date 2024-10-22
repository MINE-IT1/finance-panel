import React from 'react';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

const Tables = ({ profitLossTableData, cashFlowTableData, balanceSheetTableData }) => {
  const downloadCSV = (data, filename) => {
    const csvRows = [
      ['Date', 'Income', 'Expenses', 'Net Profit'],
      ...data.map(item => [item.date, item.income, item.expenses, item.netProfit])
    ];

    // Convert rows to CSV format
    const csvString = csvRows.map(row => row.join(',')).join('\n');

    // Create a Blob with the correct MIME type
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = filename || 'data.csv'; // Ensure it has a .csv extension
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a); // Remove the element after triggering the download
    URL.revokeObjectURL(url); // Clean up
  };

  const downloadPDF = (data, title) => {
    const doc = new jsPDF();
    doc.text(title, 14, 16);
    autoTable(doc, {
      head: [['Date', 'Income', 'Expenses', 'Net Profit']],
      body: data.map(item => [item.date, item.income, item.expenses, item.netProfit]),
      startY: 20,
    });
    doc.save(`${title}.pdf`);
  };

  return (
    <div className="my-8">
      {/* Profit & Loss Table */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <h4 className="text-lg font-semibold mb-2">Profit & Loss Table</h4>
        <div className="flex justify-end mb-2">
          <button 
            className="bg-blue-500 text-white p-2 rounded mr-2"
            onClick={() => downloadCSV(profitLossTableData, 'Profit_Loss_Data.csv')}
          >
            Download CSV
          </button>
          <button 
            className="bg-blue-500 text-white p-2 rounded"
            onClick={() => downloadPDF(profitLossTableData, 'Profit & Loss')}
          >
            Download PDF
          </button>
        </div>
        <table className="table-auto w-full">
          <thead>
            <tr className="text-left">
              <th className="border p-2">Date</th>
              <th className="border p-2">Income</th>
              <th className="border p-2">Expenses</th>
              <th className="border p-2">Net Profit</th>
            </tr>
          </thead>
          <tbody>
            {profitLossTableData.map((data) => (
              <tr key={data.id}>
                <td className="border p-2">{data.date}</td>
                <td className="border p-2">${data.income}</td>
                <td className="border p-2">${data.expenses}</td>
                <td className="border p-2">${data.netProfit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Cash Flow Table */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <h4 className="text-lg font-semibold mb-2">Cash Flow Table</h4>
        <div className="flex justify-end mb-2">
          <button 
            className="bg-blue-500 text-white p-2 rounded mr-2"
            onClick={() => downloadCSV(cashFlowTableData, 'Cash_Flow_Data.csv')}
          >
            Download CSV
          </button>
          <button 
            className="bg-blue-500 text-white p-2 rounded"
            onClick={() => downloadPDF(cashFlowTableData, 'Cash Flow')}
          >
            Download PDF
          </button>
        </div>
        <table className="table-auto w-full">
          <thead>
            <tr className="text-left">
              <th className="border p-2">Date</th>
              <th className="border p-2">Inflows</th>
              <th className="border p-2">Outflows</th>
              <th className="border p-2">Net Cash Flow</th>
            </tr>
          </thead>
          <tbody>
            {cashFlowTableData.map((data) => (
              <tr key={data.id}>
                <td className="border p-2">{data.date}</td>
                <td className="border p-2">${data.inflows}</td>
                <td className="border p-2">${data.outflows}</td>
                <td className="border p-2">${data.netCashFlow}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Balance Sheet Table */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <h4 className="text-lg font-semibold mb-2">Balance Sheet Table</h4>
        <div className="flex justify-end mb-2">
          <button 
            className="bg-blue-500 text-white p-2 rounded mr-2"
            onClick={() => downloadCSV(balanceSheetTableData, 'Balance_Sheet_Data.csv')}
          >
            Download CSV
          </button>
          <button 
            className="bg-blue-500 text-white p-2 rounded"
            onClick={() => downloadPDF(balanceSheetTableData, 'Balance Sheet')}
          >
            Download PDF
          </button>
        </div>
        <table className="table-auto w-full">
          <thead>
            <tr className="text-left">
              <th className="border p-2">Date</th>
              <th className="border p-2">Assets</th>
              <th className="border p-2">Liabilities</th>
              <th className="border p-2">Equity</th>
            </tr>
          </thead>
          <tbody>
            {balanceSheetTableData.map((data) => (
              <tr key={data.id}>
                <td className="border p-2">{data.date}</td>
                <td className="border p-2">${data.assets}</td>
                <td className="border p-2">${data.liabilities}</td>
                <td className="border p-2">${data.equity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Tables;
