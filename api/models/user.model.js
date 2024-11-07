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
    }
    },{timestamps: true} );
    
    const User = mongoose.model('User', userSchema);

    export default User;