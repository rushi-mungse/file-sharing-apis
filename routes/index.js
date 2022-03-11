const express = require("express");
const routes = express.Router();
const filesController = require("../controllers/filesController");

routes.post("/", filesController.files);

module.exports = routes;
