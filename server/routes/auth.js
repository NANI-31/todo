const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { upload } = require("../config/cloudinary");

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/profile/update", upload.single("image"), authController.profile);
router.post("/profile/verify-old-password", authController.verifyPassword);

module.exports = router;
