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

function UserInputBar(props: { user: UserSchema, course: string }) {
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
        <>
          <div className='circle1'>
            {botText}
            {isVisible && <HiddenComponentBotReplyPDF />}
          </div>
        </>
      );
    }

    const HiddenComponentBotReplyPDF= () => {
      return (
        <Box textAlign='center' sx={{ marginTop: 1.8 }}><Button color='primary' variant="contained" onClick ={() => {
          if (pdf !== '') {
            fetch(`data:application/pdf;base64,${pdf}`)
              .then(res => res.blob())
              .then(blob => {
                const pdfUrl = URL.createObjectURL(blob);
                window.open(pdfUrl, '_blank');
              }
            );
          }
        }}><FileOpenIcon fontSize='small' /></Button></Box>
      );
    }
  
    const handleChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
      setInputText(event.target.value);
    };

    const handleKeyPress = (event: { key: string; }) => {
      if (event.key === 'Enter') {
        setInputText((document.getElementById("questionInput")! as HTMLInputElement).value);
        handleSubmit(); 
        toggleVisibility();
      }
    };
    
    const handleSubmit = async () => {
      setStoredText(inputText);
      setInputText('');
      setBotText('');
      
      let questionResponse = await post('/ask-question', { "courseId": props.course, "userId": props.user._id, "question": inputText });
      
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
          <div style={{ display: 'flex', alignItems: 'center', borderStyle: 'solid', borderRadius: 30, borderColor: '#AF0303', borderWidth: 2, height: 45, paddingLeft: 30, marginLeft: '20%', marginRight: '20%', marginBottom: 40 }}>
            <input id="questionInput" onKeyDown={handleKeyPress} onChange={handleChange} style={{ width: '75%', borderStyle: 'none', backgroundColor: '#232323', color: '#D9D9D9', fontSize: 20 }} placeholder='Enter here...'></input>
            <Button variant="contained" onClick={handleSubmit} sx={{color: "text.primary", borderRadius: 30, paddingLeft: 0, paddingRight: 0, marginLeft: 19.5, backgroundSize: 'contain' }}><SendIcon /></Button>
          </div>
          {/* <div className='text-color'>
            <TextField   
                variant="filled" 
                sx={{ width: '75%', borderRadius: 10 }}
                type="text"
                placeholder="Type something..."
                value={inputText}
                onChange={handleChange}
                fullWidth
                onKeyDown={handleKeyPress}
            />
          </div> */}
          </Box>
      // </div> 

    );
}

export default UserInputBar;
