//import relevant module 

const categoryModel = require("../appsModel/categoryAppsModel");

//This method updates an existing category

const updateCategory = async (req, res) => {
    try {
        //Extracts fields
        const { categoryId } = req.params;
        const { categoryName,numberOfItems } = req.body;
        await categoryModel.updateOne({ _id: categoryId },{ categoryName, },
            { numberOfItems } );
        const updatedCategory = await categoryModel.find({_id: categoryId });

        //Prints confirmation text that the category was updated
        res.status(201).json("Category updated!");
    } catch (e) {
        res.status(500).json(e);
    }

};

//This method is used to add a new category

const addNewCategory = async (req, res) => {
    try {
        //Extracts field
        const  {categoryName,numberOfItems}  = req.body;
        const userCategory = new categoryModel({ categoryName, numberOfItems });

        //Saves the new added category
        userCategory.save((err, userCategory) => {
            res.send("Category created!");
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

//This method deletes all categories

const deleteAllCategories = async (req, res) => {
    try {
        //Deletes all categories in the database
        await categoryModel.deleteMany({});
        //Displays message that all categories were deleted
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
module.exports = {updateCategory, addNewCategory, deleteOneCategory,
     deleteAllCategories, getCategoriesData };
