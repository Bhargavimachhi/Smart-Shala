import mongoose from 'mongoose';
import joi from 'joi';

let issueSchema = new mongoose.Schema({
    description :{
        type : String,
        required : true,
    },
    severity : {
        type : String,
        enum : ['high', 'medium', 'low'],
        required : true
    },
    classroom : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required : true
    },
    issueDate: {
        type: Date,
        default: Date.now
    }
});

export const Issue = mongoose.model("Issue", issueSchema);

export const issueSchemaValidation = joi.object({
    name : joi.string().required(),
    classroom : joi.object().required(),
    severity : joi.string().required()
});