import React, { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';

const ExpenseForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    date: '',
    category: 'Marketing',
    amount: '',
    notes: '',
    paymentMethod: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' }); // Clear error on change
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.date) newErrors.date = "Date is required.";
    if (!formData.category) newErrors.category = "Category is required.";
    if (!formData.amount || formData.amount <= 0) newErrors.amount = "Amount must be a positive number.";
    if (!formData.paymentMethod) newErrors.paymentMethod = "Payment Method is required.";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    console.log(formData); // Handle form submission logic here (e.g., send to backend)
  };

  return (
    <div className="relative max-w-xl mx-auto p-8 bg-white border border-gray-200 rounded-lg shadow-lg">
      <button onClick={onClose} className="absolute top-4 right-4 text-gray-600 hover:text-gray-800">
        <AiOutlineClose size={24} />
      </button>
      <h2 className="text-3xl font-bold mb-4 text-gray-800">Expense Management</h2>
      <hr className="border-gray-300 mb-4" />
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Date <span className="text-red-500">*</span></label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-500 h-12 px-3"
              required
            />
            {errors.date && <p className="text-red-500 text-sm">{errors.date}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Category <span className="text-red-500">*</span></label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-500 h-12 px-3"
              required
            >
              <option value="">Select a category</option>
              <option value="Marketing">Marketing</option>
              <option value="Operations">Operations</option>
              <option value="Office Supplies">Office Supplies</option>
              <option value="Travel">Travel</option>
            </select>
            {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Amount <span className="text-red-500">*</span></label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-500 h-12 px-3"
              placeholder="Enter amount"
              min="0"
              required
            />
            {errors.amount && <p className="text-red-500 text-sm">{errors.amount}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Payment Method <span className="text-red-500">*</span></label>
            <select
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-500 h-12 px-3"
              required
            >
              <option value="">Select a payment method</option>
              <option value="Cash">Cash</option>
              <option value="Credit Card">Credit Card</option>
              <option value="Bank Transfer">Bank Transfer</option>
            </select>
            {errors.paymentMethod && <p className="text-red-500 text-sm">{errors.paymentMethod}</p>}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Notes</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-500 h-24 px-3"
            placeholder="Additional details (optional)"
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full mt-4 py-2 bg-indigo-600 text-white rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ExpenseForm;
