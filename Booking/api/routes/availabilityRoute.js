var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");

const Day = require("../Models/day").model;

//attempt request to database
router.post("/", function(req, res, next) {
  console.log("A request has been attempted !");

  console.log(req.body);
  const dateT = new Date(req.body.date);

  Day.find({ date: dateT }, (err, docs) => {
    if (!err) {
      if (docs.length > 0) {
        // A record of tables already exists
        console.log("A Record exists !");
        console.log("Documents sent");
        res.status(200).send(docs[0]);
      } else {
        // Searched date does not exist and we have to create it
        const allTables = require("../data/allTables");
        const day = new Day({
          date: dateT,
          tables: allTables
        });
        day.save(err => {
          if (err) {
            res.status(400).send("Error saving new date");
          } else {

            // Saved date and  return all tables (because all are now available)
            console.log("New Datetime Created. Here are the default docs");
            console.log(" Here are the default documents");

            Day.find({ date: dateT }, (err, docs) => {
              err ? res.sendStatus(400) : res.status(200).send(docs[0]);
            });
          }
        });
      }
    } else {
      //send error 400 that request has failed
      res.status(400).send("Could not search for date");
    }
  });
});
//export router for sevrver(app.js)
module.exports = router;