import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EmployeeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Sample salary history data
  const [salaryHistory] = useState([
    {
      date: '2024-01-15',
      basicSalary: 5000,
      bonuses: 500,
      deductions: 200,
      taxes: 300,
      netSalary: 5000 + 500 - 200 - 300,
      status: 'Paid',
    },
    {
      date: '2024-02-15',
      basicSalary: 5500,
      bonuses: 600,
      deductions: 250,
      taxes: 400,
      netSalary: 5500 + 600 - 250 - 400,
      status: 'Paid',
    },
  ]);

  // State for adjustments
  const [adjustmentDescription, setAdjustmentDescription] = useState('');
  const [adjustmentAmount, setAdjustmentAmount] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!adjustmentDescription.trim() || !adjustmentAmount.trim()) {
      setErrorMessage('Both fields are required.');
      return;
    }

    // Reset the form
    setAdjustmentDescription('');
    setAdjustmentAmount('');
    setSuccessMessage('Adjustment added successfully!');
  };

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <button onClick={handleGoBack} className="mb-4 text-blue-500">Go Back</button>
        <h2 className="text-2xl font-bold mb-4">Employee Detail</h2>
        <h3 className="text-xl mb-4">Employee Name: {id}</h3>

        <h4 className="text-lg font-semibold">Salary History</h4>
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th>Date of Disbursement</th>
              <th>Basic Salary</th>
              <th>Bonuses</th>
              <th>Deductions</th>
              <th>Taxes</th>
              <th>Net Salary</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {salaryHistory.map((entry, index) => (
              <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                <td>{entry.date}</td>
                <td>{entry.basicSalary.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</td>
                <td>{entry.bonuses.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</td>
                <td>{entry.deductions.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</td>
                <td>{entry.taxes.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</td>
                <td>{entry.netSalary.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</td>
                <td>{entry.status}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h4 className="text-lg font-semibold mt-6">Add Adjustments</h4>
        <form className="mt-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Adjustment Description"
            className="border p-2 rounded mb-2 w-full"
            value={adjustmentDescription}
            onChange={(e) => setAdjustmentDescription(e.target.value)}
          />
          <input
            type="number"
            placeholder="Amount"
            className="border p-2 rounded mb-4 w-full"
            value={adjustmentAmount}
            onChange={(e) => setAdjustmentAmount(e.target.value)}
          />
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          {successMessage && <p className="text-green-500">{successMessage}</p>}
          <button type="submit" className="bg-blue-600 text-white p-2 rounded">Add Adjustment</button>
        </form>
      </div>
    </div>
  );
};

export default EmployeeDetail;
