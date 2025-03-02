const express = require("express");
const authController = require("../controllers/authController");

const router = express.Router();

router.post("/register", authController.register);

router.post("/employee_login", authController.employeeLogin);

router.post("/refresh", authController.refreshAccessToken);

module.exports = router;
