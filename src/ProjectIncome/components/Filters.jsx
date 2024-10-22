import { useState } from 'react';

const Filters = ({ onFilterChange }) => {
  const [status, setStatus] = useState('All');
  const [profitabilityRange, setProfitabilityRange] = useState([0, 100]);
  const [client, setClient] = useState('');

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
    onFilterChange({ status: e.target.value, profitabilityRange, client });
  };

  const handleProfitabilityChange = (e) => {
    const value = e.target.value;
    setProfitabilityRange([value, 100]);
    onFilterChange({ status, profitabilityRange: [value, 100], client });
  };

  const handleClientChange = (e) => {
    setClient(e.target.value);
    onFilterChange({ status, profitabilityRange, client: e.target.value });
  };

  return (
    <div className="mb-6 p-4 bg-white rounded-lg shadow-md">
      <h3 className="text-lg font-semibold">Filters</h3>
      <div className="flex flex-col md:flex-row gap-4 mt-4">
        {/* Status Filter */}
        <div className="w-full">
          <label className="block text-sm font-medium">Project Status</label>
          <select
            value={status}
            onChange={handleStatusChange}
            className="w-full p-2 border rounded-lg"
          >
            <option value="All">All</option>
            <option value="Completed">Completed</option>
            <option value="Ongoing">Ongoing</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
        {/* Profitability Range Filter */}
        <div className="w-full">
          <label className="block text-sm font-medium">Profitability Range (%)</label>
          <input
            type="range"
            min="0"
            max="100"
            value={profitabilityRange[0]}
            onChange={handleProfitabilityChange}
            className="w-full"
          />
          <span>{profitabilityRange[0]}%</span>
        </div>
        {/* Client Filter */}
        <div className="w-full">
          <label className="block text-sm font-medium">Client</label>
          <input
            value={client}
            onChange={handleClientChange}
            className="w-full p-2 border rounded-lg"
            placeholder="Filter by Client"
          />
        </div>
      </div>
    </div>
  );
};

export default Filters;
