/*
Loading the .env file and creates environment variables from it
*/
require("dotenv").config();
const mongoose = require("mongoose");
const favoriteBrand = require("./favoriteBrand.json");
const FavoriteBrandModel = require("../db/favoritebrand.model");

const mongoUrl = process.env.MONGO_URL;

if (!mongoUrl) {
  console.error("Missing MONGO_URL environment variable");
  process.exit(1); // exit the current program
}

// const pick = (from) => from[Math.floor(Math.random() * (from.length - 0))];

// const randomAmount = () => Math.floor(Math.random()*100);

const populateFavoriteBrand = async () => {
  await FavoriteBrandModel.deleteMany({});

  const favoriteBrands = favoriteBrand.map((name) => ({
    name,
  }));

  await FavoriteBrandModel.create(...favoriteBrands);
  console.log("Favorite brand created!");
};

const main = async () => {
  await mongoose.connect(mongoUrl);

  await populateFavoriteBrand();

  await mongoose.disconnect();
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
