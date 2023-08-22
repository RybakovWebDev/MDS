require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { default: mongoose } = require("mongoose");

const s3Routes = require("./routes/s3Routes");
const usersRoutes = require("./routes/usersRoutes");
const chatbotRoutes = require("./routes/chatbotRoutes");

const watchlistsRoutes = require("./routes/watchlistsRoutes");
const User = require("./models/userModel");
const Watchlist = require("./models/watchlistModel");

const app = express();
const port = process.env.PORT || 3030;

app.use(cors());
app.use(express.json());

app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/api/upload", s3Routes);
app.use("/api/users", usersRoutes);
app.use("/api/watchlists", watchlistsRoutes);
app.use("/api/chatbot", chatbotRoutes);

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONG_URI, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected to the db");

    app.listen(port, () => {
      console.log(`Server is running on port: ${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

User.find({}, (err, users) => {
  console.log(users);
});
Watchlist.find({}, (err, watchlists) => {
  console.log(watchlists);
});
