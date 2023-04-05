import mongoose from "mongoose";

export const UserSchema = new mongoose.Schema({
    username    :{
        type        : String,
        required    : [true, "Please enter a unique username"],
        unique      : [true,"Username exists"]
    },
    password   :{
        type        : String,
        required    : [true, "Please enter a password"],
        unique      : false,
    },
    email       :{
            type        : String,
            required    : [true, "Please enter a unique email"],
            unique      : true,
    },
    firstName   :{type: String},
    lastName    :{type: String},
    mobile      :{type: String},
    address     :{type: String},
    profile     :{type: String},
});

export default mongoose.model.Users || mongoose.model("User", UserSchema); // if found return that other wise create new model