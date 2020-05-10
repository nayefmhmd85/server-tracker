const mongoose = require("mongoose");
const pointSchema = mongoose.Schema({
    timestamp: {
        type: Number
    },
    coords: {
        latitude: {
            type: Number
        },
        longitude: {
            type: Number
        },
        altitude: {
            type: Number
        },
        accuracy: {
            type: Number
        },
        heading: {
            type: Number
        },
        speed: {
            type: Number
        }
    }
});
module.exports = pointSchema;