import {Teacher} from "../Models/Teacher.js"

export const addTeacher = (req, res) => {
    let teacher = new Teacher({
        name : req.body.name,
        email : req.body.email,
        password : req.body.password
    });

    teacher.save().then(()=>{
        console.log("New Teacher Added Successfully");

        // We will check if this message comes when we add a new teacher.
        // If yes , then we redirect user to teacher page

        res.status(200).json({ message: "New Teacher Added Successfully" });

        // Aae redirect thi server side redirect thase not from client
        // res.redirect("/teacher");
    }).catch((err)=>{
        res.send("Error Occurred !!! , Couldn't Add new Teacher");
    });
}