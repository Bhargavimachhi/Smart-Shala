import mongoose from 'mongoose';
import joi from 'joi';

let classRoomSchema = new mongoose.Schema({
    name :{
        type : String,
        required : true,
    },
    students : {
        type : [String],
        default : []
    },
    teachers : {
        type : [String],
        default : []
    },
    subjects : {
        type : [String],
        default : []
    },
    startingDate: {
        type: Date,
        default: Date.now
    },
    endingDate: {
        type: Date,
        default: Date.now
    }
});

export const Classroom = mongoose.model("Classroom", classRoomSchema);

export const classRoomSchemaValidation = joi.object({
    name : joi.string().required()
});