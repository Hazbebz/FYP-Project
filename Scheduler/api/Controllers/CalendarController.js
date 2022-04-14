const router = require('express').Router();
const Event = require('../Models/Event')
const moment = require('moment');

//send event to our Db based on our schema (Event)
router.post('/create-event',async(req,res)=>{
    //send requests
    const event = Event(req.body);
    //wait for save confirmation message
    await event.save();
    res.sendStatus(201);
});

//send request with expected response.
router.get('/get-events', async(req,res)=>{
    //wait for save request confirmation message
    const events = await Event.find({
        start:{$gte:moment(req.query.start).toDate()},
        end:{$lte:moment(req.query.end).toDate()},
    });
    //send events to be used in gui
    res.send(events);
});

module.exports = router;