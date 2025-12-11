import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },

    firstName:{
        type:String,
        required:true
    },

    lastName:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true,
        enum:["admin","customer"], //only these two values are allowed
        default:"customer"
    },

    isBlocked:{//true or false value
        type:Boolean,
        default:false,
        required:true
    },

    isEmailVerified:{
        type:Boolean,
        default:false,
        required:true
    },

    image:{
        type:String,
        default:"/images", //true or false value
        required:true
    }
})

const User = mongoose.model("User", userSchema);
export default User;