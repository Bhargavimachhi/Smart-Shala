import mongoose from 'mongoose';

let studentSchema = new mongoose.Schema({
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
    rollno :{
        type : String,
        required : true
    },
    classroom : {
        type : String,
        default : null
    },
    contact :{
        type : Number,
        min : 1000000000,
        max : 9999999999,
        default : null
    },
    parentContact :{
        type : Number,
        min : 1000000000,
        max : 9999999999,
        default : null
    },
    address : {
        type : String,
        default : null
    },
    enrollmentDate: {
        type: Date,
        default: Date.now
    },
    absentDays: {
        type: [Date],
        default : [],
    }
});

export const Student = mongoose.model("Student", studentSchema);