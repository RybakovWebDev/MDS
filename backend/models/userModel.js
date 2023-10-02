const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { uniqueNamesGenerator, animals, adjectives } = require("unique-names-generator");
const { Schema } = mongoose;

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  name: {
    type: String,
    default: uniqueNamesGenerator({ dictionaries: [adjectives, animals], length: 2, separator: " ", style: "capital" }),
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minLength: [4, "Must be at least 4 characters long"],
  },
  image: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  watchlistOrder: [{ type: Schema.Types.ObjectId, ref: "watchlist" }],
});

userSchema.statics.signup = async function (email, password) {
  const exists = await this.findOne({ email });

  if (exists) {
    throw Error("Email already in use");
  }

  const saltPassword = await bcrypt.genSalt(10);

  const hashPassword = await bcrypt.hash(password, saltPassword);

  const user = await this.create({ email, password: hashPassword });

  const userData = { id: user._id, name: user.name, date: user.date };
  return userData;
};

userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  const user = await this.findOne({ email });
  if (!user) {
    throw Error("Incorrect email and/or password");
  }

  const matchPassword = await bcrypt.compare(password, user.password);
  if (!matchPassword) {
    throw Error("Incorrect email and/or password");
  }

  const userData = { id: user._id, name: user.name, image: user.image, date: user.date };

  return userData;
};

const User = mongoose.model("user", userSchema);

module.exports = User;
