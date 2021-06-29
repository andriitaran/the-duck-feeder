const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Data = require("../../models/data");

router.get("/", async (req, res) => {
  try {
    const data = await Data.find();
    return res.status(200).json(data);
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
});

router.post("/", (req, res) => {
  const newData = new Data({
    _id: new mongoose.Types.ObjectId(),
    time: req.body.time,
    foodType: req.body.foodType,
    location: req.body.location,
    coordinates: req.body.coordinates,
    number: req.body.number,
    amount: req.body.amount,
  });
  try {
    newData.save();
    res.status(200).json(newData);
    console.log(newData);
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
});

module.exports = router;
