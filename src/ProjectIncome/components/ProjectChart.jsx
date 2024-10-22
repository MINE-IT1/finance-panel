import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const ProjectChart = ({ data }) => {
  return (
    <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Project Income vs. Expenses</h3>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="income" fill="#4CAF50" />
          <Bar dataKey="expenses" fill="#F44336" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProjectChart;
