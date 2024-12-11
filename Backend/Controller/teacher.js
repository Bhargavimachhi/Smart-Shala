import {Teacher} from "../Models/Teacher.js"
import { Classroom } from "../Models/Classroom.js";
import { Homework } from "../Models/Homework.js";
import {Student} from "../Models/Student.js";
import nodemailer from 'nodemailer';

export const addTeacher = async(req, res) => {
    let teacher = await Teacher.find({email : req.body.email});

    if(teacher.length > 0) {
        res.status(403).json({"message":"Teacher already exists"});
        return;
    }

    teacher = new Teacher(req.body);

    teacher.save().then(()=>{
        console.log("New Teacher Added Successfully");
        res.status(200).json({ message: "New Teacher Added Successfully" });
    }).catch((err)=>{
        res.send("Error Occurred !!! , Couldn't Add new Teacher");
    });
}

//get Teacher
export const getTeacher = async(req,res)=>{
    const id = req.params.id;
    try {
        const teacher = await Teacher.findById(id);

        if(teacher == null) {
            res.status(403).json({message:"Teacher does not exist"});
        }
        else {
            //respond with success message
            res.status(201).json({message:"success", teacher});
        }
    } catch (err) {
        //handle error
        console.log(err);
        res.status(500).json({message:"internal server error"});
    }
}

//get all teachers
export const getAllTeachers = async(req,res)=>{
    try {
        const teachers = await Teacher.find({});
        res.status(201).json({message:"success", teachers});
    } catch (err) {
        //handle error
        console.log(err);
        res.status(500).json({message:"internal server error"});
    }
}

// delete teacher
export const deleteTeacher = async(req,res)=>{
    const id=req.params.id;
    try {
        const deleteTeacher = await Teacher.findByIdAndDelete(id);
        //respond with success message
        res.status(201).json({message:"success", deleteTeacher})
    } catch (err) {
        //handle error
        console.log(err);
        res.status(500).json({message:"internal server error"});
    }
}

//get classrooms associated with teacher
export const getClassroomsOfTeacher = async(req, res) => {
    let id = req.params.id;
    let teacher = await Teacher.findById(id);

    if(teacher == null) {
        res.status(404).json({"message":"Teacher does not exist"});
    }
    else {
        let classrooms = [];

        for (let i=0; i<teacher.classrooms.length; i++){
            let classroom = await Classroom.findById(teacher.classrooms[i]);
            if(classroom) {
                classrooms.push(classroom);
            }
        }
        res.status(201).json({message:"success", classrooms});
    }
}

//get assigned homeworks of teacher
export const getHomeworkAssignedByTeacher = async(req,res) => {
    const id = req.params.id;
    const teacher = await Teacher.findById(id);

    if(!teacher) {
        res.status(404).json({message : "Teacher does not exist"});
        return;
    }
    let homeworks = [];
    
    await Promise.all(teacher.homeworks.map(async(homeworkId) => {
        let hw = await Homework.findById(homeworkId);
        if(hw) {
            homeworks.push(hw);
        }
    }))
    res.status(200).json({homeworks});
}

export const checkAttendanceAndSendEmails = async (req, res) => {
    console.log("Received request to check attendance");
    const { teacherId } = req.params;
    const teacher = await Teacher.findById(teacherId).populate('classrooms');
  
    if (!teacher) {
      console.log("Teacher does not exist");
      return res.status(404).json({ message: "Teacher does not exist" });
    }
  
    const studentsToNotify = [];
  
    for (const classroom of teacher.classrooms) {
      const classroomData = await Classroom.findById(classroom._id).populate('students');
      for (const student of classroomData.students) {
        const presentDays = student.presentDays.length;
        const totalDays = presentDays + student.absentDays.length;
        const attendancePercentage = (presentDays / totalDays) * 100;
  
        if (attendancePercentage < 75) {
          studentsToNotify.push(student);
        }
      }
    }
  
    console.log("Students fetched successfully", studentsToNotify);
    res.status(200).json({ message: "Students fetched successfully", students: studentsToNotify });
  };
  
import sgMail from '@sendgrid/mail';

sgMail.setApiKey('your-sendgrid-api-key');

export const sendEmailsToStudents = async (req, res) => {
  const { students } = req.body;

  const emailPromises = students.map(student => {
    const msg = {
      to: student.email,
      from: 'thegoatiskrish2@example.com', // Use the email address or domain you verified with SendGrid
      subject: 'Low Attendance Alert',
      text: `Dear ${student.name}, your attendance is below 75%. Please ensure to attend more classes.`,
    };

    return sgMail.send(msg);
  });

  try {
    await Promise.all(emailPromises);
    res.status(200).json({ message: "Emails sent successfully" });
  } catch (error) {
    console.error("Error sending emails:", error);
    res.status(500).json({ message: "Error sending emails", error });
  }
};