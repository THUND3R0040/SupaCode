const User = require("../Models/User");
const Room = require("../Models/Room");
const RoomContent = require("../Models/RoomContent");
const asyncHandler = require("express-async-handler");

const getEditors = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const room = await Room.findOne({ id }).populate("editors");
  try {
    const editors = room.editors;
    return res.status(200).json({ editors });
  } catch (err) {
    return res.status(404).json({ message: "No editors found" });
  }
});

const getViewers = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const room = await Room.findOne({ id }).populate("viewers");
  try {
    const viewers = room.viewers;
    return res.status(200).json({ viewers });
  } catch (err) {
    return res.status(404).json({ message: "No viewers found" });
  }
});

const getRoom = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const room = await Room.findOne({ id });
  try {
    if (!room) {
      return res.status(404).json({ message: "No room found" });
    }
    return res.status(200).json({ room });
  } catch (err) {
    return res.status(404).json({ message: "No room found" });
  }
});

const addEditor = asyncHandler(async (req, res) => {
  const { roomId } = req.params;
  const { id } = req.body;
  const room = await Room.findOne({ id: roomId });
  if (room.editors.includes(id) || room.owner === id) {
    return res.status(400).json({ message: "Editor already in the room" });
  }
  if (room.viewers.length + room.editors.length + 1 >= room.roomCapacity) {
    return res.status(400).json({ message: "Room is full" });
  }

  try {
    const updatedRoom = await Room.findOneAndUpdate(
      { id: roomId },
      {
        $addToSet: { editors: id },
      }
    ).populate("editors");
    console.log(updatedRoom);
    if (!updatedRoom) {
      console.log(updatedRoom);
      return res.status(404).json({ message: "Room not found" });
    }
    return res.status(200).json({ message: "Editor added successfully" });
  } catch (err) {
    return res.status(404).json({ message: err.message });
  }
});

const addViewer = asyncHandler(async (req, res) => {
  const { roomId } = req.params;
  const { id } = req.body;
  const room = await Room.findOne({ id: roomId });
  const viewers = room.viewers.map((viewer) => viewer.toString());
  const editors = room.editors.map((editor) => editor.toString());
  if (
    viewers.includes(id) ||
    editors.includes(id) ||
    room.owner.toString() === id
  ) {
    return res.status(400).json({ message: "Viewer already in the room" });
  }
  if (room.viewers.length + room.editors.length + 1 >= room.roomCapacity) {
    return res.status(400).json({ message: "Room is full" });
  }
  if (room.owner === id) {
    return res.status(400).json({ message: "Owner cannot be a viewer" });
  }

  try {
    const updatedRoom = await Room.findOneAndUpdate(
      { id: roomId },
      {
        $addToSet: { viewers: id },
      }
    ).populate("viewers");
    console.log(updatedRoom);
    if (!updatedRoom) {
      return res.status(404).json({ message: "Room not found" });
    }
    return res.status(200).json({ message: "Viewer added successfully" });
  } catch (err) {
    return res.status(404).json({ message: err.message });
  }
});

const deleteViewer = asyncHandler(async (req, res) => {
  const { roomId } = req.params;
  const { id } = req.body;
  try {
    const updatedRoom = await Room.findOneAndUpdate(
      { id: roomId },
      {
        $pull: { viewers: id },
      }
    ).populate("viewers");
    if (!updatedRoom) {
      return res.status(404).json({ message: "Room not found" });
    }
    return res.status(200).json({ message: "Viewer removed successfully" });
  } catch (err) {
    return res.status(404).json({ message: err.message });
  }
});

const deleteEditor = asyncHandler(async (req, res) => {
  const { roomId } = req.params;
  const { id } = req.body;
  try {
    const updatedRoom = await Room.findOneAndUpdate(
      { id: roomId },
      {
        $pull: { editors: id },
      }
    ).populate("editors");
    if (!updatedRoom) {
      return res.status(404).json({ message: "Room not found" });
    }
    return res.status(200).json({ message: "Editor removed successfully" });
  } catch (err) {
    return res.status(404).json({ message: err.message });
  }
});

const getRoomContent = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const room = await Room.findOne({
    id,
  });
  const roomContent = await RoomContent.findOne({
    roomId: room._id,
  });
  try {
    return res.status(200).json({ content: roomContent });
  } catch (err) {
    return res.status(404).json({ message: "No content found" });
  }
});

module.exports = {
  getEditors,
  getViewers,
  getRoom,
  addEditor,
  addViewer,
  deleteViewer,
  deleteEditor,
  getRoomContent,
};
