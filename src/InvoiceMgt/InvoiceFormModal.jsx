import React, { useState } from 'react';

// InvoiceFormModal component for creating new invoices
const InvoiceFormModal = ({ onClose, setInvoices }) => {
  const [form, setForm] = useState({
    clientName: '',
    servicesProvided: '',
    amount: '',
    dueDate: '',
    invoiceNumber: '',
    paymentStatus: 'Pending', // Default payment status
  });
  const [errors, setErrors] = useState({});
  const [taxRate, setTaxRate] = useState(0); // Optional tax rate
  const [totalAmount, setTotalAmount] = useState(0); // To store the calculated total amount

  const validate = () => {
    const newErrors = {};
    if (!form.clientName.trim()) newErrors.clientName = 'Client Name is required';
    if (!form.servicesProvided.trim()) newErrors.servicesProvided = 'Services Provided is required';
    if (!form.amount || form.amount <= 0) newErrors.amount = 'Amount must be greater than 0';
    if (!form.dueDate) newErrors.dueDate = 'Due Date is required';
    return newErrors;
  };

  const calculateTotal = () => {
    const amount = parseFloat(form.amount) || 0;
    const tax = (amount * taxRate) / 100;
    setTotalAmount(amount + tax);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      setInvoices(prev => [
        ...prev,
        { ...form, amount: totalAmount.toFixed(2), invoiceNumber: `INV-${Math.floor(Math.random() * 1000000)}` },
      ]);
      onClose();
    } else {
      setErrors(validationErrors);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value,
    }));
    if (name === 'amount') {
      calculateTotal();
    }
  };

  const handleTaxChange = (e) => {
    const value = e.target.value;
    setTaxRate(value);
    calculateTotal();
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-70 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg mx-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Create New Invoice</h2>

        <form onSubmit={handleSubmit}>
          {[
            { label: 'Client Name', name: 'clientName', type: 'text', placeholder: 'Enter client name' },
            { label: 'Services Provided', name: 'servicesProvided', type: 'textarea', placeholder: 'Describe the services provided', rows: 3 },
            { label: 'Amount', name: 'amount', type: 'number', placeholder: 'Enter amount' },
            { label: 'Due Date', name: 'dueDate', type: 'date' },
            { label: 'Tax Rate (%)', name: 'taxRate', type: 'number', placeholder: 'Enter tax rate' }
          ].map(({ label, name, type, placeholder, rows }, index) => (
            <div key={index} className="mb-4">
              <label className="block text-gray-700 font-semibold mb-1">
                {label}
                {name !== 'taxRate' && <span className="text-red-500">*</span>} {/* Asterisk in red for required fields only */}
              </label>
              {type === 'textarea' ? (
                <textarea
                  name={name}
                  value={form[name]}
                  onChange={handleInputChange}
                  className={`w-11/12 p-3 border rounded-md transition duration-200 ${errors[name] ? 'border-red-500' : 'border-gray-300 focus:ring focus:ring-blue-200'}`}
                  placeholder={placeholder}
                  rows={rows}
                />
              ) : (
                <input
                  type={type}
                  name={name}
                  value={type === 'number' && name === 'taxRate' ? taxRate : form[name]}
                  onChange={type === 'number' && name === 'taxRate' ? handleTaxChange : handleInputChange}
                  className={`w-11/12 p-3 border rounded-md transition duration-200 ${errors[name] ? 'border-red-500' : 'border-gray-300 focus:ring focus:ring-blue-200'}`}
                  placeholder={placeholder}
                />
              )}
              {errors[name] && <p className="text-red-500 mt-1">{errors[name]}</p>} {/* Error messages in red */}
            </div>
          ))}

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-1">Total Amount (Including Tax):</label>
            <input
              type="text"
              value={totalAmount.toFixed(2)}
              readOnly
              className="w-11/12 p-3 border rounded-md bg-gray-100"
            />
          </div>

          {/* Button Container */}
          <div className="flex justify-end mt-6">
            <button
              type="button"
              onClick={onClose}
              className="mr-4 p-2 cursor-pointer bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition duration-200 transform hover:scale-105"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="p-2 bg-blue-600 text-white cursor:pointer rounded-md hover:bg-blue-700 transition duration-200 transform hover:scale-105"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InvoiceFormModal;
