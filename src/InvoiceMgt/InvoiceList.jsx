import React, { useState } from 'react';
import { FaSearch, FaPlus } from 'react-icons/fa';
import { HiEye, HiCheckCircle, HiOutlineMail, HiDownload } from 'react-icons/hi';
import InvoiceFormModal from './InvoiceFormModal';
import InvoiceDetailsModal from './InvoiceDetailsModal';
import jsPDF from 'jspdf';

const dummyInvoices = [
    {
        id: 1,
        clientName: 'John Doe',
        servicesProvided: 'Web Development',
        amount: 1000,
        dueDate: '2024-10-30',
        invoiceNumber: 'INV-12345',
        paymentStatus: 'Pending',
    },
    {
        id: 2,
        clientName: 'Jane Smith',
        servicesProvided: 'SEO Services',
        amount: 500,
        dueDate: '2024-11-01',
        invoiceNumber: 'INV-67890',
        paymentStatus: 'Paid',
    },
];

const getStatusColor = (status) => {
    switch (status) {
        case 'Paid':
            return 'text-green-600';
        case 'Pending':
            return 'text-yellow-600';
        case 'Overdue':
            return 'text-red-600';
        default:
            return 'text-gray-600';
    }
};

const InvoiceList = () => {
    const [invoices, setInvoices] = useState(dummyInvoices);
    const [search, setSearch] = useState('');
    const [filterStatus, setFilterStatus] = useState('');
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
    const [selectedInvoice, setSelectedInvoice] = useState(null);

    const handleOpenFormModal = () => setIsFormModalOpen(true);
    const handleCloseFormModal = () => setIsFormModalOpen(false);
    const handleOpenDetailsModal = (invoice) => {
        setSelectedInvoice(invoice);
        setIsDetailsModalOpen(true);
    };
    const handleCloseDetailsModal = () => setIsDetailsModalOpen(false);

    const markAsPaid = (invoiceId) => {
        setInvoices((prevInvoices) =>
            prevInvoices.map((invoice) =>
                invoice.id === invoiceId ? { ...invoice, paymentStatus: 'Paid' } : invoice
            )
        );
    };

    const sendPaymentReminder = (invoiceId) => {
        alert(`Payment reminder sent for invoice ID: ${invoiceId}`);
    };

    const downloadInvoice = (invoice) => {
        const doc = new jsPDF();
        doc.text(`Invoice Number: ${invoice.invoiceNumber}`, 10, 10);
        doc.text(`Client Name: ${invoice.clientName}`, 10, 20);
        doc.text(`Services: ${invoice.servicesProvided}`, 10, 30);
        doc.text(`Amount: $${invoice.amount}`, 10, 40);
        doc.text(`Due Date: ${invoice.dueDate}`, 10, 50);
        doc.text(`Status: ${invoice.paymentStatus}`, 10, 60);
        doc.save(`${invoice.invoiceNumber}.pdf`);
    };

    const filteredInvoices = invoices.filter((invoice) => {
        const trimmedSearch = search.trim(); // Remove leading and trailing spaces

        const isSearchValid = trimmedSearch === '' ||
            invoice.clientName.toLowerCase().includes(trimmedSearch.toLowerCase()) ||
            invoice.invoiceNumber.includes(trimmedSearch);

        const isStatusValid = filterStatus ? invoice.paymentStatus === filterStatus : true;

        return isSearchValid && isStatusValid;
    });


    return (
        <>
            <div className="container mx-auto p-4">
                <h1 className="text-3xl font-bold mb-4">Invoice Management</h1>

                {/* Filter and Search */}
                <div className="mb-4 flex flex-wrap flex-col md:flex-row justify-between">
                    <div className="relative">
                        <FaSearch className="absolute left-3 top-2 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search by Client Name or Invoice Number"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="p-2 border rounded w-full md:w-64 pl-10"
                        />
                    </div>
                    <div className="mt-2 md:mt-0 md:ml-2">
                        <label className="text-sm mr-2">Filter by Status:</label>
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="p-2 border rounded w-full md:w-32"
                        >
                            <option value="">All</option>
                            <option value="Paid">Paid</option>
                            <option value="Pending">Pending</option>
                            <option value="Overdue">Overdue</option>
                        </select>
                    </div>

                    <button
                        onClick={handleOpenFormModal}
                        className="bg-green-500 text-white p-2 rounded flex items-center mt-2 md:mt-0 md:ml-2 cursor-pointer hover:bg-green-600 transition"
                        title="Add New Invoice"
                    >
                        <FaPlus className="mr-2" /> Add New Invoice
                    </button>
                </div>

                {/* Invoice List */}
                <div>
                    {filteredInvoices.length > 0 ? (
                        <table className="min-w-full bg-white shadow-lg rounded-lg overflow-hidden">
                            <thead className="bg-gray-200">
                                <tr>
                                    <th className="py-2 px-4 text-left">Invoice Number</th>
                                    <th className="py-2 px-4 text-left">Client Name</th>
                                    <th className="py-2 px-4 text-left">Services Provided</th>
                                    <th className="py-2 px-4 text-left">Amount</th>
                                    <th className="py-2 px-4 text-left">Due Date</th>
                                    <th className="py-2 px-4 text-left">Status</th>
                                    <th className="py-2 px-4 text-left">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredInvoices.map((invoice) => (
                                    <tr
                                        key={invoice.id}
                                        onClick={() => handleOpenDetailsModal(invoice)}
                                        className="cursor-pointer hover:bg-gray-100"
                                    >
                                        <td className="border px-4 py-2">{invoice.invoiceNumber}</td>
                                        <td className="border px-4 py-2">{invoice.clientName}</td>
                                        <td className="border px-4 py-2">{invoice.servicesProvided}</td>
                                        <td className="border px-4 py-2">${invoice.amount}</td>
                                        <td className="border px-4 py-2">{invoice.dueDate}</td>
                                        <td className={`border px-4 py-2 ${getStatusColor(invoice.paymentStatus)}`}>
                                            {invoice.paymentStatus}
                                        </td>
                                        <td className="border px-4 py-2 flex space-x-2">
                                            <button
                                                onClick={(e) => { e.stopPropagation(); handleOpenDetailsModal(invoice); }}
                                                className="bg-blue-500 text-white p-1 rounded hover:bg-blue-600 transition cursor-pointer"
                                                title="View Details"
                                            >
                                                <HiEye />
                                            </button>
                                            <button
                                                onClick={(e) => { e.stopPropagation(); markAsPaid(invoice.id); }}
                                                className="bg-green-500 text-white p-1 rounded hover:bg-green-600 transition cursor-pointer"
                                                title="Mark as Paid"
                                            >
                                                <HiCheckCircle />
                                            </button>
                                            <button
                                                onClick={(e) => { e.stopPropagation(); sendPaymentReminder(invoice.id); }}
                                                className="bg-yellow-500 text-white p-1 rounded hover:bg-yellow-600 transition cursor-pointer"
                                                title="Send Reminder"
                                            >
                                                <HiOutlineMail />
                                            </button>
                                            <button
                                                onClick={(e) => { e.stopPropagation(); downloadInvoice(invoice); }}
                                                className="bg-gray-500 text-white p-1 rounded hover:bg-gray-600 transition cursor-pointer"
                                                title="Download Invoice"
                                            >
                                                <HiDownload />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>No matching data found.</p>
                    )}
                </div>

                {/* Modals */}
                {isFormModalOpen && (
                    <InvoiceFormModal onClose={handleCloseFormModal} setInvoices={setInvoices} />
                )}
                {isDetailsModalOpen && selectedInvoice && (
                    <InvoiceDetailsModal invoice={selectedInvoice} onClose={handleCloseDetailsModal} />
                )}
            </div>
        </>
    );
};

export default InvoiceList;
