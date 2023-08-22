
const express = require('express');
const router = express.Router();
const GameModel = require("./db/game.model");
const EmployeeModel = require("./db/employee.model");

router.get('/:employeeId', async(req,res)=>{
    try {
        const employeeId = req.params.employeeId;
        const employee = await EmployeeModel.findById(employeeId)
        .populate({
            path:"favoriteGames"
        });
        return res.json(employee);
    } catch (error) {
        console.log("Error on kittens route:", error)
    }
});

router.post('/:employeeId', async (req,res)=>{
    try {
        const id = req.params.employeeId;
        const {name,weight} = req.body;
        const employee = await EmployeeModel.findById(id);
        employee.kittens.push({ name: name, weight: weight });
        await employee.save();
        return res.json(employee);
    } catch (error) {
        console.log("Error on kittens route:", error)
    }
});

module.exports = router;