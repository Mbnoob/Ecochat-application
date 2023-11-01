const multer = require("multer");
const path = require("path");
const { storage } = require("../multer/stroage");


const upload = multer({
  storage: storage,
  fileFilter: async function fileFilter(req, file, cb) {
    let fileType = path.extname(file.originalname);
    if (fileType === ".jpg" || fileType === ".jpeg" || fileType === ".png") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('File format is not accepted'));  
    }
  },
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});

module.exports = {upload};
