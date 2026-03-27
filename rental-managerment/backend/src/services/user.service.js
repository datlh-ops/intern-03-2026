const User = require("../models/User");
const Room = require("../models/Room");
const Account = require("../models/Account");
const Contract = require("../models/Contract");

class UserService {
  async createUser(data) {
    const { roomId } = data;
    if (roomId) {
      const roomExists = await Room.findById(roomId);
      if (!roomExists) throw new Error("Phòng không tồn tại");
    }

    const user = new User(data);
    await user.save();
    return await User.findById(user._id).populate("roomId", "roomNumber");
  }

  async getAllUsers() {
    return await User.find().populate("roomId", "roomNumber status");
  }

  async getUserById(id) {
    const user = await User.findById(id).populate("roomId", "roomNumber status");
    if (!user) throw new Error("Người dùng không tồn tại");
    return user;
  }

  async updateUser(id, data) {
    const updatedUser = await User.findByIdAndUpdate(id, data, { new: true }).populate(
      "roomId",
      "roomNumber"
    );
    if (!updatedUser) throw new Error("Không tìm thấy người dùng để cập nhật");
    return updatedUser;
  }

  async deleteUser(id) {
    // Tìm các hợp đồng đang hiệu lực của khách thuê này để giải phóng phòng
    const activeContracts = await Contract.find({ userId: id, status: "active" });
    const roomIds = activeContracts.map((c) => c.roomId);

    if (roomIds.length > 0) {
      await Room.updateMany({ _id: { $in: roomIds } }, { status: "Trống" });
    }

    // Xóa tất cả hợp đồng của khách thuê này
    await Contract.deleteMany({ userId: id });

    // Xóa tài khoản đăng nhập
    await Account.deleteOne({ userId: id });

    // Xóa hồ sơ khách thuê
    const result = await User.findByIdAndDelete(id);
    if (!result) throw new Error("Không tìm thấy khách thuê để xóa");

    return { message: "Đã xóa toàn bộ dữ liệu liên quan đến khách thuê và giải phóng phòng thành công!" };
  }
}

module.exports = new UserService();
