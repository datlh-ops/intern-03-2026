const { AppDataSource } = require("../config/db");
const { Not } = require("typeorm");
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
  async getAllRooms(query) {
    const roomRepo = AppDataSource.getRepository("Room");
    const { page, limit, city, district, search, sort } = query;

    const pageNum = parseInt(page) || 1;
    const limitNum = parseInt(limit) || 10;
    const skip = (pageNum - 1) * limitNum;
    const take = limitNum;

    const queryBuilder = roomRepo.createQueryBuilder("room")
      .leftJoinAndSelect("room.master", "master")
      .leftJoinAndSelect("room.users", "users");

    if (query.status !== undefined && query.status !== 'all') {
      queryBuilder.where("room.status = :status", { status: parseInt(query.status) });
    } else {
      // Mặc định (hoặc khi chọn 'all'): Chỉ lấy phòng đang trống
      queryBuilder.where("room.status = :status", { status: 0 });
    }

    // Tuyệt đối không lấy phòng đã xóa mềm (status 4) cho User
    queryBuilder.andWhere("room.status != 4");
    if (city && city !== 'Chọn Tỉnh/Thành') {
      queryBuilder.andWhere("room.city = :city", { city });
    }
    if (district && district !== 'Chọn Quận/Huyện') {
      queryBuilder.andWhere("room.district = :district", { district });
    }
    if (search) {
      queryBuilder.andWhere("(room.roomNumber ILIKE :search OR room.title ILIKE :search OR room.location ILIKE :search)", { search: `%${search}%` });
    }
    if (sort === 'price_asc') {
      queryBuilder.orderBy("room.price", "ASC");
    } else if (sort === 'price_desc') {
      queryBuilder.orderBy("room.price", "DESC");
    } else {
      queryBuilder.orderBy("room.id", "DESC"); // Mặc định mới nhất trước
    }

    const [rooms, total] = await queryBuilder
      .skip(skip)
      .take(take)
      .getManyAndCount();

    return {
      rooms,
      total,
      page: pageNum,
      limit: limitNum,
      totalPages: Math.ceil(total / take)
    };
  }

  async getRoomsByMasterId(masterId, page, limit, status) {
    const roomRepo = AppDataSource.getRepository("Room");

    const pageNum = parseInt(page) || 1;
    const limitNum = parseInt(limit) || 10;
    const skip = (pageNum - 1) * limitNum;
    const take = limitNum;

    const queryBuilder = roomRepo.createQueryBuilder("room")
      .leftJoinAndSelect("room.master", "master")
      .leftJoinAndSelect("room.users", "users")
      .leftJoinAndSelect("room.contracts", "contracts", "contracts.status = :activeStatus", { activeStatus: 1 })
      .leftJoinAndSelect("contracts.user", "contractUser")
      .where("room.masterId = :masterId", { masterId: parseInt(masterId) });

    if (status !== 'all') {
      queryBuilder.andWhere("room.status = :status", { status: parseInt(status) });
    } else {
      // Luôn loại bỏ phòng đã xóa mềm (status 4) cho Master
      queryBuilder.andWhere("room.status != :deletedStatus", { deletedStatus: 4 });
    }

    const [rooms, total] = await queryBuilder
      .orderBy("room.id", "DESC")
      .skip(skip)
      .take(take)
      .getManyAndCount();

    const masterWhere = { masterId: parseInt(masterId), status: Not(4) };
    const [totalAll, occupied, vacant, pending, maintenance] = await Promise.all([
      roomRepo.count({ where: masterWhere }),
      roomRepo.count({ where: { masterId: parseInt(masterId), status: 1 } }),
      roomRepo.count({ where: { masterId: parseInt(masterId), status: 0 } }),
      roomRepo.count({ where: { masterId: parseInt(masterId), status: 2 } }),
      roomRepo.count({ where: { masterId: parseInt(masterId), status: 3 } }),
    ]);

    return {
      rooms,
      total,
      page: pageNum,
      limit: limitNum,
      totalPages: Math.ceil(total / take),
      stats: {
        total: totalAll,
        occupied,
        vacant,
        pending,
        maintenance
      }
    };
  }

  async getRoomById(id) {
    const roomRepo = AppDataSource.getRepository("Room");
    return await roomRepo.findOne({
      where: { id: parseInt(id) },
      relations: ["master"]
    });
  }

  async getRandomRooms(city, excludeId) {
    try {
      const roomRepo = AppDataSource.getRepository("Room");
      const queryBuilder = roomRepo.createQueryBuilder("room")
        .leftJoinAndSelect("room.master", "master")
        .where("room.status = :status", { status: 0 })
        .andWhere("room.city = :city", { city })
        .andWhere("room.id != :excludeId", { excludeId: parseInt(excludeId) });

      const rooms = await queryBuilder
        .orderBy("RANDOM()")
        .limit(3)
        .getMany();

      return rooms;
    } catch (err) {
      console.error("[RoomService.getRandomRooms] Error:", err.message);
      return []; // Return empty instead of throwing to keep page alive
    }
  }

  async createRoom(data, file) {
    const roomRepo = AppDataSource.getRepository("Room");
    if (file) data.thumbnail = file.path;

    if (data.masterId) data.masterId = parseInt(data.masterId);
    if (data.price) data.price = parseFloat(data.price);
    if (data.area) data.area = parseFloat(data.area);
    if (data.capacity) data.capacity = parseInt(data.capacity);

    const room = roomRepo.create(data);
    const savedRoom = await roomRepo.save(room);

    return await roomRepo.findOne({
      where: { id: savedRoom.id },
      relations: ["master"]
    });
  }

  async updateRoom(id, data, file) {
    const roomRepo = AppDataSource.getRepository("Room");
    const contractRepo = AppDataSource.getRepository("Contract");

    const roomId = parseInt(id);
    const roomInfo = await roomRepo.findOne({ where: { id: roomId } });
    if (!roomInfo) throw new Error("Phòng không tồn tại");

    if (data.status !== undefined && data.status !== roomInfo.status) {
      const activeContract = await contractRepo.findOne({
        where: [
          { roomId, status: 1 },
          { roomId, status: 0 }
        ]
      });

      if (activeContract) {
        const statusText = activeContract.status === 1 ? "đang hiệu lực" : "đang chờ duyệt";
        throw new Error(`Không thể thay đổi trạng thái phòng thủ công vì đang có hợp đồng ${statusText}.`);
      }
    }

    if (file) {
      if (roomInfo.thumbnail) {
        await this.deleteImageFromCloudinary(roomInfo.thumbnail);
      }
      data.thumbnail = file.path;
    }

    if (data.price) data.price = parseFloat(data.price);
    if (data.area) data.area = parseFloat(data.area);
    if (data.capacity) data.capacity = parseInt(data.capacity);

    // FIX: Đảm bảo status được lưu dưới dạng số nếu nhảy vào đây
    if (data.status !== undefined) data.status = parseInt(data.status);

    await roomRepo.update(roomId, data);
    return await roomRepo.findOne({
      where: { id: roomId },
      relations: ["master"]
    });
  }

  async deleteRoom(id) {
    const roomRepo = AppDataSource.getRepository("Room");

    const roomId = parseInt(id);
    const roomInfo = await roomRepo.findOne({ where: { id: roomId } });
    if (!roomInfo) throw new Error("Không tìm thấy phòng để xóa");

    // SOFT DELETE: Cập nhật status thành 4 (Đã xóa) thay vì xóa bản ghi
    await roomRepo.update(roomId, { status: 4 });

    return { message: "Đã chuyển trạng thái phòng sang 'Đã xóa' thành công!" };
  }

  async getTrendingRooms(page, limit) {
    const roomRepo = AppDataSource.getRepository("Room");
    const pageNum = parseInt(page) || 1;
    const limitNum = parseInt(limit) || 8;
    const skip = (pageNum - 1) * limitNum;
    const take = limitNum;

    const [rooms, total] = await roomRepo.findAndCount({
      where: {
        status: 0, // Chỉ lấy phòng trống
        isTrending: true
      },
      order: { id: "DESC" },
      skip,
      take,
      relations: ["master"]
    });

    return {
      rooms,
      total,
      page: pageNum,
      limit: limitNum,
      totalPages: Math.ceil(total / take)
    };
  }
  async getAllRoomsForAdmin(query) {
    const roomRepo = AppDataSource.getRepository("Room");
    const { page, limit, status, search, city, district } = query;

    const pageNum = parseInt(page) || 1;
    const limitNum = parseInt(limit) || 10;
    const skip = (pageNum - 1) * limitNum;
    const take = limitNum;

    const queryBuilder = roomRepo.createQueryBuilder("room")
      .leftJoinAndSelect("room.master", "master")
      .leftJoinAndSelect("room.users", "users");

    if (status && status !== 'all') {
      queryBuilder.andWhere("room.status = :status", { status: parseInt(status) });
    }

    if (city && city !== 'Chọn Tỉnh/Thành') {
      queryBuilder.andWhere("room.city = :city", { city });
    }
    if (district && district !== 'Chọn Quận/Huyện') {
      queryBuilder.andWhere("room.district = :district", { district });
    }

    if (search) {
      queryBuilder.andWhere("(room.roomNumber ILIKE :search OR room.title ILIKE :search)", { search: `%${search}%` });
    }


    const [rooms, total] = await queryBuilder
      .orderBy("room.id", "DESC")
      .skip(skip)
      .take(take)
      .getManyAndCount();

    return {
      rooms,
      total,
      page: pageNum,
      limit: limitNum,
      totalPages: Math.ceil(total / take)
    };
  }

  async exportRoomsToExcel(res, query) {

    const roomRepo = AppDataSource.getRepository("Room");
    const { status, search, city, district } = query;
    const exportService = require("./export.service");

    const queryBuilder = roomRepo.createQueryBuilder("room")
      .leftJoinAndSelect("room.master", "master");

    if (status && status !== 'all') {
      queryBuilder.andWhere("room.status = :status", { status: parseInt(status) });
    }
    if (city && city !== 'Chọn Tỉnh/Thành') {
      queryBuilder.andWhere("room.city = :city", { city });
    }
    if (district && district !== 'Chọn Quận/Huyện') {
      queryBuilder.andWhere("room.district = :district", { district });
    }
    if (search) {
      queryBuilder.andWhere("(room.roomNumber ILIKE :search OR room.title ILIKE :search)", { search: `%${search}%` });
    }

    const rooms = await queryBuilder.orderBy("room.id", "DESC").getMany();

    const statusMap = {
      0: "Trống",
      1: "Đã thuê",
      2: "Đang xử lý",
      3: "Bảo trì",
      4: "Đã xóa"
    };

    const data = rooms.map(r => ({
      roomNumber: r.roomNumber,
      title: r.title,
      price: r.price.toLocaleString('vi-VN') + " đ",
      area: r.area + " m2",
      capacity: r.capacity + " người",
      location: `${r.location}, ${r.ward}, ${r.district}, ${r.city}`,
      status: statusMap[r.status] || "Không xác định",
      master: r.master?.name || "N/A",
      phone: r.master?.phone || "N/A"
    }));

    const headers = [
      { label: "Số phòng", key: "roomNumber", width: 15 },
      { label: "Tiêu đề", key: "title", width: 30 },
      { label: "Giá thuê", key: "price", width: 15 },
      { label: "Diện tích", key: "area", width: 15 },
      { label: "Sức chứa", key: "capacity", width: 15 },
      { label: "Địa chỉ", key: "location", width: 50 },
      { label: "Trạng thái", key: "status", width: 15 },
      { label: "Chủ trọ", key: "master", width: 20 },
      { label: "SĐT Chủ trọ", key: "phone", width: 15 },
    ];

    return await exportService.exportToExcel(res, {
      fileName: `Danh_sach_phong_tro_${new Date().getTime()}`,
      headers,
      data
    });
  }
}


module.exports = new RoomService();
