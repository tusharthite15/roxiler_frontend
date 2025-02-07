const express = require("express");
const {
  initDatabase,
  getTransactions,
  getStatistics,
  fetchBarChartData,
} = require("../controllers/transactionController");

const router = express.Router();

router.get("/init", initDatabase);
router.get("/transactions", getTransactions);
router.get("/statistics", getStatistics);
router.get("/barchart", fetchBarChartData);

module.exports = router;
