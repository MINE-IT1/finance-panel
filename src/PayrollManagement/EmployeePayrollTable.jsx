import React from "react";

const EmployeePayrollTable = () => {
  // Dummy data
  const employees = [
    {
      name: "John Doe",
      basicSalary: 5000,
      bonuses: 500,
      deductions: 200,
      taxes: 100,
      netSalary: 5200,
      status: "Paid",
    },
    {
      name: "Jane Smith",
      basicSalary: 4000,
      bonuses: 400,
      deductions: 100,
      taxes: 90,
      netSalary: 4210,
      status: "Pending",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4">Employee Payroll Table</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">Employee</th>
            <th className="py-2">Basic Salary</th>
            <th className="py-2">Bonuses</th>
            <th className="py-2">Deductions</th>
            <th className="py-2">Taxes</th>
            <th className="py-2">Net Salary</th>
            <th className="py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp, index) => (
            <tr key={index} className="border-t">
              <td className="py-2">{emp.name}</td>
              <td className="py-2">${emp.basicSalary}</td>
              <td className="py-2">${emp.bonuses}</td>
              <td className="py-2">${emp.deductions}</td>
              <td className="py-2">${emp.taxes}</td>
              <td className="py-2">${emp.netSalary}</td>
              <td className="py-2">{emp.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeePayrollTable;
