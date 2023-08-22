const path = require("path");
const multer = require("multer");

const multerUpload = multer({
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
  fileFilter: (req, file, callback) => {
    const acceptableExtensions = [".png", ".jpg"];
    if (!acceptableExtensions.includes(path.extname(file.originalname))) {
      return callback(new Error("Only .png and .jpg files are allowed"));
    }
    callback(null, true);
  },
});

const handleMulterError = (error, req, res, next) => {
  if (error instanceof multer.MulterError && error.code === "LIMIT_FILE_SIZE") {
    res.status(413).json({ error: error.message });
  } else if (error instanceof multer.MulterError) {
    res.status(400).json({ error: error.message });
  } else if (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { multerUpload, handleMulterError };
