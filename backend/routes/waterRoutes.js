const router = require("express").Router();
const Water = require("../models/WaterData");
const Practice = require("../models/Practice");

/* ===============================
   WATER ROUTES
=================================*/

// Get all cities
router.get("/cities/all", async (req, res) => {
  const cities = await Water.distinct("city");
  res.json(cities);
});

// Add water data
router.post("/add", async (req, res) => {
  const newData = new Water(req.body);
  await newData.save();
  res.json({ message: "Water data added" });
});


/* ===============================
   PRACTICE ROUTES
=================================*/

// ✅ ADD PRACTICE  ⭐ (YOU WERE MISSING THIS)
router.post("/practice/add", async (req, res) => {
  try {

    console.log(req.body); // DEBUG

    const practice = new Practice({
      title: req.body.title,
      description: req.body.description,
      details: req.body.details,
      image: req.body.image
    });

    await practice.save();

    res.json({
      message: "Practice added successfully",
      practice
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Get all practices
router.get("/practice/all", async (req, res) => {
  const practices = await Practice.find();
  res.json(practices);
});

// Get single practice
router.get("/practice/:id", async (req, res) => {
  try {
    const practice = await Practice.findById(req.params.id);

    if (!practice)
      return res.status(404).json({ message: "Practice not found" });

    res.json(practice);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


/* ===============================
   CITY DATA (LAST ALWAYS)
=================================*/

router.get("/:city", async (req, res) => {
  const data = await Water.find({ city: req.params.city });
  res.json(data);
});

module.exports = router;