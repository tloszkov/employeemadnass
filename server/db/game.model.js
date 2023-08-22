// https://mongoosejs.com/
const mongoose = require("mongoose");

const { Schema } = mongoose;

const GameSchema = new Schema({
  name: String,
  maxPlayers: Number,
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Game", GameSchema);
