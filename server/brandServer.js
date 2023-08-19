const express = require('express');
const router = express.Router();
const FavoriteBrandModel = require("./db/favoritebrand.model");


router.get('/', async (req, res, next) => {
      const brands = await FavoriteBrandModel.find();
      return res.json(brands);
  });

router.get('/:id', async (req, res, next) => {
    console.log("req:", req.params.id);
      const brands = await FavoriteBrandModel.findById(req.params.id);
      return res.json(brands);
  });
  
  router.post("/", async (req, res, next) => {
    const brands = req.body;
  
    try {
      const saved = await FavoriteBrandModel.create(brands);
      return res.json(saved);
    } catch (err) {
      return next(err);
    }
  });
  
  router.delete('/:id', async (req, res, next) => {
    try {
      const brands = await FavoriteBrandModel.findById(req.params.id);
      const deleted = await brands.delete();
      return res.json(deleted);
    } catch (err) {
      return next(err);
    }
  });
  
  
  router.patch('/:id', async (req, res, next) => {
    try {
      const brands = await FavoriteBrandModel.findOneAndUpdate(
        { _id: req.params.id },
        { $set: { ...req.body } },
        { new: true }
      );
      return res.json(brands);
    } catch (err) {
      return next(err);
    }
  });


  module.exports = router;

