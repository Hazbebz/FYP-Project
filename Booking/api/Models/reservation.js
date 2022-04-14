var mongoose = require("mongoose");
//declare reservation schema to contain name, phone, and email
var reservationSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String
});

//Convert scehma to model to be exported
var Reservation = mongoose.model("Reservation", reservationSchema);

//export model and schema for use
module.exports.model = Reservation;
module.exports.schema = reservationSchema;