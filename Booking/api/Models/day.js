var mongoose = require("mongoose");

//requires table schema to be included for each date of booking
//encapsulates previous schema reservation
const tableSchema = require("./table").schema;

var daySchema = new mongoose.Schema({
  date: Date,//date
  tables: [tableSchema]
});
//convert schema to model 
var Day = mongoose.model("Day", daySchema);

module.exports.model = Day;
module.exports.schema = daySchema;