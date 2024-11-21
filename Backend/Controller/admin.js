import {Admin} from "../Models/Admin.js"
import { Classroom } from "../Models/Classroom.js";

//add Admin
export const addAdmin = async(req, res) => {
    let admin = await Admin.find({email : req.body.email});

    if(admin.length > 0) {
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