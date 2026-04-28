const express = require("express");
const router = express.Router();
const multer = require("multer");

// STORAGE CONFIG
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

// UPLOAD ROUTE
router.post("/", upload.single("prescription"), (req, res) => {
  console.log("UPLOAD HIT"); 

  res.json({
    message: "Prescription uploaded successfully 📸",
    file: req.file
  });
});

module.exports = router;