import mongoose from 'mongoose';

let authoritySchema = new mongoose.Schema({
    email :{
        type : String,
        required : true,
        unique : true,
    },
    password :{
        type : String,
        required : true
    },
    schools : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin',
        default: []
    }]
});

export const Authority = mongoose.model("Authority", authoritySchema);