const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");

// Create booking
router.post("/", async (req, res) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();
    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all bookings (optional for later)
router.get("/", async (req, res) => {
  try {
    const bookings = await Booking.find().populate("propertyId");
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;