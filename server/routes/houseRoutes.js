const express = require("express");
const router = express.Router();
const House = require("../models/House");

// Add house
router.post("/", async (req, res) => {
  try {
    const house = new House(req.body);
    await house.save();
    res.status(201).json(house);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all houses
router.get("/", async (req, res) => {
  try {
    const houses = await House.find();
    res.json(houses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete house
router.delete("/:id", async (req, res) => {
  try {
    await House.findByIdAndDelete(req.params.id);
    res.json({ message: "House deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;