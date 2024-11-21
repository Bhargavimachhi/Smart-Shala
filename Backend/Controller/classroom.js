import {Classroom} from "../Models/Classroom.js"

//add classroom
export const addClassroom = (req, res) => {
    let classroom = new Classroom({
        name : req.body.name
    });

    classroom.save().then(()=>{
        console.log("New Classroom Added Successfully");
        res.status(200).json({ message: "New Classroom Added Successfully" });
    }).catch((err)=>{
        console.log(err);
        res.send("Error Occurred !!! , Couldn't Add new Classroom");
    });
}

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