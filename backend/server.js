const express = require("express");
const mongoose = require("mongoose");
const dns = require("dns");
const cors = require("cors");
require("dotenv").config();

dns.setServers(["8.8.8.8", "1.1.1.1"]);
console.log("🔎 Using DNS servers:", dns.getServers());

const app = express();

/* ===============================
   MIDDLEWARE
=================================*/

// Allow frontend requests
app.use(cors());

// Parse JSON body
app.use(express.json());

// Parse form data (important sometimes)
app.use(express.urlencoded({ extended: true }));


/* ===============================
   TEST ROUTE
=================================*/
app.get("/test", (req, res) => {
  res.send("✅ Backend Working");
});


/* ===============================
   DATABASE CONNECTION
=================================*/
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("✅ MongoDB Connected Successfully"))
.catch(err => console.error("❌ MongoDB Error:", err.message));

/* ===============================
   ROUTES
=================================*/

app.use("/api/water", require("./routes/waterRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));


/* ===============================
   SERVER START
=================================*/
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});