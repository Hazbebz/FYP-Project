var mongoose = require("mongoose");

//Declare our reservation schema required by our table
const reservationSchema = require("./reservation").schema;

//declare tableSchema
var tableSchema = new mongoose.Schema({
  name: String,//name of table
  capacity: Number,//number of chairs at table
  isAvailable: Boolean,//availability true/false
  location: String,//location "side1,side2,side3"
  reservation: {
    required: false,
    type: reservationSchema
  }
});
//Convert scehma to model to be exported
var Table = mongoose.model("Table", tableSchema);

module.exports.model = Table;
module.exports.schema = tableSchema;