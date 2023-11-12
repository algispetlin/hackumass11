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
//TODO: change line 106 source button


const theme = createTheme({
    palette: {
        primary: {
            main: '#232323',
          },
      secondary: {main:'#AF3030'} ,
    },
  });

function UserInputBar() {

    const [inputText, setInputText] = useState(''); //user input
    const [storedText, setStoredText] = useState(''); //stored text for bot to read
    const [botText, setBotText] = useState(''); //bot reply
    const [isVisible, setIsVisible] = useState(false); // component visibility


    const toggleVisibility = () => {
      setIsVisible(true);
    };
  
    const HiddenComponentInitial = () => {
      return (
        <div className='circle2'>
            Ask me a question!
          </div>
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
        <Box textAlign='center'><Button color='primary' variant="contained"  sx={{width: 200 }} endIcon={<FileOpenIcon />} onClick ={handleSubmit}>Source:</Button></Box>
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
      setStoredText(inputText)
      setInputText('');

      // let response = await post('/ask-question', { "courseId": "CS220", "question": inputText });
      let response = { "answer": "THIS IS A PLACEHOLDERTHIS IS A PLACEHOLDERTHIS IS A PLACEHOLDERTHIS IS A PLACEHOLDERTHIS IS A PLACEHOLDERTHIS IS A PLACEHOLDERTHIS IS A PLACEHOLDERTHIS IS A PLACEHOLDERTHIS IS A PLACEHOLDERTHIS IS A PLACEHOLDERTHIS IS A PLACEHOLDERTHIS IS A PLACEHOLDERTHIS IS A PLACEHOLDERTHIS IS A PLACEHOLDERTHIS IS A PLACEHOLDERTHIS IS A PLACEHOLDERTHIS IS A PLACEHOLDERTHIS IS A PLACEHOLDERTHIS IS A PLACEHOLDERTHIS IS A PLACEHOLDERTHIS IS A PLACEHOLDERTHIS IS A PLACEHOLDERTHIS IS A PLACEHOLDERTHIS IS A PLACEHOLDERTHIS IS A PLACEHOLDERTHIS IS A PLACEHOLDERTHIS IS A PLACEHOLDERTHIS IS A PLACEHOLDERTHIS IS A PLACEHOLDERTHIS IS A PLACEHOLDERTHIS IS A PLACEHOLDERTHIS IS A PLACEHOLDERTHIS IS A PLACEHOLDERTHIS IS A PLACEHOLDERTHIS IS A PLACEHOLDERTHIS IS A PLACEHOLDERTHIS IS A PLACEHOLDERTHIS IS A PLACEHOLDERTHIS IS A PLACEHOLDERTHIS IS A PLACEHOLDERTHIS IS A PLACEHOLDER", "highlighted": ""};
      
      if (!response) response = { "answer": "ERROR", "highlighted": "" }

      setBotText(response.answer);
    };
    

  
    return (
      <ThemeProvider theme={theme}>
      {
      <div className='container'>
        {!isVisible && <HiddenComponentInitial />}
        {isVisible && <HiddenComponentBotReply />}
        {isVisible && <HiddenComponentUser />}
          <div style={{ flex: 1 }}></div>
          {isVisible && <HiddenComponentBotReplyPDF />}
          <div className='text-color'>
            <TextField   
                variant="filled" 
                color= 'primary' focused
                type="text"
                placeholder="Type something..."
                value={inputText}
                onChange={handleChange}
                fullWidth
                onKeyDown={handleKeyPress}
            />
            <Button variant="contained" endIcon={<SendIcon />} onClick={handleSubmit} color='secondary'>
            Send
          </Button>
          </div>
      </div> 
      }
      </ThemeProvider>

    );
}
  


export default UserInputBar;
export {};