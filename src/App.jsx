import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar"; 
import Navbar from "./components/Header/Navbar"; 
import ReportsPage  from "./ReportsAndAnalytics/ReportsPage";
import ProjectProfitabilityPage from "./ProjectIncome/pages/ProjectProfitabilityPage";

import EmployeeTable from './PayrollManagement/EmployeeTable';
import InvoiceList from './InvoiceMgt/InvoiceList';
import ExpenseTable from './ExpenseManagement/ExpenseTable';
import IncomeTable from './IncomeManagement/IncomeTable';


export default function App() {


  return (
    <Router>
      <div className="flex h-screen bg-gray-300">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Navbar />
          <div className="flex-1 p-4 pt-2 pl-6 overflow-y-auto scrollbar-thin">
            <Routes>
              {/* <Route path="/my-task" element={<MyTasks />} /> */}
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/profit" element={<ProjectProfitabilityPage />} />
            <Route path="/payroll" element={<EmployeeTable />} />
            <Route path="/invoice" element={<InvoiceList />} />
            <Route path="/expense" element={<ExpenseTable />} />
            <Route path="/income" element={<IncomeTable />} />

            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}
