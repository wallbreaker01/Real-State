import mongoose from "mongoose";
import email from "mongoose-type-email";
const userSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true,
        unique: true
       
    },
    email: {
        type: email,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973461_960_720.png"
    },
    },{timestamps: true} );
    
    const User = mongoose.model('User', userSchema);

    export default User;