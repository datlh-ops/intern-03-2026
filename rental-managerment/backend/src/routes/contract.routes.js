const express = require("express");
const router = express.Router();
const contractController = require("../controllers/contract.controller");
const { verifyToken, checkRole } = require("../middleware/auth.middleware");

router.get("/", verifyToken, contractController.getContracts);
router.post("/", verifyToken, checkRole(["user"]), contractController.createContract);
router.put("/:id", verifyToken, contractController.updateContract);
router.delete("/:id", verifyToken, checkRole(["master", "user", "admin"]), contractController.deleteContract);

module.exports = router;