const { AppDataSource } = require("../config/db");

async function seedRooms() {
    try {
        console.log("--- BẮT ĐẦU QUY TRÌNH BƠM 100,000 DỮ LIỆU ---");
        
        if (!AppDataSource.isInitialized) {
            await AppDataSource.initialize();
        }

        const roomRepo = AppDataSource.getRepository("Room");
        const masterRepo = AppDataSource.getRepository("Master");

        // 1. Lấy một Master ID bất kỳ để gán phòng
        const firstMaster = await masterRepo.findOne({ where: {} });
        if (!firstMaster) {
            console.error("LỖI: Không tìm thấy bất kỳ Master (Chủ trọ) nào. Vui lòng tạo 1 chủ trọ trước!");
            return;
        }
        const masterId = firstMaster.id;
        console.log(`Dữ liệu sẽ được gán cho Master ID: ${masterId}`);

        const totalRecords = 100000;
        const batchSize = 1000; // Mỗi lượt chèn 1000 phòng
        const totalBatches = totalRecords / batchSize;

        const cities = ["Hồ Chí Minh", "Hà Nội", "Đà Nẵng", "Cần Thơ", "Hải Phòng"];
        const districts = ["Quận 1", "Quận 3", "Quận Cầu Giấy", "Quận Sơn Trà", "Quận Ninh Kiều"];

        for (let i = 0; i < totalBatches; i++) {
            const roomsBatch = [];
            for (let j = 1; j <= batchSize; j++) {
                const index = i * batchSize + j;
                roomsBatch.push({
                    roomNumber: `TEST-${index}`, // Đảm bảo Unique
                    price: Math.floor(Math.random() * 5000000) + 1000000,
                    status: Math.floor(Math.random() * 4),
                    capacity: Math.floor(Math.random() * 4) + 1,
                    currentTenants: 0,
                    thumbnail: "https://res.cloudinary.com/demo/image/upload/v1631234567/sample.jpg",
                    city: cities[Math.floor(Math.random() * cities.length)],
                    district: districts[Math.floor(Math.random() * districts.length)],
                    ward: "Phường " + (Math.floor(Math.random() * 10) + 1),
                    location: "Địa chỉ giả lập số " + index,
                    title: "Phòng trọ Test quy mô lớn #" + index,
                    area: (Math.floor(Math.random() * 30) + 15) + "m2",
                    isTrending: Math.random() > 0.8,
                    amenities: JSON.stringify(["Điều hòa", "Wifi", "Máy giặt"]),
                    description: "Mô tả dữ liệu mẫu dành cho việc stress test hệ thống xuất file Excel.",
                    masterId: masterId
                });
            }

            // Chèn theo đợt
            await roomRepo.insert(roomsBatch);
            
            if ((i + 1) % 10 === 0) {
                console.log(`Đã chèn: ${((i + 1) * batchSize).toLocaleString()} / 100,000 phòng...`);
            }
        }

        console.log("--- HOÀN THÀNH: Đã bơm thành công 100,000 bản ghi! ---");
        process.exit(0);

    } catch (error) {
        console.error("LỖI KHI SEED DỮ LIỆU:", error);
        process.exit(1);
    }
}

seedRooms();
