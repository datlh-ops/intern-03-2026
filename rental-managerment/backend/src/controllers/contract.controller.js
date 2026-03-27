const contractService = require("../services/contract.service");

class ContractController {
  async getContracts(req, res) {
    try {
      const contracts = await contractService.getContracts(req.user);
      console.log(`[GET] : get contract list for ${req.user.role}`);
      res.json(contracts);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async createContract(req, res) {
    try {
      const contract = await contractService.createContract(req.body, req.user);
      console.log(`[POST] : Tenant ${req.user.id} requested contract. Room status updated.`);
      res.json(contract);
    } catch (err) {
      const statusCode = err.message === "Phòng không tồn tại" ? 404 : 
                        err.message.includes("không thể đăng ký") ? 400 : 500;
      res.status(statusCode).json({ error: err.message });
    }
  }

  async updateContract(req, res) {
    try {
      const updated = await contractService.updateContract(req.params.id, req.body, req.user);
      console.log(`[PUT] : Role ${req.user.role} updated contract ${req.params.id}`);
      res.json(updated);
    } catch (err) {
      const statusCode = err.message.includes("không có quyền") ? 403 : 
                        err.message.includes("không thể sửa") ? 400 : 500;
      res.status(statusCode).json({ error: err.message });
    }
  }

  async deleteContract(req, res) {
    try {
      const result = await contractService.deleteContract(req.params.id, req.user);
      console.log(`[DELETE] : Role ${req.user.role} deleted contract ${req.params.id}`);
      res.json(result);
    } catch (err) {
      const statusCode = err.message.includes("không có quyền") ? 403 : 
                        err.message.includes("không thể tự ý xóa") ? 400 : 500;
      res.status(statusCode).json({ error: err.message });
    }
  }
}

module.exports = new ContractController();
