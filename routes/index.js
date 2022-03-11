const express = require("express");
const routes = express.Router();
const filesController = require("../controllers/filesController");

routes.post("/api/files", filesController.postFile);
routes.get("/files/:uuid", filesController.getFile);

module.exports = routes;
