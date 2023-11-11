import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { purple } from '@mui/material/colors';
import './UserInputBar.css';
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
  
    const handleSubmit = () => {
      setStoredText(inputText);
      // send to backend
      <p>Entered text: {storedText}</p>
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
      <div>
        <TextField
            
            variant="filled" 
            color= 'primary' focused
            type="text"
            placeholder="Type something..."
            value={inputText}
            onChange={handleChange}
            fullWidth
            
        
        />
        <button onClick={handleSubmit}>Submit</button>

        <p>Entered text: {storedText}</p>
      </div>
      </ThemeProvider>
    );
}
  


export default UserInputBar;
export {};