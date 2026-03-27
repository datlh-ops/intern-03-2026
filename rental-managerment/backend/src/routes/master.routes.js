const express = require("express");
const router = express.Router();
const masterController = require("../controllers/master.controller");

router.post("/", masterController.createMaster.bind(masterController));
router.post("/get", masterController.getMasterByIdBody.bind(masterController));
router.get("/", masterController.getAllMasters.bind(masterController));
router.get("/:id", masterController.getMasterById.bind(masterController));
router.put("/:id", masterController.updateMaster.bind(masterController));
router.delete("/:id", masterController.deleteMaster.bind(masterController));

module.exports = router;