// Import relevant modules
const express = require('express'); 
const controllerUserFuncs = require('../appsController/userAppsController');

// Invoke express routing
const router  = express.Router();

//CRUD API routes for the 'userAppsController' 

router.post('/appsLogin',controllerUserFuncs.appsLogin);
router.post('/addNewUser', controllerUserFuncs.addNewUser);

router.get('/getUsersInfo', controllerUserFuncs.getUsersInfo);

router.put('/updateUserData/:userId', controllerUserFuncs.updateUserData);

router.delete('/deleteAllUsers', controllerUserFuncs.deleteAllUsers);
router.delete('/delete/:userId', controllerUserFuncs.deleteOneUser);

module.exports = router;