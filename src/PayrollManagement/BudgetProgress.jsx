import React from "react";

const BudgetProgress = () => {
  // Example budget progress data
  const totalBudget = 50000;
  const payrollSpent = 20000;

  const progress = (payrollSpent / totalBudget) * 100;

  return (
    <div className="max-w-xl mx-auto p-4 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4">Payroll Budget Progress</h2>
      <div className="mb-4">
        <div className="w-full bg-gray-200 rounded-full h-6">
          <div
            className="bg-green-500 h-6 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="mt-2 text-sm text-gray-600">
          {payrollSpent} / {totalBudget} spent ({progress}%)
        </p>
      </div>
    </div>
  );
};

export default BudgetProgress;
