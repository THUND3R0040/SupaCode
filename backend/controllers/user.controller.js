const User = require("../Models/User");
const asyncHandler = require("express-async-handler");

const getUserById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await User.findOne({ _id: id });
  try {
    if (!user) {
      return res.status(404).json({ message: "No user found" });
    }
    return res.status(200).json({ user });
  } catch (err) {
    return res.status(404).json({ message: "No user found" });
  }
});

module.exports = { getUserById };
