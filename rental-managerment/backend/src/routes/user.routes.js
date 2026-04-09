const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const { uploadCloud } = require("../config/cloudinary");
const validate = require("../middleware/validation.middleware");
const userDto = require("../dtos/user.dto");
const { verifyToken, checkRole } = require("../middleware/auth.middleware");

router.post("/", userController.createUser);
router.get("/", verifyToken, checkRole(["admin"]), userController.getAllUsers);
router.get("/:id", verifyToken, userController.getUserById);
router.put("/:id", verifyToken, uploadCloud.single("image"), validate(userDto.profileSchema), userController.updateUser);
router.delete("/:id", verifyToken, checkRole(["admin"]), userController.deleteUser);

module.exports = router;