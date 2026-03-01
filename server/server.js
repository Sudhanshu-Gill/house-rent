const express = require("express");
const cors = require("cors");
require("dotenv").config();

const mongoose = require("mongoose");

const houseRoutes = require("./routes/houseRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/houses", houseRoutes);
app.use("/bookings", bookingRoutes);
app.use("/auth", authRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("House Rent API Running");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});