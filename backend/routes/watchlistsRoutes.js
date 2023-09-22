const express = require("express");
const {
  getWatchlist,
  getWatchlistsUser,
  postWatchlist,
  deleteWatchlist,
  patchWatchlist,
} = require("../controllers/watchlistController");
const { verifyUser } = require("../controllers/userController");

const router = express.Router();

router.get("/single/:id", getWatchlist);
router.get("/:id", verifyUser, getWatchlistsUser);
router.post("/", verifyUser, postWatchlist);
router.delete("/:id", verifyUser, deleteWatchlist);
router.patch("/:id", verifyUser, patchWatchlist);

module.exports = router;
