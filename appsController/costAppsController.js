//import relevant modules

const costAppsModel = require("../appsModel/costAppsModel");
const mongoose = require("mongoose");

//This method updates existing cost

const updateItemCost = async (req, res) => {
    try {
        //Extract the "costId" param from the url
        const {costId} = req.params;
        //Extract params
        const {description, sum, category, idNumber, date} = req.body;
        //Update existing costs using the params
        await costAppsModel.updateOne({_id: costId}, {description, sum, category, idNumber, date});
        //Get the updated cost from the db
        const updatedCost = await costAppsModel.find({_id: costId});
        //Prints to the user the updated cost as confirmation that the change was successful 
        res.status(200).json(updatedCost);
    }
    catch (e){
        //Prints an error status for the user
        res.status(500).json(e);
    }
};

//This method deletes specific costs of the given id

const deleteOneItemCost = async (req, res) => {
    try {
        //Extract the "costId" param from the url
        const {costId} = req.params;
        //Delete the speicifc item related to the given id from before
        await costAppsModel.deleteOne({_id: costId});
        //Prints confirmation message to the user that the item was deleted
        res.status(200).json("Item Deleted");
    }
    catch (e){
        //Prints an error status for the user
        res.status(500).json(e);
    }
};

//This method deletes the costs that are connected to one id number 

const deleteAllCostsByIdNumber = async (req, res) => {
    try {
        //Extract the "id" param of user from the url
        const {idNumber} = req.params;
        //Delete everything that is connected to cost collection in mongoDB
        await costAppsModel.deleteMany({idNumber});
        //Prints a message to the client that the reset is done
        res.status(200).json('Deleted all costs!');
    } catch (e) {
        //Prints an error status for the user
        res.status(500).json(e);
    }
};

//This method deletes all costs

const deleteAllCosts = async (req, res) => {
    try {
        //Delete all data in the database
        await costAppsModel.deleteMany({});
        res.status(200).json('Deleted All Costs!');
        
    }
    catch (e) {
        res.status(500).json(e);
    }
};
//This method adds new cost to the database

const addItemCost = async (req, res) => {
    try {
        //Extract params
        const {description, sum, category, idNumber, date} = req.body;
        const newCost =
            new costAppsModel({description, sum, category, idNumber, date});

        //Saves it to the database
        newCost.save((err, newCost) => {
            //Prints to the user the new cost as confirmation that the creation was successful
            res.status(201).json(newCost);
        })
    }
    catch (e){
        //Prints an error message for the user
        res.status(500).json(e);
    }
};


//This method shows all information about the costs that is in the mongoDB

const getItemCosts = async (req, res) => {
    try {
        //Extract the id number param from the url
        const idNumber = req.params;
        //Get information about the costs in the database
        const costs = await costAppsModel.find(idNumber);

        //In case the costs are not null
        if (costs) {
            //Message that returns all of the costs information to the client.
            res.status(200).send(costs);
        } else {
            //Prints error 204
            res.status(204).json('No costs available!');
        }
    }
    catch (e){
        //Prints an error status for the user
        res.status(500).json(e);
    }
};

const getAllCosts = async (req, res) => {
    try {
        //This finds all existing costs from mongoDB
        const costs = await costAppsModel.find({});

        if (costs) {
            res.status(200).send(costs);
        } else {
            res.status(204).json('No costs available');
        }
    }
    catch (e) {
        res.status(500).json(e);
    }
};

//This method gives the user information about each item's cost for each full month

const getCostsReportByDate = async (req, res) => {
    try {
        //Extract the dates params from the url
        const {fromDate, toDate} = req.params;
        //It gives costs report from the selected date range
        const costs = await costAppsModel.find({date: {$gte: fromDate, $lt: toDate}});

        //In case the costs are not null
        if (costs) {
            //Message that returns all of the costs information to the client.
            res.status(200).send(costs);
        } else {
            //Prints error 204
            res.status(204).json('No costs available');
        }
    }
    catch (e){
        //Prints an error status for the user
        res.status(500).json(e);
    }
};

module.exports = {updateItemCost, deleteOneItemCost, deleteAllCostsByIdNumber, deleteAllCosts, addItemCost, getItemCosts, getAllCosts, getCostsReportByDate};