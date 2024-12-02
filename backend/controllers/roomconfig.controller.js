const asyncHandler = require("express-async-handler");
const Room = require("../Models/Room");
const User = require("../Models/User");
const RoomContent = require("../Models/RoomContent");
const { mongoose } = require("mongoose");

const createNewRoom = asyncHandler(async (req, res) => {
  const { nanoid } = await import("nanoid");
  const { roomName, roomCapacity, owner, editors, viewers } = req.body;
  console.log(req.body);
  const viewersIds = await User.find({ email: { $in: viewers } }).select("_id");
  const editorsIds = await User.find({ email: { $in: editors } }).select("_id");
  const id = nanoid(6);
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const room = new Room({
      id,
      roomName,
      roomCapacity,
      owner,
      editors: editorsIds.map((editor) => editor._id),
      viewers: viewersIds.map((viewer) => viewer._id),
    });
    const savedRoom = await room.save({ session });
    const newRoomContent = new RoomContent({
      roomId: savedRoom._id,
      content: "//some comment",
    });
    await newRoomContent.save({ session });
    await session.commitTransaction();
    return res.status(201).json({ message: "Room created successfully", id });
  } catch (err) {
    await session.abortTransaction();
    return res.status(500).json({ message: err.message });
  } finally {
    session.endSession();
  }
});

module.exports = {
  createNewRoom,
};
