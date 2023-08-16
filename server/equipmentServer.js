const express = require('express');
const router = express.Router();
const EquipmentModel = require("./db/equipment.model");
const { parse } = require('dotenv');


// router.use((req,res,next)=>{
//   console.log('You are on equipment router. (for the errors check the server/equipmentServer.js');  
//   next();
// });

router.get('/', async(req,res)=>{

  const {count,page} = req.query;

  if (page === undefined||count===undefined){
    const equipment = await EquipmentModel.find();
    return res.json(equipment);
  }
  
  if (!count||!page) {
    return res.status(400).send({error:"Missing query parameters!"});
  }
  
  const countInt = parseInt(count);
  const pageInt = parseInt(page);
  
  if (isNaN(countInt)||isNaN(pageInt)){
    return res.status(400).send({error:"Invalid query parameters!"});
  }
  
  if (countInt<0 || pageInt<0)
    return res.status(400).send({error:"Query parameters connot contain negativ value!"});

  const resultCount = await EquipmentModel.count();
  const equipment = await EquipmentModel.find().skip(pageInt).limit(countInt);
  
  return res.send({equipment,resultCount})
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