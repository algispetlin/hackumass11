import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { purple } from '@mui/material/colors';
import './UserInputBar.css';
import SendIcon from '@mui/icons-material/Send';
import { Box, Button } from '@mui/material';
import { post } from '../services/RestService';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FileOpenIcon from '@mui/icons-material/FileOpen';
import { error } from 'console';

import Typography from '@mui/material/Typography';
import { UserSchema } from '../models/ApiModel';
//TODO: change line 106 source button

function UserInputBar(props: { user: UserSchema }) {
    const [inputText, setInputText] = useState(''); //user input
    const [storedText, setStoredText] = useState(''); //stored text for bot to read
    const [botText, setBotText] = useState(''); //bot reply
    const [isVisible, setIsVisible] = useState(false); // component visibility
    const [pdf, setPdf] = useState('');


    const toggleVisibility = () => {
      setIsVisible(true);
    };
  
    const HiddenComponentInitial = () => {
      return (
        <Box sx={{borderStyle: "solid",
          borderWidth: "5px",
          borderRadius: "50px",
          borderColor: "background.primary",
          color: "white",
          backgroundColor: "background.secondary",
          border: "3px solid background.secondary",
          margin: "auto",
          width: "50%",
          padding: "10px",
          textAlign: "center"}}>
          <Typography sx={{ color: "text.primary"}}>
          Ask me a question!
          </Typography>
        </Box>
        // <div className='circle2'>
        //     Ask me a question!
        //   </div>
      )
    };

    const HiddenComponentUser = () => {
      return (
        <div className='circle'>
            {storedText}
          </div>
      )
    }

    const HiddenComponentBotReply = () => {
      return (
        <div className='circle1'>
            {botText}
        </div>
      );
    }

    const HiddenComponentBotReplyPDF= () => {
      return (
        <Box textAlign='center'><Button color='primary' variant="contained"  sx={{width: 200 }} endIcon={<FileOpenIcon />} onClick ={() => {
          if (pdf !== '') {
            fetch(`data:application/pdf;base64,${pdf}`)
              .then(res => res.blob())
              .then(blob => {
                const pdfUrl = URL.createObjectURL(blob);
                window.open(pdfUrl, '_blank');
              }
            );
          }
        }}>Source:</Button></Box>
      );
    }
  
    const handleChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
      setInputText(event.target.value);
    };

    const handleKeyPress = (event: { key: string; }) => {
      if (event.key === 'Enter') {
        handleSubmit(); 
        toggleVisibility();
      }
    };
    
    const handleSubmit = async () => {
      setStoredText(inputText);
      setInputText('');

      console.log(props.user)
      
      let questionResponse = await post('/ask-question', { "courseId": "65508f019d5aad0ca6350894", "userId": props.user._id, "question": inputText });
      
      if (!questionResponse || !questionResponse.valid) questionResponse = { "answer": "ERROR" }

      let userResponse = await post('/get-user', { "email": props.user.email as string });

      setBotText(questionResponse.answer);
      setPdf(userResponse.prevHighlight);
    };
    

  
    return (
      // <div className='container'>
      <Box sx={{display: "flex", 
        flexDirection: "column",
        backgroundColor: "background.secondary",
        flex: "1100", color: "text.primary"}}>
        {!isVisible && <HiddenComponentInitial />}
        {isVisible && <HiddenComponentBotReply />}
        {isVisible && <HiddenComponentUser />}
          <div style={{ flex: 1 }}></div>
          {isVisible && <HiddenComponentBotReplyPDF />}
          <div className='text-color'>
            <TextField   
                variant="filled" 
                // sx={{color: "text.primary"}}
                type="text"
                placeholder="Type something..."
                value={inputText}
                onChange={handleChange}
                fullWidth
                onKeyDown={handleKeyPress}
            />
            <Button variant="contained" endIcon={<SendIcon />} onClick={handleSubmit} sx={{color: "text.primary"}}>
            Send
          </Button>
          </div>
          </Box>
      // </div> 

    );
}

export default UserInputBar;
