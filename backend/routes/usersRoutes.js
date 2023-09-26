const express = require("express");

const {
  getUser,
  createUser,
  loginUser,
  verifyUser,
  deleteUser,
  patchUser,
  verifiedResponse,
} = require("../controllers/userController");
const { errorHandler } = require("../helpers/errorHandler");

const router = express.Router();

router.get("/:id", verifyUser, getUser, errorHandler);
router.post("/", createUser, errorHandler);
router.post("/verify", verifyUser, verifiedResponse, errorHandler);
router.post("/login", loginUser, errorHandler);
router.delete("/:id", verifyUser, deleteUser, errorHandler);
router.patch("/:id", verifyUser, patchUser, errorHandler);

module.exports = router;
