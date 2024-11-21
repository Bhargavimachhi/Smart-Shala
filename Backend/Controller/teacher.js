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

//get Teacher
export const getTeacher = async(req,res)=>{
    const id = req.params.id;
    try {
        const teacher = await Teacher.findById(id);
        //respond with success message
        res.status(201).json({message:"success", teacher});
    } catch (err) {
        //handle error
        console.log(err);
        res.status(500).json({message:"internal server error"});
    }
}

//get all teachers
export const getAllTeachers = async(req,res)=>{
    try {
        const allUser = await Teacher.find({});
        res.status(201).json({message:"success",allUser})
    } catch (err) {
        //handle error
        console.log(err)
        res.status(500).json({message:"internal server error"})
    }
}