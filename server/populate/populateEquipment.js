/*
Loading the .env file and creates environment variables from it
*/
require("dotenv").config();
const mongoose = require("mongoose");
const equipmentNames = require("./equipmentNames.json");
const equipmentType = require("./equipmentTypes.json");
const EquimentModel = require("../db/equipment.model");

const mongoUrl = process.env.MONGO_URL;

if (!mongoUrl) {
  console.error("Missing MONGO_URL environment variable");
  process.exit(1); // exit the current program
}

const pick = (from) => from[Math.floor(Math.random() * (from.length - 0))];

const randomAmount = () => Math.floor(Math.random()*100);

const populateEquipment = async () => {
  await EquimentModel.deleteMany({});

  const equipment = equipmentNames.map((name) => ({
    name,
    type: pick(equipmentType),
    amount: randomAmount(),
  }));

  await EquimentModel.create(...equipment);
  console.log("Equipment created!");
};

const main = async () => {
  await mongoose.connect(mongoUrl);

  await populateEquipment();

  await mongoose.disconnect();
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
