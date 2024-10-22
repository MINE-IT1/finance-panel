// Forecast.jsx
import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,  // Register PointElement
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register scales and elements
ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

const Forecast = () => {
  // Dummy forecast data
  const forecastData = {
    labels: ['2024-01', '2024-02', '2024-03'],
    datasets: [
      {
        label: 'Forecast',
        data: [5000, 7000, 3000],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-4">Forecast</h3>
      <div className="bg-white p-4 rounded shadow">
        <Line data={forecastData} />
      </div>
    </div>
  );
};

export default Forecast;
