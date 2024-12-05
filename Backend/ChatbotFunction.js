
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { PromptTemplate } from "@langchain/core/prompts";


const llm = new ChatGoogleGenerativeAI({
    model: "gemini-1.0-pro",
    temperature: 0,
    maxRetries: 2,
    apiKey: "AIzaSyCYEMFZZeap0EDgbvFZMHcwILWB8bK-zJ4",
  });

  
  const promptTemplate = PromptTemplate.fromTemplate(
    "You are a AI teacher.A student has asked you a question. The question is: {que}. Please provide a clear answer."
  );
  const promptanaylseTemplate = PromptTemplate.fromTemplate(
    "You are a AI anaylser.Ignore the Text Scanned with Oken Scanner. Understand the que and ans written in the text. Give output listing the spelling mistakes and grammer in text.Also,if the the ans is very wrong according to que asked then correct it. The text given is {text}."
  );


export async function Chatbotfunction(que){

    const message = await promptTemplate.invoke({ que: que });
    const response = await llm.invoke(message.value);

    const ans = response.content;

    return ans;


}

export async function Homeworkanaylsisfunction(text){

  const message = await promptanaylseTemplate.invoke({ text: text });
  const response = await llm.invoke(message.value);

  const ans = response.content;

  return ans;


}