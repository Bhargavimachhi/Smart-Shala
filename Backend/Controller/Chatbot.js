import { Chatbotfunction } from "../ChatbotFunction.js";

//Ok so this route is for answering the question of the chatbot
export const getAnswer = async(req,res)=>{
    const que = req.body.question;

    try {

        const que = req.body.question;

        const ans = await Chatbotfunction(que);

        res.status(200).json({message:"success", answer:ans});

    } catch (err) {
        //handle error
        console.log(err);
        res.status(500).json({message:"internal server error"});
    }

  
}



