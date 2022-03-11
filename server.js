const express = require("express");
const connectDB = require("./config/database");
const routes = require("./routes");

const app = express();

const PORT = process.env.PORT || 3000;
connectDB();

app.use("/api/files", routes);

app.listen(PORT, console.log(`Server listening on port ${PORT}`));
