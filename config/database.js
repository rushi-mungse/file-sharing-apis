require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = () => {
  mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = mongoose.connection;

  db.on("error", console.error.bind(console, "connection error:"));

  db.once("open", () => {
    console.log("DB Connected..");
  });
};

module.exports = connectDB;
