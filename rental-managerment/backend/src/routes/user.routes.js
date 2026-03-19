const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.post("/", async (req, res) => {
  const user = new User(req.body);
  const method = req.method;
  const time = new Date().toLocaleString(); 
  console.log(`[${time}] [${method}] : create user`);
  await user.save();
  res.json(user);
});

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    const method = req.method;
    const time = new Date().toLocaleString(); 
    console.log(`[${time}] [${method}] : get user list`);
    res.json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Server error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    const method = req.method;
    const time = new Date().toLocaleString(); 
    console.log(`[${time}] [${method}] : Delete user`);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;