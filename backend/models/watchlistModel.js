const mongoose = require("mongoose");
const { Schema } = mongoose;

const watchlistSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  author: { type: Schema.Types.ObjectId, ref: "User" },
  titles: { type: Array },
  image: { type: String },
});

watchlistSchema.statics.addWatchlist = async function (id) {
  const userWatchlists = await Watchlist.find({ author: id });
  const maxWatchlistNumber = userWatchlists.reduce((max, watchlist) => {
    const watchlistNumber = parseInt(watchlist.name.split(" ")[1]);
    return watchlistNumber > max ? watchlistNumber : max;
  }, 0);
  const watchlist = await this.create({
    name: `Watchlist ${maxWatchlistNumber + 1}`,
    author: mongoose.Types.ObjectId(id),
  });
  return watchlist;
};

const Watchlist = mongoose.model("watchlist", watchlistSchema);

module.exports = Watchlist;
