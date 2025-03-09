import { Quiz } from "../Models/Quiz.js";
import { Classroom } from "../Models/Classroom.js";
import { Student } from "../Models/Student.js";

export const getQuiz = async(req, res) => {
  try {
    const { id } = req.params;

    const quiz = await Quiz.findById(id);

    if (!quiz) {
      return res.status(403).json({ message: "Quiz does not exist" });
    }
    return res.status(200).json({ message: "success", quiz });
  }
  catch (err) {
    return res.status(500).json({ message: "Internal Server Error", err });
  }
}

export const addQuizToClassroom = async (req, res) => {
  try {
    const { id } = req.params;
    const classroom = await Classroom.findById(id);

    if (!classroom) {
      return res.status(403).json({ message: "Classroom does not exist" });
    }

    const quiz = new Quiz(req.body);
    await quiz
      .save()
      .then(async () => {
        classroom.quizes.push(quiz._id);
        await classroom.save();
        return res
          .status(200)
          .json({ message: "Quiz Created Successfully", quiz });
      })
      .catch((err) => {
        return res.status(400).json({ message: "Failed to add quiz", err });
      });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error", err });
  }
};

export const getQuizesOfClassroom = async (req, res) => {
  try {
    const { id } = req.params;
    const classroom = await Classroom.findById(id);

    if (!classroom) {
      return res.status(403).json({ message: "Classroom does not exist" });
    }

    let quizes = [];

    for (let i = 0; i < classroom.quizes.length; i++) {
      const quiz = await Quiz.findById(classroom.quizes[i]);
      quizes.push(quiz);
    }

    return res.status(200).json({ message: "success", quizes });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const assignMarksOfQuizToStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const { quizId, marks, answers } = req.body;
    const student = await Student.findById(id);
    const quiz = await Quiz.findById(quizId);

    if (!student) {
      return res.status(400).json({ message: "Student does not exist" });
    }

    if (!quiz || !quizId) {
      return res.status(400).json({ message: "Quiz does not exist" });
    }

    if (!marks && marks != 0) {
      return res.status(400).json({ message: "Value of marks is Invalid" });
    }

    let ans = false;
    for (let i = 0; i < student.grades.length; i++) {
      let obj = student.grades[i];
      if (obj.quizId == quizId) {
        return res
          .status(400)
          .json({ message: "Marks of this quiz has already been assigned" , percentage : obj.percentage});
      }
    }

    student.grades.push({
      quizId: quizId,
      percentage: (marks * 100) / quiz.totalMarks,
      answers: answers
    });
    await student.save().then(() => {
      res.status(200).json({ message: "success" });
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
