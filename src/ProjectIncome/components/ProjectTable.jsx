import { useState } from 'react';
import EditableField from './EditableField';

const ProjectTable = ({ projects, onProjectUpdate }) => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');

  const calculateProfitability = (income, expenses) => {
    return ((income - expenses) / income) * 100;
  };

  const handleIncomeChange = (projectId, newIncome) => {
    const updatedProjects = projects.map((project) =>
      project.id === projectId ? { ...project, income: newIncome } : project
    );
    onProjectUpdate(updatedProjects);
  };

  const handleExpensesChange = (projectId, newExpenses) => {
    const updatedProjects = projects.map((project) =>
      project.id === projectId ? { ...project, expenses: newExpenses } : project
    );
    onProjectUpdate(updatedProjects);
  };

  const handleProjectClick = (project) => {
    setSelectedProject(project);
  };

  const sortedProjects = [...projects].sort((a, b) => {
    const profitabilityA = calculateProfitability(a.income, a.expenses);
    const profitabilityB = calculateProfitability(b.income, b.expenses);
    return sortOrder === 'asc' ? profitabilityA - profitabilityB : profitabilityB - profitabilityA;
  });

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  return (
    <div>
      {/* Project Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-4 text-left">Project Name</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Income</th>
              <th className="p-4 text-left">Expenses</th>
              <th className="p-4 text-left cursor-pointer" onClick={toggleSortOrder}>
                Profitability (%) {sortOrder === 'asc' ? '↑' : '↓'}
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedProjects.map((project) => (
              <tr
                key={project.id}
                className="border-b hover:bg-gray-100 cursor-pointer"
                onClick={() => handleProjectClick(project)}
              >
                <td className="p-4">{project.name}</td>
                <td className="p-4">{project.status}</td>
                <td className="p-4">
                  <EditableField
                    value={project.income}
                    onSave={(newIncome) => handleIncomeChange(project.id, newIncome)}
                  />
                </td>
                <td className="p-4">
                  <EditableField
                    value={project.expenses}
                    onSave={(newExpenses) => handleExpensesChange(project.id, newExpenses)}
                  />
                </td>
                <td className="p-4">
                  {calculateProfitability(project.income, project.expenses).toFixed(2)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Project Details Section */}
      {selectedProject && (
        <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-4">Project Details: {selectedProject.name}</h3>
          <p><strong>Status:</strong> {selectedProject.status}</p>
          <p><strong>Income:</strong> ${selectedProject.income}</p>
          <p><strong>Expenses:</strong> ${selectedProject.expenses}</p>
          <p><strong>Profitability:</strong> {calculateProfitability(selectedProject.income, selectedProject.expenses).toFixed(2)}%</p>
          <button
            className="mt-4 p-2 bg-blue-500 text-white rounded-lg"
            onClick={() => setSelectedProject(null)}
          >
            Close Details
          </button>
        </div>
      )}
    </div>
  );
};

export default ProjectTable;
