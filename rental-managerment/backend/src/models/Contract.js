const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "Contract",
  tableName: "contracts",
  columns: {
    id: { primary: true, type: "int", generated: true },
    price: { type: "float", nullable: false },
    startDate: { type: "timestamp", nullable: false, name: "start_date" },
    endDate: { type: "timestamp", nullable: false, name: "end_date" },
    status: { type: "smallint", default: 0, nullable: false }, // 0: pending, 1: active, 2: declined, 3: cancelled, 4: completed
    deposit: { type: "float", default: 0, nullable: false },
    userId: { type: "int", nullable: false, name: "user_id" },
    roomId: { type: "int", nullable: false, name: "room_id" },
    masterId: { type: "int", nullable: false, name: "master_id" },
    createdAt: { type: "timestamp", createDate: true, name: "created_at" },
    updatedAt: { type: "timestamp", createDate: true, name: "updated_at" }
  },
  relations: {
    user: {
      target: "User",
      type: "many-to-one",
      joinColumn: { name: "user_id" },
      onDelete: "CASCADE"
    },
    room: {
      target: "Room",
      type: "many-to-one",
      joinColumn: { name: "room_id" },
      onDelete: "CASCADE"
    },
    master: {
      target: "Master",
      type: "many-to-one",
      joinColumn: { name: "master_id" },
      onDelete: "CASCADE"
    }
  }
});
