import { useState } from 'react';
import Filters from '../components/Filters';
import ProjectTable from '../components/ProjectTable';
import ProjectChart from '../components/ProjectChart';

const ProjectProfitabilityPage = () => {
  const [projects, setProjects] = useState([
    { id: 1, name: 'Project A', status: 'Ongoing', income: 5000, expenses: 3000 },
    { id: 2, name: 'Project B', status: 'Completed', income: 10000, expenses: 8000 },
    { id: 3, name: 'Project C', status: 'Ongoing', income: 7500, expenses: 4000 },
    { id: 4, name: 'Project D', status: 'Completed', income: 15000, expenses: 12000 },
    { id: 5, name: 'Project E', status: 'Ongoing', income: 2000, expenses: 1000 },
    { id: 6, name: 'Project F', status: 'Completed', income: 5000, expenses: 2000 },
    { id: 7, name: 'Project G', status: 'Ongoing', income: 12000, expenses: 9000 },
    { id: 8, name: 'Project H', status: 'Completed', income: 8000, expenses: 6000 },
    { id: 9, name: 'Project I', status: 'Ongoing', income: 4000, expenses: 1500 },
    { id: 10, name: 'Project J', status: 'Completed', income: 30000, expenses: 20000 },
    { id: 11, name: 'Project K', status: 'Ongoing', income: 6000, expenses: 3500 },
    { id: 12, name: 'Project L', status: 'Completed', income: 25000, expenses: 18000 },
    { id: 13, name: 'Project M', status: 'Ongoing', income: 9000, expenses: 4000 },
    { id: 14, name: 'Project N', status: 'Completed', income: 15000, expenses: 10000 },
    { id: 15, name: 'Project O', status: 'Ongoing', income: 7000, expenses: 3000 }
  ]);
  

  const [filteredProjects, setFilteredProjects] = useState(projects);

  const handleFilterChange = ({ status, profitabilityRange, client }) => {
    const filtered = projects.filter((project) => {
      const profitability = ((project.income - project.expenses) / project.income) * 100;
      return (
        (status === 'All' || project.status === status) &&
        profitability >= profitabilityRange[0] &&
        profitability <= profitabilityRange[1] &&
        (!client || project.name.toLowerCase().includes(client.toLowerCase()))
      );
    });
    setFilteredProjects(filtered);
  };

  const handleProjectUpdate = (updatedProjects) => {
    setProjects(updatedProjects);
    setFilteredProjects(updatedProjects);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <Filters onFilterChange={handleFilterChange} />
      <ProjectTable projects={filteredProjects} onProjectUpdate={handleProjectUpdate} />
      <ProjectChart data={filteredProjects} />
    </div>
  );
};

export default ProjectProfitabilityPage;
 