const File = require("../models/file");
const path = require("path");

const downloadController = {
  async download(req, res, next) {
    const { uuid } = req.params;
    try {
      const file = await File.findOne({ uuid });
      return res.download(path.join(__dirname, `../${file.path}`), (err) => {
        return res.json({ error: err });
      });
    } catch (error) {
      return res.status(400).json({ error });
    }
  },
};

module.exports = downloadController;
