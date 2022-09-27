// Required module imports 
 const express = require('express');
 const mongoose = require('mongoose');
 const cors = require("cors");
 const bodyParser = require('body-parser');
 const CategoryRoute = require('./appsRoutes/categoryRoute');
 const CostRoute = require('./appsRoutes/costRoute');
 const UserRoute = require('./appsRoutes/userRoute');

// Turn on the express server and its functionalities 
 const app = express();
 app.use(bodyParser.json());
 app.use(cors());
 app.use(express.json());


 // The first URL part of the routes
 app.use('/category', CategoryRoute);
 app.use('/user', UserRoute);
 app.use('/cost', CostRoute);
 

 // Mongoose connection to our MongoDB
 const dbUrl = process.env.MongoDB_url || 'mongodb+srv://Fredaniel:1656@cluster0.auheagd.mongodb.net/test';
 
 (async () => {
   console.log(dbUrl);
   const db = await mongoose.connect(dbUrl);
 })().catch(err => console.log(err));
 
 // Listening port 3000
 app.listen(process.env.PORT || 3000, () => {
    console.log("The app is listening on port 3000!!!");
 });
  