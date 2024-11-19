import {Student} from "../Models/Student.js"

export const addStudent = (req, res) => {
    let student = new Student({
        name : req.body.name,
        email : req.body.email,
        password : req.body.password,
        rollno : req.body.rollno
    });

    student.save().then(()=>{
        console.log("New Student Added Successfully");

        // We will check if this message comes when we add a new student.
        // If yes , then we redirect user to student page

        res.status(200).json({ message: "New Student Added Successfully" });

        // Aae redirect thi server side redirect thase not from client
        // res.redirect("/student");
    }).catch((err)=>{
        console.log(err);
        res.send("Error Occurred !!! , Couldn't Add new Student");
    });
}