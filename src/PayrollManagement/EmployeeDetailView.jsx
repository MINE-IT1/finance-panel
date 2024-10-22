import React from "react";

const EmployeeDetailView = ({ employee }) => {
  // Example employee details with dummy data
  const salaryHistory = [
    {
      date: "2024-10-01",
      basicSalary: 5000,
      bonuses: 200,
      deductions: 100,
      taxes: 50,
      netSalary: 5050,
      status: "Paid",
    },
    // More records can be added...
  ];

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4">{employee.name}'s Payroll History</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">Date</th>
            <th className="py-2">Basic Salary</th>
            <th className="py-2">Bonuses</th>
            <th className="py-2">Deductions</th>
            <th className="py-2">Taxes</th>
            <th className="py-2">Net Salary</th>
            <th className="py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {salaryHistory.map((record, index) => (
            <tr key={index} className="border-t">
              <td className="py-2">{record.date}</td>
              <td className="py-2">${record.basicSalary}</td>
              <td className="py-2">${record.bonuses}</td>
              <td className="py-2">${record.deductions}</td>
              <td className="py-2">${record.taxes}</td>
              <td className="py-2">${record.netSalary}</td>
              <td className="py-2">{record.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeDetailView;
