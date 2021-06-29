const mongoose = require("mongoose");
const { String, Number } = mongoose.Schema.Types;
const DataSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  time: String,
  foodType: String,
  location: String,
  coordinates: mongoose.Schema.Types.Mixed,
  number: Number,
  amount: Number,
});

module.exports = mongoose.model("Data", DataSchema);
