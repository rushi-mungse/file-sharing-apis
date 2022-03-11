const express = require("express");
const connectDB = require("./config/database");
const routes = require("./routes");
const path = require("path");
const app = express();

const PORT = process.env.PORT || 3000;

app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");

connectDB();

app.use(routes);

app.listen(PORT, console.log(`Server listening on port ${PORT}`));
