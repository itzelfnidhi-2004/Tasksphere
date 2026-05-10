const express = require("express");

const {
  protect,
  adminOnly,
} = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/private", protect, (req, res) => {
  res.json({
    message: "Private Route Accessed",
  });
});

router.get("/admin", protect, adminOnly, (req, res) => {
  res.json({
    message: "Welcome Admin",
  });
});

module.exports = router;