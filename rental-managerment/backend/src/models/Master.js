const mongoose = require("mongoose");

const masterSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
});

module.exports = mongoose.model("Master", masterSchema);