// Import the relevant modules
const express = require('express'); 
const controllerCostFuncs = require('../appsController/costAppsController');

// Invoke express routing
const router  = express.Router();

//CRUD API routes for the 'costAppsController' 

router.put('/updateItemCost/:costId', controllerCostFuncs.updateItemCost);

router.delete('/deleteOneItemCost/:costId', controllerCostFuncs.deleteOneItemCost);
router.delete('/deleteAllCostsByIdNumber/:idNumber', controllerCostFuncs.deleteAllCostsByIdNumber);
router.delete('/deleteAllCosts', controllerCostFuncs.deleteAllCosts);

router.post('/addItemCost', controllerCostFuncs.addItemCost);

router.get('/getItemCosts/:idNumber', controllerCostFuncs.getItemCosts);
router.get('/getAllCosts', controllerCostFuncs.getAllCosts);
router.get('/getCostsReportByDate/:fromDate/:toDate', controllerCostFuncs.getCostsReportByDate);

module.exports = router;




