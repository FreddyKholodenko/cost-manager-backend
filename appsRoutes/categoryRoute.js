// Import the relevant modules
const express = require('express'); //import express
const controllerCategoryFuncs = require('../appsController/categoryAppsController');

// Invoke express routing
const router  = express.Router();


/*
CRUD API routes for the 'categoryAppsController' 
*/
router.put('/update/:categoryId', controllerCategoryFuncs.putCategory);

router.post('/add', controllerCategoryFuncs.newCategory);

router.delete('/delete/:categoryId', controllerCategoryFuncs.deleteCategory);

router.get('/resetCategories', controllerCategoryFuncs.resetCategories);
router.get('', controllerCategoryFuncs.getCategories);

module.exports = router;