/* global use, db */
// MongoDB Playground
// To disable this template go to Settings | MongoDB | Use Default Template For Playground.
// Make sure you are connected to enable completions and to be able to run a playground.
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.
// The result of the last command run in a playground is shown on the results panel.
// By default the first 20 documents will be returned with a cursor.
// Use 'console.log()' to print to the debug output.
// For more documentation on playgrounds please refer to
// https://www.mongodb.com/docs/mongodb-vscode/playgrounds/

// Select the database to use.
use('test');



// db.getCollection('employees').aggregate([
//     {
//         $group: {
//             _id: null,
//             average: {
//                 $avg: "$salary"
//             },
//             sum: {
//                 $sum: "$salary"
//             }
//         }
//     }
// ])

// db.getCollection('employees').aggregate([
//     {
//         $group: {
//             _id: null,         
//             minSalary: { $min: "$salary" }, 
//             maxSalary: { $max: "$salary" }  
//         }
//     }
// ])

// db.getCollection('employees').aggregate([
//     {
//         $group: {
//             _id: null,
//             averageSalary: { $avg: "$salary" }, 
//             averageDesiredSalary: { $avg: "$desiredSalary" } 
//         }
//     },
//     {
//         $project: {
//             _id: 0, 
//             salaryDifference: { $subtract: ["$averageSalary", "$averageDesiredSalary"] } 
//         }
//     }
// ])

db.getCollection('employees').aggregate([
   
    {
        $project: {
            _id: 1,
            name: 1,
            salary: 1,
            desiredSalary: 1,
            salaryDifference: { $subtract: ["$salary", "$desiredSalary"] }
        }
    }
])

// $add: , $multiply , $divide

// db.getCollection('employees').count()




// aggregate([
//   // Find all of the sales that occurred in 2014.
//   { $match: { date: { $gte: new Date('2014-01-01'), $lt: new Date('2015-01-01') } } },
//   // Group the total sales for each product.
//   { $group: { _id: '$item', totalSaleAmount: { $sum: { $multiply: [ '$price', '$quantity' ] } } } }
// ]);
