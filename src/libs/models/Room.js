import mongoose, {Schema, models} from "mongoose"

const RoomSchema = new Schema({
    name:{
        type: String,
        required: true,
    },
    tagline:{
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    amenities: {
        type: [String],
        required: true,
        default: [],
    },
    price: {
        type: Number,
        required: true,
    },
    status:{
        type: Boolean,
        default: true,
    },
    rating: {
        type: Number,
        default: 0,
    },

}, {timestamps: true})

const Room = models.Room || mongoose.model("Room" , RoomSchema);
export default Room;