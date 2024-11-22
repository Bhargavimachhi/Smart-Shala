import {Classroom} from "../Models/Classroom.js"
import {Teacher} from "../Models/Teacher.js"
import {Student} from "../Models/Student.js"

//get Classroom
export const getClassroom = async(req,res)=>{
    const id = req.params.id;
    try {
        const classroom = await Classroom.findById(id);
        if(classroom == null) {
            res.status(400).json({message:"Classroom does not exist"});
        }
        else {
            //respond with success message
            res.status(201).json({message:"success", classroom});
        }
    } catch (err) {
        //handle error
        console.log(err);
        res.status(500).json({message:"internal server error"});
    }
}

//get all classrooms
export const getAllClassrooms = async(req,res)=>{
    try {
        const classrooms = await Classroom.find({});
        res.status(201).json({message:"success",classrooms})
    } catch (err) {
        //handle error
        console.log(err)
        res.status(500).json({message:"internal server error"})
    }
}

//assign teacher
export const assignTeacher = async(req,res) => {
    let teachers = await Teacher.find({email : req.body.email});
    let classroom = await Classroom.find({_id : req.body.id});

    if(teachers.length == 0) {
        res.status(404).json({"message" : "Teacher does not exist"});
        return;
    }

    if(classroom.length == 0) {
        res.status(404).json({"message" : "Classroom does not exist"});
        return;
    }

    if(classroom[0].teachers.includes(teachers[0]._id)) {
        res.status(404).json({"message" : "Teacher already exist"});
        return;
    }

    classroom[0].teachers.push(teachers[0]._id);

    classroom[0].save().then(()=>{
        res.status(200).json({ message: "Teacher Assigned to Classroom Successfully" });
    }).catch((err)=>{
        console.log(err);
        res.send("Error Occurred !!! , Couldn't Assign teacher to the classroom");
    });
}

//assign student
export const assignStudent = async(req,res) => {
    let students = await Student.find({email : req.body.email});
    let classroom = await Classroom.find({_id : req.body.id});

    if(students.length == 0) {
        res.status(404).json({"message" : "Student does not exist"});
        return;
    }

    if(classroom.length == 0) {
        res.status(404).json({"message" : "Classroom does not exist"});
        return;
    }

    if(classroom[0].students.includes(students[0]._id)) {
        res.status(404).json({"message" : "Student already exist"});
        return;
    }

    classroom[0].students.push(students[0]._id);

    classroom[0].save().then(()=>{
        res.status(200).json({ message: "Student Assigned to Classroom Successfully" });
    }).catch((err)=>{
        console.log(err);
        res.send("Error Occurred !!! , Couldn't Assign student to the classroom");
    });
}

export const getClassroomName = async(id) => {
    let classroom = await Classroom.findById(id);

    if(classroom == null) {
        return "No classroom found";
    }
    return classroom.name;
}