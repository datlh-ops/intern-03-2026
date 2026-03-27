const express = require("express");
const router = express.Router();
const roomController = require("../controllers/room.controller");
const { uploadCloud } = require("../config/cloudinary");

router.get("/", roomController.getAllRooms);
router.get("/master/:masterId", roomController.getRoomsByMasterId);
router.post("/", uploadCloud.single("image"), roomController.createRoom);
router.put("/:id", uploadCloud.single("image"), roomController.updateRoom);
router.delete("/:id", roomController.deleteRoom);

module.exports = router;
