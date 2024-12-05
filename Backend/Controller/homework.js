import { Homework } from "../Models/Homework.js";

// get Homework
export const getHomework = async(req, res) => {
    const id = req.params.id;
    const homework = await Homework.findById(id);

    if(!homework) {
        res.status(404).json({message : "Homework does not exist"});
        return;
    }
    res.status(200).json({homework});
}