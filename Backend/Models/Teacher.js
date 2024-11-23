import mongoose from 'mongoose';
import joi from 'joi';

let teacherSchema = new mongoose.Schema({
    email :{
        type : String,
        required : true,
        unique : true,
    },
    password :{
        type : String,
        required : true
    },
    name :{
        type : String,
        required : true
    },
    classrooms: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Classroom',
        default: []
    }],
    subjects : {
        type : [String],
        default : []
    },
    contact :{
        type : Number,
        min : 1000000000,
        max : 9999999999,
        default : null
    },
    address : {
        type : String,
        default : null
    }
});

export const Teacher = mongoose.model("Teacher", teacherSchema);

export const teacherSchemaValidation = joi.object({
    email : joi.string().required(),
    name : joi.string().required(),
    password : joi.string().required(),
    contact : joi.number().max(1000000000).min(999999999)
});