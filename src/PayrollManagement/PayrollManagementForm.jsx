import React, { useState } from 'react';

const PayrollManagementForm = () => {
  const [formData, setFormData] = useState({
    employee: '',
    basicSalary: '',
    bonuses: '',
    deductions: '',
    taxes: '',
    disbursementDate: '',
    recurringPayroll: false,
    paymentMethod: '',
  });

  const [netSalary, setNetSalary] = useState(0);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));

    // Update net salary on change
    if (name === 'basicSalary' || name === 'bonuses' || name === 'deductions' || name === 'taxes') {
      calculateNetSalary({ ...formData, [name]: value });
    }
  };

  const calculateNetSalary = (data) => {
    const basic = parseFloat(data.basicSalary) || 0;
    const bonuses = parseFloat(data.bonuses) || 0;
    const deductions = parseFloat(data.deductions) || 0;
    const taxes = parseFloat(data.taxes) || 0;
    const net = basic + bonuses - deductions - taxes;
    setNetSalary(net);
  };

  const validateForm = () => {
    const newErrors = {};
    const { employee, basicSalary, disbursementDate, paymentMethod } = formData;

    if (!employee) newErrors.employee = "Employee is required.";
    if (!basicSalary || isNaN(basicSalary) || basicSalary < 0) newErrors.basicSalary = "Valid Basic Salary is required.";
    if (!disbursementDate) newErrors.disbursementDate = "Disbursement Date is required.";
    if (!paymentMethod) newErrors.paymentMethod = "Payment Method is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    console.log('Payroll Data:', {
      ...formData,
      netSalary,
    });

    resetForm();
  };

  const resetForm = () => {
    setFormData({
      employee: '',
      basicSalary: '',
      bonuses: '',
      deductions: '',
      taxes: '',
      disbursementDate: '',
      recurringPayroll: false,
      paymentMethod: '',
    });
    setNetSalary(0);
    setErrors({});
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-4">Payroll Management</h2>
      <form onSubmit={handleSubmit} className="w-full">
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Employee<span className="text-red-500">*</span>
          </label>
          <select
            name="employee"
            value={formData.employee}
            onChange={handleInputChange}
            className={`p-2 border rounded w-full ${errors.employee ? 'border-red-500' : ''}`}
          >
            <option value="">Select Employee</option>
            {/* Replace with actual employee options */}
            <option value="1">Employee 1</option>
            <option value="2">Employee 2</option>
          </select>
          {errors.employee && <p className="text-red-500 text-sm">{errors.employee}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Basic Salary<span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="basicSalary"
            value={formData.basicSalary}
            onChange={handleInputChange}
            className={`p-2 border rounded w-full ${errors.basicSalary ? 'border-red-500' : ''}`}
            placeholder="Enter basic salary"
          />
          {errors.basicSalary && <p className="text-red-500 text-sm">{errors.basicSalary}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Bonuses</label>
          <input
            type="number"
            name="bonuses"
            value={formData.bonuses}
            onChange={handleInputChange}
            className="p-2 border rounded w-full"
            placeholder="Enter bonuses"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Deductions</label>
          <input
            type="number"
            name="deductions"
            value={formData.deductions}
            onChange={handleInputChange}
            className="p-2 border rounded w-full"
            placeholder="Enter deductions"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Taxes</label>
          <input
            type="number"
            name="taxes"
            value={formData.taxes}
            onChange={handleInputChange}
            className="p-2 border rounded w-full"
            placeholder="Enter taxes"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Net Salary</label>
          <input
            type="text"
            value={netSalary}
            readOnly
            className="p-2 border rounded w-full bg-gray-100"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Disbursement Date<span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            name="disbursementDate"
            value={formData.disbursementDate}
            onChange={handleInputChange}
            className={`p-2 border rounded w-full ${errors.disbursementDate ? 'border-red-500' : ''}`}
          />
          {errors.disbursementDate && <p className="text-red-500 text-sm">{errors.disbursementDate}</p>}
        </div>

        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            name="recurringPayroll"
            checked={formData.recurringPayroll}
            onChange={handleInputChange}
            className="mr-2"
          />
          <label className="text-sm">Recurring Payroll</label>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Payment Method<span className="text-red-500">*</span>
          </label>
          <select
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleInputChange}
            className={`p-2 border rounded w-full ${errors.paymentMethod ? 'border-red-500' : ''}`}
          >
            <option value="">Select Payment Method</option>
            <option value="Bank Transfer">Bank Transfer</option>
            <option value="Cash">Cash</option>
          </select>
          {errors.paymentMethod && <p className="text-red-500 text-sm">{errors.paymentMethod}</p>}
        </div>

        <div className="flex justify-between mb-4">
          <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded">
            Process Payroll
          </button>
          <button type="button" onClick={resetForm} className="bg-gray-300 text-black py-2 px-4 rounded">
            Close
          </button>
        </div>
      </form>
    </div>
  );
};

export default PayrollManagementForm;
