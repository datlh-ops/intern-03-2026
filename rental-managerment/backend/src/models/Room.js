const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "Room",
  tableName: "rooms",
  columns: {
    id: { primary: true, type: "int", generated: true },
    roomNumber: { type: "varchar", unique: true, nullable: false, name: "room_number" },
    price: { type: "float", nullable: false },
    status: { type: "smallint", default: 0, nullable: false },
    capacity: { type: "smallint", default: 2, nullable: false },
    currentTenants: { type: "smallint", default: 0, nullable: false, name: "current_tenants" },
    thumbnail: { type: "varchar", nullable: false },
    city: { type: "varchar", default: "Hồ Chí Minh", nullable: false },
    ward: { type: "varchar", default: "Phường trung tâm", nullable: false },
    location: { type: "varchar", nullable: false },
    title: { type: "varchar", default: "Phòng trọ cao cấp", nullable: false },
    district: { type: "varchar", default: "Quận trung tâm", nullable: false },
    area: { type: "varchar", default: "20m2", nullable: false },
    isTrending: { type: "boolean", default: false, nullable: false, name: "is_trending" },
    amenities: { type: "jsonb", nullable: true, default: "[]" },
    description: { type: "text", nullable: true },
    masterId: { type: "int", nullable: false, name: "master_id" },
    createdAt: { type: "timestamp", createDate: true, name: "created_at" },
    updatedAt: { type: "timestamp", updateDate: true, name: "updated_at" }
  },
  relations: {
    master: {
      target: "Master",
      type: "many-to-one",
      joinColumn: { name: "master_id" },
      onDelete: "CASCADE"
    },
    users: {
      target: "User",
      type: "one-to-many",
      inverseSide: "room"
    },
    contracts: {
      target: "Contract",
      type: "one-to-many",
      inverseSide: "room"
    }
  }
});