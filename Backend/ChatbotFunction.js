
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { PromptTemplate } from "@langchain/core/prompts";


const llm = new ChatGoogleGenerativeAI({
    model: "gemini-1.0-pro",
    temperature: 0,
    maxRetries: 2,
    apiKey: "AIzaSyBTdwnQzO00Tk4bSdQBN3BzRGMj65gnvVI",
  });

  
  const promptTemplate = PromptTemplate.fromTemplate(
    "You are a AI teacher.A student has asked you a question. The question is: {que}. Please provide a clear answer."
  );


export async function Chatbotfunction(que){

    const message = await promptTemplate.invoke({ que: que });
    const response = await llm.invoke(message.value);

    const ans = response.content;

    return ans;


}