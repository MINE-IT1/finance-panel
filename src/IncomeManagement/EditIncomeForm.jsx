// EditIncomeForm.js
import React, { useState } from 'react';

const EditIncomeForm = ({ entry, onSubmit, onClose }) => {
  const [formData, setFormData] = useState(entry);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' }); // Clear error on change
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.date) newErrors.date = 'Date is required';
    if (!formData.source) newErrors.source = 'Source is required';
    if (!formData.amount) newErrors.amount = 'Amount is required';
    if (isNaN(parseFloat(formData.amount.replace(/[^0-9.-]+/g, '')))) {
      newErrors.amount = 'Amount must be a valid number';
    }
    if (!formData.category) newErrors.category = 'Category is required';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      onSubmit(formData);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-xl" // Increased width
      >
        <h2 className="text-lg font-semibold mb-2">Edit Income Entry</h2>
        <hr className="mb-4 border-t border-gray-300" /> {/* Line below heading */}

        <div className="mb-4">
          <label className="block text-gray-700">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded p-2"
            required
          />
          {errors.date && <p className="text-red-600 text-sm">{errors.date}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Source</label>
          <input
            type="text"
            name="source"
            value={formData.source}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded p-2"
            required
          />
          {errors.source && <p className="text-red-600 text-sm">{errors.source}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Amount</label>
          <input
            type="text"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded p-2"
            required
          />
          {errors.amount && <p className="text-red-600 text-sm">{errors.amount}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Category</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded p-2"
            required
          />
          {errors.category && <p className="text-red-600 text-sm">{errors.category}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Payment Method</label>
          <input
            type="text"
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded p-2"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Transaction ID</label>
          <input
            type="text"
            name="transactionId"
            value={formData.transactionId}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded p-2"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Notes</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded p-2"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="mr-4 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditIncomeForm;
