const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  roomNumber: {
    type: String,
    required: true,
    unique: true
  },
  price: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ["Trống", "Đã thuê", "Bảo trì"],
    default: "Trống"
  },
  capacity: {
    type: Number,
    default: 2
  },
  currentTenants: {
    type: Number,
    default: 0
  },
  thumbnail: {
    type: String,
  },
  masterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Master"
  }
}, { timestamps: true });
module.exports = mongoose.model("Room", roomSchema);