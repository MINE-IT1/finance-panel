import React, { useState } from 'react';

const PayrollModal = ({ isOpen, onClose }) => {
  const paymentMethods = [
    { value: '', label: 'Select Payment Method' },
    { value: 'Bank Transfer', label: 'Bank Transfer' },
    { value: 'Cash', label: 'Cash' },
    { value: 'Check', label: 'Check' },
    { value: 'Digital Wallet', label: 'Digital Wallet' },
    // Add more payment methods as needed
  ];

  const [formData, setFormData] = useState({
    employee: '',
    basicSalary: '',
    bonuses: '',
    deductions: '',
    taxes: '',
    netSalary: 0,
    disbursementDate: '',
    recurringPayroll: false,
    paymentMethod: '',
  });

  const [errors, setErrors] = useState({});

  // Validate form inputs
  const validate = () => {
    const newErrors = {};

    if (!formData.employee.trim()) newErrors.employee = "Employee is required.";
    if (!formData.basicSalary.trim()) {
      newErrors.basicSalary = "Basic Salary is required.";
    } else if (isNaN(formData.basicSalary) || Number(formData.basicSalary) < 0) {
      newErrors.basicSalary = "Basic Salary must be a non-negative number.";
    }

    if (formData.bonuses && (isNaN(formData.bonuses) || Number(formData.bonuses) < 0)) {
      newErrors.bonuses = "Bonuses must be a non-negative number.";
    }
    if (formData.deductions && (isNaN(formData.deductions) || Number(formData.deductions) < 0)) {
      newErrors.deductions = "Deductions must be a non-negative number.";
    }
    if (formData.taxes && (isNaN(formData.taxes) || Number(formData.taxes) < 0)) {
      newErrors.taxes = "Taxes must be a non-negative number.";
    }
    if (!formData.disbursementDate) {
      newErrors.disbursementDate = "Disbursement Date is required.";
    }
    if (!formData.paymentMethod) {
      newErrors.paymentMethod = "Payment Method is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if there are no errors
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const netSalary =
        parseFloat(formData.basicSalary) +
        (parseFloat(formData.bonuses) || 0) -
        (parseFloat(formData.deductions) || 0) -
        (parseFloat(formData.taxes) || 0);

      setFormData((prev) => ({ ...prev, netSalary }));

      console.log("Form submitted:", formData);
      // onClose();
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  return (
    isOpen ? (
      <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative sm:border-0">
          <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <h2 className="text-2xl font-bold mb-2">Payroll Management</h2>
          <hr className="mb-4 border-gray-300" />
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700">Employee <span className="text-red-500">*</span></label>
              <input
                className={`border ${errors.employee ? 'border-red-500' : 'border-gray-300'} p-2 w-full rounded`}
                type="text"
                name="employee"
                value={formData.employee}
                onChange={handleChange}
                placeholder="Select Employee"
              />
              {errors.employee && <p className="text-red-500 text-sm">{errors.employee}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-gray-700">Basic Salary <span className="text-red-500">*</span></label>
                <input
                  className={`border ${errors.basicSalary ? 'border-red-500' : 'border-gray-300'} p-2 w-full rounded`}
                  type="number"
                  name="basicSalary"
                  value={formData.basicSalary}
                  onChange={handleChange}
                />
                {errors.basicSalary && <p className="text-red-500 text-sm">{errors.basicSalary}</p>}
              </div>
              <div>
                <label className="block text-gray-700">Bonuses</label>
                <input
                  className={`border ${errors.bonuses ? 'border-red-500' : 'border-gray-300'} p-2 w-full rounded`}
                  type="number"
                  name="bonuses"
                  value={formData.bonuses}
                  onChange={handleChange}
                />
                {errors.bonuses && <p className="text-red-500 text-sm">{errors.bonuses}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-gray-700">Deductions</label>
                <input
                  className={`border ${errors.deductions ? 'border-red-500' : 'border-gray-300'} p-2 w-full rounded`}
                  type="number"
                  name="deductions"
                  value={formData.deductions}
                  onChange={handleChange}
                />
                {errors.deductions && <p className="text-red-500 text-sm">{errors.deductions}</p>}
              </div>
              <div>
                <label className="block text-gray-700">Taxes</label>
                <input
                  className={`border ${errors.taxes ? 'border-red-500' : 'border-gray-300'} p-2 w-full rounded`}
                  type="number"
                  name="taxes"
                  value={formData.taxes}
                  onChange={handleChange}
                />
                {errors.taxes && <p className="text-red-500 text-sm">{errors.taxes}</p>}
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Net Salary</label>
              <input
                className="border border-gray-300 p-2 w-full rounded bg-gray-100"
                type="text"
                value={formData.netSalary || 0}
                readOnly
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Disbursement Date <span className="text-red-500">*</span></label>
              <input
                className={`border ${errors.disbursementDate ? 'border-red-500' : 'border-gray-300'} p-2 w-full rounded`}
                type="date"
                name="disbursementDate"
                value={formData.disbursementDate}
                onChange={handleChange}
              />
              {errors.disbursementDate && <p className="text-red-500 text-sm">{errors.disbursementDate}</p>}
            </div>
            <div className="mb-4">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  name="recurringPayroll"
                  checked={formData.recurringPayroll}
                  onChange={handleChange}
                  className="form-checkbox"
                />
                <span className="ml-2 text-gray-700">Recurring Payroll</span>
              </label>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Payment Method <span className="text-red-500">*</span></label>
              <select
                className={`border ${errors.paymentMethod ? 'border-red-500' : 'border-gray-300'} p-2 w-full rounded`}
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleChange}
              >
                {paymentMethods.map(method => (
                  <option key={method.value} value={method.value}>
                    {method.label}
                  </option>
                ))}
              </select>
              {errors.paymentMethod && <p className="text-red-500 text-sm">{errors.paymentMethod}</p>}
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-blue-500 text-white font-semibold p-2 rounded hover:bg-blue-600 transition duration-300 w-2/3"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    ) : null
  );
};

export default PayrollModal;
