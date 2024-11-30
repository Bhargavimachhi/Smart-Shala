import { Student } from "../Models/Student.js";
import JWT from "jsonwebtoken";
import { JWT_SECRET } from "./admin.js";
const loginStudent = async (req, res) => {
  const { email, password, role , _id} = req.body;
  if (!email || !password) {
    return res.status(404).send({
      success: false,
      message: "invlid email or password",
    });
  }
  const ExistingStudent= await Student.findOne({ email });
  const jwt_token_student = JWT.sign({ _id: ExistingStudent._id }, JWT_SECRET, {
    expiresIn: "10d",
  });

  if (ExistingStudent == false) {
    return res.status(404).send({
      success: false,
      message: "email not registerd",
    });
  }

  res.status(200).send({
    success: true,
    message: "login success",
    student: {
         id:ExistingStudent._id,
      email,
      password,
      role: "student",
    },
    jwt_token_student,
  });
};

export default loginStudent;