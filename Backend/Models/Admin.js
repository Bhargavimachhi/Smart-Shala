import mongoose from 'mongoose';
import joi from 'joi';

let adminSchema = new mongoose.Schema({
    email :{
        type : String,
        required : true,
        unique : true,
    },
    password :{
        type : String,
        required : true
    },
    classrooms : {
        type : [String],
        default : [],
    },
    teachers : {
        type : [String],
        default : [],
    },
    students : {
        type : [String],
        default : [],
    }
});

export const Admin = mongoose.model("Admin", adminSchema);

export const adminSchemaValidation = joi.object({
    email : joi.string().required(),
    password : joi.string().required(),
});