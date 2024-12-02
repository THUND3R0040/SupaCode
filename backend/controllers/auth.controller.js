const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../Models/User");
const asyncHandler = require("express-async-handler");

const register = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  const userExists = await User.findOne({ email });
  try {
    if (userExists) {
      return res.status(403).json({ message: "User already exists" });
    } else {
      const user = new User({
        username,
        email,
        password: bcrypt.hashSync(password, 10),
      });

      const getUser = await user.save();
      const token = jwt.sign(
        { _id: getUser._id, email: getUser.email, username: getUser.username },
        process.env.JWT_SECRET,
        {
          expiresIn: "1d",
        }
      );
      return res.status(201).json({
        user: user,
        message: "User created successfully",
        token: token,
      });
    }
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  let getUser = await User.findOne({ email });
  try {
    if (getUser && bcrypt.compareSync(password, getUser.password)) {
      const token = jwt.sign(
        { _id: getUser._id, email: getUser.email, username: getUser.username },
        process.env.JWT_SECRET,
        {
          expiresIn: "1d",
        }
      );
      return res.status(200).json({
        user: getUser,
        message: "Login successful",
        token: token,
      });
    } else {
      return res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = { register, login };
