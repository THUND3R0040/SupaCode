const express = require("express");
const router = express.Router();
const { createNewRoom } = require("../controllers/roomconfig.controller");
const verifyToken = require("../middleware/auth.middleware");
const { getEditors } = require("../controllers/room.controller");
const { getViewers } = require("../controllers/room.controller");
const { getRoom } = require("../controllers/room.controller");
const { addEditor } = require("../controllers/room.controller");
const { addViewer } = require("../controllers/room.controller");
const { deleteViewer } = require("../controllers/room.controller");
const { deleteEditor } = require("../controllers/room.controller");
const { getRoomContent } = require("../controllers/room.controller");

router.post("/createNewRoom", verifyToken, createNewRoom);

router.get("/getEditors/:id", verifyToken, getEditors);

router.get("/getViewers/:id", verifyToken, getViewers);

router.get("/getRoom/:id", verifyToken, getRoom);

router.put("/addEditor/:roomId", verifyToken, addEditor);

router.put("/addViewer/:roomId", verifyToken, addViewer);

router.put("/deleteViewer/:roomId", verifyToken, deleteViewer);

router.put("/deleteEditor/:roomId", verifyToken, deleteEditor);

router.get("/getRoomContent/:id", verifyToken, getRoomContent);

module.exports = router;
