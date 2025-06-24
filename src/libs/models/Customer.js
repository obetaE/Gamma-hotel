import mongoose, {Schema, models} from "mongoose"

const CustomerSchema = new Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    checkIn: {
        type: Date,
        required: true,
    },
    checkOut: {
        type: Date,
        required: true,
    },
    stayPrice: {
        type: Number,
        required: true,
    },
    guests:{
        type: String,
        default: true,
    },
}, {timestamps: true})

const Customer = models.Customer || mongoose.model("Customer" , CustomerSchema);
export default Customer;