const mongoose = require("mongoose");

const roomContentSchema = new mongoose.Schema(
  {
    roomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },

  { timestamps: true }
);

module.exports = mongoose.model(
  "RoomContent",
  roomContentSchema,
  "roomContent"
);
