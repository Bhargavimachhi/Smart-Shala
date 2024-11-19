import {Teacher} from "../Models/Teacher.js"

export const addTeacher = (req, res) => {
    let teacher = new Teacher({
        name : req.body.name,
        email : req.body.email,
        password : req.body.password
    });

    teacher.save().then(()=>{
        res.redirect("/teacher");
    }).catch((err)=>{
        res.send("Error Occurred !!! , Couldn't Add new Teacher");
    });
}