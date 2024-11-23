import {Admin} from "../Models/Admin.js"
import { Classroom } from "../Models/Classroom.js";
import { Student } from "../Models/Student.js";
import { Teacher } from "../Models/Teacher.js";

//add Admin
export const addAdmin = async(req, res) => {
    let admin = await Admin.find({email : req.body.email});

    if(admin && admin.length > 0) {
        res.status(403).json({"message":"Admin already exists"});
        return;
    }

    admin = new Admin({
        name : req.body.name,
        email : req.body.email,
        password : req.body.password
    });

    admin.save().then(()=>{
        res.status(200).json({"message":"success"});
    }).catch((err)=>{
        res.send("Error Occurred !!!");
    });
}

//add classroom to admin portal
export const addClassroomToAdmin = async(req, res) => {
    let admin = await Admin.findById(req.params.id);

    if(admin.length == 0) {
        res.status(404).json({"message":"Admin does not exist"});
        return;
    }
    let classroom = new Classroom({
        name : req.body.name,
        subjects : req.body.subjects,
        endingDate : req.body.endingDate
    });
    classroom.save().then(()=>{
        console.log("New Classroom Added Successfully");
    }).catch((err)=>{
        console.log(err);
    });
    admin.classrooms.push(classroom._id);

    admin.save().then(()=>{
        res.status(200).json({"message":"success"});
    }).catch((err)=>{
        res.send("Error Occurred !!!");
    });
}

//get classrooms associated with admin
export const getClassroomsOfAdmin = async(req, res) => {
    let id = req.params.id;
    let admin = await Admin.findById(id);

    if(admin == null) {
        res.status(404).json({"message":"Admin does not exist"});
    }
    else {
        let classrooms = [];

        for (let i=0; i<admin.classrooms.length; i++){
            let classroom = await Classroom.findById(admin.classrooms[i]);
            if(classroom) {
                classrooms.push(classroom);
            }
        }
        res.status(201).json({message:"success", classrooms});
    }
}

//get students associated with admin
export const getStudentsOfAdmin = async(req, res) => {
    let id = req.params.id;
    let admin = await Admin.findById(id);

    if(admin == null) {
        res.status(404).json({"message":"Admin does not exist"});
    }
    else {
        let students = [];

        for (let i=0; i<admin.students.length; i++){
            let student = await Student.findById(admin.classrooms[i]);
            if(student) {
                students.push(student);
            }
        }
        res.status(201).json({message:"success", students});
    }
}

//get teachers associated with admin
export const getTeachersOfAdmin = async(req, res) => {
    let id = req.params.id;
    let admin = await Admin.findById(id);

    if(admin == null) {
        res.status(404).json({"message":"Admin does not exist"});
    }
    else {
        let teachers = [];

        for (let i=0; i<admin.teachers.length; i++){
            let teacher = await Teacher.findById(admin.classrooms[i]);
            if(teacher) {
                teachers.push(teacher);
            }
        }
        res.status(201).json({message:"success", teachers});
    }
}