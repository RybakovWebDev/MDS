const express = require("express");
const router = express.Router();

const { multerUpload, handleMulterError } = require("../config/multer");
const { uploadFile, deleteFile } = require("../controllers/s3Controller");
const { verifyUser } = require("../controllers/userController");

router.post("/", verifyUser, multerUpload.single("fileInput"), uploadFile, handleMulterError);
router.delete("/:userID/:fileName", verifyUser, deleteFile);

module.exports = router;
