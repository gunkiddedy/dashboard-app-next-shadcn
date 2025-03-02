const multer = require("multer"),
  upload = multer({ storage: multer.memoryStorage() });

module.exports = { upload };
