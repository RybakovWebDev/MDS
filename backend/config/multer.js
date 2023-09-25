const path = require("path");
const multer = require("multer");

const multerUpload = multer({
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter: (req, file, callback) => {
    const acceptableMimeTypes = ["image/png", "image/jpg", "image/jpeg"];
    const acceptableExtensions = [".png", ".jpg", ".jpeg"];
    if (
      !acceptableMimeTypes.includes(file.mimetype) ||
      !acceptableExtensions.includes(path.extname(file.originalname).toLowerCase())
    ) {
      return callback(new Error("Only .png, .jpg and .jpeg files are allowed"));
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
