import mongoose from 'mongoose';

let quizSchema = new mongoose.Schema({
    title : {
        type: String,
        required: true
    },
    createdBy : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher',
        required: true,
    },
    classroom : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Classroom',
        required: true,
    },
    isOMR : {
        type : Boolean,
        default : true
    },
    questions :{
        type : [{
            question : String,
            options : [String],
            correctAnswer : String,
            mark: Number,
        }],
        default :[]
    },
    totalMarks : {
        type : Number,
        required : true
    }
});

export const Quiz = mongoose.model("Quiz", quizSchema);