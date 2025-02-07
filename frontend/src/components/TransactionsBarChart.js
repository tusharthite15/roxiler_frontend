import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { fetchBarChartData } from "../services/api";
import { Chart, registerables } from "chart.js"; 

Chart.register(...registerables); // Register Chart.js modules

const TransactionsBarChart = ({ month, year }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const loadChartData = async () => {
      // console.log("📌 Fetching Bar Chart Data for Month & Year:", month, year);

      try {
        const data = await fetchBarChartData(month, year); // ✅ Ensure both month & year are sent
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

    if (month && year) loadChartData(); // ✅ Ensure both are present
  }, [month, year]); // ✅ Fetch data when either month or year changes

  return (
    <div style={{ width: "100%", height: "400px" }}>
      {chartData ? <Bar data={chartData} /> : <p>Loading...</p>}
    </div>
  );
};
export default TransactionsBarChart;