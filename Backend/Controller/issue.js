import {Issue} from "../Models/Issue.js"
import { Classroom } from "../Models/Classroom.js";

//generate Issue
export const generateIssue = async(req, res) => {
    let classroom = await Classroom.findById(req.params.id);

    if(classroom == null) {
        res.status(404).json({"message" : "Classroom does not exist"});
        return;
    }

    let issue = new Issue({
        description : req.body.description,
        severity : req.body.severity,
        classroom : classroom._id
    });

    classroom.issues.push(issue._id);

    classroom.save().then(()=>{
        console.log("Issue Added to classroom Successfully");
    }).catch((err)=>{
        console.log(err);
        res.send("Error Occurred !!! , Couldn't generate issue");
    });

    issue.save().then(()=>{
        res.status(200).json({ message: "Issue generated Successfully" });
    }).catch((err)=>{
        console.log(err);
        res.send("Error Occurred !!! , Couldn't generate issue");
    });

}