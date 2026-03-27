const Master = require("../models/Master");
const Account = require("../models/Account");
const Room = require("../models/Room");
const Contract = require("../models/Contract");
const User = require("../models/User");

class MasterService {
  async createMaster(data) {
    const master = new Master(data);
    await master.save();
    return master;
  }

  async getMasterById(id) {
    const master = await Master.findById(id);
    if (!master) throw new Error("Không tìm thấy chủ trọ");
    return master;
  }

  async getAllMasters() {
    return await Master.find();
  }

  async updateMaster(id, data) {
    const updatedMaster = await Master.findByIdAndUpdate(id, data, { new: true });
    if (!updatedMaster) throw new Error("Không tìm thấy chủ trọ để cập nhật");
    return updatedMaster;
  }

  async deleteMaster(id) {
    const rooms = await Room.find({ masterId: id });
    const roomIds = rooms.map((r) => r._id);

    // Xóa tất cả hợp đồng của chủ trọ này
    await Contract.deleteMany({ masterId: id });

    // Reset roomId cho tất cả khách thuê đang ở các phòng của chủ trọ này
    await User.updateMany({ roomId: { $in: roomIds } }, { roomId: null });

    // Xóa tất cả phòng của chủ trọ này
    await Room.deleteMany({ masterId: id });

    // Xóa tài khoản đăng nhập của chủ trọ
    await Account.deleteOne({ masterId: id });

    // Xóa hồ sơ chủ trọ
    const result = await Master.findByIdAndDelete(id);
    if (!result) throw new Error("Không tìm thấy chủ trọ để xóa");
    
    return { message: "Đã xóa toàn bộ dữ liệu liên quan đến chủ trọ thành công!" };
  }
}

module.exports = new MasterService();
