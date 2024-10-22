import React, { useState } from "react";
import { FaSearch, FaEdit, FaTrashAlt, FaCheckCircle, FaEnvelope, FaDownload } from "react-icons/fa";

const InvoiceManagement = () => {
  const [invoices, setInvoices] = useState([
    // Dummy data for invoices
    {
      id: 1,
      clientName: "Client A",
      services: "Consulting",
      amount: 1000,
      dueDate: "2024-12-01",
      status: "Pending",
    },
    {
      id: 2,
      clientName: "Client B",
      services: "Product Sale",
      amount: 500,
      dueDate: "2024-11-15",
      status: "Paid",
    },
    {
      id: 3,
      clientName: "Client C",
      services: "Development",
      amount: 2000,
      dueDate: "2024-10-25",
      status: "Overdue",
    },
  ]);

  const [form, setForm] = useState({
    clientName: "",
    services: "",
    amount: "",
    dueDate: "",
    invoiceNumber: Date.now(), // Auto-generated invoice number
  });

  const [filterStatus, setFilterStatus] = useState("");

  // Function to handle form input change
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Function to add a new invoice
  const handleAddInvoice = () => {
    const newInvoice = {
      id: invoices.length + 1,
      ...form,
      status: "Pending", // Default status is Pending
    };

    setInvoices([...invoices, newInvoice]);

    // Reset form
    setForm({
      clientName: "",
      services: "",
      amount: "",
      dueDate: "",
      invoiceNumber: Date.now(),
    });
  };

  // Function to mark an invoice as paid
  const markAsPaid = (id) => {
    setInvoices(
      invoices.map((invoice) =>
        invoice.id === id ? { ...invoice, status: "Paid" } : invoice
      )
    );
  };

  // Function to send payment reminder (dummy functionality)
  const sendPaymentReminder = (id) => {
    alert(`Payment reminder sent for Invoice #${id}`);
  };

  // Function to filter invoices by status
  const handleFilter = (e) => {
    setFilterStatus(e.target.value);
  };

  // Function to filter the list based on selected status
  const filteredInvoices = invoices.filter((invoice) =>
    filterStatus ? invoice.status === filterStatus : true
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Invoice Management</h1>

      {/* Invoice Form */}
      <div className="bg-gray-100 p-4 rounded-lg shadow mb-8">
        <h2 className="text-xl font-bold mb-4">Create Invoice</h2>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            name="clientName"
            value={form.clientName}
            onChange={handleChange}
            placeholder="Client Name"
            className="p-2 border rounded"
          />
          <input
            type="text"
            name="services"
            value={form.services}
            onChange={handleChange}
            placeholder="Services Provided"
            className="p-2 border rounded"
          />
          <input
            type="number"
            name="amount"
            value={form.amount}
            onChange={handleChange}
            placeholder="Amount"
            className="p-2 border rounded"
          />
          <input
            type="date"
            name="dueDate"
            value={form.dueDate}
            onChange={handleChange}
            className="p-2 border rounded"
          />
        </div>
        <p>Invoice Number: {form.invoiceNumber}</p>
        <button
          onClick={handleAddInvoice}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Submit
        </button>
      </div>

      {/* Filter Invoices */}
      <div className="mb-4">
        <label htmlFor="filter" className="font-semibold">
          Filter by Status:{" "}
        </label>
        <select
          name="filter"
          id="filter"
          value={filterStatus}
          onChange={handleFilter}
          className="p-2 border rounded"
        >
          <option value="">All</option>
          <option value="Paid">Paid</option>
          <option value="Pending">Pending</option>
          <option value="Overdue">Overdue</option>
        </select>
      </div>

      {/* Invoice List */}
      <table className="min-w-full bg-white border rounded-lg shadow">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-2 px-4 text-left">Invoice Number</th>
            <th className="py-2 px-4 text-left">Client Name</th>
            <th className="py-2 px-4 text-left">Services</th>
            <th className="py-2 px-4 text-left">Amount</th>
            <th className="py-2 px-4 text-left">Due Date</th>
            <th className="py-2 px-4 text-left">Status</th>
            <th className="py-2 px-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredInvoices.map((invoice) => (
            <tr key={invoice.id} className="border-b">
              <td className="py-2 px-4">{invoice.invoiceNumber}</td>
              <td className="py-2 px-4">{invoice.clientName}</td>
              <td className="py-2 px-4">{invoice.services}</td>
              <td className="py-2 px-4">${invoice.amount}</td>
              <td className="py-2 px-4">{invoice.dueDate}</td>
              <td
                className={`py-2 px-4 ${
                  invoice.status === "Paid"
                    ? "text-green-500"
                    : invoice.status === "Overdue"
                    ? "text-red-500"
                    : "text-yellow-500"
                }`}
              >
                {invoice.status}
              </td>
              <td className="py-2 px-4 flex space-x-2">
                <button
                  onClick={() => markAsPaid(invoice.id)}
                  className="bg-green-500 text-white px-2 py-1 rounded"
                  disabled={invoice.status === "Paid"}
                >
                  <FaCheckCircle />
                </button>
                <button
                  onClick={() => sendPaymentReminder(invoice.id)}
                  className="bg-blue-500 text-white px-2 py-1 rounded"
                >
                  <FaEnvelope />
                </button>
                <button
                  className="bg-gray-500 text-white px-2 py-1 rounded"
                >
                  <FaDownload />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InvoiceManagement;
