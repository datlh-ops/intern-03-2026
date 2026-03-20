const express = require("express");
const router = express.Router();
const Room = require("../models/Room");

router.post("/", async (req, res) => {
  try {
    const room = new Room(req.body);
    await room.save();
    const time = new Date().toLocaleString();
    console.log(`[${time}] [${req.method}] : create room`);
    res.json(room);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const rooms = await Room.find();
    const time = new Date().toLocaleString();
    console.log(`[${time}] [${req.method}] : get room list`);
    res.json(rooms);
  } catch (err) {
    console.error("Error fetching rooms:", err);
    res.status(500).json({ error: "Server error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(req.params.id, req.body, { new: true });
    const time = new Date().toLocaleString();
    console.log(`[${time}] [${req.method}] : update room`);
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
