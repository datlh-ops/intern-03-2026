const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Tên đăng nhập là bắt buộc"],
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, "Mật khẩu là bắt buộc"]
    },
    role: {
        type: String,
        enum: ["admin", "master", "user"],
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null
    },
    masterId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Master",
        default: null
    },
    status: {
        type: String,
        enum: ["active", "inactive", "banned"],
        default: "active"
    }
}, { timestamps: true });

module.exports = mongoose.model("Account", accountSchema);
