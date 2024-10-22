import React, { useState } from 'react';
import { FaSearch, FaSort, FaSortUp, FaSortDown, FaEdit, FaTrash } from 'react-icons/fa';
import EditIncomeForm from './EditIncomeForm'; // Import the form component

const IncomeTable = () => {
  const [incomeData, setIncomeData] = useState([
    {
      id: 1,
      date: "2024-10-09",
      source: "Client A",
      amount: "$5000",
      category: "Service",
      paymentMethod: "Bank Transfer",
      transactionId: "TXN12345678",
      notes: "Payment for Project XYZ - Phase 1",
    },
    {
      id: 2,
      date: "2024-09-21",
      source: "Client B",
      amount: "₹4000",
      category: "Product Sale",
      paymentMethod: "Credit Card",
      transactionId: "TXN98765432",
      notes: "Sale of Product ABC",
    },
    // More entries...
  ]);

  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage] = useState(10);
  const [isEditing, setIsEditing] = useState(false);
  const [currentEntry, setCurrentEntry] = useState(null);

  const sortedData = [...incomeData].sort((a, b) => {
    if (sortConfig.key) {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      if (aValue < bValue) return sortConfig.direction === 'ascending' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'ascending' ? 1 : -1;
      return 0;
    }
    return 0;
  });

  const filteredData = sortedData.filter((entry) => {
    return (
      (filterCategory === '' || entry.category === filterCategory) &&
      (entry.source.toLowerCase().includes(search.toLowerCase()) ||
        entry.category.toLowerCase().includes(search.toLowerCase()) ||
        entry.notes.toLowerCase().includes(search.toLowerCase()))
    );
  });

  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = filteredData.slice(indexOfFirstEntry, indexOfLastEntry);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const handleFilterCategory = (e) => {
    setFilterCategory(e.target.value);
    setCurrentPage(1);
  };

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const renderSortIcon = (column) => {
    if (sortConfig.key === column) {
      return sortConfig.direction === 'ascending' ? <FaSortUp /> : <FaSortDown />;
    }
    return <FaSort />;
  };

  const handleEdit = (entry) => {
    setCurrentEntry(entry);
    setIsEditing(true);
  };

  const handleFormSubmit = (updatedEntry) => {
    setIncomeData((prevData) =>
      prevData.map((entry) => (entry.id === updatedEntry.id ? updatedEntry : entry))
    );
    setIsEditing(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      setIncomeData((prevData) => prevData.filter(entry => entry.id !== id));
    }
  };

  const totalEntries = filteredData.length;
  const totalPages = Math.ceil(totalEntries / entriesPerPage);

  return (
    <div className="overflow-x-auto p-6 bg-gray-100 min-h-screen">
      <div className="mb-6">
        <h2 className="text-3xl font-semibold text-gray-800">Income Records</h2>
      </div>

      {/* Search and Filter Controls */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 space-y-3 md:space-y-0">
        <div className="relative w-full md:w-1/3">
          <input
            type="text"
            value={search}
            onChange={handleSearch}
            placeholder="Search..."
            className="p-2 pl-10 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <FaSearch className="absolute left-3 top-2.5 text-gray-500" />
        </div>
        <select
          value={filterCategory}
          onChange={handleFilterCategory}
          className="p-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">All Categories</option>
          <option value="Service">Service</option>
          <option value="Product Sale">Product Sale</option>
          {/* Add more categories as needed */}
        </select>
      </div>

      {/* Table */}
      <table className="min-w-full bg-white rounded-md shadow-md text-sm font-sans">
        <thead>
          <tr className="bg-gray-200 border-b text-gray-600 text-left">
            <th className="py-3 px-4 cursor-pointer" onClick={() => handleSort('date')}>
              Date {renderSortIcon('date')}
            </th>
            <th className="py-3 px-4 cursor-pointer" onClick={() => handleSort('source')}>
              Source {renderSortIcon('source')}
            </th>
            <th className="py-3 px-4 cursor-pointer" onClick={() => handleSort('amount')}>
              Amount {renderSortIcon('amount')}
            </th>
            <th className="py-3 px-4 cursor-pointer" onClick={() => handleSort('category')}>
              Category {renderSortIcon('category')}
            </th>
            <th className="py-3 px-4 cursor-pointer" onClick={() => handleSort('paymentMethod')}>
              Payment Method {renderSortIcon('paymentMethod')}
            </th>
            <th className="py-3 px-4 cursor-pointer" onClick={() => handleSort('transactionId')}>
              Transaction ID {renderSortIcon('transactionId')}
            </th>
            <th className="py-3 px-4">Notes</th>
            <th className="py-3 px-4">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {currentEntries.length > 0 ? (
            currentEntries.map((entry) => (
              <tr key={entry.id} className="border-t hover:bg-gray-50">
                <td className="py-3 px-4">{entry.date}</td>
                <td className="py-3 px-4">{entry.source}</td>
                <td className="py-3 px-4">{entry.amount}</td>
                <td className="py-3 px-4">{entry.category}</td>
                <td className="py-3 px-4">{entry.paymentMethod}</td>
                <td className="py-3 px-4">{entry.transactionId}</td>
                <td className="py-3 px-4">{entry.notes}</td>
                <td className="py-3 px-4 flex justify-center space-x-3">
                  <button
                    className="text-blue-600 hover:text-blue-800 transition duration-200"
                    title='Edit'
                    onClick={() => handleEdit(entry)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="text-red-600 hover:text-red-800 transition duration-200"
                    title='Delete'
                    onClick={() => handleDelete(entry.id)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="py-3 px-6 text-center text-gray-500">
                No records found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="mt-4 flex justify-between items-center">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className={`px-4 py-2 ${currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white'} rounded`}
        >
          Previous
        </button>
        <span className="text-gray-700">Page {currentPage} of {totalPages}</span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 ${currentPage === totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white'} rounded`}
        >
          Next
        </button>
      </div>

      {/* Edit Income Form Popup */}
      {isEditing && (
        <EditIncomeForm
          entry={currentEntry}
          onSubmit={handleFormSubmit}
          onClose={() => setIsEditing(false)}
        />
      )}
    </div>
  );
};

export default IncomeTable;
