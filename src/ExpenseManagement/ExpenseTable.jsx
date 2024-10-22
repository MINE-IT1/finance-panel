import React, { useState } from 'react';
import { FaSearch, FaSort, FaSortUp, FaSortDown, FaEdit, FaTrash } from 'react-icons/fa';
import EditExpenseForm from './EditExpenseForm'; // Import the form component for editing expenses

const ExpenseTable = () => {
  // Initial state for expense data
  const [expenseData, setExpenseData] = useState([
    {
      id: 1,
      date: "2024-10-05",
      category: "Marketing",
      amount: "$200",
      notes: "Facebook Ads",
      paymentMethod: "Credit Card",
    },
    {
      id: 2,
      date: "2024-09-15",
      category: "Travel",
      amount: "$450",
      notes: "Business trip to NY",
      paymentMethod: "Bank Transfer",
    },
    // More entries can be added here...
  ]);

  // State for search, filter, sorting, pagination, and editing
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [isEditing, setIsEditing] = useState(false);
  const [currentEntry, setCurrentEntry] = useState(null);

  // Sorting the data based on the current sort configuration
  const sortedData = [...expenseData].sort((a, b) => {
    if (sortConfig.key) {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      if (aValue < bValue) return sortConfig.direction === 'ascending' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'ascending' ? 1 : -1;
      return 0;
    }
    return 0;
  });

  // Filtering the sorted data based on search and selected category
  const filteredData = sortedData.filter((entry) => {
    return (
      (filterCategory === '' || entry.category === filterCategory) &&
      (entry.date.toLowerCase().includes(search.toLowerCase()) ||
       entry.category.toLowerCase().includes(search.toLowerCase()) ||
       entry.notes.toLowerCase().includes(search.toLowerCase()) ||
       entry.amount.toLowerCase().includes(search.toLowerCase()))
    );
  });

  // Calculate pagination indices
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = filteredData.slice(indexOfFirstEntry, indexOfLastEntry);

  // Handle search input changes
  const handleSearch = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  // Handle category filter changes
  const handleFilterCategory = (e) => {
    setFilterCategory(e.target.value);
    setCurrentPage(1); // Reset to first page on filter
  };

  // Handle sorting of table columns
  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // Render sort icons for columns
  const renderSortIcon = (column) => {
    if (sortConfig.key === column) {
      return sortConfig.direction === 'ascending' ? <FaSortUp /> : <FaSortDown />;
    }
    return <FaSort />;
  };

  // Handle editing of an expense entry
  const handleEdit = (entry) => {
    setCurrentEntry(entry);
    setIsEditing(true);
  };

  // Handle form submission to update expense data
  const handleFormSubmit = (updatedEntry) => {
    setExpenseData((prevData) =>
      prevData.map((entry) => (entry.id === updatedEntry.id ? updatedEntry : entry))
    );
    setIsEditing(false); // Close the editing form
  };

  // Handle deletion of an expense entry
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      setExpenseData((prevData) => prevData.filter(entry => entry.id !== id));
    }
  };

  // Pagination calculations
  const totalEntries = filteredData.length;
  const totalPages = Math.ceil(totalEntries / entriesPerPage);

  return (
    <div className="overflow-x-auto p-6 bg-gray-100 min-h-screen">
      <div className="mb-6">
        <h2 className="text-4xl font-bold text-gray-800">Expense Records</h2>
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

        <div className="flex space-x-3 items-center">
          <select
            value={filterCategory}
            onChange={handleFilterCategory}
            className="p-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">All Categories</option>
            <option value="Marketing">Marketing</option>
            <option value="Travel">Travel</option>
            {/* Add more categories as needed */}
          </select>

          <div className="flex items-center">
            <label className="text-gray-600 mr-2">Entries per page:</label>
            <select
              value={entriesPerPage}
              onChange={(e) => setEntriesPerPage(Number(e.target.value))}
              className="p-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table for displaying expenses */}
      <table className="min-w-full bg-white rounded-md shadow-md text-sm font-sans">
        <thead>
          <tr className="bg-gray-200 border-b text-gray-600 text-left">
            <th className="py-3 px-4 cursor-pointer" onClick={() => handleSort('date')}>
              Date {renderSortIcon('date')}
            </th>
            <th className="py-3 px-4 cursor-pointer" onClick={() => handleSort('category')}>
              Category {renderSortIcon('category')}
            </th>
            <th className="py-3 px-4 cursor-pointer" onClick={() => handleSort('amount')}>
              Amount {renderSortIcon('amount')}
            </th>
            <th className="py-3 px-4">Notes</th>
            <th className="py-3 px-4">Payment Method</th>
            <th className="py-3 px-4 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {currentEntries.length > 0 ? (
            currentEntries.map((entry) => (
              <tr key={entry.id} className="border-t hover:bg-gray-50">
                <td className="py-3 px-4">{entry.date}</td>
                <td className="py-3 px-4">{entry.category}</td>
                <td className="py-3 px-4">{entry.amount}</td>
                <td className="py-3 px-4 cursor-pointer">{entry.notes}</td>
                <td className="py-3 px-4">{entry.paymentMethod}</td>
                <td className="py-3 px-4 flex justify-center">
                  {/* Edit and Delete buttons aligned center */}
                  <button
                    className="text-blue-600 hover:text-blue-800 transition duration-200 mx-1"
                    title='Edit'
                    onClick={() => handleEdit(entry)}
                  >
                    <FaEdit size={20} />
                  </button>
                  <button
                    className="text-red-600 hover:text-red-800 transition duration-200 mx-1"
                    title='Delete'
                    onClick={() => handleDelete(entry.id)}
                  >
                    <FaTrash size={20} />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="py-3 px-6 text-center text-gray-500">
                No records found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`px-4 py-2 ${currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white'} rounded`}
          >
            Prev
          </button>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 ml-2 ${currentPage === totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white'} rounded`}
          >
            Next
          </button>
        </div>
        <div className="flex items-center">
          <span className="text-gray-600 mr-2">Total entries: {totalEntries}</span>
        </div>
      </div>

      {/* Edit Expense Form Popup */}
      {isEditing && (
        <EditExpenseForm
          entry={currentEntry}
          onSubmit={handleFormSubmit}
          onClose={() => setIsEditing(false)}
        />
      )}
    </div>
  );
};

export default ExpenseTable;
