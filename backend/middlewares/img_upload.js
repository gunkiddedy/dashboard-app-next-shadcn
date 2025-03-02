const PATH = require("path"),
  multer = require("multer"),
  maxSize = 1 * 1000 * 1000;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./controllers/blog_uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + ".jpg");
  },
});

var upload = multer({
  storage: storage,
  limits: { fileSize: maxSize },
  fileFilter: function (req, file, cb) {
    const FILE_TYPES = /jpeg|jpg|png/,
      MIME_TYPE = FILE_TYPES.test(file.mimetype),
      EXT_NAME = FILE_TYPES.test(PATH.extname(file.originalname).toLowerCase());

    if (MIME_TYPE && EXT_NAME) {
      return cb(null, true);
    }

    cb(
      "Error: File upload only supports the following filetypes: " + FILE_TYPES,
    );
  },
}).single("blogImgs");

module.exports = upload;
