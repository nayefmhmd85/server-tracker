const mongoose = require("mongoose");
const pointSchema = require("./Point");
const trackSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    name: {
        type: String,
        default: ""
    },
    locations: [pointSchema]
});
mongoose.model("Track", trackSchema);