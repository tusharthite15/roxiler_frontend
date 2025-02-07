require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const transactionRoutes = require("./routes/transactionRoutes");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// Connect to Database
connectDB();

// Routes
app.use("/api", transactionRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
