const User = require("../models/userModel");
const Watchlist = require("../models/watchlistModel");

const getWatchlist = async (req, res) => {
  const { id } = req.params;
  try {
    const foundWatchlist = await Watchlist.findById(id);
    if (!foundWatchlist) {
      return res.status(404).json({ error: "No such watchlist found." });
    }
    res.status(200).json(foundWatchlist);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getWatchlistsUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ error: "No such user found." });
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
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const postWatchlist = async (req, res) => {
  const { id } = req.body;

  try {
    const user = await User.findOne({ _id: id });
    if (!user) {
      return res.status(404).json({ error: "No such user found." });
    }

    const watchlist = await Watchlist.addWatchlist(id);

    res.status(200).json(watchlist);
  } catch (error) {
    res.status(400).json({ error: "Could not post a watchlist." });
  }
};

const deleteWatchlist = async (req, res) => {
  const { id } = req.params;

  const watchlist = await Watchlist.findOneAndDelete({ _id: id });

  if (!watchlist) {
    return res.status(404).json({ error: "No such watchlist to delete." });
  }
  res.status(200).json(watchlist);
};

const patchWatchlist = async (req, res) => {
  const { id } = req.params;

  const watchlist = await Watchlist.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    },
    { new: true }
  );

  if (!watchlist) {
    return res.status(404).json({ error: "No such watchlist to update." });
  }
  res.status(200).json(watchlist);
};

module.exports = {
  getWatchlist,
  getWatchlistsUser,
  postWatchlist,
  deleteWatchlist,
  patchWatchlist,
};
