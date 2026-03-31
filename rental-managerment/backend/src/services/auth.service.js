const Account = require("../models/Account");
const User = require("../models/User");
const Master = require("../models/Master");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authDto = require("../dtos/auth.dto");
const dotenv = require("dotenv");
dotenv.config();
const { OAuth2Client } = require("google-auth-library");

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const googleClient = new OAuth2Client(GOOGLE_CLIENT_ID);

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

  async googleLogin(credential, role) {
    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const { sub: googleId, email, name, picture } = payload;

    // Tìm xem email này hoặc googleId này đã tồn tại chưa
    let account = await Account.findOne({ $or: [{ googleId }, { email }] })
      .populate("userId", "name")
      .populate("masterId", "name");

    // Thay thế role nếu là account mới chưa tồn tại
    const finalRole = role || "user";

    if (!account) {
      let userId = null;
      let masterId = null;

      const baseUsername = email.split("@")[0].replace(/[^a-zA-Z0-9]/g, "");
      const username = baseUsername + "_" + googleId.substring(0, 4);

      if (finalRole === "master") {
        const master = new Master({
          name: name,
          phone: "0000000000",
          email: email,
          address: "Chưa cập nhật",
        });
        await master.save();
        masterId = master._id;
      } else {
        const user = new User({
          name: name,
          phone: "0000000000",
        });
        await user.save();
        userId = user._id;
      }

      account = new Account({
        username: username, // Tạo username tự động (unique)
        googleId,
        email,
        avatar: picture,
        role: finalRole,
        userId,
        masterId,
      });

      await account.save();
      // Populate fields để map đúng format response
      if (userId) await account.populate("userId", "name");
      if (masterId) await account.populate("masterId", "name");
    } else {
      // Nếu email đã tồn tại nhưng chưa có googleId thì cập nhật cho account đó
      if (!account.googleId) {
        account.googleId = googleId;
        account.avatar = picture;
        await account.save();
      }
    }

    const token = jwt.sign(
      {
        id: account._id,
        role: account.role,
        profileId: account.role === "master" ? account.masterId?._id : account.userId?._id,
      },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    return authDto.loginResponse(account, token);
  }
}

module.exports = new AuthService();
