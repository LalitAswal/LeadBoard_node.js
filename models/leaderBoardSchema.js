const connection = require("./mongodbConnection");
const mongoose = require("mongoose");

const leaderboard = new mongoose.Schema(
  {
    username: {
      type: String,
    },
    score: {
      type: Number,
    },
  },

);

const leaderBoard = mongoose.model("leaderboard", leaderboardSchema);

module.exports = leaderBoard;