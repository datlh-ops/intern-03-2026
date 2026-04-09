const express = require("express");
const router = express.Router();
const masterController = require("../controllers/master.controller");
const { uploadCloud } = require("../config/cloudinary");
const { verifyToken, checkRole } = require("../middleware/auth.middleware");
const validate = require("../middleware/validation.middleware");
const masterDto = require("../dtos/master.dto");

router.post("/", verifyToken, checkRole(["master"]), validate(masterDto.profileSchema), masterController.createMaster.bind(masterController));
router.post("/get", verifyToken, checkRole(["master"]), masterController.getMasterByIdBody.bind(masterController));
router.get("/", verifyToken, checkRole(["admin"]), masterController.getAllMasters.bind(masterController));
router.get("/:id", verifyToken, checkRole(["master", "admin"]), masterController.getMasterById.bind(masterController));
router.get("/:id/stats", verifyToken, checkRole(["master", "admin"]), masterController.getDashboardStats.bind(masterController));
router.put("/:id", verifyToken, checkRole(["master", "admin"]), uploadCloud.single("image"), validate(masterDto.profileSchema), masterController.updateMaster.bind(masterController));
router.delete("/:id", verifyToken, checkRole(["master", "admin"]), masterController.deleteMaster.bind(masterController));

module.exports = router;