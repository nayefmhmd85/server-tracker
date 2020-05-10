const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = mongoose.model("User");
const authRoutes = express.Router();
authRoutes.post("/auth/register", async (request, response) => {
    try {
        const { email, password } = request.body;
        const user = new User({ email : email, password : password});
        await user.save();
        const token = jwt.sign({userId : user._id},"MY_SECRET_KEY");
        response.send({token:token});
    } catch (error) {
        return response.status(200).send({error:error.message});
    }
});
authRoutes.post("/auth/login",async(request,response)=>{
    try {
        const {email,password} = request.body;
        if(!email || !password){
            return response.status(200).send({error:"must provide email and password."});
        }
        const user = await User.findOne({email:email});
        if(!user){
            return response.status(200).send({error:"invalid password or email."});
        }
        try {
            await user.comparePassword(password);
            const token = jwt.sign({userId : user._id},"MY_SECRET_KEY");
            response.send({token:token});
        } catch (error) {
            return response.status(200).send({error:"invalid password or email."});
        }
    } catch (error) {
        return response.status(200).send({error:error.message});
    }
});
module.exports = authRoutes;