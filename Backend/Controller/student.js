import {Student} from "../Models/Student.js"

export const addStudent = (req, res) => {
    let student = new Student({
        name : req.body.name,
        email : req.body.email,
        password : req.body.password,
        rollno : req.body.rollno
    });

    student.save().then(()=>{
        res.redirect("/student");
    }).catch((err)=>{
        res.send("Error Occurred !!! , Couldn't Add new Student");
    });
}