import { all } from "axios";
import {Student} from "../Models/Student.js"

//add Student
export const addStudent = (req, res) => {
    let student = new Student({
        name : req.body.name,
        email : req.body.email,
        password : req.body.password,
        rollno : req.body.rollno
    });

    student.save().then(()=>{
        console.log("New Student Added Successfully");
        res.status(200).json({ message: "New Student Added Successfully" });
    }).catch((err)=>{
        console.log(err);
        res.send("Error Occurred !!! , Couldn't Add new Student");
    });
}

//get Student
export const getStudent = async(req,res)=>{
    const id = req.params.id;
    try {
        const student = await Student.findById(id);
        //respond with success message
        res.status(201).json({message:"success", student});
    } catch (err) {
        //handle error
        console.log(err);
        res.status(500).json({message:"internal server error"});
    }
}

//get all students
export const getAllStuents = async(req,res)=>{
    try {
        const allUser = await Student.find({});
        console.log(allUser);
        res.status(201).json({message:"success",allUser})
    } catch (err) {
        //handle error
        console.log(err)
        res.status(500).json({message:"internal server error"})
    }
}