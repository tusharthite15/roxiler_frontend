import React, { useState } from "react";
import TransactionsTable from "../components/TransactionsTable";
import TransactionsStatistics from "../components/TransactionsStatistics";
import TransactionsBarChart from "../components/TransactionsBarChart";
import TransactionsOverview from "../components/TransactionsOverview";

const Dashboard = () => {
  // Set initial state to November 2021
  const [month, setMonth] = useState(11); // November
  const [year, setYear] = useState(2021); // 2021

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Title */}
      <h2 className="bg-white px-6 py-3 text-xl font-semibold rounded-full shadow-md text-center">
        Transaction Dashboard
      </h2>

      {/* Month & Year Selection Dropdown */}
      <div className="flex justify-center gap-4 my-6">
        <select
          className="p-2 border rounded-md bg-white shadow-sm"
          value={month}
          onChange={(e) => setMonth(parseInt(e.target.value, 10))}
        >
          {[...Array(12)].map((_, i) => (
            <option key={i + 1} value={i + 1}>
              {new Date(0, i).toLocaleString("default", { month: "long" })}
            </option>
          ))}
        </select>

        <select
          className="p-2 border rounded-md bg-white shadow-sm"
          value={year}
          onChange={(e) => setYear(parseInt(e.target.value, 10))}
        >
          {[2020, 2021, 2022].map((yr) => (
            <option key={yr} value={yr}>
              {yr}
            </option>
          ))}
        </select>
      </div>

      {/* Transaction Components */}
      <div className="space-y-6">
        <TransactionsTable month={month} year={year} />
        {/* <TransactionsStatistics month={month} year={year} /> */}
        {/* <TransactionsBarChart month={month} year={year} /> */}
        <TransactionsOverview month={month} year={year} />
      </div>
    </div>
  );
};

export default Dashboard;
