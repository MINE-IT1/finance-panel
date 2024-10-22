import React from 'react';

const Filters = ({ filters, handleFilterChange, clearFilters }) => {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-2">Filters</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <input
          type="date"
          name="dateFrom"
          value={filters.dateFrom}
          onChange={handleFilterChange}
          className="p-2 border rounded w-full"
          placeholder="From Date"
        />
        <input
          type="date"
          name="dateTo"
          value={filters.dateTo}
          onChange={handleFilterChange}
          className="p-2 border rounded w-full"
          placeholder="To Date"
        />
        <select
          name="department"
          value={filters.department}
          onChange={handleFilterChange}
          className="p-2 border rounded w-full"
        >
          <option value="">Select Department</option>
          <option value="HR">HR</option>
          <option value="Sales">Sales</option>
          <option value="IT">IT</option>
        </select>
        <input
          type="text"
          name="project"
          value={filters.project}
          onChange={handleFilterChange}
          className="p-2 border rounded w-full"
          placeholder="Project"
          onInput={(e) => {
            // Trim whitespace and update the value
            e.target.value = e.target.value.trimStart();
            handleFilterChange(e);
          }}
        />
      </div>
      <button onClick={clearFilters} className="mt-4 p-2 bg-red-500 text-white rounded">
        Clear Filters
      </button>
    </div>
  );
};

export default Filters;
