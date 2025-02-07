const Transaction = require("../models/Transaction");


exports.initDatabase = async (req, res) => {
  try {
    await require("../utils/seedData")();
    res.json({ message: "Database initialized successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error initializing database" });
  }
};

exports.getTransactions = async (req, res) => {
  try {
    let { month, year, search = "", page = 1, perPage = 10 } = req.query;

    // console.log("📌 Received Query Params:", { month, year, search, page, perPage });

    // Convert values to integers
    month = parseInt(month, 10);
    year = parseInt(year, 10);
    page = parseInt(page, 10);
    perPage = parseInt(perPage, 10);

    if (isNaN(month) || isNaN(year) || month < 1 || month > 12 || year < 2000) {
      return res.status(400).json({ error: "Invalid Month or Year" });
    }

    // Define start and end date for filtering
    const startDate = new Date(Date.UTC(year, month - 1, 1));
    const endDate = new Date(Date.UTC(year, month, 1));

    // console.log("📌 Filtering Transactions from:", startDate, "to", endDate);

    // Search filter (search by title, description, or price)
    const searchQuery = search.trim()
      ? {
          $or: [
            { title: new RegExp(search, "i") },
            { description: new RegExp(search, "i") },
            isNaN(search) ? {} : { price: Number(search) },
          ],
        }
      : {};

    // **1️⃣ First, Count Total Transactions BEFORE Applying Pagination**
    const totalTransactions = await Transaction.countDocuments({
      dateOfSale: { $gte: startDate, $lt: endDate },
      ...searchQuery,
    });

    // console.log("📌 Total Transactions Found:", totalTransactions);

    // **2️⃣ Apply Pagination AFTER Counting**
    let transactionsQuery = Transaction.find({
      dateOfSale: { $gte: startDate, $lt: endDate },
      ...searchQuery,
    })
      .sort({ dateOfSale: -1 }) // Optional: Sort by newest first
      .skip((page - 1) * perPage)
      .limit(perPage);

    // **3️⃣ Execute Query**
    const transactions = await transactionsQuery;

    // **4️⃣ Ensure No Empty Pages are Sent**
    const totalPages = Math.ceil(totalTransactions / perPage);
    if (transactions.length === 0 && page > 1) {
      console.log("❌ No transactions found on this page, returning last page instead.");
      return res.json({ transactions: [], totalTransactions, currentPage: page, totalPages });
    }

    console.log(`📌 Page ${page} of ${totalPages} | Transactions Returned:`, transactions.length);

    // **5️⃣ Return Response**
    res.json({
      transactions,
      totalTransactions,
      currentPage: page,
      totalPages,
    });
  } catch (error) {
    console.error("❌ Error in getTransactions API:", error);
    res.status(500).json({ error: `Server error: ${error.message}` });
  }
};



exports.getStatistics = async (req, res) => {
  try {
    let { month, year } = req.query;

    month = parseInt(month, 10);
    year = parseInt(year, 10);

    if (isNaN(month) || isNaN(year) || month < 1 || month > 12 || year < 2000) {
      return res.status(400).json({ error: "Invalid Month or Year" });
    }

    const startDate = new Date(Date.UTC(year, month - 1, 1));
    const endDate = new Date(Date.UTC(year, month, 0, 23, 59, 59));

    // console.log("📌 Fetching statistics from:", startDate, "to", endDate);

    const totalSales = await Transaction.aggregate([
      { $match: { dateOfSale: { $gte: startDate, $lte: endDate } } },
      { $group: { _id: null, totalSales: { $sum: "$price" } } },
    ]);

    const totalSold = await Transaction.countDocuments({
      dateOfSale: { $gte: startDate, $lte: endDate },
      sold: true,
    });

    const totalNotSold = await Transaction.countDocuments({
      dateOfSale: { $gte: startDate, $lte: endDate },
      sold: false,
    });

    res.json({
      totalSales: totalSales[0]?.totalSales || 0,
      totalSold,
      totalNotSold,
    });
  } catch (error) {
    console.error("❌ Error in getStatistics API:", error);
    res.status(500).json({ error: "Server error fetching statistics" });
  }
};



exports.fetchBarChartData = async (req, res) => {
  try {
    // console.log("📌 Full Request Query:", req.query); // Log the full query object

    let { month, year } = req.query;

    // Validate month
    if (!month || isNaN(month) || month < 1 || month > 12) {
      console.log("❌ Invalid or missing month:", month);
      return res.status(400).json({ error: "Invalid or missing month" });
    }

    // Validate year
    if (!year || isNaN(year) || year < 2000 || year > new Date().getFullYear()) {
      console.log("❌ Invalid or missing year:", year);
      return res.status(400).json({ error: "Invalid or missing year" });
    }

    month = parseInt(month, 10);
    year = parseInt(year, 10);

    console.log(`📌 Fetching Transactions for Month: ${month}, Year: ${year}`);

    // Query transactions by both month and year
    const transactions = await Transaction.find({
      $expr: {
        $and: [
          { $eq: [{ $month: "$dateOfSale" }, month] },
          { $eq: [{ $year: "$dateOfSale" }, year] }
        ]
      }
    });

    console.log("📌 Total Transactions Found:", transactions.length);

    const priceRanges = {
      "0-100": 0, "101-200": 0, "201-300": 0, "301-400": 0, "401-500": 0,
      "501-600": 0, "601-700": 0, "701-800": 0, "801-900": 0, "901-above": 0,
    };

    transactions.forEach((txn) => {
      const price = txn.price;
      if (price <= 100) priceRanges["0-100"]++;
      else if (price <= 200) priceRanges["101-200"]++;
      else if (price <= 300) priceRanges["201-300"]++;
      else if (price <= 400) priceRanges["301-400"]++;
      else if (price <= 500) priceRanges["401-500"]++;
      else if (price <= 600) priceRanges["501-600"]++;
      else if (price <= 700) priceRanges["601-700"]++;
      else if (price <= 800) priceRanges["701-800"]++;
      else if (price <= 900) priceRanges["801-900"]++;
      else priceRanges["901-above"]++;
    });

    // console.log("📌 Final Aggregated Data:", priceRanges);
    res.json(priceRanges);
  } catch (error) {
    console.error("❌ Error in fetchBarChartData API:", error);
    res.status(500).json({ error: "Server error fetching bar chart data" });
  }
};
