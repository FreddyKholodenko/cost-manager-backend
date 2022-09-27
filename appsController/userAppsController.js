//import relevant modules
const userModel = require("../appsModel/userAppsModel");

//This method adds a new user to the database

const newUser = async (req, res) => {
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
            res.status(200).json(newUser);
        })
    }
    catch (e) {
        res.status(500).json(e);
    }
};

//This method prints all users in mongoDB

const getUsers = async (req, res) => {
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

//This method resets all users in the mongoDB

const resetUsers = async (req, res) => {
    try {
        //Delete all data in the database
        await userModel.deleteMany({});
        res.status(205).json('Users Reset Complete!');
    }
    catch (e) {
        res.status(500).json(e);
    }
};

//This method updates an existing user

const putUser = async (req, res) => {
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

        res.status(201).json(updatedUser);
    }
    catch (e) {
        res.status(500).json(e);
    }
};

//Deletes the user that is in the database

const deleteUser = async (req, res) => {
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

//Method is used for the login proccess, it checks that the user does exist in the database and that the password is correct

const login = async (req,res) => {

    try{
        //Extracts field 
        const { user_name ,password} = req.body;

        let isUserExists = await userModel.findOne({user_name});


        //Prints message that the user doesn't exists if it doesn't exists
        if (isUserExists == null) {
            res.status(404).json("This user does not exists!");
            return;
        }

        //Displays a message if the password is incorrect
        if (isUserExists.password !== password) {
            res.status(401).json("User or password is not valid");
            return;
        }
        //Prints a confirmation message if everything checks in
        res.status(200).json("Logged in successfully!");
    }
    catch (e) {
        res.status(500).json(e);
    }
}

//Method is used in creating new user, updating user or for login

const isUserExists = async (userId, res) => {

    let userToFind = await userModel.findOne({userId});

    if (userToFind !== null) {
        return true;
    }

    return false;
}

module.exports = {login, newUser, resetUsers, getUsers, putUser, deleteUser};