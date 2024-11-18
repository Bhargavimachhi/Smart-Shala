import mongoose from 'mongoose';

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
    classrooms : {
        type : [String],
        default : [],
    },
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