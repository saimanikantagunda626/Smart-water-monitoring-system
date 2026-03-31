const mongoose = require("mongoose");

const PracticeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },

  // 🔥 FULL ARTICLE TEXT
  description: {
    type: String,
    required: true
  },

  // Optional image
  image: {
    type: String,
    default: ""
  }

}, { timestamps: true });

module.exports = mongoose.model("Practice", PracticeSchema);