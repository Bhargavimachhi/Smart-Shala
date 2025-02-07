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
    classrooms : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Classroom',
        default: []
    }],
    teachers : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher',
        default: []
    }],
    students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        default: []
    }],
    resources: {
        type: [
            {
                name: { type: String, required: true },
                quantity: { type: Number, required: true }
            }
        ],
        default: []
    },
    requests: {
        type: [
            {
                name: { type: String, required: true },
                quantity: { type: Number, required: true },
                requestedBy : {type: mongoose.Schema.Types.ObjectId, ref: 'Teacher', required: true}
            }
        ],
        default: []
    }
});

export const Admin = mongoose.model("Admin", adminSchema);

export const adminSchemaValidation = joi.object({
    email : joi.string().required(),
    password : joi.string().required(),
    role: joi.string().optional(),
});