// src/components/EmployeeTable.js
import React, { useState } from 'react';

const EmployeeTable = ({ employees, onSelectEmployee }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState(null);
  const [statusFilter, setStatusFilter] = useState('');

  const filteredEmployees = employees.filter(emp => {
    const matchesName = emp.EmployeeName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter ? emp.DisbursementStatus === statusFilter : true;
    return matchesName && matchesStatus;
  });

  const sortedEmployees = filteredEmployees.sort((a, b) => {
    if (sortConfig) {
      return a[sortConfig.key] > b[sortConfig.key] ? (sortConfig.direction === 'ascending' ? 1 : -1) : (sortConfig.direction === 'ascending' ? -1 : 1);
    }
    return 0;
  });

  const requestSort = key => {
    let direction = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className="p-4">
      <input
        type="text"
        placeholder="Search by name..."
        onChange={e => setSearchTerm(e.target.value)}
        className="mb-4 p-2 border rounded"
      />
      <select
        value={statusFilter}
        onChange={e => setStatusFilter(e.target.value)}
        className="mb-4 p-2 border rounded"
      >
        <option value="">All Statuses</option>
        <option value="Paid">Paid</option>
        <option value="Pending">Pending</option>
        <option value="Processing">Processing</option>
      </select>
      <table className="min-w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            {['EmployeeName', 'BasicSalary', 'Bonuses', 'Deductions', 'Taxes', 'NetSalary', 'DisbursementStatus', 'Actions'].map(header => (
              <th key={header} onClick={() => requestSort(header)} className="cursor-pointer p-2 border-b border-gray-200">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedEmployees.map((employee, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="p-2 border-b border-gray-200 cursor-pointer" onClick={() => onSelectEmployee(employee)}>
                {employee.EmployeeName}
              </td>
              <td className="p-2 border-b border-gray-200">${employee.BasicSalary.toFixed(2)}</td>
              <td className="p-2 border-b border-gray-200">${employee.Bonuses.toFixed(2)}</td>
              <td className="p-2 border-b border-gray-200">${employee.Deductions.toFixed(2)}</td>
              <td className="p-2 border-b border-gray-200">${employee.Taxes.toFixed(2)}</td>
              <td className="p-2 border-b border-gray-200">${(employee.BasicSalary + employee.Bonuses - employee.Deductions - employee.Taxes).toFixed(2)}</td>
              <td className="p-2 border-b border-gray-200">{employee.DisbursementStatus}</td>
              <td className="p-2 border-b border-gray-200">
                <button className="text-blue-500" onClick={() => console.log(`Edit ${employee.EmployeeName}`)}>
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;
