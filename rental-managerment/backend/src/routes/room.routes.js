const express = require("express");
const router = express.Router();
const Room = require("../models/Room");
const Master = require("../models/Master"); // Import để có thể xài validation nếu cần

router.post("/", async (req, res) => {
  try {
    const room = new Room(req.body);
    await room.save();

    const populatedRoom = await Room.findById(room._id).populate("masterId", "name phone");
    console.log(`[POST] : create room`);
    res.json(populatedRoom);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const rooms = await Room.find().populate("masterId", "name phone");
    console.log(`[GET] : get room list`);
    res.json(rooms);
  } catch (err) {
    console.error("Error fetching rooms:", err);
    res.status(500).json({ error: "Server error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .populate("masterId", "name phone");
    console.log(`[PUT] : update room`);
    res.json(updatedRoom);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.delete("/:id", async (req, res) => {
  try {
    await Room.findByIdAndDelete(req.params.id);
    const time = new Date().toLocaleString();
    console.log(`[${time}] [${req.method}] : delete room`);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
