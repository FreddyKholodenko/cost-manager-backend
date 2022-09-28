//import relevant modules
const userModel = require("../appsModel/userAppsModel");

//This method adds a new user to the database

const addNewUser = async (req, res) => {
    try {
        //Extracts the relevant fields
        const {userId, first_name, last_name,user_name, password} = req.body;
        //Checks if the user already exists
        if (await isUserExists(userId, res)) {
            res.status(409).json("User already exists!");
            return;
        }
        
        const newUser = new userModel({userId, first_name, last_name,user_name, password});
        
        //Saves new user to the database
        newUser.save((err, newUser) => {
            console.log(err);
            res.status(200).json("New User Created!");
        })
    }
    catch (e) {
        res.status(500).json(e);
    }
};

//This method prints all users in mongoDB

const getUsersInfo = async (req, res) => {
    try {
        //This finds all existing users from mongoDB
        const users = await userModel.find({});

        if (users) {
            res.status(200).send(users);
        } else {
            res.status(204).json('No users available');
        }
    }
    catch (e) {
        res.status(500).json(e);
    }
};

//This method updates an existing user

const updateUserData = async (req, res) => {
    try {
        //Extract field
        const {userId} = req.params;
        //Extract field
        const {
            first_name, last_name,
            user_name, password
        } = req.body;

        //Checks if user is in the database, if not, then a message will be displayed
         if (! (await isUserExists(userId,res))) {
            res.status(409).json("No such user");
            return;
         }

         //Updates the selected user
        await userModel.updateOne({userId},
            {userId, first_name, last_name,user_name, password});

        const updatedUser = await userModel.findOne({userId});

        res.status(201).json("User updated!");
    }
    catch (e) {
        res.status(500).json(e);
    }
};

//This method deletes all users in the mongoDB

const deleteAllUsers = async (req, res) => {
    try {
        //Delete all data in the database
        await userModel.deleteMany({});
        res.status(200).json('Deleted All Users!');
        
    }
    catch (e) {
        res.status(500).json(e);
    }
};

//Deletes one selected user in the database

const deleteOneUser = async (req, res) => {
    try{
        //Extracts field
        const { userId } = req.params;

        //Shows message that the delete proccess was done successfully
        await userModel.deleteOne({userId });

        res.status(200).json("User deleted");
    }
    catch (e) {
        res.status(500).json(e);
    }
};



//Method is used in creating new user or updating user

const isUserExists = async (userId, res) => {

    let userToFind = await userModel.findOne({userId});

    if (userToFind !== null) {
        return true;
    }

    return false;
}

module.exports = {addNewUser, getUsersInfo, deleteAllUsers, updateUserData, deleteOneUser};