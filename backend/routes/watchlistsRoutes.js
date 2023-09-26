const express = require("express");
const {
  getWatchlist,
  getWatchlistsUser,
  postWatchlist,
  deleteWatchlist,
  patchWatchlist,
} = require("../controllers/watchlistController");
const { verifyUser } = require("../controllers/userController");
const { errorHandler } = require("../helpers/errorHandler");

const router = express.Router();

router.get("/single/:id", getWatchlist, errorHandler);
router.get("/:id", verifyUser, getWatchlistsUser, errorHandler);
router.post("/", verifyUser, postWatchlist, errorHandler);
router.delete("/:id", verifyUser, deleteWatchlist, errorHandler);
router.patch("/:id", verifyUser, patchWatchlist, errorHandler);

module.exports = router;
