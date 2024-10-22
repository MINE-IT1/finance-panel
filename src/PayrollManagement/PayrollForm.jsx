import React, { useState } from "react";

const PayrollForm = () => {
  const [formData, setFormData] = useState({
    employee: "",
    basicSalary: 0,
    bonuses: 0,
    deductions: 0,
    taxes: 0,
    netSalary: 0,
    disbursementDate: "",
    recurringPayroll: false,
    paymentMethod: "",
  });

  const calculateNetSalary = () => {
    const { basicSalary, bonuses, deductions, taxes } = formData;
    return basicSalary + bonuses - deductions - taxes;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormData({
      ...formData,
      [name]: type === "number" ? parseFloat(newValue) : newValue,
    });

    if (["basicSalary", "bonuses", "deductions", "taxes"].includes(name)) {
      setFormData((prevData) => ({
        ...prevData,
        netSalary: calculateNetSalary(),
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Payroll data submitted: ", formData);
  };

  return (
    <div className="max-w-xl mx-auto p-4 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4">Payroll Management Form</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Employee Dropdown */}
        <div>
          <label className="block text-sm font-medium mb-1">Employee</label>
          <select
            name="employee"
            value={formData.employee}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
          >
            <option value="">Select Employee</option>
            <option value="John Doe">John Doe</option>
            <option value="Jane Smith">Jane Smith</option>
          </select>
        </div>

        {/* Salary Fields */}
        <div>
          <label className="block text-sm font-medium mb-1">Basic Salary</label>
          <input
            type="number"
            name="basicSalary"
            value={formData.basicSalary}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Bonuses</label>
          <input
            type="number"
            name="bonuses"
            value={formData.bonuses}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Deductions</label>
          <input
            type="number"
            name="deductions"
            value={formData.deductions}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Taxes</label>
          <input
            type="number"
            name="taxes"
            value={formData.taxes}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        {/* Net Salary (Read-only) */}
        <div>
          <label className="block text-sm font-medium mb-1">Net Salary</label>
          <input
            type="number"
            name="netSalary"
            value={formData.netSalary}
            readOnly
            className="w-full px-3 py-2 border rounded-md bg-gray-100"
          />
        </div>

        {/* Disbursement Date */}
        <div>
          <label className="block text-sm font-medium mb-1">Disbursement Date</label>
          <input
            type="date"
            name="disbursementDate"
            value={formData.disbursementDate}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        {/* Recurring Payroll */}
        <div className="flex items-center">
          <input
            type="checkbox"
            name="recurringPayroll"
            checked={formData.recurringPayroll}
            onChange={handleChange}
            className="mr-2"
          />
          <label className="text-sm font-medium">Recurring Payroll</label>
        </div>

        {/* Payment Method */}
        <div>
          <label className="block text-sm font-medium mb-1">Payment Method</label>
          <select
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
          >
            <option value="">Select Payment Method</option>
            <option value="Bank Transfer">Bank Transfer</option>
            <option value="Cash">Cash</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Submit Payroll
        </button>
      </form>
    </div>
  );
};

export default PayrollForm;
