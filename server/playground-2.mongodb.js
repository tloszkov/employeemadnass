/* global use, db */
// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

// The current database to use.
use('test');

// Search for documents in the current collection.
db.getCollection('companies')
  .find(
    {
      // $expr: { $gt: [{$toDouble: "$salary"}, {$toDouble: "$desiredSalary"}] }
      // { $expr: { $gt: [{$toDouble: "$salary"}, {$toDouble: "$desiredSalary"}] } }, 
      // { $expr: { $lt: [{$toDouble: "$salary"}, {$toDouble: "$desiredSalary"}] } }, 
      // { $expr: { $gte: [{$toDouble: "$salary"}, {$toDouble: "$desiredSalary"}] } }, 
      // { $expr: { $lte: [{$toDouble: "$salary"}, {$toDouble: "$desiredSalary"}] } }  
      // "name":/Robert/i
      /*
      * Filter
      * fieldA: value or expression
      */
    },
    {
      "name":1,
      // salary:1,
      // desiredSalary:1

      // _id: 1
      /*
      * Projection
      * _id: 0, // exclude _id
      * fieldA: 1 // include field
      */
    }
  )
  .sort({
    // "salary":-1
    /*
    * fieldA: 1 // ascending
    * fieldB: -1 // descending
    */
  })
  // .skip(2).limit(10);
  //limit(3)

// db.getCollection('equipment').count();
