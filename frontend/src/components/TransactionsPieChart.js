import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js"; // Import required elements
import { fetchStatistics } from "../services/api";

Chart.register(ArcElement, Tooltip, Legend);

const TransactionsPieChart = ({ month, year }) => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await fetchStatistics(month, year);
        if (!data) {
          console.error("No statistics data available.");
          return;
        }
        setStats(data);
      } catch (error) {
        console.error("Error fetching statistics:", error);
      }
    };
    loadStats();
  }, [month, year]);

  if (!stats) return <p className="text-center text-gray-500">Loading chart...</p>;

  const chartData = {
    labels: ["Total Sales ($)", "Sold Items", "Unsold Items"],
    datasets: [
      {
        data: [stats.totalSales, stats.totalSold, stats.totalNotSold],
        backgroundColor: ["#36a2eb", "#4bc0c0", "#ff6384"],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg p-6 rounded-lg">
      <h2 className="text-xl font-bold text-center mb-4">Sales Breakdown</h2>
      <Pie data={chartData} />
    </div>
  );
};

export default TransactionsPieChart;
