import {Issue} from "../Models/Issue.js"
import { Classroom } from "../Models/Classroom.js";

//generate Issue
export const generateIssue = async(req, res) => {
    let classroom = await Classroom.findById(req.params.id);

    if(classroom == null) {
        res.status(404).json({"message" : "Classroom does not exist"});
        return;
    }

    let issue = new Issue(req.body);

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

// delete issue
export const deleteIssue = async(req,res)=>{
    const id=req.params.id;
    try {
        const deleteIssue = await Issue.findByIdAndDelete(id);
        //respond with success message
        res.status(201).json({message:"success", deleteIssue})
    } catch (err) {
        //handle error
        console.log(err);
        res.status(500).json({message:"internal server error"});
    }
}

export const getIssue = async(req,res) =>{
    const id = req.params.id;
    
    try {
        const issue = await Issue.findById(id);
        if(issue == null) {
            res.status(400).json({message:"Issue does not exist"});
        }
        else {
            //respond with success message
            res.status(201).json({message:"success", issue});
        }
    } catch (err) {
        //handle error
        console.log(err);
        res.status(500).json({message:"internal server error"});
    }
}

export const markIssueAsResolved = async(req, res) => {
    const id = req.params.id;
    const issue = await Issue.findById(id);

    if(issue == null) {
        res.status(404).json({"message" : "Issue does not exist"});
        return;
    }

    try {
        issue.isResolved = true;
        issue.save().then(()=>{
            res.status(200).json({ message: "Issue Resolved Successfully" });
        }).catch((err)=>{
            console.log(err);
            res.send("Error Occurred !!! , Couldn't resolve issue");
        });
    } catch (err) {
        res.send("Internal server error");
    }
}

export const markIssueAsNotResolved = async(req, res) => {
    const id = req.params.id;
    const issue = await Issue.findById(id);

    if(issue == null) {
        res.status(404).json({"message" : "Issue does not exist"});
        return;
    }

    try {
        issue.isResolved = false;
        issue.save().then(()=>{
            res.status(200).json({ message: "Issue Marked as Not Resolved Successfully" });
        }).catch((err)=>{
            console.log(err);
            res.send("Error Occurred !!!");
        });
    } catch (err) {
        res.send("Internal server error");
    }
}