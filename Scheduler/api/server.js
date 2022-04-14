require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

//mongoDb connection
mongoose
    .connect(process.env.url,{
        useUnifiedTopology:true,
        useNewUrlParser:true   
},() => console.log("connected to MongoDB"));

//route and controller
app.use("/api/calendar", require("./Controllers/CalendarController"));

//listen on port 5000
app.listen(5000,() => {
    console.log("Server has started "); 
});