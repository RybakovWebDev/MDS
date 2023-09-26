const express = require("express");
const router = express.Router();

const { multerUpload } = require("../config/multer");
const { uploadFile, deleteFile } = require("../controllers/s3Controller");
const { verifyUser } = require("../controllers/userController");
const { errorHandler } = require("../helpers/errorHandler");

router.post("/", verifyUser, multerUpload.single("fileInput"), uploadFile, errorHandler);
router.delete("/:userID/:fileName", verifyUser, deleteFile, errorHandler);

module.exports = router;
