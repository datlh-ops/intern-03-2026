const { AppDataSource } = require("../../config/db");
const bcrypt = require("bcryptjs");

class RoomImportStorage {
  async saveRows(rows) {
    console.log(`\n🚀 [IMPORT] Bắt đầu lưu ${rows.length} dòng dữ liệu vào DB...`);
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const masterCache = new Map();
      const userCache = new Map();

      for (let i = 0; i < rows.length; i++) {
        const item = rows[i];
        console.log(`\n--- [Dòng ${i + 1}/${rows.length}] Đang xử lý: Phòng ${item.roomNumber} (Chủ: ${item.masterName}) ---`);

        // 1. Xử lý Master (Chủ trọ)
        let master = masterCache.get(item.masterPhone);
        if (!master) {
          master = await queryRunner.manager.findOne("Master", { where: { phone: item.masterPhone } });
        }
        if (!master) {
          console.log(`   👉 Tạo mới Chủ trọ: ${item.masterName} - ${item.masterPhone}`);
          master = await queryRunner.manager.save("Master", {
            name: item.masterName,
            phone: item.masterPhone,
            email: item.masterEmail,
            address: item.masterAddress
          });
          // Kiểm tra Account đã tồn tại chưa trước khi tạo mới
          const existingMasterAccount = await queryRunner.manager.findOne("Account", {
            where: { username: item.masterPhone, role: "master" }
          });
          if (!existingMasterAccount) {
            console.log(`      (Tạo tài khoản Account cho Chủ trọ)`);
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash("123456", salt);
            await queryRunner.manager.save("Account", {
              username: item.masterPhone,
              password: hashedPassword,
              role: "master",
              masterId: master.id,
              status: "active"
            });
          }
          masterCache.set(item.masterPhone, master);
        } else {
          console.log(`   ✅ Sử dụng Master cũ: ${master.name}`);
        }

        // 2. Xử lý Tenant (Khách thuê)
        let tenant = null;
        if (item.tenantPhone) {
          tenant = userCache.get(item.tenantPhone);
          if (!tenant) {
            tenant = await queryRunner.manager.findOne("User", { where: { phone: item.tenantPhone } });
          }
          if (!tenant) {
            console.log(`   👉 Tạo mới Khách thuê: ${item.tenantName} - ${item.tenantPhone}`);
            tenant = await queryRunner.manager.save("User", {
              name: item.tenantName || "Khách thuê",
              phone: item.tenantPhone,
              email: item.tenantEmail || null
            });
            // Kiểm tra Account đã tồn tại chưa trước khi tạo mới
            const existingUserAccount = await queryRunner.manager.findOne("Account", {
              where: { username: item.tenantPhone, role: "user" }
            });
            if (!existingUserAccount) {
              console.log(`      (Tạo tài khoản Account cho Khách thuê)`);
              const salt = await bcrypt.genSalt(10);
              const hashedUserPassword = await bcrypt.hash("123456", salt);
              await queryRunner.manager.save("Account", {
                username: item.tenantPhone,
                password: hashedUserPassword,
                role: "user",
                userId: tenant.id,
                status: "active"
              });
            }
            userCache.set(item.tenantPhone, tenant);
          } else {
            console.log(`   ✅ Sử dụng Khách thuê đã có: ${tenant.name}`);
          }
        }

        // 3. Xử lý Room (Phòng)
        console.log(`   🏠 Đang tạo phòng ${item.roomNumber}...`);
        const roomStatus = tenant ? 1 : (item.status === 'Đã thuê' ? 1 : 0);
        const room = await queryRunner.manager.save("Room", {
          roomNumber: item.roomNumber,
          title: item.title,
          price: item.price,
          area: item.area,
          capacity: item.capacity,
          city: item.city,
          district: item.district,
          ward: item.ward,
          location: item.location,
          description: item.description,
          amenities: (typeof item.amenities === 'string' && item.amenities.trim())
            ? item.amenities.split(",").map(s => s.trim())
            : [],
          isTrending: item.isTrending === 'Có' || item.isTrending === true,
          thumbnail: "https://res.cloudinary.com/ddcxppxll/image/upload/v1712739324/default-room_vjwf1z.jpg",
          master: master,
          status: roomStatus
        });

        // 4. Tạo Hợp đồng (Nếu có khách thuê)
        if (tenant) {
          console.log(`   📑 Tạo hợp đồng thuê phòng ${room.roomNumber} cho ${tenant.name}`);
          await queryRunner.manager.save("Contract", {
            price: item.price,
            startDate: item.startDate || new Date(),
            endDate: item.endDate || new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
            status: 1,
            deposit: item.deposit || 0,
            userId: tenant.id,
            roomId: room.id,
            masterId: master.id
          });
        }
      }
      await queryRunner.commitTransaction();
      console.log(`\n✨ IMPORT HOÀN TẤT! Đã lưu thành công ${rows.length} dòng.`);
      return rows.length;
    } catch (err) {
      console.error(`\n💥 LỖI KHI LƯU DB TẠI DÒNG:`, err.message);
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }
}

module.exports = new RoomImportStorage();
