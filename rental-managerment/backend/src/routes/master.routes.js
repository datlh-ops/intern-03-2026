const express = require("express");
const router = express.Router();
const Master = require("../models/Master");

router.post("/", async (req, res) => {
  const master = new Master(req.body);
  await master.save();
  res.json(master);
});

router.get("/", async (req, res) => {
  const masters = await Master.find();
  const method = req.method
  console.log(`[${method}] : get master list`)
  res.json(masters);
});

module.exports = router;