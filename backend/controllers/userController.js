const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");

const User = require("../models/userModel");
const Watchlist = require("../models/watchlistModel");
const { deleteFile } = require("./s3Controller");

const validateAuthInput = () => [
  check("email")
    .isEmail()
    .withMessage("Invalid email format")
    .isLength({ max: 50 })
    .withMessage("Email must be no longer than 50 characters")
    .trim()
    .escape(),

  check("password")
    .isLength({ min: 4, max: 50 })
    .withMessage("Password must be between 4 and 50 characters long")
    .custom((value) => {
      if (/<|>/.test(value)) {
        throw new Error("Password must not contain < or > characters");
      }
      return true;
    })
    .trim()
    .escape(),
];

const createToken = (_id) => {
  return jwt.sign({ _id: _id }, process.env.SECRET, { expiresIn: "1d" });
};

const getUser = async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id);

  if (!user) {
    return res.status(404).json({ error: "No such user" });
  }
  res.status(200).json(user);
};

const verifyUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: "No authorization header" });
  }
  const token = authHeader.split(" ")[1];

  try {
    jwt.verify(token, process.env.SECRET);
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      res.status(401).json({ error: "Token has expired" });
    } else {
      res.status(401).json({ error: "Invalid token" });
    }
  }
};

const verifiedResponse = (req, res) => {
  res.status(200).json({ message: "Verified" });
};

const createUser = [
  ...validateAuthInput(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map(({ msg }) => msg);
      return res.status(400).json({ error: errorMessages.join("; ") });
    }

    const { email, password } = req.body;

    try {
      const user = await User.signup(email, password);
      const token = createToken(user._id);
      const { id, name, image = "", date } = user;
      res.status(200).json({ id, name, image, date, token });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
];

const loginUser = [
  ...validateAuthInput(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map(({ msg }) => msg);
      return res.status(400).json({ error: errorMessages.join("; ") });
    }

    const { email, password } = req.body;

    try {
      const user = await User.login(email, password);

      const token = createToken(user._id);

      const userData = { id: user.id, name: user.name, image: user.image || "", date: user.date, token };
      console.log("userData in loginUser middleware: ", userData);
      res.status(200).json(userData);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
];

const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    await Watchlist.deleteMany({ author: id });
    const user = await User.findOneAndDelete({ _id: id });
    if (!user) {
      return res.status(404).json({ error: "No such user to delete" });
    }
    if (user.image) {
      const fileName = user.image.split("/").slice(-1)[0];
      const deleteFileReq = { ...req, params: { userID: id, fileName: fileName } };
      await deleteFile(deleteFileReq);
    }
    res.status(200).json({ message: `Deleted user: ${id}` });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

const patchUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findOneAndUpdate(
      { _id: id },
      {
        ...req.body,
      },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ error: "No such user to update" });
    }
    const patchedUser = { name: user.name, image: user.image };
    res.status(200).json(patchedUser);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getUser,
  loginUser,
  verifyUser,
  verifiedResponse,
  createUser,
  deleteUser,
  patchUser,
};
