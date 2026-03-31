const mongoose = require("mongoose");

const WaterSchema = new mongoose.Schema({
  city: String,
  year: Number,
  month: String,
  usage: Number,
  conserved: Number
});

module.exports = mongoose.model("WaterData", WaterSchema);
