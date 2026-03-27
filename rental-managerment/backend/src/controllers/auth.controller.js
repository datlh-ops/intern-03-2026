const authService = require("../services/auth.service");

class AuthController {
  async register(req, res) {
    try {
      const result = await authService.register(req.body);
      res.status(201).json(result);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async login(req, res) {
    try {
      const { username, password } = req.body;
      const result = await authService.login(username, password);
      res.json(result);
    } catch (err) {
      const statusCode = err.message === "Tài khoản không tồn tại" ? 404 : 
                        err.message === "Mật khẩu không chính xác" ? 401 : 500;
      res.status(statusCode).json({ error: err.message });
    }
  }
}

module.exports = new AuthController();
