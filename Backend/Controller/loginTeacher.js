import { Teacher } from "../Models/Teacher.js";
import JWT from "jsonwebtoken";
import { JWT_SECRET } from "./admin.js";
const loginTeacher = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(404).send({
      success: false,
      message: "Enter email or password",
    });
  }
  const teacher = await Teacher.findOne({ email });
  if (teacher == null) {
    return res.status(404).send({
      success: false,
      message: "email not registerd",
    });
  }

  if(password != teacher.password) {
    return res.status(404).send({
      success: false,
      message: "Password is incorrect",
    });
  }
  const jwt_token_teacher = JWT.sign({ _id: teacher._id }, JWT_SECRET, {
    expiresIn: "10d",
  });

  res.status(200).send({
    success: true,
    message: "success",
    teacher,
    jwt_token_teacher,
  });
};

export default loginTeacher;
