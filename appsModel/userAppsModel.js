//Import mongoose

const mongoose = require("mongoose");

//This model will be used for user fields which will be saved on the database

const userDbSchema = new mongoose.Schema({
    userId:String,
    first_name:String,
    last_name:String,
    user_name:String,
    password:String
});
const userController = mongoose.model('users', userDbSchema);

module.exports = userController;
