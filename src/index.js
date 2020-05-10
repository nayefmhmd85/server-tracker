require("./models/Users");
require("./models/Track");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const trackRoutes = require("./routes/trackRoutes");
const requireAuth = require("./middlewares/requireAuth");
const app = express();
app.use(bodyParser.json());
app.use(authRoutes);
app.use(trackRoutes);
mongoose.connect("mongodb://localhost:27017/tracker", { useNewUrlParser: true, useCreateIndex: true });
mongoose.connection.once("open", () => { console.log("connection has been made") }).on("error", (err) => { console.log("connection error : ", err) });
app.get("/",requireAuth, (request, response) => { 
    response.send({email : request.user.email,password : request.user.password}); 
});
app.listen(3000, () => { console.log("Listening on port 3000") });