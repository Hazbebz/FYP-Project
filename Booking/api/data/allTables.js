// Processes allTables JSON file into Mongo table objects
var mongoose = require("mongoose");
// We require the table Model and specify it as such
const Table = require("../Models/table").model;
//fs required for reading from alltables.json
const fs = require("fs");

//read file
let tableData = fs.readFileSync(__dirname + "/allTables.json");
//parse table data into object
tableData = JSON.parse(tableData).tables;

let allTables = [];
//for every table in alltables
tableData.forEach(table => {
  allTables.push(new Table(table));
});

module.exports = allTables;