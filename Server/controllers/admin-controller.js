const User = require('../models/user-model');
const Contact = require('../models/contact-model');
const Service = require("../models/service-model");


// Services
const getAllServices = async (req, res) => {
    try {
        const services = await Service.find();
        if(!services || services.length === 0){
            res.status(404).json({message: "No Service were Found"});
        }
        res.status(200).json(services);

    } catch (error) {
        console.log("admin error", error);
    }
};

const deleteServiceById = async (req,res) => {
    try {
        const id = req.params.id;
        await Service.deleteOne({_id: id});
        return res.status(200).json({message: "Contact Deleted Successful"});
    } catch (error) {
        next(error);
    }
};

const getServiceById = async (req,res) => {
    try {
        const id = req.params.id;
        const data = await Service.findOne({_id: id});
        return res.status(200).json(data);
    } catch (error) {
        next(error);
    }
}

const updateServiceById = async (req, res) => {
    try {
        const id = req.params.id;
        const updateServiceData = req.body;

        const updateSerData = await Service.updateOne({_id:id}, {
            $set: updateServiceData,
        });

        return res.status(200).json(updateSerData);

    } catch (error) {
        next(error)
    }
};

// Get all User Details

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({},{ password: 0 });
        if(!users || users.length === 0){
            res.status(404).json({message: "No Users were Found"});
        }
        res.status(200).json(users);

    } catch (error) {
        console.log("admin error", error);
    }
};


// Edit Single User Logic

const getUserById = async (req,res) => {
    try {
        const id = req.params.id;
        const data = await User.findOne({_id: id}, {password: 0});
        return res.status(200).json(data);
    } catch (error) {
        next(error);
    }
}


// User Update Logic

const updateUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const updateUserData = req.body;

        const updateData = await User.updateOne({_id:id}, {
            $set: updateUserData,
        });

        return res.status(200).json(updateData);

    } catch (error) {
        next(error)
    }
};

// delete user logic
//  It Delet Single User Data

const deleteUserById = async (req,res) => {
    try {
        const id = req.params.id;
        await User.deleteOne({_id: id});
        return res.status(200).json({message: "User Deleted Successful"});
    } catch (error) {
        next(error);
    }
}

// Get all Contact Details

const getAllContacts = async(req, res) => {
    try {
        const contacts = await Contact.find();
        if(!contacts || contacts.length === 0){
            res.status(404).json({message: "No Contacts were Found"});
        }
        res.status(200).json(contacts);
        
    } catch (error) {
        next(error);
    }
};


// Delete Contact 

const deleteContactsById = async (req,res) => {
    try {
        const id = req.params.id;
        await Contact.deleteOne({_id: id});
        return res.status(200).json({message: "Contact Deleted Successful"});
    } catch (error) {
        next(error);
    }
}


module.exports = {getAllUsers, getUserById, updateUserById, getAllContacts, deleteUserById, deleteContactsById,
     getAllServices, deleteServiceById, updateServiceById, getServiceById};