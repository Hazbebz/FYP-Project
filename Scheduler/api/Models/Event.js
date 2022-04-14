const mongoose = require("mongoose");

//event Shcema with start, end and ttle exported as a model.
const EventSchema = mongoose.Schema({
    start:Date,
    end:Date,
    title:String,
})

const Event = mongoose.model("Event",EventSchema);
//export model 
module.exports = Event;