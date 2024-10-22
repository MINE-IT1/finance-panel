import React from 'react';
import { HiX } from 'react-icons/hi'; // Importing the close icon

const InvoiceDetailsModal = ({ invoice, onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3 transform transition-transform duration-300 scale-100 hover:scale-105">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-2xl font-bold">Invoice Details</h2>
          <button 
            onClick={onClose} 
            className="text-gray-600 hover:text-red-600 transition cursor-pointer"
            title="Close"
          >
            <HiX size={24} />
          </button>
        </div>
        <hr className="my-1 border-gray-300" />

        <p><strong>Invoice Number:</strong> {invoice.invoiceNumber}</p>
        <p><strong>Client Name:</strong> {invoice.clientName}</p>
        <p><strong>Services Provided:</strong> {invoice.servicesProvided}</p>
        <p><strong>Amount:</strong> ${invoice.amount}</p>
        <p><strong>Due Date:</strong> {invoice.dueDate}</p>
        <p><strong>Payment Status:</strong> {invoice.paymentStatus}</p>

        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="p-2 bg-red-500 text-white rounded hover:bg-red-600 transition cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetailsModal;
