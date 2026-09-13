const express = require("express");
const router = express.Router();

const {
  getVehicles,
  getVehicleById,
  addVehicle
} = require("../controllers/vehicleController");

// Get all vehicles
router.get("/", getVehicles);

// Get vehicle by ID
router.get("/:id", getVehicleById);

// Add a new vehicle
router.post("/", addVehicle);

module.exports = router;