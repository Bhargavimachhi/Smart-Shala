import { Student } from "../Models/Student.js";
const getIndividualStudent = async (req, res) => {
  const { id } = req.params; // Extract student ID from URL
  try {
    const student = await Student.findById(id); // Replace with your database query
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.json(student);
  } catch (error) {
    console.error("Error fetching student:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export default getIndividualStudent;
