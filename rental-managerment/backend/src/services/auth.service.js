const Account = require("../models/Account");
const User = require("../models/User");
const Master = require("../models/Master");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authDto = require("../dtos/auth.dto");

const JWT_SECRET = process.env.JWT_SECRET;

class AuthService {
  async register({ username, password, role, name, phone, email, address }) {
    const existingAccount = await Account.findOne({ username });
    if (existingAccount) {
      throw new Error("Tên đăng nhập đã tồn tại");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    let userId = null;
    let masterId = null;

    if (role === "master") {
      const master = new Master({
        name: name || username,
        phone: phone || "0000000000",
        email: email || "temp@mail.com",
        address: address || "Chưa cập nhật",
      });
      await master.save();
      masterId = master._id;
    } else if (role === "user") {
      const user = new User({
        name: name || username,
        phone: phone || "0000000000",
      });
      await user.save();
      userId = user._id;
    }

    const account = new Account({
      username,
      password: hashedPassword,
      role,
      userId,
      masterId,
    });

    await account.save();
    return { message: "Đăng ký thành công!" };
  }

  async login(username, password) {
    const account = await Account.findOne({ username })
      .populate("userId", "name")
      .populate("masterId", "name");

    if (!account) {
      throw new Error("Tài khoản không tồn tại");
    }

    const isMatch = await bcrypt.compare(password, account.password);
    if (!isMatch) {
      throw new Error("Mật khẩu không chính xác");
    }

    const profileId = account.role === "master" ? account.masterId?._id : account.userId?._id;
    const profileName =
      account.role === "master" && account.masterId
        ? account.masterId.name
        : account.role === "user" && account.userId
        ? account.userId.name
        : account.username;

    const token = jwt.sign(
      {
        id: account._id,
        role: account.role,
        profileId: profileId,
      },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    return authDto.loginResponse(account, token);
  }
}

module.exports = new AuthService();
