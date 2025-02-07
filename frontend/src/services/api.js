import axios from "axios";

const BASE_URL = "http://localhost:5000/api"; // Update with your backend URL

export const fetchTransactions = async (month, year, search = "", page = 1, perPage = 10) => {
  const response = await axios.get(`${BASE_URL}/transactions`, {
    params: { month, year, search, page, perPage },
  });
  return response.data;
};

export const fetchStatistics = async (month, year) => {
  const response = await axios.get(`${BASE_URL}/statistics`, { params: { month, year } });
  return response.data;
};



export const fetchPieChartData = async (month, year) => {
  const response = await axios.get(`${BASE_URL}/pie-chart`, { params: { month, year } });
  return response.data;
};

 
export const fetchBarChartData = async (month, year) => {
  console.log("📌 Sending Request to API:", `${BASE_URL}/barchart?month=${month}&year=${year}`);

  try {
    const response = await axios.get(`${BASE_URL}/barchart`, {
      params: { month, year }, // Ensure both month & year are sent
    });

    console.log("✅ API Response Data:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error Fetching Bar Chart Data:", error.response?.data || error.message);
    return {};
  }
};
