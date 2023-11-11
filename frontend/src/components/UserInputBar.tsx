import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { purple } from '@mui/material/colors';
import './UserInputBar.css';
import SendIcon from '@mui/icons-material/Send';
import { Button } from '@mui/material';





const theme = createTheme({
    palette: {
        primary: {
            main: '#FFFFFF',
          },
      secondary: purple ,
    },
  });

function UserInputBar() {

    const [inputText, setInputText] = useState('');
    const [storedText, setStoredText] = useState('');
  
    const handleChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
      setInputText(event.target.value);
    };

    const handleKeyPress = (event: { key: string; }) => {
      if (event.key === 'Enter') {
        handleSubmit(); 
      }
    };
    
    const handleSubmit = () => {
      setStoredText(inputText);
      // send to backend
      
      setInputText('');
    };

    // const keySubmission = (e: React.KeyboardEvent) => {
    //     if (e.type === "keydown" && e.key === "Enter"){
    //         setStoredText(inputText);
    //         handleSubmit();
    //     }
    // }
    // keySubmission(onkeydown);
  
    return (
      <ThemeProvider theme={theme}>
      <div className='push-bottom'>
      <div className='circle'>
        {storedText}
      </div>
      <div className='empty-space'></div>
      <div>
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
      </div>
      <div className='button-alignment'><Button variant="contained" endIcon={<SendIcon />} onClick={handleSubmit}>
        Send
      </Button></div>
      </div>
      
      </ThemeProvider>
    );
}
  


export default UserInputBar;
export {};