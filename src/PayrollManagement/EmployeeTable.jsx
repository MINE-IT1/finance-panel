import React, { useState } from 'react';
import { FaEdit, FaSearch, FaCheckCircle, FaHourglassHalf, FaTimesCircle, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { useNavigate, Link } from 'react-router-dom';
import EmployeeEditModal from './EmployeeEditModal'; // Import the modal
import PayrollModal from './PayrollModal'; // Import the PayrollModal

const EmployeeTable = () => {
  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: 'John Doe',
      basicSalary: 5000,
      bonuses: 500,
      deductions: 200,
      taxes: 300,
      netSalary: 5000 + 500 - 200 - 300,
      status: 'Paid',
    },
    {
      id: 2,
      name: 'Jane Smith',
      basicSalary: 6000,
      bonuses: 600,
      deductions: 250,
      taxes: 400,
      netSalary: 6000 + 600 - 250 - 400,
      status: 'Pending',
    },
    {
      id: 3,
      name: 'Alice Johnson',
      basicSalary: 5500,
      bonuses: 700,
      deductions: 300,
      taxes: 350,
      netSalary: 5500 + 700 - 300 - 350,
      status: 'Processing',
    },
  ]);

  const [search, setSearch] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'ascending' });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState(null);
  const [isPayrollModalOpen, setIsPayrollModalOpen] = useState(false); // State for PayrollModal

  // Function to filter employees based on search input
  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(search.trim().toLowerCase())
  );

  // Function to handle sorting
  const sortedEmployees = filteredEmployees.sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  // Function to toggle sorting
  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'ascending' ? <FaArrowUp className="inline" /> : <FaArrowDown className="inline" />;
    }
    return null;
  };

  const handleEditClick = (employee) => {
    setCurrentEmployee(employee);
    setIsModalOpen(true);
  };

  const handleSave = (updatedEmployee) => {
    setEmployees((prevEmployees) => 
      prevEmployees.map((emp) => (emp.id === updatedEmployee.id ? updatedEmployee : emp))
    );
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Employee Payroll Management</h2>
      <div className="flex justify-between mb-4">
        <div className="relative w-full max-w-xs">
          <input
            type="text"
            placeholder="Search by employee name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 p-2 rounded-full w-full pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 shadow-md hover:shadow-lg focus:shadow-lg"
          />
          <FaSearch className="absolute left-3 top-2.5 text-gray-500" />
        </div>
        <button
          onClick={() => setIsPayrollModalOpen(true)}
          className="bg-blue-500 text-white font-semibold p-2 rounded hover:bg-blue-600 transition duration-300"
        >
          Add Payroll
        </button>
      </div>
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th onClick={() => requestSort('name')} className="cursor-pointer py-2 px-4 text-left">
              Employee Name {getSortIcon('name')}
            </th>
            <th onClick={() => requestSort('basicSalary')} className="cursor-pointer py-2 px-4 text-left">
              Basic Salary {getSortIcon('basicSalary')}
            </th>
            <th onClick={() => requestSort('bonuses')} className="cursor-pointer py-2 px-4 text-left">
              Bonuses {getSortIcon('bonuses')}
            </th>
            <th onClick={() => requestSort('deductions')} className="cursor-pointer py-2 px-4 text-left">
              Deductions {getSortIcon('deductions')}
            </th>
            <th onClick={() => requestSort('taxes')} className="cursor-pointer py-2 px-4 text-left">
              Taxes {getSortIcon('taxes')}
            </th>
            <th onClick={() => requestSort('netSalary')} className="cursor-pointer py-2 px-4 text-left">
              Net Salary {getSortIcon('netSalary')}
            </th>
            <th onClick={() => requestSort('status')} className="cursor-pointer py-2 px-4 text-left">
              Disbursement Status {getSortIcon('status')}
            </th>
            <th className="py-2 px-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedEmployees.map((employee, index) => (
            <tr key={employee.id} className={`border-b ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} rounded-lg shadow-md transition duration-300 hover:shadow-lg`}>
              <td className="py-2 px-4">
                <Link 
                  to={`/employee/${employee.id}`} // Use Link for navigation
                  className="text-blue-500 hover:underline"
                >
                  {employee.name}
                </Link>
              </td>
              <td className="py-2 px-4">{employee.basicSalary.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</td>
              <td className="py-2 px-4">{employee.bonuses.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</td>
              <td className="py-2 px-4">{employee.deductions.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</td>
              <td className="py-2 px-4">{employee.taxes.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</td>
              <td className="py-2 px-4">{employee.netSalary.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</td>
              <td className="py-2 px-4">
                {employee.status === 'Paid' && <span className="text-green-500 flex items-center"><FaCheckCircle /> Paid</span>}
                {employee.status === 'Pending' && <span className="text-yellow-500 flex items-center"><FaHourglassHalf /> Pending</span>}
                {employee.status === 'Processing' && <span className="text-orange-500 flex items-center"><FaTimesCircle /> Processing</span>}
              </td>
              <td className="py-2 px-4">
                <button onClick={() => handleEditClick(employee)} className="text-blue-500 hover:underline flex items-center">
                  <FaEdit className="mr-1" /> Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Employee Edit Modal */}
      <EmployeeEditModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        employee={currentEmployee}
        onSave={handleSave}
      />
      
      {/* Payroll Modal */}
      <PayrollModal
        isOpen={isPayrollModalOpen}
        onClose={() => setIsPayrollModalOpen(false)}
      />
    </div>
  );
};

export default EmployeeTable;
