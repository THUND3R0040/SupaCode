// const express = require("express");
const AuthRouter = require("./routes/Auth");
const RoomRouter = require("./routes/Room");
const UserRouter = require("./routes/User");
const { connectDB, connection } = require("./config/connection");
const cors = require("cors");
require("dotenv").config();
const http = require("http");
const path = require("path");

const app = express();
connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//allow all users
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});
app.use(express.json());

app.use("/api", RoomRouter);
app.use("/api", AuthRouter);
app.use("/api", UserRouter);

// const __dirname1 = path.resolve();
// const parent = path.resolve(__dirname1, "../");
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(parent, "/CodeTogetherFront/dist")));
//   app.get("*", (req, res) => {
//     res.sendFile(
//       path.resolve(parent, "CodeTogetherFront", "dist", "index.html")
//     );
//   });
// } else {
//   app.get("/", (req, res) => {
//     res.send("API is running");
//   });
// }

const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "*", // Allow frontend domain
    methods: ["GET", "POST"], // Allowed methods
  },
});

const roomBuffer = {};

io.on("connection", (socket) => {
  socket.on("join-room", (roomId) => {
    console.log("user joined room", roomId);
    socket.join(roomId);
  });

  socket.on("send-code", async (data, roomId) => {
    console.log("code change", data);
    if (!roomBuffer[roomId]) {
      roomBuffer[roomId] = "";
    }
    roomBuffer[roomId] = data;
    io.to(roomId).emit("code-change", data);
  });
});

setInterval(async () => {
  for (const roomId in roomBuffer) {
    const room = connection.collection("room");
    const roomData = await room.findOne({ id: roomId });
    const roomContent = connection.collection("roomContent");
    roomContent.updateOne(
      { roomId: roomData._id },
      { $set: { content: roomBuffer[roomId] } },
      { upsert: true }
    );
  }
}, 5000);

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
