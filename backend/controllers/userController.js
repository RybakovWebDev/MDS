const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");

const User = require("../models/userModel");
const Watchlist = require("../models/watchlistModel");
const { deleteFile } = require("./s3Controller");
const { errorHelper } = require("../helpers/errorHelper");

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

const getUser = async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findById(id);

  if (!user) {
    return errorHelper(new Error(), "No such user", 404, next);
  }
  res.status(200).json(user);
};

const verifyUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return errorHelper(new Error(), "No authorization header", 401, next);
  }
  const token = authHeader.split(" ")[1];

  try {
    jwt.verify(token, process.env.SECRET);
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return errorHelper(err, "Token has expired", 401, next);
    } else {
      return errorHelper(err, "Invalid token", 401, next);
    }
  }
};

const verifiedResponse = (req, res) => {
  res.status(200).json({ message: "Verified" });
};

const createUser = [
  ...validateAuthInput(),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map(({ msg }) => msg);
      return errorHelper(new Error(), errorMessages.join("; "), 400, next);
    }

    const { email, password } = req.body;

    try {
      const user = await User.signup(email, password);
      const token = createToken(user._id);
      const { id, name, image = "", date } = user;
      res.status(200).json({ id, name, image, date, token });
    } catch (err) {
      errorHelper(
        err,
        err.message || "An error occurred while creating the user.",
        err.code || err.status || 400,
        next
      );
    }
  },
];

const loginUser = [
  ...validateAuthInput(),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map(({ msg }) => msg);
      return errorHelper(new Error(), errorMessages.join("; "), 400, next);
    }

    const { email, password } = req.body;

    try {
      const user = await User.login(email, password);

      const token = createToken(user._id);

      const userData = { id: user.id, name: user.name, image: user.image || "", date: user.date, token };

      res.status(200).json(userData);
    } catch (err) {
      errorHelper(
        err,
        err.message || "An error occurred while logging the user in.",
        err.code || err.status || 400,
        next
      );
    }
  },
];

// test@test.com

const deleteUser = async (req, res, next) => {
  const { id } = req.params;

  try {
    await Watchlist.deleteMany({ author: id });
    const user = await User.findOneAndDelete({ _id: id });
    if (!user) {
      return errorHelper(new Error(), "No such user to delete", 404, next);
    }
    if (user.image) {
      const fileName = user.image.split("/").slice(-1)[0];
      const deleteFileReq = { ...req, params: { userID: id, fileName: fileName } };
      await deleteFile(deleteFileReq);
    }
    res.status(200).json({ message: `Deleted user: ${id}` });
  } catch (err) {
    errorHelper(err, "An error occurred while deleting the user.", err.code || err.status || 500, next);
  }
};

const patchUser = async (req, res, next) => {
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
      return errorHelper(new Error(), "No such user to update", 404, next);
    }
    const patchedUser = { name: user.name, image: user.image };
    res.status(200).json(patchedUser);
  } catch (err) {
    errorHelper(err, "An error occurred while updating the user.", err.code || err.status || 500, next);
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
