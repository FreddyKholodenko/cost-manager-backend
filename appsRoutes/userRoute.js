// Import relevant modules
const express = require('express'); 
const controllerUserFuncs = require('../appsController/userAppsController');

// Invoke express routing
const router  = express.Router();

/*
CRUD API routes for the 'userAppsController' 
*/
router.post('/login',controllerUserFuncs.login);
router.post('/add', controllerUserFuncs.newUser);

router.get('', controllerUserFuncs.getUsers);
router.get('/resetUsers', controllerUserFuncs.resetUsers);

router.put('/update/:userId', controllerUserFuncs.putUser);

router.delete('/delete/:userId', controllerUserFuncs.deleteUser);

module.exports = router;