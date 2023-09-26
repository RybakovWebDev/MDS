const { errorHelper } = require("../helpers/errorHelper");
const User = require("../models/userModel");
const Watchlist = require("../models/watchlistModel");

const getWatchlist = async (req, res, next) => {
  const { id } = req.params;
  try {
    const foundWatchlist = await Watchlist.findById(id);
    if (!foundWatchlist) {
      return errorHelper(new Error(), "No such watchlist found.", 404, next);
    }
    res.status(200).json(foundWatchlist);
  } catch (err) {
    errorHelper(err, "An error occurred while getting the watchlist.", err.code || err.status || 500, next);
  }
};

const getWatchlistsUser = async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);

    if (!user) {
      return errorHelper(new Error(), "No such user found.", 404, next);
    }

    const watchlists = await Watchlist.find({ author: id });
    const sortedWatchlists = (
      user.watchlistOrder
        ? user.watchlistOrder.map((watchlistId) => watchlists.find((watchlist) => watchlist._id.equals(watchlistId)))
        : []
    ).filter((watchlist) => watchlist !== undefined);

    const extraWatchlists = watchlists.filter(
      (watchlist) => !sortedWatchlists.some((sortedWatchlist) => sortedWatchlist._id.equals(watchlist._id))
    );
    const allWatchlists = [...sortedWatchlists, ...extraWatchlists];
    res.status(200).json(allWatchlists);
  } catch (err) {
    errorHelper(err, "An error occurred while getting the user's watchlists.", err.code || err.status || 500, next);
  }
};

const postWatchlist = async (req, res, next) => {
  const { id } = req.body;

  try {
    const user = await User.findOne({ _id: id });
    if (!user) {
      return errorHelper(new Error(), "No such user found.", 404, next);
    }

    const watchlist = await Watchlist.addWatchlist(id);

    res.status(200).json(watchlist);
  } catch (err) {
    errorHelper(err, "An error occurred while posting the watchlist.", err.code || err.status || 400, next);
  }
};

const deleteWatchlist = async (req, res, next) => {
  const { id } = req.params;

  try {
    const watchlist = await Watchlist.findOneAndDelete({ _id: id });

    if (!watchlist) {
      return errorHelper(new Error(), "No such watchlist to delete.", 404, next);
    }
    res.status(200).json(watchlist);
  } catch (err) {
    errorHelper(err, "An error occurred while deleting the watchlist.", err.code || err.status || 500, next);
  }
};

const patchWatchlist = async (req, res, next) => {
  const { id } = req.params;

  try {
    const watchlist = await Watchlist.findOneAndUpdate({ _id: id }, { ...req.body }, { new: true });

    if (!watchlist) {
      return errorHelper(new Error(), "No such watchlist to update.", 404, next);
    }
    res.status(200).json(watchlist);
  } catch (err) {
    errorHelper(err, "An error occurred while updating the watchlist.", err.code || err.status || 500, next);
  }
};

module.exports = {
  getWatchlist,
  getWatchlistsUser,
  postWatchlist,
  deleteWatchlist,
  patchWatchlist,
};
