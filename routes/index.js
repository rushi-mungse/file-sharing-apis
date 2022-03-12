const express = require("express");
const routes = express.Router();
const filesController = require("../controllers/filesController");
const downloadController = require("../controllers/downloadCOntroller");

routes.post("/api/files", filesController.postFile);
routes.get("/files/:uuid", filesController.getFile);
routes.get("/file/download/:uuid", downloadController.download);

module.exports = routes;
