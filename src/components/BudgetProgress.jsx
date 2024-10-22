// src/components/BudgetProgress.js
import React from 'react';

const BudgetProgress = ({ totalBudget, paidSalaries }) => {
  const remainingBudget = totalBudget - paidSalaries;
  const percentageUsed = (paidSalaries / totalBudget) * 100;

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold">Payroll Budget Progress</h2>
      <div className="h-4 bg-gray-200 rounded">
        <div
          className={`h-full rounded ${
            percentageUsed >= 100 ? 'bg-red-500' : 'bg-green-500'
          }`}
          style={{ width: `${percentageUsed}%` }}
        />
      </div>
      <div className="mt-2">
        <p>Total Budget: ${totalBudget.toFixed(2)}</p>
        <p>Paid Salaries: ${paidSalaries.toFixed(2)}</p>
        <p>Remaining Budget: ${remainingBudget.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default BudgetProgress;
