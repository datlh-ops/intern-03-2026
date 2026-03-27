const express = require("express");
const router = express.Router();
const contractController = require("../controllers/contract.controller");
const { checkRole } = require("../middleware/auth.middleware");

router.get("/", contractController.getContracts);
router.post("/", checkRole(["user"]), contractController.createContract);
router.put("/:id", contractController.updateContract);
router.delete("/:id", checkRole(["master", "user"]), contractController.deleteContract);

module.exports = router;