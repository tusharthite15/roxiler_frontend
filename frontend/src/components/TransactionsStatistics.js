import React, { useEffect, useState } from "react";
import { fetchStatistics } from "../services/api";

const TransactionsStatistics = ({ month, year }) => {
  const [stats, setStats] = useState({});

  useEffect(() => {
    const loadStats = async () => {
      const data = await fetchStatistics(month, year);
      setStats(data);
    };
    loadStats();
  }, [month, year]);

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md mx-auto text-center">
      <h2 className="text-2xl font-bold text-gray-700 mb-4">Statistics</h2>
      <div className="space-y-3">
        <p className="text-lg font-semibold text-gray-600">
          Total Sales: <span className="text-green-500">${stats.totalSales}</span>
        </p>
        <p className="text-lg font-semibold text-gray-600">
          Sold Items: <span className="text-blue-500">{stats.totalSold}</span>
        </p>
        <p className="text-lg font-semibold text-gray-600">
          Unsold Items: <span className="text-red-500">{stats.totalNotSold}</span>
        </p>
      </div>
    </div>
  );
};

export default TransactionsStatistics;
