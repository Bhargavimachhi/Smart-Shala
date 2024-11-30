import {Teacher} from "../Models/Teacher.js"
import { Classroom } from "../Models/Classroom.js";

export const addTeacher = async(req, res) => {
    let teacher = await Teacher.find({email : req.body.email});

    if(teacher.length > 0) {
        res.status(403).json({"message":"Teacher already exists"});
        return;
    }

    teacher = new Teacher({
        name : req.body.name,
        email : req.body.email,
        password : req.body.password
    });

    teacher.save().then(()=>{
        console.log("New Teacher Added Successfully");
        res.status(200).json({ message: "New Teacher Added Successfully" });
    }).catch((err)=>{
        res.send("Error Occurred !!! , Couldn't Add new Teacher");
    });
}

//get Teacher
export const getTeacher = async(req,res)=>{
    const id = req.params.id;
    try {
        const teacher = await Teacher.findById(id);

        if(teacher == null) {
            res.status(403).json({message:"Teacher does not exist"});
        }
        else {
            //respond with success message
            res.status(201).json({message:"success", teacher});
        }
    } catch (err) {
        //handle error
        console.log(err);
        res.status(500).json({message:"internal server error"});
    }
}

//get all teachers
export const getAllTeachers = async(req,res)=>{
    try {
        const teachers = await Teacher.find({});
        res.status(201).json({message:"success", teachers});
    } catch (err) {
        //handle error
        console.log(err);
        res.status(500).json({message:"internal server error"});
    }
}

// delete teacher
export const deleteTeacher = async(req,res)=>{
    const id=req.params.id;
    try {
        const deleteTeacher = await Teacher.findByIdAndDelete(id);
        //respond with success message
        res.status(201).json({message:"success", deleteTeacher})
    } catch (err) {
        //handle error
        console.log(err);
        res.status(500).json({message:"internal server error"});
    }
}

//get classrooms associated with teacher
export const getClassroomsOfTeacher = async(req, res) => {
    let id = req.params.id;
    let teacher = await Teacher.findById(id);

    if(teacher == null) {
        res.status(404).json({"message":"Teacher does not exist"});
    }
    else {
        let classrooms = [];

        for (let i=0; i<teacher.classrooms.length; i++){
            let classroom = await Classroom.findById(teacher.classrooms[i]);
            if(classroom) {
                classrooms.push(classroom);
            }
        }
        res.status(201).json({message:"success", classrooms});
    }
}