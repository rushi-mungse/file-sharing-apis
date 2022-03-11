require("dotenv").config();
const multer = require("multer");
const File = require("../models/file");
const { v4: uuidv4 } = require("uuid");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },

  filename: function (req, file, cb) {
    const uniqueFileName = `${Date.now()}-${Math.round(
      Math.random() * 1e9
    )}${path.extname(file.originalname)}`;
    cb(null, uniqueFileName);
  },
});

const upload = multer({ storage, limits: { fileSize: 100000 * 100 } }).single(
  "myFile"
);

const filesController = {
  async postFile(req, res, next) {
    upload(req, res, async (err) => {
      if (err) return res.status(400).json({ error: `Internal server error.` });

      if (!req.file)
        return res.status(400).json({ error: `All fields are required.` });

      const file = new File({
        filename: req.file.filename,
        uuid: uuidv4(),
        path: req.file.path,
        size: req.file.size,
      });

      const response = await file.save();

      res.json({ file: `${process.env.APP_BASE_URL}/files/${response.uuid}` });
    });
  },

  async getFile(req, res, next) {
    let uuid = req.params.uuid;
    try {
      const file = await File.findOne({ uuid });
      if (!file) return res.render("download", { error: "Link is expired." });

      return res.render("download", {
        filename: file.filename,
        size: file.size,
        uuid: file.uuid,
        download: `${process.env.APP_BASE_URL}/file/download/${file.uuid}`,
      });
    } catch (error) {
      return res.render("download", { error: "Internal server error." });
    }
  },
};

module.exports = filesController;
