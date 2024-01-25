const {Schema, model} = require("mongoose");

const contactSchema = new Schema({
    username: {type: String, required: true },
    email: {type: String, required: true},
    message: { type: String, required: true},
});


contactSchema.methods = async function() {
    try{
        return "message send successful";
    } catch(error) {
        next(error);
    }
};

const Contact = new model('Contact', contactSchema);
module.exports = Contact;