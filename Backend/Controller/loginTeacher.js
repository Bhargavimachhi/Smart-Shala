import { Teacher } from "../Models/Teacher.js";
import JWT from "jsonwebtoken";
import { JWT_SECRET } from "./admin.js";
const loginTeacher = async (req, res) => {
  const { email, password, role , _id} = req.body;
  if (!email || !password) {
    return res.status(404).send({
      success: false,
      message: "invlid email or password",
    });
  }
  const ExistingTeacher = await Teacher.findOne({ email });
  const jwt_token_teacher = JWT.sign({ _id: ExistingTeacher._id }, JWT_SECRET, {
    expiresIn: "10d",
  });

  if (ExistingTeacher == false) {
    return res.status(404).send({
      success: false,
      message: "email not registerd",
    });
  }

  res.status(200).send({
    success: true,
    message: "login success",
    teacher: {
         id:ExistingTeacher._id,
      email,
      password,
      role: "teacher",
    },
    jwt_token_teacher,
  });
};

export default loginTeacher;
