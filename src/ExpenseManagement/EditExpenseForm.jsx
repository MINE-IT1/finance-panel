import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa'; // Import close icon

const EditExpenseForm = ({ entry, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    date: '',
    category: '',
    amount: '',
    notes: '',
    paymentMethod: '',
  });

  const [errors, setErrors] = useState({});

  // Initialize form data with the entry data when the form is opened
  useEffect(() => {
    if (entry) {
      setFormData({
        date: entry.date,
        category: entry.category,
        amount: entry.amount,
        notes: entry.notes,
        paymentMethod: entry.paymentMethod,
      });
    }
  }, [entry]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Validate form data
  const validate = () => {
    const newErrors = {};
    if (!formData.date.trim()) newErrors.date = "Date is required.";
    if (!formData.category.trim()) newErrors.category = "Category is required.";
    if (!formData.amount.trim()) newErrors.amount = "Amount is required.";
    if (isNaN(formData.amount)) newErrors.amount = "Amount must be a number.";
    if (!formData.paymentMethod.trim()) newErrors.paymentMethod = "Payment Method is required.";
    return newErrors;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return; // Prevent submission if there are errors
    }
    onSubmit({ ...entry, ...formData });
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-md w-96 md:w-1/3"> {/* Increased width */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Edit Expense</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
            <FaTimes size={20} /> {/* Close icon */}
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Date <span className="text-red-500">*</span></label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className={`border rounded w-full p-2 ${errors.date ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.date && <span className="text-red-500 text-sm">{errors.date}</span>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Category <span className="text-red-500">*</span></label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={`border rounded w-full p-2 ${errors.category ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.category && <span className="text-red-500 text-sm">{errors.category}</span>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Amount <span className="text-red-500">*</span></label>
            <input
              type="text"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              className={`border rounded w-full p-2 ${errors.amount ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.amount && <span className="text-red-500 text-sm">{errors.amount}</span>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Payment Method <span className="text-red-500">*</span></label>
            <input
              type="text"
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
              className={`border rounded w-full p-2 ${errors.paymentMethod ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.paymentMethod && <span className="text-red-500 text-sm">{errors.paymentMethod}</span>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Notes</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              className="border rounded w-full p-2 border-gray-300"
            />
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditExpenseForm;
