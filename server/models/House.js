const mongoose = require("mongoose");

const houseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  location: { type: String, required: true },
  description: { type: String }
});

module.exports = mongoose.model("House", houseSchema);