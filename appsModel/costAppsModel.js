//Import mongoose

const mongoose = require('mongoose');

//This model will be used for cost fields which will be saved on the database

const costDbSchema = new mongoose.Schema({
    id:String,
    description:String,
    category:String,
    sum:Number,
    date:Date
});
const CostController = mongoose.model('Cost', costDbSchema);

module.exports = CostController;
