const express = require("express");
const router = express.Router();

const {
  createBooking,
  getBookings,
  getUserBookings,
  updateBooking,
  cancelBooking
} = require("../controllers/bookingController");

// Create booking
router.post("/", createBooking);

// Get all bookings
router.get("/", getBookings);

// Get bookings for a specific user
router.get("/user/:userId", getUserBookings);

// Update booking
router.patch("/:id", updateBooking);

// Cancel booking
router.delete("/:id", cancelBooking);

module.exports = router;