const express = require("express");
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
app.use(
  cors({
    origin: "https://supacode-1.onrender.com/",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());

app.use("", RoomRouter);
app.use("", AuthRouter);
app.use("", UserRouter);

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
    origin: "*",
  },
});

// async function updateContent(roomId, content) {
//   const room = connection.collection("room");
//   const roomData = await room.findOne({ id: roomId });
//   const roomContent = connection.collection("roomContent");
//   roomContent.updateOne(
//     { roomId: roomData._id },
//     { $set: { content: content } },
//     { upsert: true }
//   );
// }

// async function run(roomId) {
//   const room = connection.collection("room");
//   const roomData = await room.findOne({ id: roomId });
//   const roomContent = connection.collection("roomContent");

//   const changeStream = roomContent.watch();
//   changeStream.on("change", (change) => {
//     if (
//       change.operationType === "update" ||
//       change.operationType === "insert"
//     ) {
//       console.log("zzz");
//       const updatedContent =
//         change.operationType === "update"
//           ? change.updateDescription.updatedFields.content
//           : change.fullDocument.content;
//       io.to(roomId).emit("code-change", updatedContent);
//     }
//   });
//   changeStream.on("error", (error) => {
//     console.log(error);
//   });
// }

const roomBuffer = {};

io.on("connection", (socket) => {
  socket.on("join-room", (roomId) => {
    console.log("user joined room", roomId);
    // run(roomId).catch(console.dir);
    socket.join(roomId);
    // if (roomBuffer[roomId]) {
    //   socket.emit("sync-data", roomBuffer[roomId]);
    // }
  });

  // socket.on("sync-data", async (roomId) => {
  //   if (roomBuffer[roomId]) {
  //     socket.emit("sync-data", roomBuffer[roomId]);
  //   }
  // });

  socket.on("send-code", async (data, roomId) => {
    console.log("code change", data);
    if (!roomBuffer[roomId]) {
      roomBuffer[roomId] = "";
    }
    roomBuffer[roomId] = data;
    // console.log("roomBuffer", roomBuffer[roomId]);
    io.to(roomId).emit("code-change", data);

    // setTimeout(async () => {
    //   const room = connection.collection("room");
    //   const roomData = await room.findOne({ id: roomId });
    //   console.log("interval");
    //   const roomContent = connection.collection("roomContent");
    //   roomContent.updateOne(
    //     { roomId: roomData._id },
    //     { $set: { content: roomBuffer[roomId] } },
    //     { upsert: true }
    //   );
    // }, 5000);

    // run(roomId).catch(console.dir);
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
