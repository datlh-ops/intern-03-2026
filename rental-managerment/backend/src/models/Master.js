const mongoose = require("mongoose");

const masterSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  address: String
});

module.exports = mongoose.model("Master", masterSchema);
