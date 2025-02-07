import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { fetchStatistics, fetchBarChartData } from "../services/api";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables); 

const TransactionsOverview = ({ month, year }) => {
  const [stats, setStats] = useState({});
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await fetchStatistics(month, year);
        setStats(data);
      } catch (error) {
        console.error("❌ Error Loading Statistics:", error);
      }
    };

    const loadChartData = async () => {
      try {
        console.log("📌 Fetching Bar Chart Data for Month:", month);
        const data = await fetchBarChartData(month,year);
        if (data) {
          setChartData({
            labels: Object.keys(data),
            datasets: [
              {
                label: "Items Sold",
                data: Object.values(data),
                backgroundColor: "rgba(54, 162, 235, 0.6)",
                borderColor: "rgba(54, 162, 235, 1)",
                borderWidth: 1,
              },
            ],
          });
        }
      } catch (error) {
        console.error("❌ Error Loading Bar Chart Data:", error);
      }
    };

    loadStats();
    loadChartData();
  }, [month, year]);

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6">
      {/* Left: Statistics Card */}
      <div className="bg-white shadow-lg rounded-lg p-6 w-full md:w-1/3">
        <h2 className="text-2xl font-bold text-gray-700 mb-4 text-center">Statistics</h2>
        <div className="space-y-4 text-lg text-gray-600">
          <p className="font-semibold">
            🏆 Total Sales: <span className="text-green-500">${stats.totalSales || 0}</span>
          </p>
          <p className="font-semibold">
            ✅ Sold Items: <span className="text-blue-500">{stats.totalSold || 0}</span>
          </p>
          <p className="font-semibold">
            ❌ Unsold Items: <span className="text-red-500">{stats.totalNotSold || 0}</span>
          </p>
        </div>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6 w-full md:w-2/3">
        <h2 className="text-2xl font-bold text-gray-700 mb-4 text-center">Sales Overview</h2>
        <div className="h-96 flex justify-center items-center">
          {chartData ? (
            <Bar data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
          ) : (
            <p className="text-gray-500">Loading chart...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionsOverview;
