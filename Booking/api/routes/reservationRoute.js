var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");


//We require our models that encapsulate our schemas
const Day = require("../Models/day").model;
const Reservation = require("../Models/reservation").model;
//make request to add reservation 
router.post("/", function(req, res, next) {
  Day.find({ date: req.body.date }, (err, days) => {
    //if no native error
    if (!err) {
      if (days.length > 0) {
        let day = days[0];
        day.tables.forEach(table => {
          //Check the correct from the id to the database
          if (table._id == req.body.table) {
            //set new reservation details 
            table.reservation = new Reservation({
              name: req.body.name,
              phone: req.body.phone,
              email: req.body.email
            });
            //set availability to false upon booking
            table.isAvailable = false;
            day.save(err => {
              if (err) {
                console.log(err);
              } else {
                console.log("Reserved");
                res.status(200).send("Added Reservation");
              }
            });
          }
        });
      } else {
        console.log("Day has not been found");
      }
    }
  });
});

module.exports = router;