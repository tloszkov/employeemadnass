const express = require('express');
const router = express.Router();
const EquipmentModel = require("./db/equipment.model");


// router.use((req,res,next)=>{
//   console.log('You are on equipment router. (for the errors check the server/equipmentServer.js');  
//   next();
// });

router.get('/', async(req,res)=>{
  const equipment = await EquipmentModel.find().sort({ created: "desc" });
  return res.json(equipment);
});

router.get('/:id', async (req, res, next) => {
  console.log("req:", req.params.id);
    const equipment = await EquipmentModel.findById(req.params.id);
    return res.json(equipment);
});

router.post("/", async (req, res, next) => {
  const equipment = req.body;

  try {
    const saved = await EquipmentModel.create(equipment);
    return res.json(saved);
  } catch (err) {
    return next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const equipment = await EquipmentModel.findById(req.params.id);
    const deleted = await equipment.delete();
    return res.json(deleted);
  } catch (err) {
    return next(err);
  }
});


router.patch('/:id', async (req, res, next) => {
  try {
    console.log("patch ag!");
    const equipment = await EquipmentModel.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { ...req.body } },
      { new: true }
    );
    return res.json(equipment);
  } catch (err) {
    return next(err);
  }
});

module.exports = router;