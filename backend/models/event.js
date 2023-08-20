const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["task", "reward"],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  count: {
    type: Number,
    default: 0,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  image: {
    type: String,
  },
});

module.exports = mongoose.model("Event", eventSchema);
