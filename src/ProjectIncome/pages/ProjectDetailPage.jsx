import { useParams } from 'react-router-dom';

const ProjectDetailPage = () => {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold">Project Detail for {id}</h1>
      {/* Add detailed breakdown of income, expenses, and profitability here */}
    </div>
  );
};

export default ProjectDetailPage;
