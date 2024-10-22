import React, { useEffect, useState } from 'react';

const EmployeeEditModal = ({ isOpen, onClose, employee, onSave }) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (employee) {
      setFormData({ ...employee });
    }
  }, [employee]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation
    if (!formData.name || !formData.basicSalary) {
      alert('Please fill in all fields.');
      return;
    }
    onSave({ ...formData, netSalary: calculateNetSalary(formData) });
    onClose();
  };

  const calculateNetSalary = ({ basicSalary, bonuses, deductions, taxes }) => {
    return Number(basicSalary) + Number(bonuses) - Number(deductions) - Number(taxes);
  };

  if (!isOpen) return null;

  return (
    <div className={`fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className={`bg-white p-6 rounded-lg shadow-lg transform transition-transform duration-300 ${isOpen ? 'scale-100' : 'scale-95'} max-w-2xl w-full`}>
        <h2 className="text-lg font-bold mb-4">Edit Employee</h2>
        <form onSubmit={handleSubmit}>
          {['name', 'basicSalary', 'bonuses', 'deductions', 'taxes'].map((field, index) => (
            <div className="mb-4" key={index}>
              <label className="block mb-2 capitalize">{field}</label>
              <input
                type={field === 'name' ? 'text' : 'number'}
                name={field}
                value={formData[field] || ''}
                onChange={handleChange}
                className="border p-2 w-full rounded"
              />
            </div>
          ))}
          <div className="mb-4">
            <label className="block mb-2">Disbursement Status</label>
            <select
              name="status"
              value={formData.status || ''}
              onChange={handleChange}
              className="border p-2 w-full rounded"
            >
              <option value="">Select Status</option>
              <option value="Processing">Processing</option>
              <option value="Pending">Pending</option>
              <option value="Paid">Paid</option>
            </select>
          </div>
          <div className="flex justify-end">
            <button type="button" onClick={onClose} className="mr-2 bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 transition">
              Cancel
            </button>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeEditModal;
