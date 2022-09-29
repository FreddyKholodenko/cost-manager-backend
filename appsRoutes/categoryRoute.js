// Import the relevant modules
const express = require('express'); //import express
const controllerCategoryFuncs = require('../appsController/categoryAppsController');

// Invoke express routing
const router  = express.Router();

//CRUD API routes for the 'categoryAppsController' 

router.put('/updateCategory/:categoryId', controllerCategoryFuncs.updateCategory);

router.post('/addNewCategory', controllerCategoryFuncs.addNewCategory);

router.delete('/deleteOneCategory/:categoryId', controllerCategoryFuncs.deleteOneCategory);
router.delete('/deleteAllCategories', controllerCategoryFuncs.deleteAllCategories);

router.get('/getCategoriesData', controllerCategoryFuncs.getCategoriesData);

module.exports = router;
