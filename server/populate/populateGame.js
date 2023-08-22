/*
Loading the .env file and creates environment variables from it
*/
require("dotenv").config();
const mongoose = require("mongoose");
const games = require("./gameName.json");
const GameModel = require("../db/game.model");

const mongoUrl = process.env.MONGO_URL;

if (!mongoUrl) {
  console.error("Missing MONGO_URL environment variable");
  process.exit(1); // exit the current program
}

const populateGame = async () => {
  await GameModel.deleteMany({});

  const game = games.map((game) => ({
    name: game.name,
    maxPlayers: game.maxPlayers,
  }));

  await GameModel.create(...game);
  console.log("Game created!");
};

const main = async () => {
  await mongoose.connect(mongoUrl);

  await populateGame();

  await mongoose.disconnect();
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
