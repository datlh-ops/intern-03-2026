const Room = require("../models/Room");
const Contract = require("../models/Contract");
const User = require("../models/User");
const { cloudinary } = require("../config/cloudinary");

class RoomService {
  async deleteImageFromCloudinary(imageUrl) {
    if (!imageUrl) return;
    try {
      const arr = imageUrl.split("/");
      const uploadIndex = arr.indexOf("upload");
      if (uploadIndex !== -1) {
        const pathArr = arr.slice(uploadIndex + 2);
        const fullPath = pathArr.join("/");
        const publicId = fullPath.substring(0, fullPath.lastIndexOf("."));

        await cloudinary.uploader.destroy(publicId);
        console.log(`[Cloudinary] Đã xóa ảnh: ${publicId}`);
      }
    } catch (err) {
      console.error("[Cloudinary Error] Lỗi dọn rác ảnh:", err.message);
    }
  }

  async getAllRooms() {
    return await Room.find().populate("masterId", "name phone");
  }

  async getRoomsByMasterId(masterId) {
    return await Room.find({ masterId }).populate("masterId", "name phone");
  }

  async createRoom(data, file) {
    if (file) data.thumbnail = file.path;
    const room = new Room(data);
    await room.save();
    return await Room.findById(room._id).populate("masterId", "name phone");
  }

  async updateRoom(id, data, file) {
    const roomInfo = await Room.findById(id);
    if (!roomInfo) throw new Error("Phòng không tồn tại");

    // Kiểm tra trạng thái nếu có thay đổi
    if (data.status && data.status !== roomInfo.status) {
      const activeContract = await Contract.findOne({
        roomId: id,
        status: { $in: ["active", "pending"] },
      });

      if (activeContract) {
        const statusText = activeContract.status === "active" ? "đang hiệu lực" : "đang chờ duyệt";
        throw new Error(`Không thể thay đổi trạng thái phòng thủ công vì đang có hợp đồng ${statusText}.`);
      }
    }

    // Xử lý ảnh mới
    if (file) {
      if (roomInfo.thumbnail) {
        await this.deleteImageFromCloudinary(roomInfo.thumbnail);
      }
      data.thumbnail = file.path;
    }

    const updatedRoom = await Room.findByIdAndUpdate(id, data, { new: true }).populate(
      "masterId",
      "name phone"
    );
    return updatedRoom;
  }

  async deleteRoom(id) {
    const roomInfo = await Room.findById(id);
    if (!roomInfo) throw new Error("Không thể xóa. Phòng không tồn tại");

    if (roomInfo.thumbnail) {
      await this.deleteImageFromCloudinary(roomInfo.thumbnail);
    }

    // Xóa tất cả hợp đồng liên quan đến phòng này
    await Contract.deleteMany({ roomId: id });

    // Reset roomId cho khách thuê đang ở phòng này
    await User.updateMany({ roomId: id }, { roomId: null });

    // Xóa phòng
    await Room.findByIdAndDelete(id);

    return { message: "Đã xóa triệt để phòng, hợp đồng liên quan và rác ảnh thành công!" };
  }
}

module.exports = new RoomService();
