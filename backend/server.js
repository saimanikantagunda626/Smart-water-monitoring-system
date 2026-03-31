const express = require("express");
const mongoose = require("mongoose");
const dns = require("dns");
const cors = require("cors");
require("dotenv").config();

/* ===============================
   DNS FIX (for Mongo Atlas issues)
=================================*/
dns.setServers(["8.8.8.8", "1.1.1.1"]);
console.log("🔎 Using DNS servers:", dns.getServers());

const app = express();

/* ===============================
   MIDDLEWARE
=================================*/

// CORS (allow all for now)
app.use(cors({
  origin: "*"
}));

// Parse JSON
app.use(express.json());

// Parse form data
app.use(express.urlencoded({ extended: true }));


/* ===============================
   TEST ROUTES
=================================*/

// Root route (important for Render test)
app.get("/", (req, res) => {
  res.send("🌍 Smart Water Backend Running");
});

// Health check
app.get("/test", (req, res) => {
  res.send("✅ Backend Working");
});


/* ===============================
   DATABASE CONNECTION
=================================*/

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB Connected Successfully"))
.catch(err => console.error("❌ MongoDB Error:", err.message));


/* ===============================
   ROUTES
=================================*/

app.use("/api/water", require("./routes/waterRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));


/* ===============================
   SERVER START (IMPORTANT FIX)
=================================*/

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});