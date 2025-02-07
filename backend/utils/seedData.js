const axios = require("axios");
const Transaction = require("../models/Transaction");

const seedDatabase = async () => {
  try {
    const { data } = await axios.get(
      "https://s3.amazonaws.com/roxiler.com/product_transaction.json"
    );

    await Transaction.deleteMany();
    await Transaction.insertMany(data);
    console.log("✅ Database Seeded Successfully");
  } catch (error) {
    console.error("❌ Error Seeding Database:", error);
  }
};

module.exports = seedDatabase;
