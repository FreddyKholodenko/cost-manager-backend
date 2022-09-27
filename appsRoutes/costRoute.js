// Import the relevant modules
const express = require('express'); 
const controllerCostFuncs = require('../appsController/costAppsController');

// Invoke express routing
const router  = express.Router();

/*
CRUD API routes for the 'costAppsController' 
*/
router.put('/update/:costId', controllerCostFuncs.updateCost);

router.delete('/delete/:costId', controllerCostFuncs.deleteCost);

router.post('/add', controllerCostFuncs.newCost);

router.get('/:userId', controllerCostFuncs.getCosts);
router.get('/resetCost/:userId', controllerCostFuncs.resetCosts);
router.get('/report/:fromDate/:toDate', controllerCostFuncs.getCostsReport);

module.exports = router;




