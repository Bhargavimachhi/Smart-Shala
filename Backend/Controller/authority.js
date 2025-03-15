import { Admin } from "../Models/Admin.js";
import { Authority } from "../Models/Authority.js";
import { Student } from "../Models/Student.js";
import { Classroom } from "../Models/Classroom.js";
import JWT from "jsonwebtoken";
import { Teacher } from "../Models/Teacher.js";
//add Admin
export const JWT_SECRET = "asbcdefgh123";

export const getAuthority = async (req, res) => {
  try {
    const { id } = req.params;
    const authority = await Authority.findById(id);

    if (!authority) {
      return res.status(403).json({ message: "Authority does not exists" });
    }

    return res.status(200).json({ message: "success", authority });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const addAuthority = async (req, res) => {
  let authority = await Authority.findOne({ email: req.body.email });

  if (authority) {
    return res.status(403).json({ message: "Authority already exists" });
  }

  authority = new Authority(req.body);

  authority
    .save()
    .then(() => {
      res.status(200).json({ message: "success" });
    })
    .catch((err) => {
      console.log(err);
      res.send("Error Occurred !!!");
    });
};

export const loginAuthority = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Enter email or password",
      });
    }

    const authority = await Authority.findOne({ email: email });
    if (!authority) {
      return res.status(404).json({ message: "email not registered" });
    }

    if (password != authority.password) {
      return res.status(404).json({ message: "Password is incorrect" });
    }
    const jwt_token = JWT.sign({ _id: authority._id }, JWT_SECRET, {
      expiresIn: "10d",
    });
    res.status(200).json({
      message: "success",
      authority,
      jwt_token,
    });
  } catch (error) {
    console.log("error in login", error);
  }
};

//add school to authority
export const addSchoolToAuthority = async (req, res) => {
  let { id } = req.params;
  let authority = await Authority.findById(id);

  if (!authority) {
    return res.status(404).json({ message: "Authority Doesnot exist" });
  }

  let { email } = req.body;
  if (!email) {
    return res.status(404).json({ message: "Enter Valid Email" });
  }

  let school = await Admin.findOne({ email: email });
  if (!school) {
    return res.status(404).json({ message: "School does not exist" });
  }

  if (authority.schools.includes(school._id)) {
    return res.status(404).json({ message: "School already exist" });
  }

  authority.schools.push(school._id);

  authority
    .save()
    .then(() => {
      return res.status(200).json({ message: "success", school });
    })
    .catch((err) => {
      return res.status(500).json({ message: "Internal Server Error" });
    });
};

//get Schools
export const getSchoolsOfAuthority = async (req, res) => {
  let { id } = req.params;
  let authority = await Authority.findById(id);

  if (!authority) {
    return res.status(404).json({ message: "Authority Doesnot exist" });
  }

  let schools = [];

  for (let i = 0; i < authority.schools.length; i++) {
    let school = await Admin.findById(authority.schools[i]);
    schools.push(school);
  }
  return res.status(200).json({ message: "success", schools });
};

//get teachers of authority
export const getTeachersOfAuthority = async (req, res) => {
  let { id } = req.params;
  let authority = await Authority.findById(id);

  if (!authority) {
    return res.status(404).json({ message: "Authority Doesnot exist" });
  }

  let teachers = [];

  for (let i = 0; i < authority.schools.length; i++) {
    let school = await Admin.findById(authority.schools[i]);
    let data = [];
    await Promise.all(school.teachers.map(async(teacherId) => {
      let teacher = await Teacher.findById(teacherId);
      data.push(teacher);
    }))
    teachers.push({schoolName : school.name, teachers : data});
  }
  return res.status(200).json({ message: "success", teachers });
};

//get students of authority
export const getStudentsOfAuthority = async (req, res) => {
  let { id } = req.params;
  let authority = await Authority.findById(id);

  if (!authority) {
    return res.status(404).json({ message: "Authority Doesnot exist" });
  }

  let students = [];

  for (let i = 0; i < authority.schools.length; i++) {
    let school = await Admin.findById(authority.schools[i]);
    let data = [];
    await Promise.all(school.students.map(async(studentId) => {
      let student = await Student.findById(studentId);
      data.push(student);
    }))
    students.push({schoolName : school.name, students : data});
  }
  return res.status(200).json({ message: "success", students });
};

//get average attendance of schools of authority
export const getAverageAttendanceOfSchoolsOfAuthority = async (req, res) => {
  let { id } = req.params;
  let authority = await Authority.findById(id);

  if (!authority) {
    return res.status(404).json({ message: "Authority Doesnot exist" });
  }
  let attendance = [];
  for (let i = 0; i < authority.schools.length; i++) {
    let admin = await Admin.findById(authority.schools[i]);

    if (!admin) {
      continue;
    }
    let data = [];
    await Promise.all(
      admin.classrooms.map(async (classroomId) => {
        let average = 0;
        const classroom = await Classroom.findById(classroomId);
        if (classroom) {
          await Promise.all(
            classroom.students.map(async (studentId) => {
              const student = await Student.findById(studentId);
              const presentDays = student.presentDays.length;
              const total = student.absentDays.length + presentDays;
              average += presentDays / total;
            })
          );
          average = (average / classroom.students.length) * 100;
          data.push({
            name: classroom.name,
            value: !average ? 0 : average,
          });
        }
      })
    );
    attendance.push({
      school: admin.name,
      average: data,
    });
  }
  return res.status(200).json({ message: "success", attendance });
};
