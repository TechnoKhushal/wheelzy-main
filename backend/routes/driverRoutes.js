const express = require("express");
const router = express.Router();

const {
  getDrivers,
  getDriverById
} = require("../controllers/driverController");

// Get all drivers
router.get("/", getDrivers);

// Get driver by ID
router.get("/:id", getDriverById);

module.exports = router;