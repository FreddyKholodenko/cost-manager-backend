//Import mongoose

const mongoose = require("mongoose");

//This model will be used for category fields which will be saved on the database

const categoriesDbSchema = new mongoose.Schema({
    name: String
});
const CategoryController = mongoose.model('Categories', categoriesDbSchema);

module.exports = CategoryController;