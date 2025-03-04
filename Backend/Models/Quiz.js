import mongoose from 'mongoose';

let quizSchema = new mongoose.Schema({
    isOMR : {
        type : Boolean,
        default : false
    },
    questions :{
        type : [{
            question : String,
            answer : String,
        }],
        default :[]
    },
    totalMarks : {
        type : Number,
        required : true
    }
});

export const Quiz = mongoose.model("Quiz", quizSchema);