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

const router = express.Router();

router.get("/:id", verifyUser, getUser);
router.post("/", createUser);
router.post("/verify", verifyUser, verifiedResponse);
router.post("/login", loginUser);
router.delete("/:id", verifyUser, deleteUser);
router.patch("/:id", verifyUser, patchUser);

module.exports = router;
