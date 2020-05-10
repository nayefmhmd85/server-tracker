const express = require("express");
const mongoose = require("mongoose");
const requireAuth = require("../middlewares/requireAuth");
const Track = mongoose.model("Track");
const trackRoutes = express.Router();
trackRoutes.use(requireAuth);
trackRoutes.get("/tracks",async(request,response)=>{
    try {
        const tracks = await Track.find({userId : request.user._id});
        response.send(tracks);
    } catch (error) {
        return response.status(422).send({error : error.message});
    }
});
trackRoutes.post("/createTrack",async(request,response)=>{
    try {
        const {name,locations} = request.body;
        if(!name || !locations){
            return response.status(422).send({error : "you must provide name and locations"});
        }
        const track = new Track({userId : request.user._id,name,locations});
        await track.save();
        response.send(track);
    } catch (error) {
        return response.status(422).send({error : error.message});
    }
});
module.exports = trackRoutes;