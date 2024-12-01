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
  const student = await Student.findOne({ email });

  if (student == null) {
    return res.status(404).send({
      success: false,
      message: "email not registerd",
    });
  }

  if(password != student.password) {
    return res.status(404).send({
      success: false,
      message: "Password is incorrect",
    });
  }

  const jwt_token_student = JWT.sign({ _id: student._id }, JWT_SECRET, {
    expiresIn: "10d",
  });

  res.status(200).send({
    success: true,
    message: "login success",
    student,
    jwt_token_student,
  });
};

export default loginStudent;
