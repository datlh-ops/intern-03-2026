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
    enum: ["Trống", "Đang xử lý", "Đã thuê", "Bảo trì"],
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
    required: true
  },
  masterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Master",
    required: true
  },
  city: {
    type: String,
    required: true,
    default: "Hồ Chí Minh"
  },
  ward: {
    type: String,
    required: true,
    default: "Phường trung tâm"
  },
  location: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true,
    default: "Phòng trọ cao cấp"
  },
  district: {
    type: String,
    required: true,
    default: "Quận trung tâm"
  },
  area: {
    type: Number,
    default: 20,
    required: true
  },
  isTrending: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });
module.exports = mongoose.model("Room", roomSchema);