const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      length: 6,
      unique: true,
    },
    roomName: {
      type: String,
      required: true,
      min: 3,
      max: 20,
      unique: true,
    },
    roomCapacity: {
      type: Number,
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    editors: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    viewers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Room", roomSchema, "room");
