const express = require("express");
const router = express.Router();
const Account = require("../models/Account");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

router.post("/register", async (req, res) => {
    try {
        const { username, password, role, userId, masterId } = req.body;

        const existingAccount = await Account.findOne({ username });
        if (existingAccount) {
            return res.status(400).json({ error: "Tên đăng nhập đã tồn tại" });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const account = new Account({
            username,
            password: hashedPassword,
            role,
            userId,
            masterId
        });
        await account.save();
        res.status(201).json({ message: "Đăng ký thành công!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        const account = await Account.findOne({ username });
        if (!account) {
            return res.status(404).json({ error: "Tài khoản không tồn tại" });
        }
        const isMatch = await bcrypt.compare(password, account.password);
        if (!isMatch) {
            return res.status(401).json({ error: "Mật khẩu không chính xác" });
        }
        const token = jwt.sign(
            { id: account._id, role: account.role },
            JWT_SECRET,
            { expiresIn: "1d" }
        );
        res.json({
            message: "Đăng nhập thành công",
            token: token,
            role: account.role,
            username: account.username
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
router.post("/logout", (req, res) => {
    res.json({ message: "Đăng xuất thành công! Trình duyệt vui lòng tự hủy token." });
});

module.exports = router;
