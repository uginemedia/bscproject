const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ Database Connection Failed");
    console.error(error.message);

    process.exit(1);
  }
};

module.exports = connectDB;

// const { MongoClient } = require("mongodb");

// const url =
//   "mongodb+srv://bscproject:coding@bsccluster.kitd2h6.mongodb.net/?retryWrites=true&w=majority&appName=BSCCLUSTER";
// const client = new MongoClient(url);

// const connectDB = async () => {
//   try {
//     await client.connect();
//     console.log("✅ MongoDB Connected");
//   } catch (error) {
//     console.error("❌ Database Connection Failed");
//     console.error(error.message);
//     process.exit(1);
//   }
// };

// module.exports = connectDB;
