/*
Loading the .env file and creates environment variables from it
*/
require("dotenv").config();
const mongoose = require("mongoose");
const names = require("./names.json");
const levels = require("./levels.json");
const positions = require("./positions.json");
const equipmentID = require("./equipmentID.json");
const color = require("./colors.json");
const favoriteBrandID = require("./favoriteBrandID.json");
const gamesID = require("./gamesID.json");
const companiesID = require("./comaniesID.json");

const EmployeeModel = require("../db/employee.model");


const mongoUrl = process.env.MONGO_URL;

if (!mongoUrl) {
  console.error("Missing MONGO_URL environment variable");
  process.exit(1); // exit the current program
}

const pick = (from) => from[Math.floor(Math.random() * (from.length - 0))];
const missing = () => Math.round(Math.random())?true:false;
const salary = () => Math.round(Math.random()*150+100);

function getRandomDate(startDate, endDate) {
  const timeDiff = endDate.getTime() - startDate.getTime();
  const randomTime = Math.random() * timeDiff;
  const randomDate = new Date(startDate.getTime() + randomTime);
  return randomDate.toLocaleDateString();
}

const startDate = new Date('2000-01-01');
const endDate = new Date();


const populateEmployees = async () => {
  await EmployeeModel.deleteMany({});

  const employees = names.map((name) => ({
    name,
    level: pick(levels),
    position: pick(positions),
    present:missing(),
    favoriteBrand:pick(favoriteBrandID),
    equipment:pick(equipmentID),
    color:pick(color),
    startingDate: getRandomDate(startDate, endDate),
    salary:salary(),
    desiredSalary:salary(),
    favoriteGames:pick(gamesID),
    employeeCompany:pick(companiesID)
  }));

  await EmployeeModel.create(...employees);
  console.log("Employees created");
};

const main = async () => {
  await mongoose.connect(mongoUrl);

  await populateEmployees();

  await mongoose.disconnect();
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
