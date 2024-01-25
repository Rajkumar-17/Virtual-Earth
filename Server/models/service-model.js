const {Schema, model} = require("mongoose");

const serviceSchema = new Schema({
    // image: { type: Schema.Types.ObjectId, ref: "image", required: true},
    service:{type:String, required: true},
    description:{type:String, required: true},
    price:{type:String, required: true},
    provider:{type:String, required: true},
});

serviceSchema.methods = async function() {
    try {
        return "Courses Uploded Successsfully";
    } catch (error) {
        next(error);
    }
}
const Service = new model("Service", serviceSchema);

module.exports = Service;