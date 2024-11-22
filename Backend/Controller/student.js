import {Student} from "../Models/Student.js"

//add Student
export const addStudent = async(req, res) => {
    let student = await Student.find({email : req.body.email});

    if(student.length > 0) {
        res.status(403).json({"message":"Student already exists"});
        return;
    }
    
    student = new Student({
        name : req.body.name,
        email : req.body.email,
        password : req.body.password,
        rollno : req.body.rollno,
        address : req.body.address,
        parentContact : req.body.parentContact
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
        if(student == null) {
            res.status(400).json({message:"student does not exist"});
        }
        else {
            res.status(201).json({message:"success", student});
        }
    } catch (err) {
        //handle error
        console.log(err);
        res.status(500).json({message:"internal server error"});
    }
}

//get all students
export const getAllStuents = async(req,res)=>{
    try {
        const students = await Student.find({});
        res.status(201).json({message:"success", students})
    } catch (err) {
        //handle error
        console.log(err)
        res.status(500).json({message:"internal server error"})
    }
}