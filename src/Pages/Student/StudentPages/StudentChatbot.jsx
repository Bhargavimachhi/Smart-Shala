// ChatPage.jsx
import React, { useState, useRef, useEffect } from "react";

import {
  Box,
  TextField,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";

import axios from "axios";
import Markdown from "react-markdown";
import { ICONS } from "../Icons/icons";

const StudentChatbot = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  async function getAnswertoQuery(que) {
    const res = await axios.post("http://localhost:3000/getAnswer", {
      question: que,
    });
    return res.data.answer;
  }

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (inputMessage.trim() === "") return;

    // Add user message
    const newUserMessage = {
      text: inputMessage,
      sender: "user",
    };
    setMessages((prevMessages) => [...prevMessages, newUserMessage]);
    setInputMessage("");

    // Show thinking message
    const thinkingMessage = {
      text: "🤔 Thinking...",
      sender: "ai",
    };
    setMessages((prevMessages) => [...prevMessages, thinkingMessage]);

    // Fetch AI response
    const aiResponseText = await getAnswertoQuery(inputMessage);

    // Remove thinking message and add AI response
    setMessages((prevMessages) => [
      ...prevMessages.slice(0, -1),
      {
        text: aiResponseText,
        sender: "ai",
      },
    ]);
    setloading(false);
  };

  const MessageBubble = ({ message }) => {
    const isAI = message.sender === "ai";
    return (
      <div className={`flex ${isAI ? "justify-start" : "justify-end"} mb-4`}>
        <div
          className={`max-w-[70%] p-3 rounded-lg ${
            isAI
              ? "bg-gray-200 rounded-tl-none"
              : "bg-blue-500 text-white rounded-tr-none"
          }`}
        >
          <Typography variant="body1">
            <Markdown>{message.text}</Markdown>
          </Typography>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-wrap w-full ">
        <Box className="flex max-h-[97.5vh] min-h-[97.5vh] w-full">
          <Box className="flex flex-col flex-1">
            <Box className="flex-1 p-4 overflow-y-auto bg-gray-50">
              {messages.map((message, index) => (
                <MessageBubble key={index} message={message} />
              ))}
              <div ref={messagesEndRef} />
            </Box>

            <Paper
              elevation={3}
              component="form"
              onSubmit={handleSendMessage}
              className="flex gap-2 p-1 border border-btn"
            >
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Type your message..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                size="small"
              />
              <IconButton
                color="primary"
                type="submit"
                disabled={!inputMessage.trim()}
              >
                <ICONS.SEND />
              </IconButton>
            </Paper>
          </Box>
        </Box>
    </div>
  );
};

export default StudentChatbot;
