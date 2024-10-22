import React, { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';

const IncomeForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    date: '',
    source: '',
    amount: '',
    category: 'Product Sale',
    paymentMethod: 'Bank Transfer',
    referenceId: '',
    notes: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.date) newErrors.date = "Date is required.";
    if (!formData.source.trim()) newErrors.source = "Source is required.";
    if (!formData.amount || formData.amount <= 0) newErrors.amount = "Amount must be a positive number.";
    if (!formData.referenceId.trim()) newErrors.referenceId = "Reference ID is required.";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    console.log(formData);
  };

  return (
    <div className="relative max-w-xl mx-auto p-8 bg-white border border-gray-200 rounded-lg shadow-lg">
      <button onClick={onClose} className="absolute top-4 right-4 text-gray-600 hover:text-gray-800">
        <AiOutlineClose size={24} />
      </button>
      <h2 className="text-3xl font-bold mb-4 text-gray-800 font-montserrat">Record Income</h2>
      <hr className="border-gray-300 mb-4" />
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 font-montserrat">
            Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-500 h-12 px-3 font-montserrat"
            required
          />
          {errors.date && <p className="text-red-500 text-sm">{errors.date}</p>}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 font-montserrat">
              Source <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="source"
              value={formData.source}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-500 h-12 px-3 font-montserrat"
              placeholder="e.g., Client A"
              required
            />
            {errors.source && <p className="text-red-500 text-sm">{errors.source}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 font-montserrat">
              Amount <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-500 h-12 px-3 font-montserrat"
              placeholder="Enter amount"
              min="0"
              required
            />
            {errors.amount && <p className="text-red-500 text-sm">{errors.amount}</p>}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 font-montserrat">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-500 h-12 px-3 font-montserrat"
            >
              <option value="Product Sale">Product Sale</option>
              <option value="Service">Service</option>
              <option value="Investment">Investment</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 font-montserrat">Payment Method</label>
            <select
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-500 h-12 px-3 font-montserrat"
            >
              <option value="Bank Transfer">Bank Transfer</option>
              <option value="Credit Card">Credit Card</option>
              <option value="Cash">Cash</option>
              <option value="PayPal">PayPal</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 font-montserrat">
            Reference/Transaction ID <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="referenceId"
            value={formData.referenceId}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-500 h-12 px-3 font-montserrat"
            placeholder="e.g., TXN12345678"
            required
          />
          {errors.referenceId && <p className="text-red-500 text-sm">{errors.referenceId}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 font-montserrat">Notes</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-500 h-24 px-3 font-montserrat"
            placeholder="Additional information"
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full mt-4 py-2 bg-indigo-600 text-white rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-montserrat"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default IncomeForm;
