const express = require("express");
const router = express.Router();
const CompanyModel = require("./db/company.model");


router.get("/", async (req, res) => {
  const company = await CompanyModel.find();
  return res.json(company);
});


router.post("/", async (req, res) => {
  
  try {
    const company = req.body;
    console.log("company:", company)
    // console.log("company:", company)
    const saved = await CompanyModel.create(company);
    return res.json(saved);
  } catch (error) {
    console.log("Error on company route:", error);
  }

});

// router.post('/', async (req, res, next) => {
// const equipment = req.body;
// try {
// const saved = await EquipmentModel.create(equipment);
// return res.json(saved);
// } catch (err) {
// return next(err);
// }
// });

module.exports = router;
