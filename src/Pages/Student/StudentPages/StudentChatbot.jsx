// ChatPage.jsx
import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  TextField,
  IconButton,
  Paper,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  AppBar,
  Toolbar,
} from '@mui/material';
import {
  Send as SendIcon,
  Chat as ChatIcon,
  History as HistoryIcon,
  Settings as SettingsIcon,
  Help as HelpIcon,
} from '@mui/icons-material';
import LeftSideNavbar from '../Components/LeftSideNavBar';
import axios from 'axios';
import Markdown from 'react-markdown';

const StudentChatbot = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef(null);
  const drawerWidth = 240;
  const [isExpanded, setIsExpanded] = useState(false);
  const [loading,setloading] = useState(false);

  const handleToggleSidebar = () => {
    setIsExpanded((prevState) => !prevState);
  };


  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  async function getAnswertoQuery(que){

    const res = await axios.post("http://localhost:3000/getAnswer",{
        "question": que,
    });
    console.log(res.data.answer);
    return res.data.answer;

  }

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

 
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (inputMessage.trim() === '') return;

    // Add user message
    const newUserMessage = {
      text: inputMessage,
      sender: 'user',
      
    };
    setMessages((prevMessages) => [...prevMessages, newUserMessage]);
    setInputMessage('');

      // Show thinking message
      const thinkingMessage = {
        text: '🤔 Thinking...',
        sender: 'ai',
       
      };
      setMessages((prevMessages) => [...prevMessages, thinkingMessage]);
      setloading(true);
  
      // Fetch AI response
      const aiResponseText = await getAnswertoQuery(inputMessage);
  
      // Remove thinking message and add AI response
      setMessages((prevMessages) => [
        ...prevMessages.slice(0, -1),
        {
          text: aiResponseText,
          sender: 'ai',
         
        },
      ]);
      setloading(false);



   
  };

  
  const MessageBubble = ({ message }) => {
    const isAI = message.sender === 'ai';
    return (
      <div className={`flex ${isAI ? 'justify-start' : 'justify-end'} mb-4`}>
        <div
          className={`max-w-[70%] p-3 rounded-lg ${
            isAI 
              ? 'bg-gray-200 rounded-tl-none' 
              : 'bg-blue-500 text-white rounded-tr-none'
          }`}
        >
          <Typography variant="body1">

          <Markdown>
                        
          {message.text}

                        </Markdown>
            
            
            </Typography>
         
        </div>
      </div>
    );
  };

  return (

    <div className="flex flex-wrap">
     
      <LeftSideNavbar
        isExpanded={isExpanded}
        toggleSidebar={handleToggleSidebar}
      />
      <div
        className={`flex-1 transition-all duration-300 ml-${
          isExpanded ? "64" : "16"
        } p-6 mr-50 overflow-x-auto`}
      > 

<Box className="flex h-screen">
    

    <Box className="flex-1 flex flex-col">
      
    
    
      <Box className="flex-1 overflow-y-auto p-4 bg-gray-50">
        {messages.map((message, index) => (
          <MessageBubble key={index} message={message} />
        ))}
        <div ref={messagesEndRef} />
      </Box>
    
    
      <Paper 
        elevation={3} 
        component="form" 
        onSubmit={handleSendMessage}
        className="p-4 flex gap-2"
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
          <SendIcon />
        </IconButton>
      </Paper>
    </Box>
    </Box>



   

      </div>
    </div>


   
  );
};

export default StudentChatbot;