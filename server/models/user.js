const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userScheme = new Schema({
    'facebook':{
        id : String,
        token: String,
        email: String,
        name: String
    },
    'google':{
        id : String,
        token: String,
        email: String,
        name: String
    }
}, {versionKey: false});


module.exports = mongoose.model('User', userScheme);
