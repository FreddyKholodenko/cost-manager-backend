//import relevant module

const categoryModel = require("../appsModel/categoryAppsModel");

//This method updates an existing category

const updateCategory = async (req, res) => {
    try {
        //Extracts fields

        const { categoryId } = req.params;
        const { name } = req.body;
        await categoryModel.updateOne({ _id: categoryId }, { name });
        const updatedCategory = await categoryModel.find({_id: categoryId });

        res.status(201).json(updatedCategory);
    } catch (e) {
        res.status(500).json(e);
    }

};

//This method is used to add a new category

const addNewCategory = async (req, res) => {
    try {
        //Extracts field
        const  {name}  = req.body;
        const userCategory = new categoryModel({ name });

        //Saves the new added category
        userCategory.save((err, userCategory) => {
            res.send(userCategory);
        })
    }catch (e) {
        res.status(500).json(e);
    }

};

//This method deletes an existing category

const deleteOneCategory = async (req, res) => {
    try {
        //Extracts field
        const { categoryId } = req.params;
        await categoryModel.deleteOne({ _id: categoryId });

        //Displays message that the category delete was succssesful
        res.status(200).json("Category deleted successfully");

    }catch (e) {
        res.status(500).json(e);
    }

};

//This method deletes all categories and initialize default categories that we set

const deleteAllCategories = async (req, res) => {
    try {
        //Deletes all categories in the database
        await categoryModel.deleteMany({});

        res.status(200).json('Deleted All Categories!');
    } catch (e) {
        res.status(500).json(e);
    }
};

//This method returns all categories that are in mongoDB

const getCategoriesData = async (req, res) => {
    try {
        //Locates all categories from mongoDB
        const categories = await categoryModel.find({});

        if (categories) {
            res.status(200).send(categories);
        } else {
            res.status(204).json('There are no categories');
        }
    } catch (e) {
        res.status(500).json(e);
    }

};

module.exports = {updateCategory, addNewCategory, deleteOneCategory, deleteAllCategories, getCategoriesData };