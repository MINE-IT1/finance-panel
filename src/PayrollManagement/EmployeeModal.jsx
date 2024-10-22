// EmployeeModal.js
import React from 'react';

const EmployeeModal = ({ employee, onClose }) => {
  if (!employee) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full">
        <h3 className="text-xl mb-4">Employee Name: {employee.name}</h3>
        <h4 className="text-lg font-semibold">Salary History</h4>
        {/* Example Salary History */}
        <table className="min-w-full bg-gray-100 shadow-md rounded-lg overflow-hidden">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th>Date</th>
              <th>Basic Salary</th>
              <th>Bonuses</th>
              <th>Deductions</th>
              <th>Taxes</th>
              <th>Net Salary</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {/* Replace this with actual salary history */}
            <tr>
              <td>2024-01-01</td>
              <td>{employee.basicSalary.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</td>
              <td>{employee.bonuses.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</td>
              <td>{employee.deductions.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</td>
              <td>{employee.taxes.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</td>
              <td>{employee.netSalary.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</td>
              <td>{employee.status}</td>
            </tr>
          </tbody>
        </table>
        <button onClick={onClose} className="mt-4 bg-blue-600 text-white p-2 rounded">Close</button>
      </div>
    </div>
  );
};

export default EmployeeModal;
