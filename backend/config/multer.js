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
      return callback(new Error("Only .jpg, .png and .heic files are allowed"));
    }
    callback(null, true);
  },
});

module.exports = { multerUpload };
