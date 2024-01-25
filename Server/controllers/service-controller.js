
const Service = require("../models/service-model");

const services = async (req, res) => {
    try {
        const response = await Service.find();

        if(!response){
            res.status(404).json({msg: "No service found"});
            return ;
        }
        res.status(200).json({ msg: response });
    } catch (error) {
        console.log(`services: ${error}`)
    }
}


const upload = async (req, res) => {
    try {
        const {service, description, price, provider } = req.body;

        const serviceCreated = await Service.create({
            service,
            description,
            price,
            provider,
        });

        res.status(201).json({
            message: "Service added successfully",
            serviceId: serviceCreated._id.toString(),
        });
    } catch (error) {
        next(error)
    }
};


module.exports = {services, upload};