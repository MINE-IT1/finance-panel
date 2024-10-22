// src/components/EmployeeDetail.js
import React, { useState } from 'react';

const EmployeeDetail = ({ employee }) => {
  const [bonus, setBonus] = useState(0);
  const [deduction, setDeduction] = useState(0);

  if (!employee) return null;

  const handleAdjustment = () => {
    // Logic to apply bonus and deduction
    alert(`Adjusted: Bonus - $${bonus}, Deduction - $${deduction}`);
    // Reset fields after applying
    setBonus(0);
    setDeduction(0);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">{employee.EmployeeName} - Salary History</h2>
      <ul>
        {employee.salaryHistory.map((record, index) => (
          <li key={index} className="mb-2">
            <div>Date: {record.date}</div>
            <div>Basic Salary: ${record.basicSalary.toFixed(2)}</div>
            <div>Bonuses: ${record.bonuses.toFixed(2)}</div>
            <div>Deductions: ${record.deductions.toFixed(2)}</div>
            <div>Taxes: ${record.taxes.toFixed(2)}</div>
            <div>Net Salary: ${(record.basicSalary + record.bonuses - record.deductions - record.taxes).toFixed(2)}</div>
            <div>Status: {record.status}</div>
          </li>
        ))}
      </ul>
      <h3 className="mt-4 font-bold">Adjust Payroll</h3>
      <input
        type="number"
        value={bonus}
        onChange={e => setBonus(Number(e.target.value))}
        placeholder="One-time bonus"
        className="p-2 border rounded mr-2"
      />
      <input
        type="number"
        value={deduction}
        onChange={e => setDeduction(Number(e.target.value))}
        placeholder="Additional deduction"
        className="p-2 border rounded mr-2"
      />
      <button onClick={handleAdjustment} className="bg-blue-500 text-white p-2 rounded">
        Apply Adjustment
      </button>
    </div>
  );
};

export default EmployeeDetail;
