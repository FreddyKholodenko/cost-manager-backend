// Import the relevant modules
const express = require('express'); 
const controllerCostFuncs = require('../appsController/costAppsController');

// Invoke express routing
const router  = express.Router();

//CRUD API routes for the 'costAppsController' 

router.put('/updateItemCost/:costId', controllerCostFuncs.updateItemCost);

router.delete('/deleteOneItemCost/:costId', controllerCostFuncs.deleteOneItemCost);
router.delete('/DeleteAllCosts/:userId', controllerCostFuncs.DeleteAllCosts);

router.post('/addItemCost', controllerCostFuncs.addItemCost);

router.get('/getItemCosts/:userId', controllerCostFuncs.getItemCosts);
router.get('/getCostsReportByDate/:fromDate/:toDate', controllerCostFuncs.getCostsReportByDate);

module.exports = router;




