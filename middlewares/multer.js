const multer = require("multer");

const storage = multer.diskStorage({
  destination: "./images",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage }).single("image");

module.exports = upload;
