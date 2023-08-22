const express = require('express');
const router = express.Router();
const EmployeeModel = require("./db/employee.model");

router.get('/:employeeId', async(req,res)=>{
    try {
        const employeeId = req.params.employeeId;
        const employee = await EmployeeModel.findById(employeeId);
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

// router.delete('/:employeeId/:kittenName', async (req, res) => {
//     try {
//         const employeeId = req.params.employeeId;
//         const kittenName = req.params.kittenName;
        
//         const employee = await EmployeeModel.findById(employeeId);
//         const kittenIndex = employee.kittens.findIndex(kitten => kitten.name === kittenName);
        
//         employee.kittens.splice(kittenIndex, 1);
//         await employee.save();
//         return res.json(employee);
//     } catch (error) {
//         console.log("Error on delete kitten route:", error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// });

// router.delete('/:employeeId/:kittenID', async (req, res) => {
//     try {
//         const employeeId = req.params.employeeId;
//         const kittenID = req.params.kittenID;
        
//         const employee = await EmployeeModel.findById(employeeId);
        
//         employee.kittens.pull(kittenID);
//         await employee.save();
//         return res.json(employee);
//     } catch (error) {
//         console.log("Error on delete kitten route:", error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// });


module.exports = router;