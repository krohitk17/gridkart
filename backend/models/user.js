const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  totalRewards: {
    type: Number,
    default: 0,
  },
  events: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
    },
  ],
  stake: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("User", userSchema);
